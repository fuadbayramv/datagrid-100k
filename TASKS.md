# DataGrid 100k: Tasks

**Sizes:** S ≈ 1–2 h · M ≈ half a day

**How this works:** Fuad takes the next unticked task and builds it. Claude runs the project, reviews finished work and ticks it off. Background: `docs/brief.md` and `docs/adr/`.

## Current status

- **Milestone:** M1 Foundation
- **Next task:** M1-1
- **Last updated:** 2026-11-10

---

## M0: Plan

- [x] **M0-1** Problem, target user, MVP scope, "Not doing" list, performance targets, dataset shape in `docs/brief.md` (PM, 2026-11-10)
- [x] **M0-2** ADR-001, ADR-002, ADR-003 in `docs/adr/` (PM, 2026-11-10)

## M1: Foundation

**Goal:** a clean repo where quality checks run from day one.

- [ ] **M1-1** Create git repo and Vite app with bun, React 19, strict TypeScript and a folder structure (S)
  - Done when: `bun run dev` and `bun run build` work, `strict` is on, and the first conventional commit is made
- [x] **M1-2** Set up Biome and Vitest (S) (2026-11-10)
  - Done when: lint and one passing unit test run from bun scripts
- [x] **M1-3** Set up Playwright with axe (S) (2026-11-10)
  - Done when: one e2e test with an axe check passes
- [ ] **M1-4** Tailwind CSS, shadcn/ui and light/dark theme (S)
  - Done when: the theme toggle works, is keyboard-usable and respects the system preference
- [ ] **M1-5** TanStack Router with typed routes for grid and performance pages (S)
  - Done when: both routes load and are code-split
- [ ] **M1-6** GitHub Actions CI: typecheck, lint, unit, e2e (M)
  - Done when: CI is green on a pull request
- [ ] **M1-7** Bundle-size budget in CI (S)
  - Done when: CI fails if main JS exceeds 150 kB gzipped
- [ ] **M1-8** Add MIT licence and deploy the empty app to Cloudflare (S)
  - Done when: a public URL serves the app and pushes to main deploy it

## M2: Data and baseline

**Goal:** real data and a measured slow starting point.

- [ ] **M2-1** Seeded order generator for 10k / 100k / 500k rows, typed per the brief, with unit tests (M)
  - Done when: same seed gives identical data, nullable `shippedAt` follows the brief, and generation time is logged
- [ ] **M2-2** Naive table that renders all rows with plain `map` (S)
  - Done when: the 100k table renders on its own route
- [ ] **M2-3** Benchmark harness for render time, time to interactive and scroll FPS (M)
  - Done when: one command outputs repeatable numbers under the brief's test conditions, and the method is in `docs/metrics.md`
- [ ] **M2-4** Record naive table baseline (S)
  - Done when: numbers and the named machine are in `docs/metrics.md`, and targets are revisited

## M3: Fast grid core

**Goal:** 100k rows render and scroll smoothly.

- [ ] **M3-1** TanStack Table with typed columns and cell formatting (M)
  - Done when: all 12 columns render with money and dates formatted, no `any`
- [ ] **M3-2** Row virtualisation with TanStack Virtual (M)
  - Done when: 100k rows scroll with only visible rows plus overscan in the DOM
- [ ] **M3-3** Sticky header and grid semantics (M)
  - Done when: `role="grid"`, `aria-rowcount`, `aria-rowindex` and `aria-colindex` are correct, axe passes
- [ ] **M3-4** Keyboard navigation with arrow keys and a roving active cell (M)
  - Done when: arrows move a visible focus and scroll the active cell into view
- [ ] **M3-5** Home/End, Page Up/Down, and focus kept across virtualised rows (M)
  - Done when: focus survives scrolling away and back; Playwright covers it
- [ ] **M3-6** Measure against baseline (S)
  - Done when: render and scroll numbers are in `docs/metrics.md`

## M4: Sort, filter, search

**Goal:** heavy operations never block the UI. See ADR-003.

- [ ] **M4-1** Main-thread sort with nulls last (S)
  - Done when: every column sorts, covered by unit tests
- [ ] **M4-2** Main-thread global search and per-column filters (M)
  - Done when: filters combine correctly, covered by unit tests
- [ ] **M4-3** Measure main-thread sort and filter on 100k rows (S)
  - Done when: numbers are in `docs/metrics.md`
- [ ] **M4-4** Data worker: typed message protocol, generation, one-time row copy (M)
  - Done when: rows reach the main thread from the worker with no `any` in the protocol
- [ ] **M4-5** Move sort and filter to the worker, returning a transferred `Uint32Array` (M)
  - Done when: the grid renders by index array and main-thread sort and filter logic is gone
- [ ] **M4-6** Latest-request-wins with request IDs and chunked filtering (M)
  - Done when: fast typing never shows a stale result, covered by a test
- [ ] **M4-7** Sync sort and filters to URL search params (M)
  - Done when: reload and shared links restore the view, and search updates are debounced
- [ ] **M4-8** Measure worker vs main thread (S)
  - Done when: times and long-task counts are in `docs/metrics.md`

## M5: Column features and selection

- [ ] **M5-1** Column resize, with keyboard support (M)
  - Done when: dragging doesn't re-render rows
- [ ] **M5-2** Column pin and hide, with a column menu (M)
  - Done when: both work by keyboard and pinned columns stay sticky
- [ ] **M5-3** Persist column layout with Zustand `persist` (S)
  - Done when: layout survives reload
- [ ] **M5-4** Row selection: single, shift-range, select all filtered (M)
  - Done when: select all is instant on 100k rows, covered by unit tests
- [ ] **M5-5** Column reorder with keyboard alternative (M) *(cut third)*
  - Done when: reorder works by mouse and keyboard and persists

## M6: Import and export

- [ ] **M6-1** CSV export in the worker with progress and cancel (M)
  - Done when: exports the current filtered order, values are correctly escaped, cancel stops it
- [ ] **M6-2** Measure CSV export (S)
  - Done when: time and long-task count for 100k rows are in `docs/metrics.md`
- [ ] **M6-3** Excel export in the worker, library lazy-loaded (M) *(cut second)*
  - Done when: a valid file opens in Excel, main bundle stays under budget
- [ ] **M6-4** CSV import with validation and error report (M) *(cut first)*
  - Done when: invalid rows are reported with row number and reason

## M7: Performance page

- [ ] **M7-1** Page comparing naive and optimised tables on the same data (M)
  - Done when: both can be run from the page with the method linked
- [ ] **M7-2** Before/after charts from `docs/metrics.md` (M)
  - Done when: every number traces to a recorded measurement and charts have text alternatives

## M8: Polish and quality

- [ ] **M8-1** Empty, loading and error states (S)
  - Done when: each state is visible and tested, including worker failure
- [ ] **M8-2** Responsive layout down to tablet width (M)
  - Done when: usable at 768 px with no page-level horizontal overflow
- [ ] **M8-3** Fix findings from the accessibility audit, run by PM (M)
  - Done when: axe is clean, screen reader pass is done, contrast and `prefers-reduced-motion` are verified
- [ ] **M8-4** Playwright e2e: load, scroll, sort, filter, export (M)
  - Done when: all pass in CI
- [ ] **M8-5** Run final Lighthouse and bundle measurements (S)
  - Done when: numbers are in `docs/metrics.md`

## M9: Launch

- [ ] **M9-1** Record demo GIF and supply the deployed URL (S)
  - Done when: GIF is in the repo; PM then writes the README and case study from `docs/metrics.md`
- [ ] **M9-2** Review README and case study written by PM (S)
  - Done when: Fuad approves both
- [ ] **M9-3** Make repo public and pin it (S)
  - Done when: no secrets, repo is public and pinned
- [ ] **M9-4** Add project card to portfolio and a line to CV (S)
  - Done when: both are live

---

## Backlog (not in MVP)

- Grouping and aggregation
- Inline cell editing
- Server-side data mode
- Saved views
- Column virtualisation for wide tables
- Article: "How I rendered 100k rows at 60fps"

## Decisions log

| Date | Decision | ADR |
|---|---|---|
| 2026-11-10 | Vite SPA with TanStack Router | [001](docs/adr/001-vite-spa.md) |
| 2026-11-10 | One owner per kind of state; Zustand as the store | [002](docs/adr/002-state-ownership.md) |
| 2026-11-10 | One data worker; rows on both threads; results as transferred index arrays | [003](docs/adr/003-web-worker-strategy.md) |

## Notes

- Cut first if short on time: CSV import, Excel export, column reorder.
- Performance targets in the brief are goals until measured.
- Setup done by Claude on request, 2026-11-10: Vite + TanStack Router scaffold, shadcn preset `b1GKwKNAu`, Biome, Vitest, Playwright + axe, Zustand, TanStack Table + Virtual, CI workflow, bundle check, MIT licence, Cloudflare static config. Local checks pass. Not committed or pushed; CI and deploy have not run.
