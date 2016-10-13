var config = require('./webpack.config').config;
var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');

config.module.loaders.push({
    test: /\.scss$/,
    exclude: /node_modules/,
    loaders: [
      'style-loader',
      'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[local]',
      'postcss-loader',
      'sass-loader?sourceMap'
    ]
});
config.target = 'node';
config.externals = [nodeExternals()];

module.exports = config;
