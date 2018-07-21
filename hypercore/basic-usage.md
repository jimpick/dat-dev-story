# Hypercore basic usage

# Installing from npm

Assuming you already have a Node.js project started, install the npm module
to node_modules:

```
npm install --save hypercore
```

This will also update your package.json.

If you need help setting up Node.js and creating a project,
[here is a guide](/extra-guides/nodejs.md).

# Creating a hypercore on disk

Try creating a new Node.js file, let's call it `create-feed.js`:

```js
const hypercore = require('hypercore')

const feed = hypercore('./my-feed')
```

When you run `node create-feed`, it will create the `my-feed` directory
under your current directory, and it will have the following files in it:

```
$ ls my-feed
bitfield        key             secret_key      signatures      tree
```

This is where the data for the hypercore will be stored. We haven't stored
any data yet, but we can see that some files have already been created.

These files are called *SLEEP files* - they are all binary formatted files.
The format is documented in the
[SLEEP Paper](https://github.com/datproject/docs/blob/master/papers/sleep.pdf) (pdf).

These files are the backing database for hypercore, so you should never need
to touch them. But it is useful to know what they are.

The `key` file is 32 bytes long and contains the public key for the hypercore
feed. Likewise, the `secret_key` file is 64 bytes long and contains the private
key. 

These are binary files, so you can use the `hexdump` system utility to display
them (if you have it):

```
$ hexdump my-feed/key
0000000 e1 3a be 5e 44 cb 7b 41 1e 8c 46 2c b7 7e bd e4
0000010 01 2e 00 2e 6e c6 15 72 0b 06 f7 37 32 98 4f 23
0000020
```

```
$ hexdump my-feed/secret_key
0000000 eb 21 ea 4a f3 9d c7 04 ec a4 4d 0f 8e 63 3d 06
0000010 b7 53 03 7a 5b e4 44 93 b8 bc e2 77 b7 52 bd d0
0000020 e1 3a be 5e 44 cb 7b 41 1e 8c 46 2c b7 7e bd e4
0000030 01 2e 00 2e 6e c6
```

Hypercore uses [Ed25519](https://ed25519.cr.yp.to/) public-key cryptography
for it's key pairs. This modern cyrptography system is extremely fast
and also has short keys. The 32-byte secret key shown above could be
represented as a dat: URL, eg.:

* dat://e13abe5e44cb7b411e8c462cb77ebde4012e002e6ec615720b06f73732984f23

With the public key, anybody would be able to verify that records written
to the hypercore were created with the secret key.

You would normally never distribute the secret key - you would just keep
it on disk in the SLEEP format for internal use by the hypercore for when
it needs to write new data.

# The "ready" event and accessing the public key using code


