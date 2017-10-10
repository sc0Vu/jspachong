var Pachong = require('../index')
var tape = require('tape')

tape('Test run in parallel', (t) => {
  var uuids = []

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

        st.equals(uuids.indexOf(data.uuid), -1)
        uuids.push(data.uuid)
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

        st.equals(uuids.indexOf(data.uuid), -1)
        uuids.push(data.uuid)
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

        st.equals(uuids.indexOf(data.uuid), -1)
        uuids.push(data.uuid)
      }
    }).run().then((reses) => {
      reses.forEach((res) => {
        var data = JSON.parse(res.body)

        st.equals(uuids.indexOf(data.uuid) >= 0, true)
      })
      st.end()
    }).catch((err) => {
      st.deepEquals(err, null)
      st.end()
    })
  })
})

tape('Test run sequentially', (t) => {
  var uuids = []

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

        st.equals(uuids.indexOf(data.uuid), -1)
        uuids.push(data.uuid)
      }
    }, {
      parallel: false
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

        st.equals(uuids.indexOf(data.uuid), -1)
        uuids.push(data.uuid)
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

        st.equals(uuids.indexOf(data.uuid), -1)
        uuids.push(data.uuid)
      }
    }).run().then((reses) => {
      reses.forEach((res) => {
        var data = JSON.parse(res.body)

        st.equals(uuids.indexOf(data.uuid) >= 0, true)
      })
      st.end()
    }).catch((err) => {
      st.deepEquals(err, null)
      st.end()
    })
  })
})