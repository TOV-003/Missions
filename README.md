# Missions 🚀

**Missions** is a task management app built with [Expo](https://expo.dev), React Native, and TypeScript. It lets you organize your work into missions, break them down into a chain of subtasks, and track progress at a glance — on Android, iOS, and the web.

> ⚠️ **Work in progress.** Missions is under active development. Everything persists locally in SQLite — there is no backend, no account, and no network traffic. Restoring a backup and reminder notifications are not implemented yet; whatever is missing is called out below.

## Table of contents

- [Tech stack](#tech-stack)
- [Get started](#get-started)
- [Project structure](#project-structure)
- [Screens](#screens)
- [Data & persistence](#data--persistence)
- [Components](#components)
- [Design system](#design-system)
- [Offline & privacy](#offline--privacy)
- [Roadmap](#roadmap)
- [Learn more](#learn-more)

## Tech stack

- **[Expo](https://expo.dev)** with [Expo Router](https://docs.expo.dev/router/introduction/) (file-based routing)
- **[React Native](https://reactnative.dev/)** + **TypeScript**
- **[expo-sqlite](https://docs.expo.dev/versions/latest/sdk/sqlite/)** for local persistence (SQLite + a small key-value store)
- **[TanStack Query](https://tanstack.com/query/latest)** for data fetching and cache invalidation over SQLite
- **[react-native-svg](https://github.com/software-mansion/react-native-svg)** for the hand-built icon set
- **[react-native-size-matters](https://github.com/nirsky/react-native-size-matters)** for responsive scaling via a shared `msC` helper
- **[react-native-gesture-handler](https://docs.swmansion.com/react-native-gesture-handler/)** for swipe actions on mission cards
- **[react-native-keyboard-controller](https://github.com/kirillzyusko/react-native-keyboard-controller)** for the new-mission form
- **expo-device** / **expo-constants** for the device and app information on the settings screen
- **expo-sharing** / **expo-file-system** for exporting the database file
- **[Outfit](https://fonts.google.com/specimen/Outfit)** font family, loaded through `expo-font` + `expo-splash-screen`

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

   `expo-sharing` and `expo-file-system` are already declared in `package.json`; they power the database export.

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
assets/                       # Fonts (Outfit-*.ttf), images, icons, splash
src/
├── app/                      # Expo Router routes (file-based)
│   ├── _layout.tsx           # Root layout: fonts, SQLiteProvider, QueryClient, tab bar
│   ├── index.tsx             # Welcome / splash screen (exports the msC helper)
│   ├── settings.tsx          # Offline settings: backup, device info, DB snapshot
│   ├── newTask.tsx           # New mission form
│   └── Tasks/
│       ├── _layout.tsx       # Stack for the Tasks tab (headerless)
│       ├── index.tsx         # Mission list with today / resolved / pending tabs
│       └── [id]/
│           ├── index.tsx     # Mission details
│           └── edit.tsx      # Edit a mission
├── api/
│   ├── api.ts                # All mission/subtask/commitment queries and mutations
│   └── settings.ts           # Database statistics for the settings screen
├── database/
│   └── database.ts           # Schema creation + PRAGMAs (runs on first open)
├── hooks/
│   ├── useMissions.tsx       # TanStack Query hooks for missions
│   └── useSettings.tsx       # Stats, last-backup timestamp, backup mutation
├── utils/
│   └── backup.ts             # Serialize the DB and hand it to the OS
└── components/               # Shared UI: TaskCard, Icons, Logo, Hr, LoaderDots, interfaces
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
- **Swipe actions** — swipe left on a pending mission to delete it, swipe right to commit it to today; on today's list, swipe left to remove it.
- **Empty states** — friendly messages when there are no committed, resolved, or pending missions.
- **Settings button** — the square gear in the header opens `/settings`.

Data comes from `useMissions()`, which returns `dailyMissionsWithSubtasks`, `resolvedMissionsWithSubtasks`, and `missionsWithSubtasks`.

### `/Tasks/[id]` — Mission details

Shows a single mission:

- Header with back button, "MISSION DETAILS" title, and edit / delete actions.
- Summary card: priority badge, target domain badge, completion percentage, title, and a progress bar.
- **Directive** card — the mission's description.
- **Date** and **Time** cards built from the mission's real `deadline`.
- **Subtask chain** — every subtask with a done/pending icon and "resolved X of Y" counter; subtasks are tappable and persist immediately.
- Action buttons — **Mark task resolved**, **Edit task**, and **Delete task**.

Resolved missions are read-only: the edit and delete controls disappear and subtasks can no longer be toggled.

### `/Tasks/[id]/edit` — Edit mission

Same form as `/newTask`, prefilled from the existing mission. The target domain, priority, deadline, and the subtask list (rename, add up to four, remove) can change; the mission title and directive are fixed after creation. Opening the screen for a resolved mission redirects straight back to its details.

### `/newTask` — New mission

A full form: title, directive, target domain, priority, deadline (date + time inputs), a 60-minute reminder toggle, and up to four subtasks. Validation covers missing fields, an invalid date/time, and deadlines in the past. On success the form clears and the app navigates back to `/Tasks`.

### `/settings` — Settings

Reachable from the gear button on both `/Tasks` and `/newTask`, and not present in the tab bar.

- **Data & backup** — exports the SQLite file. The database is serialized, then handed to the OS share sheet so you choose the folder (Files, Drive, Downloads, …). On web it falls back to a normal browser download. The button is disabled while the app checks the database, when the database is empty, and while a backup is running. The last backup time is stored locally and shown in the card.
- **Device & app** — app name, version, Expo SDK, execution environment, platform, manufacturer, model, OS, device type, and real-device vs simulator.
- **Database snapshot** — mission, subtask, and commitment counts plus an approximate database size.
- **About** — name, version, a short description, and the offline note.

## Data & persistence

Everything lives in a single SQLite database (`app.db`) opened once in the root layout with `SQLiteProvider`. `src/database/database.ts` creates the schema on first launch with WAL journaling and foreign keys enabled:

- `missions` — id, title, directive, target_domain, priority, deadline, notify_60_min, created_at, resolved_at
- `subtasks` — id, mission_id → missions (cascade delete), title, position, is_done
- `daily_commitments` — id, mission_id → missions (cascade delete), committed_at

### API layer

```ts
// src/api/api.ts
getMissions(db); // → { missionsWithSubtasks, dailyMissionsWithSubtasks, resolvedMissionsWithSubtasks }
getMission(db, id);
createMission(db, missionData, subtaskTitles);
updateMission(db, id, missionData, subtaskData);
deleteMission(db, id);
resolveMission(db, id);
setSubtaskDone(db, subtaskId, missionId, isDone);
commitMission(db, missionId);
removeDailyCommitment(db, missionId);
```

Mutations reject when they touch a resolved mission — resolved missions are read-only at the query layer, not just in the UI.

### Hooks

```ts
const { data, isPending, error } = useMissions();
```

- `useMissions`, `useMission` — list and detail queries
- `useCreateMission`, `useUpdateMission`, `useDeleteMission`, `useResolveMission` — mission mutations
- `useCommitMission`, `useRemoveDailyCommitment`, `useSetSubtaskDone` — today/subtask mutations
- `useAppStats`, `useLastLocalBackup`, `useLocalBackup` — settings screen

All mutations invalidate the relevant `["tasks"]` queries; the settings screen lives under its own `["settings"]` keys.

Shapes:

```ts
type TaskCardProps = {
  id: string;
  title: string;
  priority: "low" | "medium" | "critical";
  target_domain: string;
  deadline: string;
  resolved_at: string | null;
  all_subtasks: Subtask[];
  resolved_subtasks: Subtask[];
};

type Subtask = {
  id: string;
  mission_id: string;
  title: string;
  position: number;
  is_done: boolean;
};

type Mission = {
  id: string;
  title: string;
  directive: string;
  target_domain: Domain;
  priority: Priority;
  deadline: string;
  notify_60_min: boolean;
  created_at: string;
  resolved_at: string | null;
};
```

### Backups

`src/utils/backup.ts` reads the database with `db.serializeAsync()`, names the file `missions-backup-YYYY-MM-DD_HH-mm-ss.db`, and then:

- **Android / iOS** — writes it to the cache directory and opens `expo-sharing`'s save sheet, so you pick the destination. Dismissing the sheet is not an error.
- **Web** — triggers a Blob download.

The timestamp is stored under `lastLocalBackupAt` in the key-value store that ships with `expo-sqlite`. Restoring a backup is not implemented.

## Components

- **`TaskCard`** — the mission card shown in lists.
- **`Logo`** — the Missions logo mark.
- **`Hr`** — a horizontal divider in the app's bold style.
- **`LoaderDots`** — the animated "Loading Missions…" state.
- **`Icons`** — hand-built icon set: `Edit`, `Delete`, `Back`, `Calendar`, `Clock`, `Checked`, `Unchecked`, `SubtaskDone`, `SubtaskPending`, `Check`, `DeleteBorderless`, `EditBorderless`, `Bell`, `Bolt`, `Yes`, `No`, `Settings`, `Database`, `Device`, `Info`.

All icons accept a `size` prop and are drawn as components, so they stay crisp at any scale.

## Design system

Missions has a distinctive **neo-brutalist** look:

- **Sharp corners** everywhere — `borderWidth` of 2–4, never rounded.
- **Hard shadows** — solid black, offset 1–4px, `shadowRadius: 0`.
- **Palette**:
  - Sky blue `#8AD8FF` — primary actions / neutral-highlight
  - Critical red `#FF6B4A` — critical priority and errors
  - Lavender `#D4B5FF` — target domain tags and secondary actions
  - Green `#10B981` — progress fill and success banners
  - Sand `#E7E5DF` — card backgrounds and disabled buttons
  - Off-white `#EFF2F4` — inactive tab bar
- **Typography** — the Outfit family at every weight (ExtraLight → Black), loaded once in the root layout.
- **Responsive sizing** — always use `msC(n)` instead of raw numbers so sizes scale predictably.

## Offline & privacy

Missions makes no network requests. There is no account, no sync, and no telemetry. Data lives in the app's SQLite database until you export it, and an export only goes where you send it in the share sheet.

## Roadmap

- [ ] Restore / import a backup file.
- [ ] Schedule real notifications for the `notify_60_min` flag.
- [ ] Recurring missions and mission archiving.
- [ ] Set up unit tests (Jest) and ESLint.
- [ ] Accessibility pass on swipe actions and the settings form controls.

## Learn more

To learn more about the tools used here:

- [Expo documentation](https://docs.expo.dev/) — fundamentals and [advanced guides](https://docs.expo.dev/guides).
- [Expo Router docs](https://docs.expo.dev/router/introduction/) — file-based routing.
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/) — step-by-step walkthrough for Android, iOS, and web.
- [expo-sqlite docs](https://docs.expo.dev/versions/latest/sdk/sqlite/).
- [TanStack Query docs](https://tanstack.com/query/latest).
- [react-native-size-matters](https://github.com/nirsky/react-native-size-matters).
- ["Using ESLint and Prettier"](https://docs.expo.dev/guides/using-eslint/) and ["Unit Testing with Jest"](https://docs.expo.dev/develop/unit-testing/) guides.

## Join the community

- [Expo on GitHub](https://github.com/expo/expo) — view the open-source platform and contribute.
- [Discord community](https://chat.expo.dev) — chat with Expo developers and ask questions.
