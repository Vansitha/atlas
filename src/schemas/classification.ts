import { z } from 'zod'

export const classificationResponseSchema = z.object({
  type: z.enum(['skill', 'knowledge']),
  confidence: z.number().min(0).max(1),
  reasoning: z.string().min(1),
  suggestedTitle: z.string().min(1),
  suggestedTags: z.array(z.string()),
  suggestedSlug: z.string().min(1),
})

export type ClassificationResponse = z.infer<typeof classificationResponseSchema>
