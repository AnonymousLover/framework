const webpack   = require('webpack');
const px2rem    = require('postcss-pxtorem');
const autofixer = require('autoprefixer')

//webpack的基础配置
const globalConfig = require('./metadata.webpack.config');

module.exports = opts => {

	const appName = opts['appName'];
	//是否是产线环境
	const isProd  = (process.env.NODE_ENV === 'production');
	const config  = globalConfig[isProd ? 'prod' : 'dev'];
	// 定义路径相关
	return {
		// 定义输出
		output : {
			filename     : '[name]/[name].[chunkHash:6].js',
			chunkFilename: `${appName}/[name].[chunkHash:6].js`
		},
		// source map
		// devtool: config.devtool,
		plugins: [
			new webpack.optimize.DedupePlugin(),
			//压缩 JS
			// new webpack.optimize.UglifyJsPlugin({ sourceMap: !!config.sourceMap }),
		],
		postcss: () => [
			px2rem({
				rootValue        : 100,
				propList         : ['*'],
				selectorBlackList: [/^html$/],
				minPixelValue    : 2,
			})
		]
	}
}