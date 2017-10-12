const spawn = require('child_process').spawn
const crawler = spawn('node', ['crawl.js'], {
  detached: true,
  // stdio: 'ignore'
})

crawler.stdout.on('data', (data) => {
  console.log(`stdout ${data}`)
});

crawler.stderr.on('data', (data) => {
  console.log(`stderr ${data}`)
})

crawler.on('close', (code) => {
  console.log(`child process exited with code ${code}`)
})

crawler.unref()