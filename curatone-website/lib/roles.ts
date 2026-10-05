export type Role = "student" | "parent" | "teacher" | "admin";
export type Profile = { id: string; full_name: string; role: Role };
export type Entry = { id: string; kind: "achievement" | "certificate" | "comment"; body: string; created_at: string };
export type Student = { id: string; full_name: string; age: number | null; programme: string | null; level: string; attendance: number; next_lesson: string | null; progress_entries: Entry[] };
export const isStaff = (r: Role) => r === "teacher" || r === "admin";
