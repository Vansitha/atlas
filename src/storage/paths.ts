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
export const DAEMON_LOG_PATH = join(ATLAS_HOME, '.daemon.log')

const isWindows = process.platform === 'win32'

// LOCALAPPDATA is always set for interactive Windows sessions;
// the fallback covers service accounts and restricted environments
const winBase = process.env.LOCALAPPDATA ?? join(homedir(), 'AppData', 'Local')
const macBase = join(homedir(), 'Library', 'Application Support')

export const BROWSER_BOOKMARK_PATHS: Record<string, string> = isWindows
  ? {
      chrome: join(winBase, 'Google', 'Chrome', 'User Data', 'Default', 'Bookmarks'),
      brave: join(winBase, 'BraveSoftware', 'Brave-Browser', 'User Data', 'Default', 'Bookmarks'),
      edge: join(winBase, 'Microsoft', 'Edge', 'User Data', 'Default', 'Bookmarks'),
      arc: join(winBase, 'Arc', 'User Data', 'Default', 'Bookmarks'),
    }
  : {
      chrome: join(macBase, 'Google', 'Chrome', 'Default', 'Bookmarks'),
      brave: join(macBase, 'BraveSoftware', 'Brave-Browser', 'Default', 'Bookmarks'),
      arc: join(macBase, 'Arc', 'User Data', 'Default', 'Bookmarks'),
      edge: join(macBase, 'Microsoft Edge', 'Default', 'Bookmarks'),
    }
