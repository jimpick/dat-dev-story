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

In addition to the public key property that is stored in `.key`, there is a
`.secretKey` property and a `.discoveryKey` property. We will talk about the
purpose of the discovery key when we cover how the discovery subsystem works.

# Utility libraries for keys and URLs

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

