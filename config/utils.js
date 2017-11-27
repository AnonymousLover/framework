const isProd = (process.env.NODE_ENV === 'production');
//webpack的基础配置

const stringify = value => JSON.stringify(value);
//日志打印
const log       = (name, value) => console.log(`${name}: ${stringify(value)}`);

module.exports  = { stringify, log }

