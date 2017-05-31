var path = require('path');
var webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    bundle: './src/javascripts/main.js',
    main: './src/stylesheets/main.less'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/dist/',
  },
  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['.js', '.less'],
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: "eslint-loader",
        options: {
          failOnError: true,
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'stage-2'],
          plugins: [
            'transform-object-rest-spread',
            'array-includes',
            'transform-decorators-legacy'
          ],
        },
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader', 'autoprefixer-loader'],
        }),
      },
      {
         test: /\.html$/,
         loader: "raw-loader"
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css',
    }),
  ],
};
