import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'
import { configSchema } from '../schemas/config.js'
import { CONFIG_PATH } from '../storage/paths.js'
import { defaultConfig } from './defaults.js'
import type { AtlasConfig } from '../types/index.js'

export function loadConfig(): AtlasConfig {
  if (!existsSync(CONFIG_PATH)) {
    return defaultConfig()
  }
  const raw = JSON.parse(readFileSync(CONFIG_PATH, 'utf-8'))
  return configSchema.parse(raw) as AtlasConfig
}

export function saveConfig(config: AtlasConfig): void {
  const validated = configSchema.parse(config)
  const dir = dirname(CONFIG_PATH)
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
  writeFileSync(CONFIG_PATH, JSON.stringify(validated, null, 2), 'utf-8')
}

export function updateConfig(partial: Partial<AtlasConfig>): AtlasConfig {
  const current = loadConfig()
  const updated: AtlasConfig = {
    ...current,
    ...partial,
    updatedAt: new Date().toISOString(),
  }
  saveConfig(updated)
  return updated
}
