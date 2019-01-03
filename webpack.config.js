var webpack = require('webpack');
var path    = require ('path');

module.exports = {
    entry: './server/routes/index.js',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'client')
    }
  };