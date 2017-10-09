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
  return crawler
}