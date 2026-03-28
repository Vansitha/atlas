import { describe, it, expect } from 'vitest'
import { hashUrl, normalizeUrl, generateSlug, isValidUrl } from '../../../src/utils/url.js'

describe('hashUrl', () => {
  it('returns a 16-char hex string', () => {
    const hash = hashUrl('https://example.com')
    expect(hash).toHaveLength(16)
    expect(hash).toMatch(/^[a-f0-9]+$/)
  })

  it('is deterministic', () => {
    expect(hashUrl('https://example.com')).toBe(hashUrl('https://example.com'))
  })

  it('normalizes before hashing (trailing slash)', () => {
    expect(hashUrl('https://example.com/path/')).toBe(hashUrl('https://example.com/path'))
  })

  it('different URLs produce different hashes', () => {
    expect(hashUrl('https://example.com')).not.toBe(hashUrl('https://other.com'))
  })
})

describe('normalizeUrl', () => {
  it('removes trailing slash from path', () => {
    expect(normalizeUrl('https://example.com/path/')).toBe('https://example.com/path')
  })

  it('preserves root slash', () => {
    const result = normalizeUrl('https://example.com/')
    expect(result).toContain('example.com')
  })

  it('strips hash fragments', () => {
    const result = normalizeUrl('https://example.com/page#section')
    expect(result).not.toContain('#section')
  })
})

describe('generateSlug', () => {
  it('converts title to kebab-case', () => {
    expect(generateSlug('React Hooks Guide')).toBe('react-hooks-guide')
  })

  it('removes special characters', () => {
    expect(generateSlug('Hello, World! (2024)')).toBe('hello-world-2024')
  })

  it('truncates to 60 characters', () => {
    const long = 'a'.repeat(100)
    expect(generateSlug(long).length).toBeLessThanOrEqual(60)
  })

  it('appends counter for duplicate slugs', () => {
    const existing = ['react-hooks']
    expect(generateSlug('React Hooks', existing)).toBe('react-hooks-2')
  })

  it('increments counter past existing duplicates', () => {
    const existing = ['react-hooks', 'react-hooks-2']
    expect(generateSlug('React Hooks', existing)).toBe('react-hooks-3')
  })

  it('collapses multiple spaces and hyphens', () => {
    expect(generateSlug('  hello   world  ')).toBe('hello-world')
  })
})

describe('isValidUrl', () => {
  it('accepts https URLs', () => {
    expect(isValidUrl('https://example.com')).toBe(true)
  })

  it('accepts http URLs', () => {
    expect(isValidUrl('http://example.com')).toBe(true)
  })

  it('rejects plain text', () => {
    expect(isValidUrl('not a url')).toBe(false)
  })

  it('rejects ftp URLs', () => {
    expect(isValidUrl('ftp://example.com')).toBe(false)
  })

  it('rejects empty string', () => {
    expect(isValidUrl('')).toBe(false)
  })
})
