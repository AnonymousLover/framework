const path     = require('path');
const rootPath = path.resolve(__dirname, '../');

module.exports = {
  prod: {
    env       : {
      NODE_ENV: '"production"'
    },
    deployPath: path.resolve(rootPath, 'deployed/'),
    publicPath: 'http://debug030055162002.local.alipay.net:20004/'
  },
  dev : {
    env            : {
      NODE_ENV: '"development"'
    },
    gZip           : true,
    autoOpenBrowser: true,
    sourceMap      : true,
    devtool        : '#source-map',
    isHotReload    : true,
    deployPath     : path.join(rootPath, 'deployed/'),
    publicPath     : 'http://debug030055162002.local.alipay.net:20004/'
  }
};
