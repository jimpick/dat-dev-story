# Hypercore superpowers

Hypercore is very simple. It only supports appending data.

But hypercore has a few magic features:

* **Pluggable storage backends**

  The default storage backend that comes with hypercore uses disk storage
  in a subdirectory on your computer. It works much like any other disk-backed
  database. So the data you append will be *persisted* to disk, and will still
  be available even if you stop and then restart your program. Because the data
  is stored on disk, it can be larger than the memory in your computer.

  Alternatively, you can supply alternative storage backends. Any module that
  supports the
  **[random-access-storage](https://github.com/random-access-storage/random-access-storage)**
  interface will work.

  The most common alternate storage backend is
  **[random-access-memory](https://github.com/random-access-storage/random-access-memory)**
  which allows you to keep the hypercore data entirely in memory. It is ideal
  for applications that just need to query data from the network on demand, and
  which do not need to persist data.

  The [random-access-storage
  organization](https://github.com/random-access-storage) on GitHub has
  collected together several popular storage backend implementations.

* **Replication**

  Hypercore was created for the purpose of making it easy to replicate data.

  Two hypercores connected over a bi-directional connection can talk to each
  other and efficiently sync data using the
  "**[hypercore-protocol](https://github.com/mafintosh/hypercore-protocol)**".

  Hypercore has special support for *sparse replication*, so it is possible to
  connect to hypercore and only sync the data you are interested in.

  If connections are long-lived, it is possible to replicate data in *live
  mode*, allowing peers to *subscribe* to data and to get events in real-time
  as data is synced immediately after being appended.

* **Cryptography**

  When you create a hypercore, it randomly generates a *keypair* consisting of
  a public key and a secret key.

  The 32-byte (64 hex characters) public key is used for sharing references to
  the hypercore. The public key is also used to encrypt data in-transit so that
  it can't be snooped on by anybody who does not have the key.

  All data that is appended to the hypercore is signed with the private key.
  When hypercores are replicated, the signatures are verified against the
  public key, so only the owner of the hypercore can append data.

  A special *discovery key* derived from the public key is used when
  talking to untrusted services to avoid revealing the public key so that
  interlopers can't snoop on the data passing through.

  Internally, data is hashed and stored in a *merkle tree* based data structure,
  which enables quick lookups and ensures data integrity.

* **Streams**

  You can use Node.js streams to pipe data directly into or out of a hypercore.

* **Binary data, unicode strings, JSON or pluggable encodings**

  Hypercore is built for binary data. But it also works well with unicode
  string data or JSON data. You can specify any encoding that conforms to the
  **[abstract-encoding](https://github.com/mafintosh/abstract-encoding)**
  interface.
