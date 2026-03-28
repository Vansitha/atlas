import { z } from 'zod'

export const generationResponseSchema = z.object({
  markdown: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  tags: z.array(z.string()),
})

export type GenerationResponse = z.infer<typeof generationResponseSchema>
