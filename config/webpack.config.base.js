const webpack   = require('webpack');
//postcss
const px2rem    = require('postcss-pxtorem');
const autofixer = require('autoprefixer')

//webpack的基础配置
const globalConfig = require('./metadata.webpack.config');

module.exports.postcss = {
  loader : 'postcss-loader',
  options: {
    plugins: () => [
      autofixer(),
      px2rem({
        rootValue        : 100,
        propList         : ['*'],
        selectorBlackList: [/^html$/],
        minPixelValue    : 2,
      })
    ]
  }
}

module.exports.assign = opts => {

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
      //压缩 JS
      // new webpack.optimize.UglifyJsPlugin({ sourceMap: !!config.sourceMap }),
    ]
  }
}
