# UW–Madison Geo Quiz

One-time 5-question geography quiz built with **Next.js + TypeScript + Leaflet/OpenStreetMap**.

## Features

- 5 local UW–Madison location questions in a TypeScript data file.
- One question shown at a time.
- Tap/click map to place a guess.
- Submit calculates distance with the Haversine formula.
- Per-question score out of 1000 (max total 5000).
- After each question: shows answer, your guess, distance (ft/mi), and points.
- Final score screen with **Play again** and **Copy/share result**.
- Mobile-friendly responsive layout.

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Start dev server:

```bash
npm run dev
```

3. Open <http://localhost:3000>.

## Production build

```bash
npm run build
npm run start
```

## Deploy to Vercel

1. Push this repository to GitHub.
2. In Vercel, click **Add New Project** and import the repo.
3. Framework preset should auto-detect **Next.js**.
4. Leave default build settings.
5. Click **Deploy**.

Vercel docs: <https://vercel.com/docs/frameworks/nextjs>
