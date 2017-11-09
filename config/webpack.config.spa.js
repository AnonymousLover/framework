/**
 * webpack config for SPA
 */
// 动态生成 spa webpack 配置数据

const path     = require('path')
const webpack  = require('webpack')
const merge    = require('webpack-merge')
const _html    = require('html-webpack-plugin')
const _clean   = require('clean-webpack-plugin')
const _extract = require('extract-text-webpack-plugin')

//本地配置
const { assign, postcss } = require('./webpack.config.base')
const globalConfig        = require('./metadata.webpack.config')

module.exports = opts => {
	const appName     = opts['appName'];
	const currEnvName = opts['currEnvName'];
	const isProd      = (process.env.NODE_ENV === 'production');
	const config      = globalConfig[isProd ? 'prod' : 'dev'];
	//定义路径
	const rootPath    = path.resolve(__dirname, '../');
	const srcPath     = path.join(rootPath, `${appName}/`);
	const appType     = 'singlePageWeb';
	const deployPath  = path.join(config.deployPath, appType);
	//webpack配置相关

	return merge(assign(opts), {
		// 定义应用入口
		entry  : {
			[appName]: path.join(srcPath, 'index.js'),                  // 应用级
			common   : path.join(rootPath, 'framework/common.js'),      // 框架级 JS 和 CSS
			adaptive : path.join(rootPath, 'framework/adaptive.js')
		},
		// 定义输出
		output : { path: deployPath },
		// 模块加载器规则
		module : {
			rules: [{
				test: /\.(css|less)$/,
				use : _extract.extract({
					fallback: 'style-loader',
					use     : ['css-loader', postcss]
				})
			}, {
				test   : /\.(js|jsx)$/,
				use    : ['babel-loader'],
				exclude: /node_modules/
			}, {
				test: /\.(jpg|png|gif)$/,
				use : [`url?limit=5000&name=images/[name].[ext]`]
			}, {
				test: /\.(svg|ttf|woff|eot)$/,
				use : [`url?limit=5000&name=fonts/[name].[ext]`]
			}]
		},
		// 插件
		plugins: [
			// 环境定义
			new webpack.DefinePlugin({ 'process.env': config.env }),
			// 公用模块提取
			new webpack.optimize.CommonsChunkPlugin({
				// "manifest" 为提取运行期代码，确保公用文件缓存
				name: ["common", "manifest"]
			}),
			// 入口页面自动生成
			new _html({
				template      : path.join(rootPath, 'template.html'),
				filename      : `${appName}/index.html`,
				inject        : 'body',
				chunksSortMode: function (chunk1, chunk2) {
					let order  = ['manifest', 'adaptive', 'plugin', 'common', appName],
					    order1 = order.indexOf(chunk1.names[0]),
					    order2 = order.indexOf(chunk2.names[0]);
					return order1 - order2;
				}
			}),
			// 分离框架级别 css 文件
			new _extract(`[name]/[name].[chunkHash:6].css`, { allChunks: true }),
			new _clean([`${deployPath}/*`], { root: __dirname, dry: false })
		].concat([])
	})
}

