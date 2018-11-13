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

