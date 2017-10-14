# Javascript Pachong
[![Build Status](https://travis-ci.org/sc0Vu/jspachong.svg?branch=master)](https://travis-ci.org/sc0Vu/jspachong)
[![Dependency Status](https://www.versioneye.com/user/projects/59e026562de28c219b11a161/badge.svg?style=flat-square)](https://www.versioneye.com/user/projects/59e026562de28c219b11a161)

Pachong which means a generic term for vertebrates in chinese, you can find here [chinese dictionary](http://dict.revised.moe.edu.tw/cbdic/), and it's something like crawler.

This is a crawler library written in javascript, so you can use this in server side or browser.

# Usage
```
npm install jspachong
```

### Benchmark
It will crawl 10 pages parallelly and sequentially.

```
npm run benchmark
```

### Server Side
```
var Pachong = require('jspachong')
var crawler = new Pachong(requestObject, options)

crawler.queue(requestObject)
       .queue(requestObject)
       .queue(requestObject)
       .run()
       .then((res) => {})
       .catch((err) => {})
```

* requestObject

  request library options
  ```
  simple: {
    method: 'GET',
    uri: 'https://www.google.com'
    callback: function (err, res) {
      if (err) return
      // Do something here...
    }
  }
  ```
  
  see [request document](https://github.com/request/request#requestoptions-callback) for more information

* options

  ```
  parallel bool
  Run crawlers parallel.

  max integer
  Max crawlers run each time.
  ```

### Browser
To do.

# License
MIT
