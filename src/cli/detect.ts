import { existsSync } from 'node:fs'
import { execSync } from 'node:child_process'
import { BROWSER_BOOKMARK_PATHS } from '../storage/paths.js'
import { getAllProviders } from '../providers/registry.js'
import type { BrowserChoice, AiProviderType, CodingTool } from '../types/index.js'

export function detectBrowsers(): BrowserChoice[] {
  return Object.entries(BROWSER_BOOKMARK_PATHS)
    .filter(([, path]) => existsSync(path))
    .map(([browser]) => browser as BrowserChoice)
}

export function detectCodingTools(): CodingTool[] {
  return getAllProviders()
    .filter((p) => p.detected())
    .map((p) => p.name as CodingTool)
}

export interface DetectedAiProvider {
  readonly value: AiProviderType
  readonly label: string
  readonly hint: string
}

function commandExists(cmd: string): boolean {
  try {
    execSync(`which ${cmd}`, { stdio: 'ignore' })
    return true
  } catch {
    return false
  }
}

export function detectAiProviders(): DetectedAiProvider[] {
  const results: DetectedAiProvider[] = []

  if (commandExists('claude')) {
    results.push({ value: 'claude-cli', label: 'Claude CLI', hint: 'detected' })
  }
  if (commandExists('opencode')) {
    results.push({ value: 'opencode-cli', label: 'OpenCode CLI', hint: 'detected' })
  }
  if (process.env.ANTHROPIC_API_KEY) {
    results.push({ value: 'anthropic-sdk', label: 'Anthropic SDK', hint: 'ANTHROPIC_API_KEY set' })
  }

  return results
}
