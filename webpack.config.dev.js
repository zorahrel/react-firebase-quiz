var config = require('./webpack.config');

config.module.loaders.push({
    test: /\.scss$/,
    exclude: /node_modules|font-faces\.scss/,
    loaders: [
      'style-loader',
      'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
      'postcss-loader',
      'sass-loader?sourceMap'
    ]
});
config.module.loaders.push({
    test: /font-faces\.scss$/,
    exclude: /node_modules/,
    loaders: [
      'style-loader',
      'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
      'postcss-loader',
      'sass-loader?sourceMap'
    ]
});
config.devServer = {
  historyApiFallback: true
};

module.exports = config;
