const path = require('path');
const BundleTracker = require('webpack-bundle-tracker');

module.exports = {
  devtool: 'eval',
  // entry: {
  //   landing: './src/apps/landing/roots/subscription.js',
  //   application_form: './src/apps/stores/roots/application_form.js',
  // },
  // output: {
  //   path: __dirname + '/dist/webpack_bundles/',
  //   filename: '[name]-bundle.[hash].js',
  // },
  plugins: [new BundleTracker({ filename: './webpack-stats.json' })],
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'commons',
    },
  },
  resolve: {
    modules: [path.resolve('./src'), path.resolve('./node_modules')],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.(png|woff|woff2|eot|otf|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader',
      },
    ],
  },
  mode: 'development',
};
