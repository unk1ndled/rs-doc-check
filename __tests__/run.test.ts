import { Input } from '../src/input';
import { run } from '../src/run';

const SECONDS = 1000;

describe('run', () => {
  it.each([
    {
      name: 'rust-tests-doc-warnings',
      input: {
        toolchain: 'stable',
        args: ['--all-features'],
        workingDirectory: 'rust_tests/rust_doc_test_fail',
      },
    },
    {
      name: 'rust-tests-cross',
      input: {
        args: ['--target', 'aarch64-unknown-linux-gnu', '--all-features'],
        workingDirectory: 'rust_tests/rust_doc_test_fail',
        tool: 'cross',
        cacheKey: 'rs-doc-doc-tests',
      },
    },
    {
      name: 'rust-tests-cargo-hack',
      input: {
        args: ['--feature-powerset'],
        workingDirectory: 'rust_tests/doc_warnings',
        tool: 'cargo-hack',
        cacheKey: 'rs-doc-check-tests',
      },
    },
  ])(
    '$name',
    async ({ input }: { input: Input }) => {
      const inputWithoutCache: Input = {
        ...input,
        ...(!process.env.CI && { cacheKey: 'no-cache' }),
      };

      await expect(run(inputWithoutCache)).resolves.not.toThrow();
    },
    240 * SECONDS,
  );
});
