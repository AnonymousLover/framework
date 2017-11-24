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
      base  : [
        path.join(rootPath, 'framework/adaptive.js'),
        path.join(rootPath, 'framework/base.js'),
      ],
      plugin: [
        path.join(rootPath, 'framework/plugin/gesture.js'),      // 手势 JS
        path.join(rootPath, 'framework/plugin/scroll.js'),      // scroll JS
      ]
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
      // 分离框架级别 css 文件
      new _extract({
        filename : `style/[name].[chunkHash:6].css`,
        allChunks: true
      }),
    ]
  })
}

