import { describe, it, expect, vi } from 'vitest'
import { Command } from 'commander'

vi.mock('../../../../src/cli/commands/init.js', () => ({
  runInitWizard: vi.fn(async () => {}),
  registerInitCommand: vi.fn(),
}))

import { runInitWizard } from '../../../../src/cli/commands/init.js'
import { registerSetupCommand } from '../../../../src/cli/commands/setup.js'

function makeProgram() {
  const program = new Command()
  program.exitOverride()
  registerSetupCommand(program)
  return program
}

describe('atlas setup', () => {
  it('delegates to runInitWizard', async () => {
    await makeProgram().parseAsync(['node', 'atlas', 'setup'])
    expect(runInitWizard).toHaveBeenCalled()
  })
})
