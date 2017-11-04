var Pachong = require('../index')
var tape = require('tape')
var nock = require('nock')
var uuid = require('uuid/v1')()

// mock the request
nock('https://httpbin.org/uuid')
  .get('')
  .times(3)
  .reply(200, {
    uuid: uuid
  })

tape('Test run in parallel', (t) => {
  t.test('three requests', (st) => {
    var crawler = new Pachong({
      method: 'GET',
      uri: 'https://httpbin.org/uuid',
      resolveWithFullResponse: true,
      callback (err, res) {
        if (err) {
          throw err
        }
        var data = JSON.parse(res.body)

        st.equals(data.uuid, uuid)
      }
    }, {
      parallel: true
    })

    crawler.queue({
      method: 'GET',
      uri: 'https://httpbin.org/uuid',
      resolveWithFullResponse: true,
      callback (err, res) {
        if (err) {
          throw err
        }
        var data = JSON.parse(res.body)

        st.equals(data.uuid, uuid)
      }
    }).queue({
      method: 'GET',
      uri: 'https://httpbin.org/uuid',
      resolveWithFullResponse: true,
      callback (err, res) {
        if (err) {
          throw err
        }
        var data = JSON.parse(res.body)

        st.equals(data.uuid, uuid)
      }
    }).run().then((reses) => {
      st.equals(reses.length, 3)
      reses.forEach((res) => {
        var data = JSON.parse(res.body)

        st.equals(data.uuid, uuid)
      })
      st.end()
    }).catch((err) => {
      st.deepEquals(err, null)
      st.end()
    })
  })
  
  t.end()
})
