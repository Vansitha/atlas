export type CodingTool = 'claude-code' | 'cursor' | 'copilot' | 'windsurf'

export interface SyncResult {
  readonly provider: CodingTool
  readonly entriesSynced: number
  readonly errors: readonly string[]
}

export interface SyncStatus {
  readonly provider: CodingTool
  readonly configured: boolean
  readonly healthy: boolean
  readonly details: string
}

export interface SyncProvider {
  readonly name: CodingTool
  detected(): boolean
  sync(entries: readonly StoredEntry[]): Promise<SyncResult>
  verify(): Promise<SyncStatus>
  cleanup(): Promise<void>
}

// Avoid circular import — StoredEntry is re-declared here minimally
export interface StoredEntry {
  readonly slug: string
  readonly title: string
  readonly type: 'skill' | 'knowledge'
  readonly sourceUrl: string
  readonly urlHash: string
  readonly capturedAt: string
  readonly tags: readonly string[]
  readonly filePath: string
}
