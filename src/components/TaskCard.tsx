import { View, Text } from "react-native";
import { ms } from "react-native-size-matters";
import { Clock, Calendar } from "@/components/Icons";

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
  commited_at: string;
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

export default function TaskCard({
  id,
  title,
  priority,
  target_domain,
  deadline,
  resolved_subtasks,
  all_subtasks,
}: TaskCardProps) {
  function parseDateTime(iso: string) {
    const d = new Date(iso);
    const is = (ms: number) =>
      d.toDateString() === new Date(Date.now() - ms).toDateString();

    return {
      dayLabel: is(0)
        ? "Today"
        : is(864e5)
          ? "Yesterday"
          : d.toLocaleDateString(undefined, { month: "short", day: "numeric" }),
      time: d.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
    };
  }
  const { dayLabel, time } = parseDateTime(deadline);
  return (
    <View
      style={{
        backgroundColor: "white",
        borderWidth: ms(2),
        shadowColor: "#000",
        shadowOffset: { width: ms(2), height: ms(2) },
        shadowOpacity: 1,
        shadowRadius: 0,
        width: "100%",
        flexDirection: "row",
        alignItems: "flex-start",
      }}
      key={id}
    >
      <View
        style={{
          backgroundColor: `${priority === "critical" ? "#FF6B4A" : "#8AD8FF"}`,
          borderRightWidth: ms(2),
          width: ms(10),
          height: "100%",
          alignItems: "center",
          alignSelf: "flex-start",
        }}
      ></View>
      <View
        style={{
          padding: ms(6),
          flexDirection: "column",
          gap: ms(10),
          flex: 1,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            minWidth: "40%",
            alignItems: "center",
            alignSelf: "flex-start",
            gap: ms(4),
          }}
        >
          <Text
            style={{
              fontFamily: "Outfit-Bold",
              fontSize: ms(8),
              backgroundColor: `${priority === "critical" ? "#FF6B4A" : "#8AD8FF"}`,
              paddingHorizontal: ms(6),
              paddingVertical: ms(2),
              borderWidth: ms(1.5),
              shadowColor: "#000",
              shadowOffset: { width: ms(1), height: ms(1) },
              shadowOpacity: 1,
              shadowRadius: 0,
              color: `${priority === "critical" ? "white" : "black"}`,
            }}
          >
            {priority.toUpperCase()}
          </Text>
          <Text
            style={{
              fontFamily: "Outfit-Bold",
              fontSize: ms(8),
              backgroundColor: "#D4B5FF",
              paddingHorizontal: ms(6),
              paddingVertical: ms(2),
              borderWidth: ms(1.5),
              shadowColor: "#000",
              shadowOffset: { width: ms(1), height: ms(1) },
              shadowOpacity: 1,
              shadowRadius: 0,
            }}
          >
            {target_domain.toUpperCase()}
          </Text>
          <Text
            style={{
              fontFamily: "Outfit-Bold",
              fontSize: ms(8),
              backgroundColor: "#F4F3EF",
              paddingHorizontal: ms(6),
              paddingVertical: ms(2),
              borderWidth: ms(1.5),
              shadowColor: "#000",
              shadowOffset: { width: ms(1), height: ms(1) },
              shadowOpacity: 1,
              shadowRadius: 0,
            }}
          >
            {resolved_subtasks.length}/{all_subtasks.length} SUBTASKS
          </Text>
        </View>
        <Text
          style={{
            fontFamily: "Outfit-Bold",
            fontSize: ms(14),
            textAlign: "left",
            width: "100%",
          }}
        >
          {title}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            gap: ms(4),
            paddingHorizontal: ms(6),
            paddingVertical: ms(3),
            borderWidth: ms(1.5),
            backgroundColor: "#F4F3EF",
            alignSelf: "flex-start",
            shadowColor: "#000",
            shadowOffset: { width: ms(1), height: ms(1) },
            shadowOpacity: 1,
            shadowRadius: 0,
          }}
        >
          <Calendar size={ms(12)} />
          <Text
            style={{
              fontFamily: "Outfit-Bold",
              fontSize: ms(10),
            }}
          >
            {dayLabel}
          </Text>
          <Clock size={ms(12)} />
          <Text
            style={{
              fontFamily: "Outfit-Bold",
              fontSize: ms(10),
            }}
          >
            {time}
          </Text>
        </View>
      </View>
    </View>
  );
}
