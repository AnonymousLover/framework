const path     = require('path');
const rootPath = path.resolve(__dirname, '../');

module.exports = {
  prod: {
    env       : {
      NODE_ENV: '"production"'
    },
    deployPath: path.resolve(rootPath, 'deployed/'),
    publicPath: 'http://127.0.0.1:20004/'
  },
  dev : {
    env            : {
      NODE_ENV: '"development"',
      PATH    : "''"
    },
    gZip           : true,
    autoOpenBrowser: true,
    sourceMap      : true,
    devtool        : '#source-map',
    isHotReload    : true,
    deployPath     : path.join(rootPath, 'deployed/'),
    publicPath     : 'http://127.0.0.1:20004/'
  }
};
