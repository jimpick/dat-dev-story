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

When you first run `node create-feed`, it will create the `my-feed` directory
under your current directory, and it will have the following files in it:

```
$ ls my-feed
bitfield        key             secret_key      signatures      tree
```

This is where the data for the hypercore will be stored. We haven't stored
any data yet, but we can see that some files have already been created.

These files are called *SLEEP files* - they are all binary formatted files.
The format is documented in the
[SLEEP Paper](https://github.com/datproject/docs/blob/master/papers/sleep.pdf)
(pdf).

These files are the backing database for hypercore, so you should never need
to touch them. But it is useful to know what they are.

The `key` file is 32 bytes long and contains the public key for the hypercore
feed. Likewise, the `secret_key` file is 64 bytes long and contains the secret
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
and also has short keys. The 32-byte binary secret key shown above can be
printed as a 64-character hexadecimal string, which can also be used as a
dat: URL, eg.:

* dat://e13abe5e44cb7b411e8c462cb77ebde4012e002e6ec615720b06f73732984f23

With the public key, anybody can verify that records written to the hypercore
were created with the secret key.

Normally, you should never distribute the secret key. You should just keep
it on disk in the SLEEP format for internal use by the hypercore for when
it needs to write new data.

# Waiting until the hypercore is "ready"

When you create a new hypercore, it needs to do a number of *asynchronous*
operations before it is 'ready' to be used. It might have to write files
to the underlying storage, which might be a disk, and it generates
randomized cryptographic keys which may have to wait for entropy from
the operating system.

If you run the above program a second time, it will re-load the existing
hypercore from disk, including the saved keys. This is also an asynchronous
operation, so you need to wait for the hypercore to be ready.

There are two ways you can wait for a hypercore feed to be ready:

1. Listen for the 'ready' event:

  ```
  feed.on('ready', () => { console.log('Hypercore is ready') })
  ```

  The feed event will be emitted once after the hypercore is created/opened.

  The problem with waiting for the 'ready' event this way is if that you might
  accidentally add the listener after the 'ready' event has already been
  emitted. In that situation, your callback will never be called.

2. Use the .ready() "thunk" method:

  ```
  feed.ready(() => { console.log('Hypercore is ready') })
  ```

  The callback passed to the `.ready()` "thunk" will be called once the hypercore
  is ready. It will still be called even if you call `.ready()` after the
  'ready' event has already been emitted.

  Internally, the `.ready()` thunk is implemented using:

  * **thunky**: [mafintosh/thunky](https://github.com/mafintosh/thunky)

  The nice thing about using the thunk method is that it is easy to call
  `.ready()` in multiple places in your code, and not have to worry about
  attaching a listener too late.

# Working with keys

You will frequently need to retrieve the public key from your hypercore in
order to share it with others.

Once the hypercore feed is ready, you can simply retrieve it from the `.key`
property. The keys are stored in binary format as Node.js Buffer objects. Often,
when you need to pass a key to another library, you will want to pass it as
a Buffer. Some libraries will accept either strings or Buffer objects for keys.

If you want to convert a key stored as a Buffer to a string, you can just use
the `.toString('hex')` method to get it in hexadecimal format.

If you just want a short representation of a key to display in your user
interface, check out the `pretty-hash` npm module. It is good practice to
avoid showing full public keys on the screen unless you are explicitly
sharing data, as the public key can be used to discover and decrypt data that
you might not have wanted to share ... imagine when somebody takes a photo of
the computer on your desk!

* **pretty-hash**: [pfrazee/pretty-hash](https://github.com/pfrazee/pretty-hash)

Here's a short sample (suggested file name: `print-keys.js`) showing three
different ways to display the public key:

```js
const hypercore = require('hypercore')
const prettyHash = require('pretty-hash')

const feed = hypercore('./my-feed')

// Must wait until feed is ready
feed.ready(() => {
  console.log('Public Key (Buffer):', feed.key)
  console.log('Public Key (String):', feed.key.toString('hex'))
  console.log('Public Key (Pretty hash):', prettyHash(feed.key))
})
```

Output:

```
$ node print-keys.js
Public Key (Buffer): <Buffer e1 3a be 5e 44 cb 7b 41 1e 8c 46 2c b7 7e bd e4 01 2e 00 2e 6e c6 15 72 0b 06 f7 37 32 98 4f 23>
Public Key (String): e13abe5e44cb7b411e8c462cb77ebde4012e002e6ec615720b06f73732984f23
Public Key (Pretty hash): e13abe..23
```

You will often need to convert a key the other way, from a string to a Buffer. For
example, you may have a program that accepts a key via command line arguments.
Or you might have a list of keys stored somewhere. If it is just a hexadecimal
string, you can simply use the Node.js Buffer library:

```
const key = Buffer.from(keyAsString, 'hex')
```

Here are some other useful utility libraries for working with keys and Dat URLs:

* **to-buffer**: [mafintosh/to-buffer](https://github.com/mafintosh/to-buffer)

  A handy convenience library for when you need a key as a Buffer, but you want
  to convert from either a Buffer or a String,
  eg: `const key = toBuffer(inputKey, 'hex')`

* **dat-encoding**: [dat-land/dat-encoding](https://github.com/dat-land/dat-encoding)

  Converts keys to/from Buffers and strings. Ensures keys are the correct length.

* **dat-dns**: [datprotocol/dat-dns](https://github.com/datprotocol/dat-dns)

  Beaker Browser and the Dat command line use this library to convert dat://... 
  URLs into public keys. If you have a dat://... URL that isn't a simple
  hex number, you will need to use a library like this to do lookups.

* **dat-link-resolve**: [datproject/dat-link-resolve](https://github.com/datproject/dat-link-resolve)

  Resolves a number of common dat URL representations. A superset of **dat-dns**.

* **parse-dat-url**: [pfrazee/parse-dat-url](https://github.com/pfrazee/parse-dat-url)

  Parses a Dat URL into parts, similar to Node.js url.parse.

