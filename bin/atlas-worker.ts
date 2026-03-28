#!/usr/bin/env node
// Minimal daemon worker entry point.
// Only loads the watcher and its direct dependencies — NOT the full CLI.
// This keeps the background process ~20MB lighter than spawning atlas.js.
import { startWatcher } from '../src/daemon/watcher.js'

startWatcher().catch((err) => {
  console.error(`[atlas-daemon] Fatal: ${err instanceof Error ? err.message : String(err)}`)
  process.exit(1)
})
