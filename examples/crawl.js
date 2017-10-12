var Pachong = require('../index')
var crawler = new Pachong({
  method: 'GET',
  uri: 'https://httpbin.org/uuid'
}, {
  parallel: true,
  max: 10
})

async function crawl(times) {
  var isError = false

  for (var i=0; i<times; i++) {
    for (var i=9; i>0; i--) {
      crawler.queue({
        method: 'GET',
        uri: 'https://httpbin.org/uuid'
      })
    }

    try {
      var res = await crawler.run()
      console.log(`Resource ${res}`)
    } catch (err) {
      isError = true
      console.log(`Error ${err.message}`)
    }
  }
  process.exit((isError) ? 1 : 0)
}

crawl(1)