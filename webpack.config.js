var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var devFlagPlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
});

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'eventsource-polyfill',
    'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr',
    './js/index.js',
    './css/app.scss'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: 'http://localhost:3000/dist/',
    filename: 'bundle.js'
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ExternalsPlugin('commonjs', ['electron']),
    devFlagPlugin,
    new ExtractTextPlugin('app.css')
  ],

  // target: 'electron',

  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel'], exclude: /node_modules/ },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
            'style', // backup loader when not building .css file
            'css!sass' // loaders to preprocess CSS
        )
      }
    ]
  },

  resolve: {
    root: path.resolve(__dirname),
    modulesDirectories: ["web_modules", "node_modules", "app", "common", "login", "messages", "users"],
    extensions: ['', '.js', '.json']
  }
};
