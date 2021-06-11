const path = require('path');
const webpack = require('webpack');
const es3ifyWebpackPlugin = require('es3ify-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    sm2: './src/sm2/index.js',
    sm3: './src/sm3/index.js',
    sm4: './src/sm4/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: '[name]',
    libraryTarget: 'window',
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },
  plugins: [
    new es3ifyWebpackPlugin()
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      terserOptions: {
        ie8: true,
        compress: {
          properties: false
        },
        output: {
          quote_keys: true
        }
      }
    })],
  },
};