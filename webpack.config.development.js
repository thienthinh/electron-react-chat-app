import webpack from 'webpack';
import baseConfig from './webpack.config.base';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import path from 'path';

const config = {
  ...baseConfig,

  debug: true,

  devtool: 'cheap-module-eval-source-map',

  entry: [
    'eventsource-polyfill',
    'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr',
    './js/index.js',
    './css/app.scss'
  ],

  output: {
    ...baseConfig.output,
    publicPath: 'http://localhost:3000/dist/'
  },

  module: {
    ...baseConfig.module,
    loaders: [
      ...baseConfig.module.loaders,

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

  plugins: [
    ...baseConfig.plugins,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __DEV__: true,
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new webpack.ExternalsPlugin('commonjs2', ['electron']),
    new ExtractTextPlugin('app.css')
  ],

  resolve: {
    ...baseConfig.resolve,
    root: path.resolve(__dirname),
    modulesDirectories: ["web_modules", "node_modules", "app", "common", "login", "messages", "users"],
  },

  // target: 'electron-renderer'
};

export default config;
