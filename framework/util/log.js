import * as util from './util'

let debug = true;

function formatError(arg) {
  if (arg instanceof Error) {
    if (arg.stack) {
      arg = (arg.message && arg.stack.indexOf(arg.message) === -1)
        ? 'Error: ' + arg.message + '\n' + arg.stack : arg.stack;
    } else if (arg.sourceURL) {
      arg = arg.message + '\n' + arg.sourceURL + ':' + arg.line;
    }
  }
  return arg;
}

function consoleLog(type) {
  let _console = util.isDefined(console) ? console : {},
      logFn    = _console[type] || _console.log || util.noop;
  return !!logFn.apply ? function () {
    // let args = [].slice.call(arguments,0)
    //   .map(arg => formatError(arg))
    let args = [], i = 0, ii = arguments.length;
    for (; i < ii; i++) { args.push(formatError(arguments[i])) }
    return logFn.apply(_console, args);
  } : function (arg1, arg2) {
    logFn(arg1, util.isNull(arg2) ? '' : arg2);
  };
}

export default {
  log  : consoleLog('log'),
  info : consoleLog('info'),
  warn : consoleLog('warn'),
  error: consoleLog('error'),
  debug: (function () {
    let fn = consoleLog(util.isBrowser ? 'debug' : 'log');
    return function () { debug && fn.apply(null, arguments) }
  }()),
  debugEnabled(flag) {
    return flag = null ? debug : debug = !!flag;
  }
}
