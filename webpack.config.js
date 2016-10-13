var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

var DEBUG = process.env.NODE_ENV !== 'production' ? true : false;
var localAssetPath = 'commons/';

var config = {
  context: __dirname + '/src',
  devtool: 'source-map',
  entry: ['./index.jsx', './index.html'],
  output: {
    filename: 'app.js',
    path: __dirname + '/public'
  },
  plugins: [
    new webpack.DefinePlugin({
      DEBUG: JSON.stringify(DEBUG),
      ASSET_PATH: JSON.stringify(localAssetPath)
    })
  ],
  resolve: {
    root: [path.resolve('./src'), path.resolve(__dirname, 'node_modules')],
    extensions: ['', '.js', '.jsx', '.css', '.scss']
  },
  module: {
    loaders: [
      {
        test: /\.(jsx|js)/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'file?name=[name].[ext]'
      },
      { test: /\.json$/, loader: 'json-loader' },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'url?limit=1000&name=images/[name]-[hash:5].[ext]',
          'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      },
      { test: /\.woff$/, loader: 'url?limit=65000&mimetype=application/font-woff&name=fonts/[name].[ext]' },
      { test: /\.ttf$/, loader: 'url?limit=65000&mimetype=application/x-font-ttf&name=fonts/[name].[ext]' },
      { test: /\.eot$/, loader: 'url?limit=65000&mimetype=application/vnd.ms-fontobject&name=fonts/[name].[ext]' }
    ]
  },
  sassLoader: {
    data: '$assetPath: "'+ localAssetPath +'";'
  },
  postcss: function () {
    return [autoprefixer];
  }
};

module.exports = config;
