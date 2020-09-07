const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.config.common');
const apiMocker = require('mocker-api');

const paths = require('./paths');

const needMock = process.env.MOCK === 'mock';

const dev = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: paths.outPath,
    host: 'localhost',
    port: '8082',
    open: true,
    openPage: 'index.html',
    hot: true, //webpack-dev-server are launched with the --hot option, webpack.HotModuleReplacementPlugin will be added automatically
    before: function (app) {
      if (needMock) {
        apiMocker(app, path.resolve(__dirname, '../mock/index.js'))
      }
    },
    proxy: {
      '/v1/web': {
      // target: 'https://pre.cms.clife.cn',
        target: 'https://200.200.200.50',
        // target: 'http://10.8.80.115:8081',
        changeOrigin: true,
        secure: false,
      }
    }
  }
};

module.exports = merge(common, dev);


