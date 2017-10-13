# Javascript Pachong

[![Greenkeeper badge](https://badges.greenkeeper.io/sc0Vu/jspachong.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/sc0Vu/jspachong.svg?branch=master)](https://travis-ci.org/sc0Vu/jspachong)

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
