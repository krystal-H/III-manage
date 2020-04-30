const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const paths = require('./paths');
const { dllSrc } = paths;

module.exports = {
  mode: 'production',
  entry: {
    react_libs: ['react', 'react-dom', 'redux', 'react-redux', 'react-router-dom', 'redux-thunk'],
    others: ['lodash','moment'], // 有其他需要拆分的第三方依赖可以在这里添加
  },
  output: {
    path: dllSrc,
    filename: '[name].dll.js?v=[hash:8]',
    library: '[name]_dll'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      path: path.join(__dirname, '..', 'dll', "[name]-manifest.json"),
      name: '[name]_dll'
    })
  ]
};
