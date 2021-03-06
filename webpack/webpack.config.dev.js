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
      target: 'https://dp.clife.net',
      // target: 'https://itest.clife.net/',
        // target: 'https://cms.clife.cn',
        // target:'http://10.6.50.139:8087/',
        // target:'http://10.6.50.96:8088/',
        
        
        
        changeOrigin: true,
        secure: false,
      },
      "/v5x/web/": {
        target: 'https://dp.clife.net',
        changeOrigin: true,
        secure: false,
      },
    }
  }
};

module.exports = merge(common, dev);


