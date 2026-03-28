import { symlinkSync, existsSync, lstatSync, readlinkSync, mkdirSync, unlinkSync } from 'node:fs'
import { dirname } from 'node:path'
import { logger } from '../utils/logger.js'

export type SymlinkStatus = 'ok' | 'broken' | 'missing' | 'conflict'

export interface SymlinkInfo {
  readonly target: string
  readonly source: string
  readonly status: SymlinkStatus
}

export function createSymlink(source: string, target: string): void {
  if (existsSync(target)) {
    const stat = lstatSync(target)
    if (stat.isSymbolicLink()) {
      const existing = readlinkSync(target)
      if (existing === source) return // already correct
      unlinkSync(target) // wrong target — replace
    } else {
      throw new Error(
        `Cannot create symlink at ${target}: a real file/directory already exists there`,
      )
    }
  }

  const dir = dirname(target)
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true })

  symlinkSync(source, target)
  logger.debug(`Symlinked ${source} → ${target}`)
}

export function verifySymlink(source: string, target: string): SymlinkInfo {
  if (!existsSync(target)) {
    return { target, source, status: 'missing' }
  }

  const stat = lstatSync(target)
  if (!stat.isSymbolicLink()) {
    return { target, source, status: 'conflict' }
  }

  const actual = readlinkSync(target)
  if (actual !== source) {
    return { target, source, status: 'broken' }
  }

  if (!existsSync(source)) {
    return { target, source, status: 'broken' }
  }

  return { target, source, status: 'ok' }
}

export function removeSymlink(target: string): void {
  if (!existsSync(target)) return
  const stat = lstatSync(target)
  if (stat.isSymbolicLink()) {
    unlinkSync(target)
    logger.debug(`Removed symlink: ${target}`)
  }
}
