# ADR-001: Vite SPA with TanStack Router

- **Status:** Accepted
- **Date:** 2026-11-10

## Context

DataGrid 100k works on 100,000 rows generated in the browser. Sort, filter and export run in a Web Worker. There is no backend, login or per-user data, and the app deploys to Cloudflare. The choice affects bundle size, deployment and how clearly the performance numbers can be explained.

## Options

- **A. Vite SPA with TanStack Router.** Matches the client-only data flow, deploys as static files and bundles Web Workers directly. There is no server-rendered HTML, so the shell's first paint waits for JS.
- **B. TanStack Start with SSR.** Gives a server-rendered shell, but the grid can't benefit because its data exists only in the browser. Adds a server runtime and hydration work.
- **C. TanStack Start in SPA or prerender mode.** Keeps the framework while using little of what it offers.

## Decision

Option A. Nothing in the MVP needs a server, and tight scope is part of the quality bar.

## Consequences

- The app deploys as static assets on Cloudflare, with no server functions.
- The shell depends on the JS bundle, so the 150 kB budget matters and routes are code-split.
- The project shows less TanStack Start experience. It is a deliberate trade, and the case study should say so.
- A future server-side data mode would reopen this decision.
