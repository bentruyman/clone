# quick-clone

A convenient utility for quickly cloning repositories.

## Installation

```console
$ deno install \
    --allow-env --allow-read --allow-write --allow-run --unstable --force \
    --name clone \
    https://deno.land/x/quick-clone/cli.ts
```

## Usage

`quick-clone` clones git repositories into a predictable directory structure.

```console
$ clone https://github.com/bentruyman/clone.git
```

The above command clones the `bentruyman/clone` repository into
`~/Development/src/github.com/bentruyman/clone`, then `cd` into that directory.

Both `git+ssh` and `https` URLs work:

```console
$ clone git@github.com:bentruyman/clone.git # with git+ssh
$ clone https://github.com/bentruyman/clone.git # with https
```

### Shorthand

Repositories can be cloned using a shorthand syntax which will try to clone a
from `$GITHUB_HOST/${user}/${repo}.git` using `git+ssh`, then `https`.

```console
$ clone bentruyman/clone
```

## Configuration

`clone` can be configured with the following environment variables:

- `GITHUB_HOST`: GitHub host to use when using the shorthand syntax (default:
  `github.com`)
- `SRC_ROOT`: root directory to clone repositories into (default:
  `$HOME/Development/src`)

## License

[MIT](https://choosealicense.com/licenses/mit/) © Ben Truyman
