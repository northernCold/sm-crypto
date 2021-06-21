const path = require('path');
const es3ifyWebpackPlugin = require('es3ify-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const libraryName = require('./package.json').name
const { CIPHER } = process.env;

const entryGenerator = cipher => {
  if (cipher) {
    return { [cipher]: `./src/${cipher}/index.js`}
  }
  return './src/index.js';
}

const outputGenerator = cipher => {
  if (cipher) {
    return {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
      library: {
        name: '[name]',
        type: 'umd',
        umdNamedDefine: true
      }
    }
  }
  return {
    path: path.resolve(__dirname, "dist"),
    filename: `${libraryName}.js`,
    library: {
      name: libraryName,
      type: 'umd',
      umdNamedDefine: true
    }
  }
}

module.exports = {
  mode: "production",
  entry: entryGenerator(CIPHER),
  output: outputGenerator(CIPHER),
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