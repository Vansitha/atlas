import { createHash } from 'node:crypto'

export function hashUrl(url: string): string {
  const normalized = normalizeUrl(url)
  return createHash('sha256').update(normalized).digest('hex').slice(0, 16)
}

export function normalizeUrl(url: string): string {
  const parsed = new URL(url)
  parsed.hash = ''
  // Remove trailing slash from pathname (except root)
  if (parsed.pathname.length > 1 && parsed.pathname.endsWith('/')) {
    parsed.pathname = parsed.pathname.slice(0, -1)
  }
  return parsed.toString()
}

export function generateSlug(title: string, existingSlugs: readonly string[] = []): string {
  const base = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60)

  if (!existingSlugs.includes(base)) return base

  let counter = 2
  while (existingSlugs.includes(`${base}-${counter}`)) {
    counter++
  }
  return `${base}-${counter}`
}

export function isValidUrl(input: string): boolean {
  try {
    const url = new URL(input)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}
