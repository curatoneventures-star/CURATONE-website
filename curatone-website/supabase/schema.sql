-- Run in Supabase: SQL Editor -> New query -> paste -> Run.
create type app_role as enum ('student','parent','teacher','admin');

create table profiles (id uuid primary key references auth.users on delete cascade, email text, full_name text, role app_role not null default 'parent');
create table students (id uuid primary key default gen_random_uuid(), full_name text not null, age int, programme text, teacher_id uuid references profiles(id),
  level text default 'Foundation', attendance int default 0 check (attendance between 0 and 100), next_lesson text, created_at timestamptz default now());
create table student_links (student_id uuid references students(id) on delete cascade, user_id uuid references profiles(id) on delete cascade, primary key (student_id, user_id));
create table progress_entries (id uuid primary key default gen_random_uuid(), student_id uuid not null references students(id) on delete cascade,
  kind text not null check (kind in ('achievement','certificate','comment')), body text not null, created_by uuid references profiles(id), created_at timestamptz default now());

alter table profiles enable row level security; alter table students enable row level security;
alter table student_links enable row level security; alter table progress_entries enable row level security;

create function my_role() returns app_role language sql stable security definer set search_path = public as $$ select role from profiles where id = auth.uid() $$;
create function can_see_student(sid uuid) returns boolean language sql stable security definer set search_path = public as $$
  select my_role() = 'admin'
    or exists (select 1 from student_links where student_id = sid and user_id = auth.uid())
    or exists (select 1 from students where id = sid and teacher_id = auth.uid()) $$;

-- New sign-ups are ALWAYS 'parent'. Only an admin can change roles (never trust client metadata).
create function handle_new_user() returns trigger language plpgsql security definer set search_path = public as $$
begin insert into profiles (id, email, full_name) values (new.id, lower(new.email), coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email,'@',1))); return new; end $$;
create trigger on_auth_user_created after insert on auth.users for each row execute function handle_new_user();

create policy "profiles read" on profiles for select using (id = auth.uid() or my_role() in ('teacher','admin'));
create policy "profiles admin update" on profiles for update using (my_role() = 'admin') with check (my_role() = 'admin');
create policy "students read" on students for select using (can_see_student(id));
create policy "students admin insert" on students for insert with check (my_role() = 'admin');
create policy "students staff update" on students for update using (my_role() = 'admin' or (my_role() = 'teacher' and teacher_id = auth.uid()));
create policy "students admin delete" on students for delete using (my_role() = 'admin');
create policy "links read" on student_links for select using (user_id = auth.uid() or my_role() = 'admin');
create policy "links admin write" on student_links for all using (my_role() = 'admin') with check (my_role() = 'admin');
create policy "entries read" on progress_entries for select using (can_see_student(student_id));
create policy "entries staff insert" on progress_entries for insert with check (my_role() in ('teacher','admin') and can_see_student(student_id) and created_by = auth.uid());
create policy "entries admin delete" on progress_entries for delete using (my_role() = 'admin');

-- After creating YOUR account, make yourself admin (replace the email):
-- update profiles set role = 'admin' where email = 'curatone.ventures@gmail.com';
