/**
 * webpack config for SPA
 */
// 动态生成 spa webpack 配置数据

const path    = require('path')
const webpack = require('webpack')
const merge   = require('webpack-merge')
const _html   = require('html-webpack-plugin')
const _clean  = require('clean-webpack-plugin')

//本地配置
const spa          = require('./webpack.config.spa')
const globalConfig = require('./metadata.webpack.config')

module.exports = opts => {
  const appName    = opts['appName'];
  const isProd     = (process.env.NODE_ENV === 'production');
  const config     = globalConfig[isProd ? 'prod' : 'dev'];
  //定义路径
  const rootPath   = path.resolve(__dirname, '../');
  const srcPath    = path.join(rootPath, `${appName}/`);
  const deployPath = path.join(config.deployPath, '');

  const infernoPath = path.join(rootPath, 'framework/_inferno/inferno/index.js');
  //webpack配置相关

  return merge(spa(opts), {
    // 定义应用入口
    entry  : {
      [appName]          : path.join(srcPath, 'index.js'),                  // 应用级
      'inferno-common'   : path.join(rootPath, 'framework/_inferno/common.js'),      // 框架级 JS 和 CSS
      'inferno-component': path.join(rootPath, 'framework/_inferno/index.js'),      // 框架级 JS 和 CSS
    },
    // 定义输出
    output : {
      path      : deployPath,
      publicPath: config.publicPath,
    },
    resolve: {
      alias: {
        'inferno': infernoPath,
      }
    },
    // 插件
    plugins: [
      // 环境定义
      new webpack.DefinePlugin({ 'process.env': config.env }),
      // 公用模块提取
      new webpack.optimize.CommonsChunkPlugin({
        // "manifest" 为提取运行期代码，确保公用文件缓存
        name: ['inferno-component', 'inferno-common', "manifest"]
      }),
      // 入口页面自动生成
      new _html({
        template      : path.join(rootPath, 'template.html'),
        filename      : `${appName}/index.html`,
        inject        : 'body',
        chunksSortMode: function (chunk1, chunk2) {
          let order  = ['manifest', 'plugin', 'base', 'inferno-common', 'inferno-component', appName],
              order1 = order.indexOf(chunk1.names[0]),
              order2 = order.indexOf(chunk2.names[0]);
          return order1 - order2;
        }
      }),
      new _clean([`${deployPath}/`], { root: rootPath, dry: false }),
    ].concat([])
  })
}

