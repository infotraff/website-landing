# CLAUDE.md - InfoTraff marketing website (infotraff.org): Replit pnpm monorepo, React landing page + Express contact API

Company landing site for **InfoTraff** (retail footfall / AI analytics), built in a
Replit "artifacts" pnpm-workspace monorepo and deployed to **Vercel** (`vercel.json`
in both deployables, `@vercel/analytics` in the SPA). The real product code lives in
`artifacts/infotraff` (the site) and `artifacts/api-server` (demo-request backend);
everything else is workspace scaffolding.

## HARD RULES

- **Credentials are hardcoded in `.replit`** under `[userenv.shared]` (a GitHub PAT) —
  never copy them into code, docs, or commits; they should be revoked/moved to secrets.
- **pnpm only**: the root `preinstall` script deletes `package-lock.json`/`yarn.lock`
  and exits non-zero for any other package manager.

## Architecture

| Path | Role |
|---|---|
| `artifacts/infotraff/` | **The landing site**: Vite + React 19 + Tailwind 4 + shadcn/Radix UI, wouter routing (only `/` + 404 in `src/pages/`), framer-motion. Page = stacked sections in `src/components/sections/` (Hero, Stats, Solutions, ShopTalk, AiSearch, Contact, FAQ, …) |
| `artifacts/infotraff/vercel.json` | Legacy-path redirects (`/about`, `/blog`, `/privacy-policy`… → `/`) + SPA rewrite to `index.html` |
| `artifacts/api-server/` | Express 5 API. `src/routes/contact.ts` = the only real endpoint; `src/routes/health.ts` = `GET /api/healthz`. `build-vercel.ts` bundles `src/app.ts` → `dist/app.cjs` for the `api/index.js` Vercel function |
| `artifacts/api-server/src/lib/` | `googleSheets.ts` / `resend.ts`: dual-mode clients — Replit connector token (`REPLIT_CONNECTORS_HOSTNAME`) in Replit, else `GOOGLE_SERVICE_ACCOUNT_KEY` / `RESEND_API_KEY` env vars |
| `artifacts/mockup-sandbox/` | Dev-only Vite playground; `mockupPreviewPlugin.ts` auto-generates a module from components dropped in `src/components/mockups/` |
| `lib/api-spec/` | OpenAPI 3.1 spec + Orval config; `pnpm --filter @workspace/api-spec run codegen` regenerates `lib/api-client-react/` (React Query hooks) and `lib/api-zod/` (Zod schemas) — never edit `generated/` by hand |
| `lib/db/` | Drizzle ORM + PostgreSQL scaffold (`DATABASE_URL`); **no tables defined yet** |
| `scripts/` | `@workspace/scripts` package (only `hello.ts`); `post-merge.sh` = Replit post-merge hook (`pnpm install --frozen-lockfile` + db push) |
| `attached_assets/` | Client logos, screenshots, hero images — imported in the SPA via the `@assets` Vite alias |
| `replit.md` | Detailed monorepo/TypeScript conventions doc — read it for workspace mechanics |

## Core flow (demo-request pipeline)

- Visitor submits the form in `sections/Contact.tsx` → `fetch(${VITE_API_URL}/api/contact)`.
- `contact.ts` validates **name, company, email** required (400 otherwise).
- Appends a row to Google Sheet `CONTACT_SPREADSHEET_ID`, tab **"Demo Requests"**.
- Sends two Resend emails: notification to `CONTACT_NOTIFY_EMAIL` (default
  `info@infotraff.org`) + auto-reply to the visitor.
- Sheet and email failures are **logged, never raised** — the endpoint still returns success.

## Running / deployment

- Install: `pnpm install` (root). Typecheck: `pnpm run typecheck` — **always from root**
  (composite project references; `tsc` inside one package fails on unbuilt deps).
- Site dev: `pnpm --filter @workspace/infotraff run dev` (Vite, `PORT` default 3000, `BASE_PATH` sets base).
- API dev: `pnpm --filter @workspace/api-server run dev` — **`PORT` env var is required** (throws without it).
- Build all: `pnpm run build` (typecheck + recursive builds).
- Env var names: `VITE_API_URL` (SPA→API base), `CONTACT_SPREADSHEET_ID`,
  `CONTACT_NOTIFY_EMAIL`, `GOOGLE_SERVICE_ACCOUNT_KEY`, `RESEND_API_KEY`,
  `RESEND_FROM_EMAIL`, `DATABASE_URL`, `PORT`, `BASE_PATH`.
- Deploy: Vercel per artifact (SPA static + serverless API); Replit autoscale config
  also present in `.replit`.

## Gotchas / invariants

- `.replit` `[[artifacts]]` lists only `api-server` and `mockup-sandbox` — the
  `infotraff` artifact was added later and is not registered there.
- Health route is `/api/healthz` in code; `replit.md` says `/api/health` — the doc is stale.
- Dependency versions come from the **pnpm catalog** in `pnpm-workspace.yaml`
  (`"catalog:"` specifiers); platform-specific binaries are mass-excluded via `overrides`.
- `sections/Contact.tsx` breaks if `VITE_API_URL` is unset (fetch to `undefined/api/contact`).
- Google Sheets append silently skips when `CONTACT_SPREADSHEET_ID` is empty (warn log only).
- Redirects in `artifacts/infotraff/vercel.json` cover old site URLs — keep them when
  touching that file or old inbound links 404.

## Status

- As of 2026-07-05: **active** — frequent recent commits are marketing copy/image tweaks
  (hero rotating text, OpenGraph image, Google Analytics, contact info).
- Remote branch `claude/improve-cloud-md-files-rr9qra` exists but carries no commits
  beyond `main`.
- No tests, no CI config; `lib/db` schema and most of the OpenAPI-driven codegen chain
  are scaffolding awaiting real use.
