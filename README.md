# `rs-doc-check` Action

[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)


This GitHub Action executes `cargo doc`
and posts all lints as annotations for the pushed commit [<sup>1</sup>](#note-annotations-limit).

<!-- ![Screenshot of a clippy warning displayed in the commit interface of GitHub](./.github/screenshot.png) -->

This GitHub Action has been forked from [clechasseur/rs-clippy-check](https://github.com/actions-rs/clippy-check). The original project published under the name [`rust-clippy-check`](https://github.com/marketplace/actions/rust-clippy-check). See [LICENSE](LICENSE) for copyright attribution details.



## Inputs

All inputs are optional.

| Name                | Required | Description                                                                                                                            | Type   | Default         |
| --------------------| :------: |----------------------------------------------------------------------------------------------------------------------------------------| ------ |-----------------|
| `toolchain`         |          | Rust toolchain name to use                                                                                                             | string |                 |
| `args`              |          | Arguments for the  command                                                                                               | string |                 |
| `working-directory` |          | Directory where to perform the command                                                                                  | string |                 |
| `tool`              |          | Tool to use instead of `cargo` ([`cross`](https://github.com/cross-rs/cross) or [`cargo-hack`](https://github.com/taiki-e/cargo-hack)) | string |                 |
| `cache-key`         |          | Cache key when using a non-`cargo` `tool`                                                                                              | string | rs-clippy-check |

For extra details about the `toolchain`, `args`, `tool` and `cache-key` inputs, see [`rs-cargo` Action](https://github.com/clechasseur/rs-cargo#inputs).

## Notes

<a name="note-annotations-limit"><sup>1</sup></a> : Currently, GitHub sets a limit of 10 annotations of each type per run (see [this page](https://docs.github.com/en/rest/checks/runs?apiVersion=2022-11-28) for more information). So if there are more than 10 such lints of one type reported by `clippy`, only the first 10 will appear as PR annotations. The other lints will still appear in the check run summary (see [this one](https://github.com/clechasseur/rs-clippy-check/actions/runs/5921984365/attempts/1#summary-16055301757) for example).
