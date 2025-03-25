import path from 'path';

import * as core from '@actions/core';
import * as exec from '@actions/exec';
import {
  Cargo,
  CargoHack,
  CargoHackOptions,
  Cross,
  CrossOptions,
} from '@unk1ndled/rs-actions-core';

import * as input from './input';
import { CheckRunner } from './check';

async function getProgram(actionInput: input.Input) {
  switch (actionInput.tool) {
    case 'cross': {
      const options: CrossOptions = {
        toolchain: actionInput.toolchain,
        primaryKey: actionInput.cacheKey,
      };
      return await Cross.getOrInstall(options);
    }
    case 'cargo-hack': {
      const options: CargoHackOptions = {
        toolchain: actionInput.toolchain,
        primaryKey: actionInput.cacheKey,
      };
      return await CargoHack.getOrInstall(options);
    }
  }

  throw new Error(
    `Invalid tool '${actionInput.tool}' specified, must be one of [cross, cargo-hack]`,
  );
}

export async function run(actionInput: input.Input): Promise<void> {
  const cargo = await Cargo.get(actionInput.toolchain);
  const program = actionInput.tool ? await getProgram(actionInput) : cargo;

  let rustcVersion = '';
  let cargoVersion = '';
  let programVersion = '';

  await exec.exec('rustc', ['-V'], {
    silent: true,
    listeners: {
      stdout: (buffer: Buffer) => (rustcVersion = buffer.toString().trim()),
    },
  });

  await cargo.call(['-V'], {
    silent: true,
    listeners: {
      stdout: (buffer: Buffer) => (cargoVersion = buffer.toString().trim()),
    },
  });

  await program.call(['-V'], {
    silent: true,
    listeners: {
      stdout: (buffer: Buffer) => (programVersion = buffer.toString().trim()),
    },
  });

  let args: string[] = [];
  args.push('doc');
  args.push('--document-private-items');
  args.push('--message-format=json'); // Ensures structured output for parsing

  args = args.concat(actionInput.args);

  const runner = new CheckRunner(actionInput.workingDirectory);
  const options: exec.ExecOptions = {
    ignoreReturnCode: true,
    failOnStdErr: false,
    listeners: {
      stdline: (line: string) => {
        runner.tryPush(line);
      },
    },
  };

  if (actionInput.workingDirectory) {
    options.cwd = path.join(process.cwd(), actionInput.workingDirectory);
  }

  let rustdocExitCode: number = 0;
  try {
    core.startGroup('Executing cargo doc (JSON output)');
    rustdocExitCode = await program.call(args, options);
  } finally {
    core.endGroup();
  }

  await runner.addSummary({
    rustc: rustcVersion,
    cargo: cargoVersion,
    ...(programVersion !== cargoVersion && { program: programVersion }),
  });

  if (rustdocExitCode !== 0) {
    core.warning(`Rustdoc has exited with exit code ${rustdocExitCode}, but continuing execution.`);
  }
}
