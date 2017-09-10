'use strict';
/* globals __dirname, require, process */
var path = require('path');
var webpack = require('webpack');
var DashboardPlugin = require('webpack-dashboard/plugin');
var isProd = process.env.NODE_ENV === 'production';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
console.log('isProd: ', isProd);

let config = {
  entry: isProd ?
    './index.js' :
    ['webpack-dev-server/client?http://localhost:9000', './index.js'],
  devtool: isProd ? false : 'cheap-module-source-map',
  context: __dirname,
  watchOptions: {
    ignored: /node_modules/
  },
  resolve: {
    modules: [
      path.resolve('./components'),
      path.resolve('./singletons'),
      path.resolve('./scss'),
      path.resolve('./node_modules'),
      path.resolve('.')
    ],
    moduleExtensions: ['-compat']
  },
  output: {
    path: path.resolve(__dirname, 'build/'),
    filename: 'index.js',
    library: 'Starfish'
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
        exclude: ['node_modules'],
        include: [
          path.resolve(__dirname, 'scss')
        ]
      },
      {test: /\.(woff|woff2|eot|ttf|svg)$/, loader: 'file-loader'},
      {
        test: /\.(jpg|png|gif|jpeg)$/,
        loader: 'file-loader',
        include: [path.resolve(__dirname, 'assets')]
      },
      {test: /\.(js|jsx)$/,
        include:[
          __dirname
        ],
        exclude: ['node_modules'],
        loader: 'babel-loader',
        query: {
          presets: isProd ?
            ['react', 'es2015', 'stage-0'] :
            ['react', 'react-hmre', 'es2015', 'stage-0'],
          plugins: ['transform-decorators-legacy']
        }
      }
    ]
  },
  // env conditional plugins for filesize, dashboard, etc.
  plugins: isProd ? [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true
    })
  ] : [
    new DashboardPlugin()
  ]
};
if (!isProd){
  config.devServer = {
    contentBase: './',
    compress: true,
    port: 9000,
    public: 'localhost:9000',
    host: '0.0.0.0',
    disableHostCheck: true
  };
  config.output.publicPath = 'http://localhost:9000/';
}
module.exports = config;
