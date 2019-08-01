const path = require('path');

module.exports = {
  entry: './src/app.js',
  mode: 'development',
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /\/node_modules\//,
      use: 'babel-loader',
    },

    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    }],
  },
  devtool: 'cheap-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
  },
};
