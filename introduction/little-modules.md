# There are a many little modules

## Concepts

* [Pragmatic Modularity](http://mafintosh.com/pragmatic-modularity.html)
* Modules funded by CS&S are hosted at their author's GitHub (podcast)
* NPM
* http://module.party/
* gitverse and hypergit

## Who are the people?

## All those hyper* package names

## Example

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


* append-tree: [mafintosh/append-tree](https://github.com/mafintosh/append-tree)
* array-lru: [mafintosh/array-lru](https://github.com/mafintosh/array-lru)
* atomic-batcher: [mafintosh/atomic-batcher](https://github.com/mafintosh/atomic-batcher)
* bencode: [themasch/node-bencode](https://github.com/themasch/node-bencode)
* bitfield-rle: [mafintosh/bitfield-rle](https://github.com/mafintosh/bitfield-rle)
* bittorrent-dht: [webtorrent/bittorrent-dht](https://github.com/webtorrent/bittorrent-dht)
* blake2b: [emilbayes/blake2b](https://github.com/emilbayes/blake2b)
* blake2b-wasm: [mafintosh/blake2b-wasm](https://github.com/mafintosh/blake2b-wasm)
* buffer-alloc: [LinusU/buffer-alloc](https://github.com/LinusU/buffer-alloc)
* buffer-alloc-unsafe: [LinusU/buffer-alloc-unsafe](https://github.com/LinusU/buffer-alloc-unsafe)
* buffer-equals: [sindresorhus/buffer-equals](https://github.com/sindresorhus/buffer-equals)
* buffer-fill: [LinusU/buffer-fill](https://github.com/LinusU/buffer-fill)
* buffer-from: [LinusU/buffer-from](https://github.com/LinusU/buffer-from)
* bulk-write-stream: [mafintosh/bulk-write-stream](https://github.com/mafintosh/bulk-write-stream)
* circular-append-file: [pfrazee/circular-append-file](https://github.com/pfrazee/circular-append-file)
* codecs: [mafintosh/codecs](https://github.com/mafintosh/codecs)
* connections: [maxogden/connections](https://github.com/maxogden/connections)
* core-util-is: [isaacs/core-util-is](https://github.com/isaacs/core-util-is)
* dat-swarm-defaults: [datproject/dat-swarm-defaults](https://github.com/datproject/dat-swarm-defaults)
* debug: [visionmedia/debug](https://github.com/visionmedia/debug)
* discovery-channel: [maxogden/discovery-channel](https://github.com/maxogden/discovery-channel)
* discovery-swarm: [mafintosh/discovery-swarm](https://github.com/mafintosh/discovery-swarm)
* dns-discovery: [mafintosh/dns-discovery](https://github.com/mafintosh/dns-discovery)
* dns-packet: [mafintosh/dns-packet](https://github.com/mafintosh/dns-packet)
* dns-socket: [mafintosh/dns-socket](https://github.com/mafintosh/dns-socket)
* duplexify: [mafintosh/duplexify](https://github.com/mafintosh/duplexify)
* end-of-stream: [mafintosh/end-of-stream](https://github.com/mafintosh/end-of-stream)
* flat-tree: [mafintosh/flat-tree](https://github.com/mafintosh/flat-tree)
* from2: [hughsk/from2](https://github.com/hughsk/from2)
* hypercore: [mafintosh/hypercore](https://github.com/mafintosh/hypercore)
* hypercore-crypto: [mafintosh/hypercore-crypto](https://github.com/mafintosh/hypercore-crypto)
* hypercore-protocol: [mafintosh/hypercore-protocol](https://github.com/mafintosh/hypercore-protocol)
* hyperdiscovery: [karissa/hyperdiscovery](https://github.com/karissa/hyperdiscovery)
* hyperdrive: [mafintosh/hyperdrive](https://github.com/mafintosh/hyperdrive)
* inherits: [isaacs/inherits](https://github.com/isaacs/inherits)
* ini: [npm/ini](https://github.com/npm/ini)
* inspect-custom-symbol: [mafintosh/inspect-custom-symbol](https://github.com/mafintosh/inspect-custom-symbol)
* ip: [indutny/node-ip](https://github.com/indutny/node-ip)
* is-options: [mafintosh/is-options](https://github.com/mafintosh/is-options)
* isarray: [juliangruber/isarray](https://github.com/juliangruber/isarray)
* k-bucket: [tristanls/k-bucket](https://github.com/tristanls/k-bucket)
* k-rpc: [mafintosh/k-rpc](https://github.com/mafintosh/k-rpc)
* k-rpc-socket: [mafintosh/k-rpc-socket](https://github.com/mafintosh/k-rpc-socket)
* last-one-wins: [mafintosh/last-one-wins](https://github.com/mafintosh/last-one-wins)
* length-prefixed-message: [sorribas/length-prefixed-message](https://github.com/sorribas/length-prefixed-message)
* lru: [chriso/lru](https://github.com/chriso/lru)
* memory-pager: [mafintosh/memory-pager](https://github.com/mafintosh/memory-pager)
* merkle-tree-stream: [mafintosh/merkle-tree-stream](https://github.com/mafintosh/merkle-tree-stream)
* minimist: [substack/minimist](https://github.com/substack/minimist)
* mkdirp: [substack/node-mkdirp](https://github.com/substack/node-mkdirp)
* ms: [zeit/ms](https://github.com/zeit/ms)
* multicast-dns: [mafintosh/multicast-dns](https://github.com/mafintosh/multicast-dns)
* multistream: [feross/multistream](https://github.com/feross/multistream)
* mutexify: [mafintosh/mutexify](https://github.com/mafintosh/mutexify)
* nan: [nodejs/nan](https://github.com/nodejs/nan)
* nanoassert: [emilbayes/nanoassert](https://github.com/emilbayes/nanoassert)
* network-address: [mafintosh/network-address](https://github.com/mafintosh/network-address)
* node-gyp-build: [mafintosh/node-gyp-build](https://github.com/mafintosh/node-gyp-build)
* normalize-path: [jonschlinkert/normalize-path](https://github.com/jonschlinkert/normalize-path)
* once: [isaacs/once](https://github.com/isaacs/once)
* pretty-hash: [pfrazee/pretty-hash](https://github.com/pfrazee/pretty-hash)
* process-nextick-args: [calvinmetcalf/process-nextick-args](https://github.com/calvinmetcalf/process-nextick-args)
* protocol-buffers-encodings: [mafintosh/protocol-buffers-encodings](https://github.com/mafintosh/protocol-buffers-encodings)
* pump: [mafintosh/pump](https://github.com/mafintosh/pump)
* random-access-file: [random-access-storage/random-access-file](https://github.com/random-access-storage/random-access-file)
* random-access-memory: [random-access-storage/random-access-memory](https://github.com/random-access-storage/random-access-memory)
* random-access-storage: [random-access-storage/random-access-storage](https://github.com/random-access-storage/random-access-storage)
* randombytes: [crypto-browserify/randombytes](https://github.com/crypto-browserify/randombytes)
* readable-stream: [nodejs/readable-stream](https://github.com/nodejs/readable-stream)
* remove-trailing-separator: [darsain/remove-trailing-separator](https://github.com/darsain/remove-trailing-separator)
* rusha: [srijs/rusha](https://github.com/srijs/rusha)
* safe-buffer: [feross/safe-buffer](https://github.com/feross/safe-buffer)
* signed-varint: [dominictarr/signed-varint](https://github.com/dominictarr/signed-varint)
* simple-sha1: [michaelrhodes/simple-sha1](https://github.com/michaelrhodes/simple-sha1)
* siphash24: [mafintosh/siphash24](https://github.com/mafintosh/siphash24)
* sodium-javascript: [sodium-friends/sodium-javascript](https://github.com/sodium-friends/sodium-javascript)
* sodium-native: [sodium-friends/sodium-native](https://github.com/sodium-friends/sodium-native)
* sodium-universal: [sodium-friends/sodium-universal](https://github.com/sodium-friends/sodium-universal)
* sorted-indexof: [mafintosh/sorted-indexof](https://github.com/mafintosh/sorted-indexof)
* sparse-bitfield: [mafintosh/sparse-bitfield](https://github.com/mafintosh/sparse-bitfield)
* speedometer: [mafintosh/speedometer](https://github.com/mafintosh/speedometer)
* stream-collector: [mafintosh/stream-collector](https://github.com/mafintosh/stream-collector)
* stream-each: [mafintosh/stream-each](https://github.com/mafintosh/stream-each)
* stream-shift: [mafintosh/stream-shift](https://github.com/mafintosh/stream-shift)
* string_decoder: [nodejs/string_decoder](https://github.com/nodejs/string_decoder)
* thunky: [mafintosh/thunky](https://github.com/mafintosh/thunky)
* to-buffer: [mafintosh/to-buffer](https://github.com/mafintosh/to-buffer)
* uint64be [mafintosh/uint64be](https://github.com/mafintosh/uint64be)
* unixify [jonschlinkert/unixify](https://github.com/jonschlinkert/unixify)
* unordered-array-remove [mafintosh/unordered-array-remove](https://github.com/mafintosh/unordered-array-remove)
* unordered-set [mafintosh/unordered-set](https://github.com/mafintosh/unordered-set)
* util-deprecate [TooTallNate/util-deprecate](https://github.com/TooTallNate/util-deprecate)
* utp-native: [mafintosh/utp-native](https://github.com/mafintosh/utp-native)
* varint: [chrisdickinson/varint](https://github.com/chrisdickinson/varint)
* wrappy: [npm/wrappy](https://github.com/npm/wrappy)
* xsalsa20: [mafintosh/xsalsa20](https://github.com/mafintosh/xsalsa20)
* xtend: [Raynos/xtend](https://github.com/Raynos/xtend)
