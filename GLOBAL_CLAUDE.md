# Global CLAUDE.md — Moataz / InfoTraff

> **Install**: copy this file to `~/.claude/CLAUDE.md` on any machine (or the
> global memory location of whatever Claude surface you use). It applies to
> EVERY repo/session. Per-repo `CLAUDE.md` files add project specifics and
> always win on conflict.

## Who you're working for

- Owner: Moataz (info@infotraff.org). Repos span computer-vision/traffic
  systems (ANPR, people counting, YOLO training pipelines), WhatsApp bots,
  dashboards (Streamlit/React), and small APIs. Python/FastAPI is the most
  common stack; deploys are usually **Railway** (auto-deploy from `main`) or
  edge devices (Raspberry Pi / Edge TPU).
- He communicates TERSELY and often via voice-of-the-customer phrasing.
  Read requests literally, then confirm scope by restating in one line.
  Explain plans and behavior **by example** (a sample message, a sample
  flow), not by abstract description.

## Non-negotiable working rules

1. **Find the root cause before fixing.** Never patch a symptom. When
   something "isn't working", check the app's own debug/trace surfaces
   FIRST (event logs, `/events`-style endpoints, Railway logs) before
   touching code.
2. **Every bug fix ships with the test/eval that would have caught it — in
   the same commit.** If the project has an eval suite for AI behavior, a
   classification bug fix without a new eval case is an incomplete fix.
3. **Verify by measurement, not preference.** Model choices, prompt changes,
   performance claims — run the comparison (eval suite, timing, cost) and
   state the numbers. If you can't measure it, say so.
4. **Docs self-sync.** If a repo has a `CLAUDE.md`, update it (and README
   examples) in the SAME commit as any flow/behavior change. A new session
   must be current after reading `CLAUDE.md` alone.
5. **Respect "declined features" lists.** If a `CLAUDE.md` says a feature
   was declined or is dormant, do NOT rebuild, enable, or re-suggest it
   unless explicitly asked. Deliberate product decisions are not bugs.
6. **Never add user-facing noise.** Alerts, pings, reminders, and messages
   to real people are a scarce budget. Default to silent recording; ask
   before adding ANY new proactive notification.
7. **Secrets live in the deploy platform's variables (Railway → Variables),
   never in code, files, commits, or test fixtures.** If a key is needed
   locally, read it from the environment.
8. **Watch AI spend.** Prefer: cheap-model gates before expensive
   classifiers; prompt caching (keep cached prefixes above the model's
   caching minimum); retrieval-shaped context (index + focused detail)
   instead of dumping whole datasets; de-duplication before any paid call;
   single-pass over multi-pass unless measured to matter.
9. **Persistence discipline.** In-memory state dies on redeploy. Anything
   that must survive (evidence, registers, auth state) goes on the volume /
   database. When adding fields to persisted dataclasses, give them
   defaults so old snapshots restore cleanly.
10. **External-facing links must cache-bust** when their content changes
    (WhatsApp and similar clients cache unchanging URLs — version the URL).

## How to execute tasks (process for every session)

- **Before editing**: read the repo's `CLAUDE.md` fully, then read the
  actual files you'll change. Never edit from memory of a summary.
- **Plan in one short list** for anything multi-step; for simple asks just
  do it. Don't present option menus — pick the best option and say why in
  one line.
- **After editing**: run the project's checks (evals, flow tests, linters).
  If the repo documents a testing pattern, follow it exactly. Report real
  results ("28/28") — never claim untested code works.
- **Commit style**: small, scoped commits with clear messages describing
  the behavior change and its root cause. Push to the branch you were told;
  never push to `main` of an auto-deploying repo without being asked —
  pushing `main` IS deploying.
- **When blocked or uncertain about a destructive/user-visible action**
  (deleting data, messaging real people, changing prod env vars): stop and
  ask. Everything reversible and internal: proceed.

## Repos without a CLAUDE.md

When doing non-trivial work in a repo that has no `CLAUDE.md`, create one
(ask first if the change seems out of scope) with this structure — hard
rules first, history distilled to invariants:

1. One-paragraph "what this is" + who uses it
2. **HARD RULES** (things that must never regress; declined features)
3. Architecture table (file → role, one line each)
4. Core flow / pipeline, in execution order
5. Deployment & ops facts (platform, env vars, URLs, volumes)
6. Engineering invariants learned from past bugs (one line each: rule +
   why)
7. Compact changelog table
8. Open items / current live state (dated)
9. Testing pattern

## Writing style for CLAUDE.md files (optimize for smaller models)

- Put rules a session must never violate in a numbered **HARD RULES**
  section at the top — never buried in narrative or history tables.
- State each fact ONCE, in the section where it's acted on. Duplication
  drifts; drift misleads.
- Prefer short imperative bullets over prose paragraphs. Bold the
  load-bearing words (ONE ping, FAILS OPEN, NEVER).
- Convert war stories into one-line invariants ("rule — because X broke").
  Full history belongs in git, not in the working context.
- Keep exact identifiers inline (env var names, phone numbers, endpoints,
  function names) — a smaller model should never have to guess a name.
- Date anything that describes live state ("as of YYYY-MM-DD").
