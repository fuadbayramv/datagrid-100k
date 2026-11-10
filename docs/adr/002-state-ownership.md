# ADR-002: State ownership

- **Status:** Accepted
- **Date:** 2026-11-10

## Context

The grid has shareable view state, saved preferences, fast-changing UI state and a large dataset. Putting them in one place would cause needless re-renders and unclear ownership.

## Options

- **Store library:** Zustand or TanStack Store. Both are small and support selector subscriptions. Zustand includes `persist` middleware, which covers the saved column layout directly.
- **Ownership:** one global store for everything, or one owner for each kind of state.

## Decision

Each kind of state has one owner, and Zustand is the store.

| State | Owner | Why |
|---|---|---|
| Sort, global search, column filters | URL search params, validated by TanStack Router | Shareable and restored on reload |
| Column width, order, pin, visibility | Zustand with `persist` to localStorage | A preference, not part of a shared link |
| Row selection | Zustand, as an "all filtered" flag plus a set of exceptions | Select all stays cheap on 100,000 rows |
| Export progress, worker job status | Zustand | Read by several components |
| Active cell, scroll position | Grid component state | Changes often and is local |
| Sorting and filtering work | Web Worker | See ADR-003 |
| Current row order | Main thread, as a `Uint32Array` of row indexes from the worker | Render needs it synchronously |

TanStack Table is a controlled view: it receives its state from these owners and does not hold a separate copy.

## Consequences

- Links reproduce the view but not column layout or selection.
- Column resize updates must be selector-scoped so that dragging doesn't re-render the rows.
- URL updates for search are debounced to avoid flooding browser history.
