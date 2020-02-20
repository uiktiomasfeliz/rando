const express = require('express');
const compression  = require('compression');
const bodyParser = require('body-parser');
const path = require('path');
const zlib = require('zlib');
const trucks = require('../routes/truck.routes');

module.exports = class RouteConfig {
  static init(app) {
    app.use(compression({
      level: zlib.Z_BEST_COMPRESSION,
      threshold: '1kb',
    }));
    app.use(bodyParser.json({ limit: '20mb' }));
    app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
    app.use(express.static(path.resolve(__dirname, '../client/build')));
    app.use('/api', trucks);
  }
};
