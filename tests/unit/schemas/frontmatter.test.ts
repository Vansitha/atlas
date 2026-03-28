import { describe, it, expect } from 'vitest'
import { frontmatterSchema } from '../../../src/schemas/frontmatter.js'

describe('frontmatterSchema', () => {
  const valid = {
    title: 'React Hooks Guide',
    type: 'skill' as const,
    sourceUrl: 'https://example.com/react-hooks',
    urlHash: 'abc123',
    capturedAt: new Date().toISOString(),
    tags: ['react', 'hooks'],
    description: 'A guide to React hooks',
  }

  it('parses a valid skill frontmatter', () => {
    const result = frontmatterSchema.parse(valid)
    expect(result.title).toBe('React Hooks Guide')
    expect(result.type).toBe('skill')
  })

  it('parses a valid knowledge frontmatter', () => {
    const result = frontmatterSchema.parse({ ...valid, type: 'knowledge' })
    expect(result.type).toBe('knowledge')
  })

  it('defaults tags to empty array when omitted', () => {
    const { tags: _, ...withoutTags } = valid
    const result = frontmatterSchema.parse(withoutTags)
    expect(result.tags).toEqual([])
  })

  it('rejects empty title', () => {
    expect(() => frontmatterSchema.parse({ ...valid, title: '' })).toThrow()
  })

  it('rejects invalid sourceUrl', () => {
    expect(() => frontmatterSchema.parse({ ...valid, sourceUrl: 'not-a-url' })).toThrow()
  })

  it('rejects invalid type', () => {
    expect(() => frontmatterSchema.parse({ ...valid, type: 'unknown' })).toThrow()
  })

  it('rejects missing required fields', () => {
    expect(() => frontmatterSchema.parse({ title: 'Only Title' })).toThrow()
  })
})
