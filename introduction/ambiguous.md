# Ambiguous Terms

You can skip this section if you already are familiar with the project.

If you are new to the project, you will find that it takes a while to learn the
names of all the little libraries, and what they do. These tutorials are here
to help you learn about them. Don't worry, you only need to know a few to get
started, and the libraries themselves are quite small and easy to learn.

But before we get to that, let's talk about the word "Dat". It is used as a
shorthand word for for many different, but related, things.

# Dat

The name "Dat" is a made-up word and not an acronym (depending on who you ask),
so it is not considered correct to capitalize it as "DAT". It is okay to write it lowercase as just "dat".

You will hear the word "Dat" used in several different contexts by different people.
You might hear the following:

* the **"[Dat Project](https://datproject.org/)"** - a loose collection of related open source projects organized under the umbrella of the non-profit [Code for Science &amp; Society](https://codeforscience.org/), which organized and paid the initial team that created it (sponsored by grants). "Dat" by itself isn't very search engine friendly, so it's often good to use the words "Dat Project".
* the **"[dat](https://github.com/datproject/dat)"** command-line interface (cli) - `dat` is a tool (installable via npm) which provides any easy way to version and share datasets - it's a bit like a "git" for data. Non-developers can use it to create, share and clone folders of files. There is also a "[Dat Desktop](https://github.com/dat-land/dat-desktop)" app built with Electron for users that don't want to use the command line.
* **"a dat"** - this is a quick way to refer to a **"Dat archive"**, which is just a collection of files that has been bundled together so they can be easy distributed and version
controlled. You can create "a dat" in many different ways, for example, with the `dat` command-line interface, the Dat Desktop, with Beaker Browser, or with Node.js code libraries, such as [dat-node](https://github.com/datproject/dat-node), [hyperdrive](https://github.com/mafintosh/hyperdrive). There's even a group of developers actively working on a [Rust implementation](https://datrs.yoshuawuyts.com/).
* **"a dat Link", "a dat address", "a dat URL", "a dat key", "a key", "a public key"** - when a person makes a Dat archive, a randomly-generated cryptographic key pair is created for that archive, consisting of a public key and a private key. The public key is 32 bytes long, which can be represented as a 64-character hexadecimal string. The key can be used as a URL for sharing, eg. [dat://9900f9aad4d6e79e0beb1c46333852b99829e4dfcdfa9b690eeeab3c367c1b9a/](dat://9900f9aad4d6e79e0beb1c46333852b99829e4dfcdfa9b690eeeab3c367c1b9a/) -- Also, it is possible to use shorter Dat URLs, eg. [dat://fritter.hashbase.io/](dat://9900f9aad4d6e79e0beb1c46333852b99829e4dfcdfa9b690eeeab3c367c1b9a/) which will resolve to a hexadecimal Dat address using DNS and/or HTTPS (see [dat-dns](https://github.com/datprotocol/dat-dns) for more info).
* **"shared via dat"** or **"via the dat network"** - in addition to the software, there is also a peer-to-peer network on the Internet that lets people easily share dat archives with each other. The "discovery" libraries included with Dat use a number of mechanisms to find other peers sharing the same keys. On a local network, which might not even be connected to the Internet, peers can find each other using "multicast DNS". On the Internet, primarily peers advertise that they have data with a set of specialized DNS servers run by the Dat project for quick connections. Additionally, peers advertise with the BitTorrent DHT (Distributed Hash Table) which works as a fallback.
