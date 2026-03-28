import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mkdirSync, writeFileSync, rmSync, existsSync, lstatSync, readlinkSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { createSymlink, verifySymlink, removeSymlink } from '../../../src/providers/symlink.js'

let tempDir: string

beforeEach(() => {
  tempDir = join(tmpdir(), `atlas-symlink-test-${Date.now()}`)
  mkdirSync(tempDir, { recursive: true })
})

afterEach(() => {
  if (existsSync(tempDir)) rmSync(tempDir, { recursive: true })
})

describe('createSymlink', () => {
  it('creates a symlink from source to target', () => {
    const source = join(tempDir, 'source-dir')
    const target = join(tempDir, 'target-link')
    mkdirSync(source)

    createSymlink(source, target)

    expect(lstatSync(target).isSymbolicLink()).toBe(true)
    expect(readlinkSync(target)).toBe(source)
  })

  it('is idempotent — no error if symlink already points to correct source', () => {
    const source = join(tempDir, 'source')
    const target = join(tempDir, 'target')
    mkdirSync(source)

    createSymlink(source, target)
    expect(() => createSymlink(source, target)).not.toThrow()
  })

  it('replaces existing symlink pointing to wrong target', () => {
    const source1 = join(tempDir, 'source1')
    const source2 = join(tempDir, 'source2')
    const target = join(tempDir, 'target')
    mkdirSync(source1)
    mkdirSync(source2)

    createSymlink(source1, target)
    createSymlink(source2, target)

    expect(readlinkSync(target)).toBe(source2)
  })

  it('throws when a real file exists at the target path', () => {
    const source = join(tempDir, 'source')
    const target = join(tempDir, 'real-file.txt')
    mkdirSync(source)
    writeFileSync(target, 'real content')

    expect(() => createSymlink(source, target)).toThrow('real file/directory already exists')
  })

  it('creates parent directories if they do not exist', () => {
    const source = join(tempDir, 'source')
    const target = join(tempDir, 'nested', 'deep', 'target')
    mkdirSync(source)

    createSymlink(source, target)
    expect(lstatSync(target).isSymbolicLink()).toBe(true)
  })
})

describe('verifySymlink', () => {
  it('returns ok for a valid symlink', () => {
    const source = join(tempDir, 'source')
    const target = join(tempDir, 'target')
    mkdirSync(source)
    createSymlink(source, target)

    expect(verifySymlink(source, target).status).toBe('ok')
  })

  it('returns missing when target does not exist', () => {
    expect(verifySymlink('/some/source', join(tempDir, 'missing')).status).toBe('missing')
  })

  it('returns conflict when target is a real file', () => {
    const source = join(tempDir, 'source')
    const target = join(tempDir, 'real.txt')
    writeFileSync(target, 'content')

    expect(verifySymlink(source, target).status).toBe('conflict')
  })

  it('returns broken when symlink points to wrong source', () => {
    const source1 = join(tempDir, 'source1')
    const source2 = join(tempDir, 'source2')
    const target = join(tempDir, 'target')
    mkdirSync(source1)
    createSymlink(source1, target)

    expect(verifySymlink(source2, target).status).toBe('broken')
  })
})

describe('removeSymlink', () => {
  it('removes an existing symlink', () => {
    const source = join(tempDir, 'source')
    const target = join(tempDir, 'target')
    mkdirSync(source)
    createSymlink(source, target)

    removeSymlink(target)
    expect(existsSync(target)).toBe(false)
  })

  it('does nothing if target does not exist', () => {
    expect(() => removeSymlink(join(tempDir, 'nonexistent'))).not.toThrow()
  })
})
