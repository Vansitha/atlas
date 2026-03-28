import type { Command } from 'commander'

export function registerSetupCommand(program: Command): void {
  program
    .command('setup')
    .description('Configure Atlas (alias for `atlas init`)')
    .action(async () => {
      const { runInitWizard } = await import('./init.js')
      await runInitWizard()
    })
}
