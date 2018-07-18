# There are many little modules

## Concepts

* [Pragmatic Modularity](http://mafintosh.com/pragmatic-modularity.html)
* Modules funded by CS&S are hosted at their author's GitHub (podcast)
* NPM
* http://module.party/
* gitverse and hypergit

## Who are the people?

## All those hyper* package names

## Real-world example

Here is a minimalistic example showing how to download a file from a Dat
archive:

```js
const hyperdrive = require('hyperdrive')
const hyperdiscovery = require('hyperdiscovery')
const ram = require('random-access-memory')

const key = '9900f9aad4d6e79e0beb1c46333852b99829e4dfcdfa9b690eeeab3c367c1b9a'
const archive = hyperdrive(ram, key, {sparse: true})

archive.ready(() => {
  hyperdiscovery(archive)
  archive.readFile('dat.json', (err, data) => {
    if (err) throw err
    console.log(data.toString())
    process.exit(0)
  })
})
```

It depends on some npm modules, so you'll need to install those:

`npm install hyperdrive hyperdiscovery random-access-memory`

At the time this was written, in node_modules, there are 97 npm modules!

Let's break it down a bit...

### Explicit module dependencies

Three modules were explicitly 'required':

* **hyperdrive**: [mafintosh/hyperdrive](https://github.com/mafintosh/hyperdrive)

  This exposes a virtual filesystem interface. Hyperdrive is the primary module used to implement a Dat archive. We'll describe some [hyperdrive-specific dependencies](#hyperdrive-specific-dependencies) below.

* **hyperdiscovery**: [karissa/hyperdiscovery](https://github.com/karissa/hyperdiscovery)

  Hyperdrive doesn't know anything about the network, but it does expose a
  replication interface. Hyperdiscovery is a convenience wrapper around
  some other modules that can be used to connect to the peer-to-peer
  network and sync data. We'll describe some [hyperdiscovery-specific 
  dependencies](#hyperdiscovery-specific-dependencies) below.

* **random-access-memory**: [random-access-storage/random-access-memory](https://github.com/random-access-storage/random-access-memory)

  By default, Hyperdrive stores archives on disk. But you can tell it
  to use alternative "random-access storage" modules. In this case, we
  just use in-memory storage implemented by random-access-storage.

### Hyperdrive-specific Dependencies

Hyperdrive ([github](https://github.com/mafintosh/hyperdrive)),
provides a filesystem abstraction. It is built on top of a pair of
"append-only logs", implemented with [Hypercore (below)](#hypercore).

* **append-tree**: [mafintosh/append-tree](https://github.com/mafintosh/append-tree)
* **codecs**: [mafintosh/codecs](https://github.com/mafintosh/codecs)

### Hypercore

* **hypercore**: [mafintosh/hypercore](https://github.com/mafintosh/hypercore)

  Hypercore provides an "append-only log" abstraction, as well as a method
  for replicating over a stream.

  Some documentation:
  
  * [DEP 0002 - Official Hypercore Specification](https://www.datprotocol.com/deps/0002-hypercore/)
  * [Dat Paper](https://github.com/datproject/docs/blob/master/papers/dat-paper.pdf)
  * [How Hypercore Works](https://github.com/datproject/docs/blob/master/docs/hyperdrive_spec.md#how-hypercore-works) (from an older spec)

Additionally, the following parts of hypercore are split into their own
modules so they can be re-used elsewhere:

* **hypercore-crypto**: [mafintosh/hypercore-crypto](https://github.com/mafintosh/hypercore-crypto) - The routines used to generate keypairs and hash/encrypt/decrypt the data stored in hypercore. See the [Encryption Modules](#encryption-modules) section to learn about the sub-dependencies.
* **hypercore-protocol**: [mafintosh/hypercore-protocol](https://github.com/mafintosh/hypercore-protocol) - Used to build Node.js duplex "streams" that can be connected to pipes (eg. network sockets) to efficiently replicate data stored in hypercores.
* **merkle-tree-stream**: [mafintosh/merkle-tree-stream](https://github.com/mafintosh/merkle-tree-stream)
* **flat-tree**: [mafintosh/flat-tree](https://github.com/mafintosh/flat-tree)
* **sparse-bitfield**: [mafintosh/sparse-bitfield](https://github.com/mafintosh/sparse-bitfield)
* **atomic-batcher**: [mafintosh/atomic-batcher](https://github.com/mafintosh/atomic-batcher)
* **bitfield-rle**: [mafintosh/bitfield-rle](https://github.com/mafintosh/bitfield-rle)


### Hyperdiscovery-specific Dependencies

* **dat-swarm-defaults**: [datproject/dat-swarm-defaults](https://github.com/datproject/dat-swarm-defaults)
* **discovery-swarm**: [mafintosh/discovery-swarm](https://github.com/mafintosh/discovery-swarm)
* **discovery-channel**: [maxogden/discovery-channel](https://github.com/maxogden/discovery-channel)
* **connections**: [maxogden/connections](https://github.com/maxogden/connections)

Secondary dependencies:

#### DNS Discovery Modules

* **dns-discovery**: [mafintosh/dns-discovery](https://github.com/mafintosh/dns-discovery)
* **multicast-dns**: [mafintosh/multicast-dns](https://github.com/mafintosh/multicast-dns)
* **dns-packet**: [mafintosh/dns-packet](https://github.com/mafintosh/dns-packet)
* **dns-socket**: [mafintosh/dns-socket](https://github.com/mafintosh/dns-socket)

#### DHT Discovery Modules

* **bittorrent-dht**: [webtorrent/bittorrent-dht](https://github.com/webtorrent/bittorrent-dht)
* **bencode**: [themasch/node-bencode](https://github.com/themasch/node-bencode)
* **k-bucket**: [tristanls/k-bucket](https://github.com/tristanls/k-bucket)
* **k-rpc**: [mafintosh/k-rpc](https://github.com/mafintosh/k-rpc)
* **k-rpc-socket**: [mafintosh/k-rpc-socket](https://github.com/mafintosh/k-rpc-socket)

#### UTP

* **utp-native**: [mafintosh/utp-native](https://github.com/mafintosh/utp-native)

#### Networking-related Utilities

* **ip**: [indutny/node-ip](https://github.com/indutny/node-ip)
* **network-address**: [mafintosh/network-address](https://github.com/mafintosh/network-address)
* **length-prefixed-message**: [sorribas/length-prefixed-message](https://github.com/sorribas/length-prefixed-message) (used by discovery-swarm)
* **speedometer**: [mafintosh/speedometer](https://github.com/mafintosh/speedometer) (only used by diagnostics server in dns-discovery)
* **circular-append-file**: [pfrazee/circular-append-file](https://github.com/pfrazee/circular-append-file) (only used by diagnostics server in dns-discovery)

### Random-Access Storage Modules

* **random-access-storage**: [random-access-storage/random-access-storage](https://github.com/random-access-storage/random-access-storage)
* **random-access-file**: [random-access-storage/random-access-file](https://github.com/random-access-storage/random-access-file)

### Encryption Modules

* **sodium-universal**: [sodium-friends/sodium-universal](https://github.com/sodium-friends/sodium-universal)
* **sodium-native**: [sodium-friends/sodium-native](https://github.com/sodium-friends/sodium-native)
* **sodium-javascript**: [sodium-friends/sodium-javascript](https://github.com/sodium-friends/sodium-javascript)

* **blake2b**: [emilbayes/blake2b](https://github.com/emilbayes/blake2b)
* **blake2b-wasm**: [mafintosh/blake2b-wasm](https://github.com/mafintosh/blake2b-wasm)
* **rusha**: [srijs/rusha](https://github.com/srijs/rusha)
* **simple-sha1**: [michaelrhodes/simple-sha1](https://github.com/michaelrhodes/simple-sha1)
* **siphash24**: [mafintosh/siphash24](https://github.com/mafintosh/siphash24)
* **xsalsa20**: [mafintosh/xsalsa20](https://github.com/mafintosh/xsalsa20)

### Useful Data Structures

* **array-lru**: [mafintosh/array-lru](https://github.com/mafintosh/array-lru) (used by hypercore and append-tree (part of hyperdrive))
* **lru**: [chriso/lru](https://github.com/chriso/lru) (used by bittorrent-dht and dns-discovery)
* **memory-pager**: [mafintosh/memory-pager](https://github.com/mafintosh/memory-pager) (used by hypercore and sparse-bitfield)
* **sorted-indexof**: [mafintosh/sorted-indexof](https://github.com/mafintosh/sorted-indexof) (used by hypercore-protocol)
* **unordered-array-remove** [mafintosh/unordered-array-remove](https://github.com/mafintosh/unordered-array-remove)
* **unordered-set** [mafintosh/unordered-set](https://github.com/mafintosh/unordered-set)

### Numerical Support

* **uint64be** [mafintosh/uint64be](https://github.com/mafintosh/uint64be)

### Protocol Buffers Support

* **protocol-buffers-encodings**: [mafintosh/protocol-buffers-encodings](https://github.com/mafintosh/protocol-buffers-encodings) (needed by hypercore-protocol and append-tree from hyperdrive)
* **signed-varint**: [dominictarr/signed-varint](https://github.com/dominictarr/signed-varint)
* **varint**: [chrisdickinson/varint](https://github.com/chrisdickinson/varint)

### Node.js Stream Utilities

* **bulk-write-stream**: [mafintosh/bulk-write-stream](https://github.com/mafintosh/bulk-write-stream)
* **duplexify**: [mafintosh/duplexify](https://github.com/mafintosh/duplexify)
* **end-of-stream**: [mafintosh/end-of-stream](https://github.com/mafintosh/end-of-stream)
* **from2**: [hughsk/from2](https://github.com/hughsk/from2)
* **multistream**: [feross/multistream](https://github.com/feross/multistream)
* **pump**: [mafintosh/pump](https://github.com/mafintosh/pump)
* **stream-collector**: [mafintosh/stream-collector](https://github.com/mafintosh/stream-collector)
* **stream-each**: [mafintosh/stream-each](https://github.com/mafintosh/stream-each)
* **stream-shift**: [mafintosh/stream-shift](https://github.com/mafintosh/stream-shift)

### Javascript Control Flow Utilities

* **last-one-wins**: [mafintosh/last-one-wins](https://github.com/mafintosh/last-one-wins)
* **mutexify**: [mafintosh/mutexify](https://github.com/mafintosh/mutexify)
* **thunky**: [mafintosh/thunky](https://github.com/mafintosh/thunky)
* **once**: [isaacs/once](https://github.com/isaacs/once)
* **wrappy**: [npm/wrappy](https://github.com/npm/wrappy)

### Node.js and Browser Compatibility Modules

Some of these modules are to support older versions of Node.js, and some are for browser support.

* **readable-stream**: [nodejs/readable-stream](https://github.com/nodejs/readable-stream)
* **buffer-alloc**: [LinusU/buffer-alloc](https://github.com/LinusU/buffer-alloc)
* **buffer-alloc-unsafe**: [LinusU/buffer-alloc-unsafe](https://github.com/LinusU/buffer-alloc-unsafe)
* **buffer-equals**: [sindresorhus/buffer-equals](https://github.com/sindresorhus/buffer-equals)
* **buffer-fill**: [LinusU/buffer-fill](https://github.com/LinusU/buffer-fill)
* **buffer-from**: [LinusU/buffer-from](https://github.com/LinusU/buffer-from)
* **core-util-is**: [isaacs/core-util-is](https://github.com/isaacs/core-util-is)
* **inspect-custom-symbol**: [mafintosh/inspect-custom-symbol](https://github.com/mafintosh/inspect-custom-symbol)
* **isarray**: [juliangruber/isarray](https://github.com/juliangruber/isarray)
* **nanoassert**: [emilbayes/nanoassert](https://github.com/emilbayes/nanoassert)
* **process-nextick-args**: [calvinmetcalf/process-nextick-args](https://github.com/calvinmetcalf/process-nextick-args)
* **randombytes**: [crypto-browserify/randombytes](https://github.com/crypto-browserify/randombytes)
* **safe-buffer**: [feross/safe-buffer](https://github.com/feross/safe-buffer)
* **string_decoder**: [nodejs/string_decoder](https://github.com/nodejs/string_decoder)
* **util-deprecate** [TooTallNate/util-deprecate](https://github.com/TooTallNate/util-deprecate)

Windows support:

* **normalize-path**: [jonschlinkert/normalize-path](https://github.com/jonschlinkert/normalize-path)
* **unixify** [jonschlinkert/unixify](https://github.com/jonschlinkert/unixify)
* **remove-trailing-separator**: [darsain/remove-trailing-separator](https://github.com/darsain/remove-trailing-separator)

### Node.js Native Module Support

* **nan**: [nodejs/nan](https://github.com/nodejs/nan)
* **node-gyp-build**: [mafintosh/node-gyp-build](https://github.com/mafintosh/node-gyp-build) (loads prebuilds or rebuilds for sodium-native and utp-native)
* **ini**: [npm/ini](https://github.com/npm/ini) (only used when building sodium-native)

### Popular Node.js Modules

* **debug**: [visionmedia/debug](https://github.com/visionmedia/debug)
* **minimist**: [substack/minimist](https://github.com/substack/minimist)
* **mkdirp**: [substack/node-mkdirp](https://github.com/substack/node-mkdirp)
* **ms**: [zeit/ms](https://github.com/zeit/ms)
* **inherits**: [isaacs/inherits](https://github.com/isaacs/inherits)
* **xtend**: [Raynos/xtend](https://github.com/Raynos/xtend)

### Convenience utilities

* **is-options**: [mafintosh/is-options](https://github.com/mafintosh/is-options)
* **to-buffer**: [mafintosh/to-buffer](https://github.com/mafintosh/to-buffer)

### UI Formatting

* **pretty-hash**: [pfrazee/pretty-hash](https://github.com/pfrazee/pretty-hash)

