# Alfred 4 Workflow for rbw (Bitwarden)

It is inspired by [passmenu](https://git.zx2c4.com/password-store/tree/contrib/dmenu/passmenu) and [alfred-pass](https://github.com/CGenie/alfred-pass)

## Requirements

- `rbw` should be setup beforehand. [Read about it](https://github.com/doy/rbw)
- `node` v14+

## Usage

### `p <query>`

It will give you a list of matching entries in your storage. The value of a picked will be copied to your clipboard.

## Env variables

| Variable | Description                            | Default value     |
| ---------| -------------------------------------- | ----------------- |
| RBW_PATH | Location where rbw binaries are stored | /opt/homebrew/bin |
