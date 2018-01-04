const path = require('path');
const express = require('express');
// const webpack = require('webpack');
// const webpackMiddleware = require('webpack-dev-middleware');
// const webpackHotMiddleware = require('webpack-hot-middleware');
// const config = require('./webpack/prod.js');

// const isDeveloping = process.env.NODE_ENV !== 'production';
const port = 8888 || process.env.PORT;
const app = express();

app.use('/survey', express.static(path.join(__dirname, '/../../web/src/main/webapp')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../../web/src/main/webapp/index.html'));
});

app.listen(port, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
