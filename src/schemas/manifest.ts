import { z } from 'zod'

export const manifestEntrySchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  type: z.enum(['skill', 'knowledge']),
  sourceUrl: z.string().url(),
  urlHash: z.string().min(1),
  capturedAt: z.string().datetime(),
  tags: z.array(z.string()),
  filePath: z.string().min(1),
})

export const manifestSchema = z.object({
  version: z.literal(1),
  entries: z.array(manifestEntrySchema),
  lastUpdated: z.string().datetime(),
})

export type Manifest = z.infer<typeof manifestSchema>
export type ManifestEntry = z.infer<typeof manifestEntrySchema>
