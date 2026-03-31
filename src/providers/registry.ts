import { claudeCodeProvider } from './strategies/claude-code.js'
import { cursorProvider } from './strategies/cursor.js'
import { copilotProvider } from './strategies/copilot.js'
import { windsurfProvider } from './strategies/windsurf.js'
import { opencodeProvider } from './strategies/opencode.js'
import { loadConfig } from '../config/loader.js'
import { listEntries } from '../storage/manifest.js'
import { logger } from '../utils/logger.js'
import type { SyncProvider, SyncResult, SyncStatus, CodingTool } from '../types/index.js'

const ALL_PROVIDERS: SyncProvider[] = [
  claudeCodeProvider,
  cursorProvider,
  copilotProvider,
  windsurfProvider,
  opencodeProvider,
]

export function getAllProviders(): readonly SyncProvider[] {
  return ALL_PROVIDERS
}

export function detectProviders(): SyncProvider[] {
  return ALL_PROVIDERS.filter((p) => p.detected())
}

export function getProvider(name: CodingTool): SyncProvider | undefined {
  return ALL_PROVIDERS.find((p) => p.name === name)
}

export async function syncAll(): Promise<SyncResult[]> {
  const config = loadConfig()
  const entries = listEntries()
  const results: SyncResult[] = []

  for (const toolName of config.codingTools) {
    const provider = getProvider(toolName)
    if (!provider) {
      logger.warn(`Unknown provider: ${toolName}`)
      continue
    }
    try {
      const result = await provider.sync(entries)
      results.push(result)
      if (result.errors.length > 0) {
        logger.warn(`${toolName} sync had ${result.errors.length} error(s)`)
      } else {
        logger.debug(`${toolName}: synced ${result.entriesSynced} entries`)
      }
    } catch (err) {
      logger.error(`${toolName} sync failed: ${err instanceof Error ? err.message : String(err)}`)
    }
  }

  return results
}

export async function verifyAll(): Promise<SyncStatus[]> {
  const config = loadConfig()
  const statuses: SyncStatus[] = []

  for (const toolName of config.codingTools) {
    const provider = getProvider(toolName)
    if (!provider) continue
    statuses.push(await provider.verify())
  }

  return statuses
}
