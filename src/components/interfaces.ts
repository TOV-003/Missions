export interface Subtask {
  id: string;
  mission_id: string;
  title: string;
  position: number;
  is_done: boolean;
}

export interface DailyList {
  id: string;
  user_id: string;
  mission_id: string;
  committed_at: string;
}

export interface TaskCardProps {
  id: string;
  title: string;
  priority: "low" | "medium" | "critical";
  target_domain: string;
  deadline: string;
  resolved_at: string | null;
  resolved_subtasks: Subtask[];
  all_subtasks: Subtask[];
}

export type Priority = "critical" | "medium" | "low" | null;

export type Domain =
  | "work"
  | "study"
  | "health"
  | "finance"
  | "home"
  | "social"
  | "growth"
  | "creative"
  | "admin"
  | null;

export interface Mission {
  id: string;
  title: string;
  directive: string;
  target_domain: Domain;
  priority: Priority;
  deadline: string;
  notify_60_min: boolean;
  created_at: string;
  resolved_at: string | null;
}
