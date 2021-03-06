const path = require('path');

module.exports = {
  entry: './src/app.js',
  mode: 'production',
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
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
  },
};
