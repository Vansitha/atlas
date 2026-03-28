import type { Command } from 'commander'
import { startDaemon, stopDaemon, getDaemonStatus } from '../../daemon/process-manager.js'
import { startWatcher } from '../../daemon/watcher.js'
import { intro, outro, fail } from '../ui.js'

function formatHeartbeatAge(seconds: number | null): string {
  if (seconds === null) return 'n/a'
  if (seconds < 60) return `${seconds}s ago`
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  return `${Math.floor(seconds / 3600)}h ago`
}

export function registerDaemonCommand(program: Command): void {
  const daemon = program
    .command('daemon')
    .description('Manage the bookmark watcher daemon')

  daemon
    .command('start')
    .description('Start the bookmark watcher in the background')
    .action(async () => {
      intro('daemon start')
      try {
        const result = startDaemon()
        outro(
          `Daemon started (PID ${result.pid})\n` +
          `  Watching "${result.bookmarkFolder}" bookmark folder\n` +
          `  Log: ~/.ai-knowledge/.daemon.log`,
        )
      } catch (err) {
        fail(err instanceof Error ? err.message : 'Failed to start daemon')
        process.exit(1)
      }
    })

  daemon
    .command('stop')
    .description('Stop the background bookmark watcher')
    .action(() => {
      intro('daemon stop')
      const result = stopDaemon()
      if (result.ok) {
        outro(result.message)
      } else {
        fail(result.message)
        process.exit(1)
      }
    })

  daemon
    .command('status')
    .description('Show the current status of the bookmark watcher')
    .action(() => {
      intro('daemon status')
      const status = getDaemonStatus()

      if (!status.running) {
        console.log('  Status:  not running')
        console.log(`  Folder:  ${status.bookmarkFolder}`)
        console.log('\n  Run "atlas daemon start" to begin watching bookmarks.')
        outro('')
        return
      }

      const heartbeatLine = formatHeartbeatAge(status.heartbeatAge)
      const stale = status.heartbeatAge !== null && status.heartbeatAge > 60

      console.log(`  Status:  running (PID ${status.pid})`)
      console.log(`  Folder:  ${status.bookmarkFolder}`)
      console.log(`  Heartbeat: ${heartbeatLine}${stale ? '  ⚠ stale' : ''}`)
      console.log('  Log:     ~/.ai-knowledge/.daemon.log')

      outro('')
    })

  daemon
    .command('worker')
    .description('Run the bookmark watcher (called internally by daemon start)')
    .action(async () => {
      try {
        await startWatcher()
      } catch (err) {
        console.error(`[atlas-daemon] Fatal error: ${err instanceof Error ? err.message : String(err)}`)
        process.exit(1)
      }
    })
}
