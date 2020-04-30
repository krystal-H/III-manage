/**
 * postcss配置文件
 * 目前只添加了自动添加css前缀的插件，可根据开发需要进行扩展
 */
module.exports = {
    plugins: [
      require('autoprefixer')({
      })
    ]
}
