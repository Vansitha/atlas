export interface ExtractedContent {
  readonly url: string
  readonly title: string
  readonly body: string
  readonly metadata: Record<string, string>
  readonly extractedAt: string
  readonly extractorName: string
}

export interface ContentExtractor {
  readonly name: string
  readonly priority: number
  canHandle(url: URL): boolean
  extract(url: URL): Promise<ExtractedContent>
}
