var path = require('path')

var babelLoader = {
  test: /\.js$/,
  exclude: 'node_modules',
  loader: 'babel-loader'
}

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'index.umd.js',
    library: 'ReduxReady',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [babelLoader]
  }
}
