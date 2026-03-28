import { describe, it, expect } from 'vitest'
import { classificationResponseSchema } from '../../../src/schemas/classification.js'

describe('classificationResponseSchema', () => {
  const valid = {
    type: 'skill' as const,
    confidence: 0.95,
    reasoning: 'This is a how-to guide with code examples',
    suggestedTitle: 'React Hooks Patterns',
    suggestedTags: ['react', 'hooks', 'patterns'],
    suggestedSlug: 'react-hooks-patterns',
  }

  it('parses a valid classification response', () => {
    const result = classificationResponseSchema.parse(valid)
    expect(result.type).toBe('skill')
    expect(result.confidence).toBe(0.95)
  })

  it('rejects confidence below 0', () => {
    expect(() => classificationResponseSchema.parse({ ...valid, confidence: -0.1 })).toThrow()
  })

  it('rejects confidence above 1', () => {
    expect(() => classificationResponseSchema.parse({ ...valid, confidence: 1.1 })).toThrow()
  })

  it('rejects empty reasoning', () => {
    expect(() => classificationResponseSchema.parse({ ...valid, reasoning: '' })).toThrow()
  })

  it('rejects invalid type', () => {
    expect(() => classificationResponseSchema.parse({ ...valid, type: 'article' })).toThrow()
  })
})
