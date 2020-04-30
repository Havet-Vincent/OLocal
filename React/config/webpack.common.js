const paths = require('./paths');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

const webmanifest = require('../webmanifest.json');

module.exports = {
  entry: [
    // SCSS
    // paths.src + '/styles/index.scss',
    // JS
    paths.src + '/index.js',
  ],

  resolve: {
    alias: {
      src: paths.src,
      app: paths.src,
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: paths.static,
        to: '',
        ignore: ['*.DS_Store'],
      },
    ]),
    new HtmlWebpackPlugin({
      favicon: paths.assets + '/favicon.png',
      template: paths.assets + '/index.html',
    }),
    new WebpackPwaManifest(webmanifest),
  ],

  module: {
    rules: [
      //JS
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },

      // Fonts
      // {
      //   test: /\.(woff2?|eot|ttf|otf)$/,
      //   loader: 'file-loader',
      //   options: {
      //     outputPath: 'fonts/',
      //   },alors sinon *discretement, tu peux aller sur le site avec ton smartphone, car il a été optimisé pour...

      // Images
      {
        test: /\.(ico|gif|png|jpe?g|webp|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: { outputPath: 'images/' },
          },
        ],
      },
    ],
  },
};
