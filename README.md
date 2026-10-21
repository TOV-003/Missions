# Missions 🚀

**Missions** is a task management app built with [Expo](https://expo.dev), React Native, and TypeScript. It lets you organize your work into missions, break them down into a chain of subtasks, and track progress at a glance — on Android, iOS, and the web.

> ⚠️ **Work in progress.** Missions is under active development. Some features are stubbed out or use hardcoded data, and the app currently runs against placeholder data. Anything that _does_ work is documented below; anything that doesn't is called out so you're not surprised.

## Table of contents

- [Tech stack](#tech-stack)
- [Get started](#get-started)
- [Project structure](#project-structure)
- [Screens](#screens)
- [Data & hooks](#data--hooks)
- [Components](#components)
- [Design system](#design-system)
- [Roadmap](#roadmap)
- [Learn more](#learn-more)

## Tech stack

- **[Expo](https://expo.dev)** with [Expo Router](https://docs.expo.dev/router/introduction/) (file-based routing)
- **[React Native](https://reactnative.dev/)** + **TypeScript**
- **[TanStack Query](https://tanstack.com/query/latest)** for server-state / data fetching
- **[react-native-size-matters](https://github.com/nirsky/react-native-size-matters)** for responsive scaling via a shared `msC` helper
- **[Outfit](https://fonts.google.com/specimen/Outfit)** font family, loaded through `expo-font` + `expo-splash-screen`

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

From the output, you can open the app in a:

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go) — a limited sandbox for trying out app development with Expo

## Project structure

```
src/
├── app/                      # Expo Router routes (file-based)
│   ├── _layout.tsx           # Root layout: fonts, QueryClient, bottom tab bar
│   ├── index.tsx             # Welcome / splash screen (exports the msC helper)
│   ├── newTask.tsx           # New mission form (placeholder for now)
│   └── Tasks/
│       ├── _layout.tsx       # Stack for the Tasks tab (headerless)
│       ├── index.tsx         # Mission list with today / resolved / pending tabs
│       └── [id].tsx          # Mission details screen
├── components/               # Shared UI (TaskCard, Icons, Logo, Hr)
├── hooks/
│   └── useMissions.ts        # TanStack Query hook for mission data
└── assets/                   # Fonts and images (PIC.jpg, Outfit-*.ttf, …)
```

## Screens

### `/` — Welcome

The landing screen. Shows the Missions logo, a big **WELCOME TO MISSIONS** headline, and a **CONTINUE** button that navigates to the Tasks tab. This file also exports the shared scaling helper:

```ts
export const msC = (size: number) => moderateScale(size, 0.2);
```

`msC` is imported everywhere in the app so sizes stay proportional across screen sizes.

### `/Tasks` — Mission list

The main dashboard. It renders:

- **Today's progress card** — completed / total commitments for today, plus a progress bar and "missions left" count.
- **Filter tabs** — `TODAY'S` / `RESOLVED` / `PENDING`, each showing a count.
- **Mission cards** — clickable `TaskCard`s that navigate to the details screen. Critical-priority missions are sorted above the rest.
- **Empty states** — friendly messages when there are no committed, resolved, or pending missions.

Data comes from `useMissions()`, which returns `dailyMissionsWithSubtasks`, `resolvedMissionsWithSubtasks`, and `missionsWithSubtasks`.

### `/Tasks/[id]` — Mission details

Shows a single mission:

- Header with back button, "MISSION DETAILS" title, and edit / delete actions.
- Summary card: priority badge, target domain badge, completion percentage, title, and a progress bar.
- **Directive** card — the mission's description.
- **Date** and **Time** cards.
- **Subtask chain** — every subtask with a done/pending icon and "resolved X of Y" counter.
- Action buttons — **Mark task resolved**, **Edit task**, and **Delete task**.

> 🚧 Still a WIP: the date and time are **hardcoded** (`2026-10-26T17:00:00Z`), and the action buttons and header edit/delete icons are **not yet wired up**.

### `/newTask` — New mission

Placeholder screen with a single `<Text>first</Text>` for now. This is the next screen to be built out.

## Data & hooks

```ts
// src/hooks/useMissions.ts
const { data, isPending, error } = useMissions();
```

`useMissions` wraps a TanStack Query request and returns mission data shaped like:

```ts
type MissionData = {
  missionsWithSubtasks: TaskCardProps[];
  dailyMissionsWithSubtasks: TaskCardProps[];
  resolvedMissionsWithSubtasks: TaskCardProps[];
};
```

Each mission roughly matches:

```ts
type TaskCardProps = {
  id: string;
  title: string;
  priority: "critical" | string; // other priority levels TBD
  target_domain: string;
  deadline: string;
  resolved_at: string | null;
  directive: string;
  all_subtasks: Subtask[];
  resolved_subtasks: Subtask[];
};

type Subtask = {
  id: string;
  title: string;
  is_done: boolean;
};
```

The `QueryClient` is provided at the root layout (`src/app/_layout.tsx`).

## Components

- **`TaskCard`** — the mission card shown in lists.
- **`Logo`** — the Missions logo mark.
- **`Hr`** — a horizontal divider in the app's bold style.
- **`Icons`** — hand-built icon set: `Edit`, `Delete`, `Back`, `Calendar`, `Clock`, `Checked`, `Unchecked`, `SubtaskDone`, `SubtaskPending`, `Check`, `DeleteBorderless`, `EditBorderless`.

All icons accept a `size` prop and are drawn as components, so they stay crisp at any scale.

## Design system

Missions has a distinctive **neo-brutalist** look:

- **Sharp corners** everywhere — `borderWidth` of 2–4, never rounded.
- **Hard shadows** — solid black, offset 1–4px, `shadowRadius: 0`.
- **Palette**:
  - Sky blue `#8AD8FF` — primary actions / neutral-highlight
  - Critical red `#FF6B4A` — critical priority
  - Lavender `#D4B5FF` — target domain tags
  - Green `#10B981` — progress fill
  - Sand `#E7E5DF` — card backgrounds
  - Off-white `#EFF2F4` — inactive tab bar
- **Typography** — the Outfit family at every weight (Regular → Black), loaded once in the root layout.
- **Responsive sizing** — always use `msC(n)` instead of raw numbers so sizes scale predictably.

## Roadmap

Because this is a WIP, expect the following to land over time:

- [ ] Replace placeholder data in `useMissions` with a real API / local persistence.
- [ ] Implement the `/newTask` screen (mission + subtask creation).
- [ ] Wire up **Mark resolved**, **Edit**, and **Delete** actions on mission details.
- [ ] Use each mission's real `deadline` instead of the hardcoded date/time card.
- [ ] Make subtasks toggleable from the details screen.
- [ ] Add authentication / profile handling (the avatar is currently a static image).
- [ ] Set up unit tests (Jest) and ESLint.

## Learn more

To learn more about the tools used here:

- [Expo documentation](https://docs.expo.dev/) — fundamentals and [advanced guides](https://docs.expo.dev/guides).
- [Expo Router docs](https://docs.expo.dev/router/introduction/) — file-based routing.
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/) — step-by-step walkthrough for Android, iOS, and web.
- [TanStack Query docs](https://tanstack.com/query/latest).
- [react-native-size-matters](https://github.com/nirsky/react-native-size-matters).
- ["Using ESLint and Prettier"](https://docs.expo.dev/guides/using-eslint/) and ["Unit Testing with Jest"](https://docs.expo.dev/develop/unit-testing/) guides.

## Join the community

- [Expo on GitHub](https://github.com/expo/expo) — view the open-source platform and contribute.
- [Discord community](https://chat.expo.dev) — chat with Expo developers and ask questions.
