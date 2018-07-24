const hypercore = require('hypercore')
const ram = require('random-access-memory')
const {blue, green, red, yellow} = require('chalk')
const stripAnsi = require('strip-ansi')
const diffy = require('diffy')({fullscreen: true})
const trim = require('diffy/trim')

let feed = null
let ready = false
let count = 0

const ops = [
  {
    cmd: `const feed = hypercore('./my-feed')  ` +
      blue(`/* create hypercore in 'my-feed' directory */`),
    delay: 1500
  },
  {
    cmd: `feed.ready(callback)                 ` +
      blue(`/* wait for hypercore to be created */`),
    delay: 3000
  },
  {
    cmd: blue(`/* Feed is now ready. Let's add some records!!! */`),
    delay: 2000
  },
  {
    cmd: "feed.append('" + green('First record') + "', callback)",
    delay: 2000
  },
  {
    cmd: "feed.append('" + green('Second record') + "', callback)",
    delay: 2000,
  },
  {
    cmd: "feed.append('" + green('Third record') + "', callback)",
    delay: 2000,
  },
  {
    cmd: "feed.append('" + green('etc...') + "', callback)",
    delay: 2000,
  },
  {
    cmd: "feed.append('" + green('Last one!') + "', callback)",
    delay: 5000
  }
]
const commitedOps = ' '.repeat(ops.length).split('')
const data = []

diffy.render(() => {
  return (
    '\n' +
    trim(`
      Code
      ════
    `) + '\n\n' +
    commitedOps.join('\n') + '\n\n\n' +
    trim(`
      Data
      ════
    `) + '\n\n' +
    (
      feed ? (
        ready ? (
          `Key: ${feed && feed.key.toString('hex')}\n` +
          `Length: ${feed && data.length}\n\n` +
          `┌───────┬─────────────────────┐\n` +
          `│ Index │ Value               │\n` +
          (data.length > 0 ? `├───────┼─────────────────────┤\n` : '') +
          data.map((value, index) => {
            return `│ ${String(index).padEnd(5)} │ ${green(value.padEnd(19))} │\n`
          }).join('') +
          `└───────┴─────────────────────┘`
        ) : 'Created!! ' + yellow('(waiting for it to be ready)') + '\n\n\n\n'
      ) : red('Feed not created yet.') + '\n\n\n\n'
    ) + '\n'.repeat(10 - count)
  )
})

function nextOp () {
  const op = ops[count]
  commitedOps[count] = op.cmd
  if (op.cmd.match(/hypercore/)) {
    feed = hypercore(ram)
  }
  if (op.cmd.match(/ready/)) {
    setTimeout(() => { ready = true }, 1500)
  }
  const match = op.cmd.match(/append\('(.*)'/)
  if (match) data.push(stripAnsi(match[1]))
  diffy.render()
  count++
  setTimeout(() => {
    if (count < ops.length) nextOp()
  }, op.delay)
}
setTimeout(nextOp, 2000)

