# 🎼 Dual Module Architecture Plan: React Native Mobile App & Supabase Realtime Chat (docs/PLAN.md)

**Goal:** Build a cross-platform React Native (Expo) mobile application (`mobile-app/`) for teachers and nurses on iOS/Android, and integrate a Supabase Realtime Instant Parent-Teacher Chat & Photo Sharing Module (`ChatModule`) across both web and mobile platforms.

---

## 📐 Architecture & Components

```
[ KinderLog & CareLog Enterprise Ecosystem ]
                      │
        ┌─────────────┴─────────────┐
        ▼                           ▼
[ Next.js / Web App ]       [ React Native (Expo) Mobile ]
  ├── Landing Page            ├── Teacher Log Screen
  ├── SaaS Dashboard          ├── Nurse Vitals Screen
  └── Realtime Chat           └── Realtime Chat Screen
        │                           │
        └─────────────┬─────────────┘
                      ▼
       [ Supabase Realtime Engine ]
        ├── Broadcast Channel: chat-room-102
        ├── Realtime Table Subscriptions
        └── Instant Photo Sharing
```

---

## 📱 Module 1: React Native (Expo) Mobile App (`mobile-app/`)

- **Structure:**
  - `mobile-app/App.tsx`: Navigation Container & Multi-Role Tab Switcher.
  - `mobile-app/src/screens/TeacherLogScreen.tsx`: Touch-first 2-tap finding logger for teachers (Meal, Nap, Activity, Med).
  - `mobile-app/src/screens/NurseVitalsScreen.tsx`: Nurse vitals recording interface (Blood Pressure, Pulse, Sugar, Temp).
  - `mobile-app/src/screens/ChatScreen.tsx`: Mobile chat interface with instant message bubbles and photo upload preview.
  - `mobile-app/package.json`: Expo SDK 50 configuration with `@supabase/supabase-js`.

---

## 💬 Module 2: Supabase Realtime Instant Chat (`src/lib/chatRealtime.ts` & `src/components/ChatModule.tsx`)

- **Realtime Channel Subscription:**
  - Room Topic: `room:102-mila-yilmaz`.
  - Broadcast Events: `NEW_MESSAGE`, `READ_RECEIPT`, `PHOTO_ATTACHMENT`.
- **Features:**
  - Real-time message broadcasting without page refresh (< 50ms latency).
  - Parent <-> Teacher instant messaging thread.
  - Interactive Web Chat Widget integrated into the SaaS Workspace (`#role-workspace-ogretmen` & `#role-workspace-veli`).

---

## 🤖 Planned Agent Roles & Execution Steps

| Step | Agent | Focus Area | Deliverable |
|---|---|---|---|
| 1 | `project-planner` | Plan definition & Socratic approval | `docs/PLAN.md` |
| 2 | `mobile-developer` | React Native Expo mobile app structure | `mobile-app/App.tsx` & Mobile Screens |
| 3 | `backend-specialist` | Supabase Realtime messaging channel | `src/lib/chatRealtime.ts` |
| 4 | `frontend-specialist` | Web Chat UI widget & SaaS Dashboard binding | `src/components/landing-page.html` |
| 5 | `test-engineer` | Mobile & Realtime Chat E2E Validation | `scratch/test_mobile_and_chat.js` & `checklist.py` (6/6 PASSED) |

---

## 📋 Checklist

- [ ] React Native Expo mobile application structure created in `mobile-app/`.
- [ ] Mobile screens for Teacher Log, Nurse Vitals, and Chat created.
- [ ] Supabase Realtime messaging handler created (`src/lib/chatRealtime.ts`).
- [ ] Real-time Chat Widget integrated into Web SaaS Dashboard in `landing-page.html`.
- [ ] E2E test script `scratch/test_mobile_and_chat.js` passing 100%.
- [ ] `python .agent/scripts/checklist.py .` returns 6/6 PASSED ✨.
