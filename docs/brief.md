# DataGrid 100k: Brief

> Status: decided 2026-11-10. All numbers are goals, not measurements.

## Problem and target user

Operations analysts who work in internal admin panels and back-office tools need to scan, sort, filter and export large datasets, such as 100,000 orders, without leaving the browser. Naive tables render every row, so the tab freezes on load and locks up again on each sort, filter or export, which pushes analysts into exporting to spreadsheets just to get their work done. DataGrid 100k keeps a 100,000-row table usable in the browser, and here "fast" means: the first rows are interactive within 1 s of the data being available, scrolling holds about 60 fps, every sort, filter or keystroke gets visible feedback within 100 ms, and no sort, filter or export creates a main-thread task longer than 50 ms.

## MVP scope

- Render and scroll 100,000 rows smoothly, with row virtualisation and a sticky header
- Accessible grid: correct ARIA, full keyboard navigation, visible focus
- Sort, global search and per-column filters running in a Web Worker, with stale jobs cancelled
- Filters and sort stored in the URL
- Column resize, reorder, pin and hide, with the layout saved to localStorage
- Row selection: single, shift-range and select all filtered
- CSV and Excel export in a Web Worker, with progress and cancel
- CSV import with validation and an error report
- Performance page comparing the naive and optimised tables, using measured numbers
- Responsive layout down to tablet width

## Not doing

1. Grouping and aggregation
2. Inline cell editing
3. Server-side data mode or a backend
4. Saved views
5. Phone layouts
6. Real-time or streaming data updates
7. Tree data and expandable row details
8. Charts or pivot tables over the data, apart from the performance page
9. Login, users or permissions
10. Publishing the grid as an npm package with a public API
11. Column virtualisation (12 columns don't need it)

## Cut first if time runs short

In this order: CSV import, Excel export, column reorder.

## Performance targets

> These are goals until measured. If the M2 baseline shows a target is unrealistic, change it openly and record why. Published results must come from the benchmark harness (M2-3), with the method recorded in `docs/metrics.md`.

**Test conditions:** production build, 100,000 rows from the seeded generator, stable Chrome driven by Playwright, 4x CPU throttling, on one named machine recorded with the results.

| Metric | Target |
|---|---|
| Initial render | First rows interactive within 1 s of the data being available (data generation excluded) |
| Scroll | Average at least 58 fps, 95th percentile frame time at most 20 ms, during a scripted scroll |
| Sort | Sorted rows on screen within 500 ms |
| Filter and search | Filtered rows on screen within 200 ms of the last keystroke; visible feedback within 100 ms |
| Export | CSV within 3 s, Excel within 10 s |
| UI responsiveness | No main-thread task over 50 ms during sort, filter or export |
| Bundle size | Main JS at most 150 kB gzipped, with the Excel library lazy-loaded outside it |
| Lighthouse | Performance at least 90, Accessibility 100, Best Practices 100 |

## Dataset shape

> One row is one customer order, in a single currency. All values are synthetic, from the seeded generator (M2-1), so no real personal data is used. Null values sort last.

| # | Column | Kind | Stored as | Notes |
|---|---|---|---|---|
| 1 | `orderNumber` | Text, unique | `string` | Row ID, such as `ORD-0000001` |
| 2 | `customerName` | Text | `string` | Tests search and locale-aware sort |
| 3 | `customerEmail` | Text | `string` | Derived from the name |
| 4 | `product` | Text | `string` | Tests search over longer text |
| 5 | `category` | Enum, about 12 values | `string` union | Per-column filter |
| 6 | `country` | Enum, about 30 values | `string` union | Per-column filter |
| 7 | `status` | Enum: `pending`, `paid`, `shipped`, `delivered`, `cancelled`, `refunded` | `string` union | Per-column filter |
| 8 | `quantity` | Integer | `number` | 1 to 20 |
| 9 | `unitPriceCents` | Money | `number` | Integer cents, to avoid float errors |
| 10 | `totalCents` | Money | `number` | `quantity * unitPriceCents` |
| 11 | `orderedAt` | Date | `number` | Epoch ms, for fast sort and compact transfer |
| 12 | `shippedAt` | Date, nullable | `number \| null` | `null` unless `status` is `shipped` or `delivered`; tests null sorting |
