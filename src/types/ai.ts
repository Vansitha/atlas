export type OutputType = 'skill' | 'knowledge'

export interface AITransport {
  readonly name: string
  available(): Promise<boolean>
  send(prompt: string): Promise<string>
}

export interface ClassificationResult {
  readonly type: OutputType
  readonly confidence: number
  readonly reasoning: string
  readonly suggestedTitle: string
  readonly suggestedTags: readonly string[]
  readonly suggestedSlug: string
}

export interface GenerationResult {
  readonly markdown: string
  readonly title: string
  readonly description: string
  readonly tags: readonly string[]
}
