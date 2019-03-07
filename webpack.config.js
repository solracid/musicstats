var webpack = require('webpack');
var path    = require ('path');

module.exports = {
    // Since webpack 4 we will need to set in what mode webpack is running
    mode: 'development',
    // Entry file for all React code
    entry: [
      './client/index.jsx',
    ],
    // Path where final bundle file will be outputed
    output: {
      path: path.join(__dirname, '/server/public/js/'),
		  filename: 'bundle.js',
		  publicPath: 'server/public/js/',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-react',
                '@babel/preset-env',
              ],
              compact: false,
            },
          },
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx', '.scss'],
    },
  };

