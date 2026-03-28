import { z } from 'zod'

export const cacheEntrySchema = z.object({
  urlHash: z.string().min(1),
  extractedAt: z.string().datetime(),
  extractorName: z.string().min(1),
})

export const contentCacheSchema = z.object({
  version: z.literal(1),
  entries: z.record(z.string(), cacheEntrySchema),
})

export type ContentCache = z.infer<typeof contentCacheSchema>
export type CacheEntry = z.infer<typeof cacheEntrySchema>
