var Pachong = require('../index')
var tape = require('tape')

tape('Test queue method', (t) => {
  var crawler = new Pachong({
    method: 'GET',
    url: 'https://httpbin.org/uuid'
  }, {
    parallel: false
  })

  t.test('queue a request', (st) => {
    crawler.queue({
      method: 'GET',
      url: 'https://www.google.com'
    })
    st.equals(crawler.total(), 2)
    st.end()
  })

  t.test('dequeue a request', (st) => {
    var firstRequest = crawler.dequeue()

    st.deepEquals(firstRequest, {
      method: 'GET',
      url: 'https://httpbin.org/uuid'
    })
    st.equals(crawler.total(), 1)
    st.end()
  })
})
