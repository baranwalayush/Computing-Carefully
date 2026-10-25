---
title: Lantern
description: A small full-text search engine for static sites, built around an incremental inverted index.
category: Search
year: 2025
featured: false
order: 5
tech: [Rust, WebAssembly, TypeScript]
repo: https://github.com/example/lantern
demo: https://example.com/lantern
---
*This project is a fictional sample. Replace this file with your own write-up.*

## Overview and motivation

Static sites have no server to answer queries, yet readers still expect search. Lantern builds an index at deploy time and ships a compact query engine to the browser.

## Problem statement

A useful client-side search has to stay small, answer in tens of milliseconds, and rebuild quickly when a single page changes.

## Approach and architecture

The build step tokenizes each page, writes postings lists to sharded files, and records a manifest. The browser fetches only the shards that match the query terms.

```rust
pub struct Posting {
    pub doc: u32,
    pub positions: Vec<u16>,
}
```

## Technical decisions and trade-offs

- Sharding by term prefix keeps downloads small but adds a request per prefix.
- Delta-encoded postings shrink the index at the cost of a slightly slower decode.
- Stemming is optional, because it helps recall and hurts precision for technical terms.

## Implementation details

Ranking uses BM25 with the usual parameters $k_1 = 1.2$ and $b = 0.75$:

$$
\mathrm{score}(D,Q)=\sum_{q\in Q}\mathrm{IDF}(q)\cdot\frac{f(q,D)\,(k_1+1)}{f(q,D)+k_1\left(1-b+b\,\frac{|D|}{\mathrm{avgdl}}\right)}
$$

## Results and limitations

On the sample corpus, queries resolved from cached shards without further network requests. These numbers are illustrative only, since no real benchmark was run for this placeholder. Phrase queries and fuzzy matching are not supported.
