export class AtlasError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AtlasError'
  }
}

export class ExtractionError extends AtlasError {
  constructor(
    message: string,
    public readonly url: string,
    public readonly extractorName: string,
  ) {
    super(message)
    this.name = 'ExtractionError'
  }
}

export class ClassificationError extends AtlasError {
  constructor(
    message: string,
    public readonly rawResponse?: string,
  ) {
    super(message)
    this.name = 'ClassificationError'
  }
}

export class SyncError extends AtlasError {
  constructor(
    message: string,
    public readonly provider: string,
  ) {
    super(message)
    this.name = 'SyncError'
  }
}

export class DuplicateUrlError extends AtlasError {
  constructor(
    public readonly url: string,
    public readonly existingSlug: string,
  ) {
    super(`URL already captured as "${existingSlug}"`)
    this.name = 'DuplicateUrlError'
  }
}

export class NoAiProviderError extends AtlasError {
  constructor() {
    super(
      'No AI provider found. Install Claude Code (https://claude.ai/code) or set ANTHROPIC_API_KEY.',
    )
    this.name = 'NoAiProviderError'
  }
}
