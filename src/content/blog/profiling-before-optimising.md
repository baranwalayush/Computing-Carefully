---
title: Profile before you optimise
description: A short engineering note on finding the real bottleneck in a slow build step.
pubDate: 2026-07-18
category: Engineering Notes
tags: [performance, tooling]
draft: true
relatedProject: lantern-search
---
*Fictional sample article.*

A build step took forty seconds and everyone had a theory. Nobody had a profile.

## Measure first

```bash
node --cpu-prof build.js
```

The profile showed most of the time in repeated Markdown parsing, not in the image step everyone suspected.

## The fix

Cache parsed documents by content hash. Only changed files are parsed again.

```ts
const cache = new Map<string, Doc>();
export function parse(src: string): Doc {
  const key = hash(src);
  return cache.get(key) ?? (cache.set(key, doParse(src)), cache.get(key)!);
}
```

## Takeaway

Write down the hypothesis, measure, then change one thing. The number you record is the one that counts.
