# `rs-clippy-check` Action

[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Continuous integration](https://github.com/clechasseur/rs-clippy-check/actions/workflows/ci.yml/badge.svg?branch=main&event=push)](https://github.com/clechasseur/rs-clippy-check/actions/workflows/ci.yml)

> Clippy lints in your Pull Requests

This GitHub Action executes [`clippy`](https://github.com/rust-lang/rust-clippy)
and posts all lints as annotations for the pushed commit [<sup>1</sup>](#note-annotations-limit).

![Screenshot of a clippy warning displayed in the commit interface of GitHub](./.github/screenshot.png)

This GitHub Action has been forked from [actions-rs/clippy-check](https://github.com/actions-rs/clippy-check). The original project published under the name [`rust-clippy-check`](https://github.com/marketplace/actions/rust-clippy-check). See [LICENSE](LICENSE) for copyright attribution details.

## Example workflow

Note: this workflow uses [`actions-rust-lang/setup-rust-toolchain`](https://github.com/actions-rust-lang/setup-rust-toolchain) to install the most recent `nightly` clippy.

```yaml
name: Clippy check

on: push

jobs:
  clippy_check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683 # v4.2.2
      - uses: actions-rust-lang/setup-rust-toolchain@9399c7bb15d4c7d47b27263d024f0a4978346ba4 # v1.11.0
        with:
          toolchain: nightly
          components: clippy
      - uses: clechasseur/rs-clippy-check@23f6dcf86d7e4e0d98b000bba0bb81ac587c44aa # v4.0.2
        with:
          args: --all-features
```

## Inputs

All inputs are optional.

| Name                | Required | Description                                                                                                                            | Type   | Default         |
| --------------------| :------: |----------------------------------------------------------------------------------------------------------------------------------------| ------ |-----------------|
| `toolchain`         |          | Rust toolchain name to use                                                                                                             | string |                 |
| `args`              |          | Arguments for the `cargo clippy` command                                                                                               | string |                 |
| `working-directory` |          | Directory where to perform the `cargo clippy` command                                                                                  | string |                 |
| `tool`              |          | Tool to use instead of `cargo` ([`cross`](https://github.com/cross-rs/cross) or [`cargo-hack`](https://github.com/taiki-e/cargo-hack)) | string |                 |
| `cache-key`         |          | Cache key when using a non-`cargo` `tool`                                                                                              | string | rs-clippy-check |

For extra details about the `toolchain`, `args`, `tool` and `cache-key` inputs, see [`rs-cargo` Action](https://github.com/clechasseur/rs-cargo#inputs).

## Notes

<a name="note-annotations-limit"><sup>1</sup></a> : Currently, GitHub sets a limit of 10 annotations of each type per run (see [this page](https://docs.github.com/en/rest/checks/runs?apiVersion=2022-11-28) for more information). So if there are more than 10 such lints of one type reported by `clippy`, only the first 10 will appear as PR annotations. The other lints will still appear in the check run summary (see [this one](https://github.com/clechasseur/rs-clippy-check/actions/runs/5921984365/attempts/1#summary-16055301757) for example).
