const webpack = require('webpack');
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const common = require('./webpack.config.common');

const prod = {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  optimization: {
    minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin({})], // OptimizeCSSAssetsPlugin用于压缩提取后的css文件
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      minSize: 30000, //最小尺寸必须大于此值，默认30000B
      maxSize: 0,
      minChunks: 2,   // 引入次数（import）
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      automaticNameMaxLength: 30,
      name: true,
      cacheGroups: {
        vendor: {
          //  第三方依赖包可以通过dll替代，优化打包速度
          chunks: 'all',
          name: "vendor",
          minChunks: 1,
          test: (module, chunks) => {
            // 将node_modules 目录下的依赖统一打包进入vendor中
            if (/node_modules/.test(module.context)) {
              return true;
            }
          },
          priority: -10,
          enforce: true
        },
        common: {
          test: function (module, chunks) {
            // 这里通过配置规则将公共目录中的资源打包到一个文件，后续开发中可以根据实际项目情况放开
            if (/src\/util\//.test(module.context) ||
              /src\/components/.test(module.context)) {
              return true;
            }
          },
          chunks: 'all',
          name: 'common',
          minChunks: 2,
          priority: 1
        },
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ProgressBarPlugin(),
    new LodashModuleReplacementPlugin({
      'collections': true,
      'paths': true
    }), // lodash 按需引入插件,但是这个插件可能导致一些问题；  DISCLAIMER: Using this plugin without enabling the proper feature sets may cause lodash functions to behave in unexpected ways. Methods may appear to work, however they might return incorrect results.
    //new BundleAnalyzerPlugin() // 打包分析，分包策略确定好之后可以关闭
  ]
}

module.exports = merge(common, prod);