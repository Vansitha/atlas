import { homedir } from 'node:os'
import { join } from 'node:path'

export const ATLAS_HOME = join(homedir(), '.ai-knowledge')
export const SKILLS_DIR = join(ATLAS_HOME, 'skills')
export const KNOWLEDGE_DIR = join(ATLAS_HOME, 'knowledge')
export const CONFIG_PATH = join(ATLAS_HOME, 'config.json')
export const MANIFEST_PATH = join(ATLAS_HOME, '.index.json')
export const CONTENT_CACHE_PATH = join(ATLAS_HOME, '.content-cache.json')
export const ACCURACY_LOG_PATH = join(ATLAS_HOME, '.accuracy-log.jsonl')
export const DAEMON_PID_PATH = join(ATLAS_HOME, '.daemon.pid')
export const DAEMON_HEARTBEAT_PATH = join(ATLAS_HOME, '.daemon.heartbeat')

export const BROWSER_BOOKMARK_PATHS: Record<string, string> = {
  chrome: join(homedir(), 'Library/Application Support/Google/Chrome/Default/Bookmarks'),
  brave: join(homedir(), 'Library/Application Support/BraveSoftware/Brave-Browser/Default/Bookmarks'),
  arc: join(homedir(), 'Library/Application Support/Arc/User Data/Default/Bookmarks'),
  edge: join(homedir(), 'Library/Application Support/Microsoft Edge/Default/Bookmarks'),
}
