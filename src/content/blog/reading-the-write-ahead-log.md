---
title: Reading the write-ahead log
description: Notes from reading a storage engine's recovery code, and why fsync placement matters.
pubDate: 2026-08-30
category: Learning Notes
tags: [databases, storage]
series: Database internals
draft: true
---
*Fictional sample article.*

I spent a week reading how a small storage engine recovers after a crash. These are my notes, not an authority.

## Why a log

Updating a page in place is not atomic. A write-ahead log records the intent first, so recovery can replay or discard half-finished work.

## The order of operations

1. Append the record to the log buffer.
2. Flush the log to disk.
3. Acknowledge the commit.
4. Write dirty pages later, in the background.

```go
func (w *WAL) Commit(rec []byte) error {
	if _, err := w.f.Write(rec); err != nil {
		return err
	}
	return w.f.Sync() // durability point
}
```

## Open questions

- How do group commits change tail latency?
- What does recovery cost after a long checkpoint interval?
