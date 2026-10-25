import { TaskCardProps, Subtask, DailyList } from "@/components/interfaces";

const database = "http://192.168.1.66:8000";

export async function getMissions() {
  const [missionsRes, resolved, subtasksRes, daily_commitments] =
    await Promise.all([
      fetch(`${database}/missions?resolved_at=null`),
      fetch(`${database}/missions?resolved_at:ne=null`),
      fetch(`${database}/subtasks`),
      fetch(`${database}/daily_commitments`),
    ]);
  if (!missionsRes.ok || !subtasksRes.ok) {
    throw new Error("Failed to fetch missions or subtasks");
  }

  const byDeadline = (a: TaskCardProps, b: TaskCardProps) =>
    new Date(a.deadline).getTime() - new Date(b.deadline).getTime();

  const missions = (await missionsRes.json()).sort(byDeadline);
  const resolvedList = (await resolved.json()).sort(byDeadline);
  const subtasks = await subtasksRes.json();
  const dailyCommitments = await daily_commitments.json();
  const allMissions = [...missions, ...resolvedList].sort(byDeadline);
  function localDate(d: string | Date) {
    return new Date(d).toLocaleDateString("en-CA");
  }
  const dailyList = allMissions.filter((mission: TaskCardProps) =>
    dailyCommitments.some(
      (el: DailyList) =>
        el.mission_id === mission.id &&
        localDate(el.commited_at) === localDate(new Date()),
    ),
  );

  const missionsWithSubtasks = missions.map((mission: TaskCardProps) => {
    const all_subtasks = subtasks.filter(
      (s: Subtask) => s.mission_id === mission.id,
    );
    return {
      ...mission,
      all_subtasks,
      resolved_subtasks: all_subtasks.filter(
        (s: Subtask) => s.is_done === true,
      ),
    };
  });
  const dailyMissionsWithSubtasks = dailyList.map((mission: TaskCardProps) => {
    const all_subtasks = subtasks.filter(
      (s: Subtask) => s.mission_id === mission.id,
    );
    return {
      ...mission,
      all_subtasks,
      resolved_subtasks: all_subtasks.filter(
        (s: Subtask) => s.is_done === true,
      ),
    };
  });
  const resolvedMissionsWithSubtasks = resolvedList.map(
    (mission: TaskCardProps) => {
      const all_subtasks = subtasks.filter(
        (s: Subtask) => s.mission_id === mission.id,
      );
      return {
        ...mission,
        all_subtasks,
        resolved_subtasks: all_subtasks.filter(
          (s: Subtask) => s.is_done === true,
        ),
      };
    },
  );

  return {
    missionsWithSubtasks: missionsWithSubtasks,
    dailyMissionsWithSubtasks: dailyMissionsWithSubtasks,
    resolvedMissionsWithSubtasks: resolvedMissionsWithSubtasks,
  };
}
