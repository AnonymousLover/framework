/**
 * webpack config for SPA
 */
// 动态生成 spa webpack 配置数据

const path     = require('path')
const webpack  = require('webpack')
const merge    = require('webpack-merge')
const _extract = require('extract-text-webpack-plugin')

//本地配置
const { assign, postcss } = require('./webpack.config.base')

module.exports = opts => {
  //定义路径
  const rootPath = path.resolve(__dirname, '../');
  return merge(assign(opts), {
    // 定义应用入口
    entry  : {
      plugin  : path.join(rootPath, 'framework/plugin.js'),      // 插件级 JS
      adaptive: path.join(rootPath, 'framework/adaptive.js')
    },
    // 模块加载器规则
    module : {
      rules: [{
        test: /\.(css|less)$/,
        use : _extract.extract({
          fallback  : 'style-loader',
          use       : ['css-loader', 'less-loader', postcss],
          publicPath: '../'
        })
      }, {
        test: /\.vue$/,
        use : ['vue-loader']
      }, {
        test   : /\.(js|jsx)$/,
        use    : ['babel-loader'],
        exclude: /node_modules/
      }, {
        test: /\.(jpg|png|gif)$/,
        use : [`url-loader?limit=5000&name=images/[name].[ext]`]
      }, {
        test: /\.(svg|ttf|woff|eot)$/,
        use : [`url-loader?limit=5000&name=fonts/[name].[ext]`]
      }]
    },
    // 插件
    plugins: [
      // 公用模块提取
      new webpack.optimize.CommonsChunkPlugin({
        // "manifest" 为提取运行期代码，确保公用文件缓存
        name: ["common", "manifest"]
      }),
      // 分离框架级别 css 文件
      new _extract(`[name]/[name].[chunkHash:6].css`, { allChunks: true }),
    ].concat([])
  })
}

