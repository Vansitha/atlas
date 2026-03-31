import type { CodingTool } from './providers.js'

export type BrowserChoice = 'chrome' | 'brave' | 'arc' | 'edge' | 'skip'

export type AiProviderType = 'claude-cli' | 'opencode-cli' | 'anthropic-sdk'

export type KnowledgeApp = 'vscode' | 'cursor' | 'obsidian'

export interface AtlasConfig {
  readonly version: number
  readonly browser: BrowserChoice | null
  readonly browserProfile: string | null
  readonly codingTools: readonly CodingTool[]
  readonly aiProvider: AiProviderType | null
  readonly knowledgeApp: KnowledgeApp | null
  readonly daemon: {
    readonly enabled: boolean
    readonly bookmarkFolder: string
    readonly debounceMs: number
  }
  readonly createdAt: string
  readonly updatedAt: string
}
