var request = require('request-promise')

module.exports = exports = function (target, options) {
  var crawler = {}
  var defaultOptions = {
    parallel: true,
    max: 10
  }

  crawler.options = Object.assign({}, defaultOptions, options)
  crawler.targets = []

  if (target) {
    crawler.targets.push(target)
  }

  crawler.queue = function (item) {
    this.targets.push(item)
    return this
  }

  crawler.dequeue = function () {
    return this.targets.splice(0, 1)[0]
  }

  crawler.total = function () {
    return this.targets.length
  }

  crawler.run = async function () {
    var targets = this.targets.splice(0, this.options.max)
    var total = targets.length

    if (this.options.parallel) {
      targets = targets.map((target) => {
        return request(target)
      })

      return new Promise(async function (resolve, reject) {
        try {
          var res = await Promise.all(targets)
          resolve(res)
        } catch (err) {
          reject(err)
        }
      })
    }
    return new Promise(async function (resolve, reject) {
      var isError = false
      var data = []

      for (var i=0; i<total; i++) {
        try {
          data.push(await request(targets[i]))
        } catch (err) {
          isError = true
        }
      }
      if (isError) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  }
  return crawler
}