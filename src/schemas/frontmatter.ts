import { z } from 'zod'

const outputType = z.enum(['skill', 'knowledge'])

export const frontmatterSchema = z.object({
  title: z.string().min(1),
  type: outputType,
  sourceUrl: z.string().url(),
  urlHash: z.string().min(1),
  capturedAt: z.string().datetime(),
  tags: z.array(z.string()).default([]),
  description: z.string().optional(),
  aiClassification: outputType.optional(),
  userOverride: outputType.optional(),
})

export type Frontmatter = z.infer<typeof frontmatterSchema>
