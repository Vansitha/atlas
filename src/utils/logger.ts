const isDebug = process.env['ATLAS_DEBUG'] === '1'

export const logger = {
  debug(message: string, ...args: unknown[]): void {
    if (isDebug) {
      process.stderr.write(`[debug] ${message} ${args.length ? JSON.stringify(args) : ''}\n`)
    }
  },

  info(message: string): void {
    process.stderr.write(`[info] ${message}\n`)
  },

  warn(message: string): void {
    process.stderr.write(`[warn] ${message}\n`)
  },

  error(message: string): void {
    process.stderr.write(`[error] ${message}\n`)
  },
}
