# ADR-003: Web Worker strategy and data transfer

- **Status:** Accepted. The costs below are expected and must be confirmed by measurement in M4-7 and M6-4.
- **Date:** 2026-11-10

## Context

Sorting, filtering and exporting 100,000 rows must not create main-thread tasks over 50 ms. Sending row objects between threads on every query would itself block the main thread. The dataset is mostly strings, and rendering needs row data synchronously while scrolling.

## Options

- **A. Structured clone of rows for every result.** Simplest, but pays the serialisation cost on every query.
- **B. Rows on both threads; results as a transferable `Uint32Array` of row indexes.** Pays the clone cost once at load, and each result is a zero-copy transfer. Uses memory for two copies.
- **C. SharedArrayBuffer.** Avoids the copy for numbers, but strings don't fit without a custom encoding, and it requires COOP and COEP headers.
- **D. Rows only in the worker, paged to the main thread.** Saves memory, but scrolling becomes asynchronous and can show blank rows.

## Decision

Option B, with one data worker.

- The worker generates the dataset and sends one structured-clone copy to the main thread at load.
- A query message carries only sort and filter parameters and a request ID.
- The worker answers with the request ID and a transferred `Uint32Array` of row indexes.
- Latest request wins: the main thread ignores results with an old ID. Filtering runs in chunks and checks for a newer request between chunks. A sort already running cannot be interrupted, so its result is discarded when stale.
- Exports run in the same worker in chunks, yielding between them so that progress and cancel messages get through.

## Consequences

- The dataset is held twice, and memory use should be published with the metrics.
- The one-time clone may be a long main-thread task at load. The 50 ms target doesn't cover load, but the clone is included in the measured load time. If it hurts, send rows in batches.
- A query that arrives during an export waits for the current chunk, so chunk size sets the delay.
- An Excel library may not support chunked writing, which would block queries during an Excel export. Check this when starting that task.
