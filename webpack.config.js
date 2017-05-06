const path = require('path');

module.exports = {
  entry: [
    'babel-polyfill', 
    './src/index'
  ],
  devtool: 'cheap-module-source-map',
  output: {
    path: path.join(__dirname, 'public/bundles/'),
    filename: 'bundle.min.js',
    publicPath: '/public/'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel-loader'],
      include: path.join(__dirname, 'src')
    }]
  },
  plugins: [
  ],
  watch: true,
  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty'
  }
};