//MUI中的手势事件
(function (window, Math, undefined) {
  var _setTimeout   = setTimeout,
      _clearTimeout = clearTimeout;
  var EVENT_START   = 'touchstart',
      EVENT_MOVE    = 'touchmove',
      EVENT_END     = 'touchend',
      EVENT_CANCEL  = 'touchcancel',
      isTouchable   = true;
  var ROUND         = Math.round,
      ABS           = Math.abs;

  function each(elements, callback, hasOwnProperty) {
    if (typeof elements.length === 'number') {
      [].every.call(elements, function (el, idx) {
        return callback.call(el, idx, el) !== false;
      });
    } else {
      for (var key in elements) {
        if (!hasOwnProperty || elements.hasOwnProperty(key))
          if (callback.call(elements[key], key, elements[key]) === false)
            return elements;
      }
    }
  }

  function trigger(element, eventType, eventData) {
    element && element.dispatchEvent(new CustomEvent(eventType, {
      detail: eventData, bubbles: true, cancelable: true
    }));
  }

  var hookMap = {};

  function addAction(type, hook) {
    var _hooks = hookMap[type] || (hookMap[type] = []);
    hook.index = hook.index || 1000;
    _hooks.push(hook);
    _hooks.sort(function (a, b) {
      return a.index - b.index;
    });
  }

  function doAction(type, callback) {
    var _hooks = hookMap[type] || [];
    _hooks.forEach(callback || function (hook) {
      return !hook.handle();
    })
  }

  function getDistance(p1, p2, props) {
    props = props || ['x', 'y'];
    var x = p2[props[0]] - p1[props[0]],
        y = p2[props[1]] - p1[props[1]];
    return Math.sqrt(x * x + y * y);
  }

  function getDirection(x, y) {
    return x === y ? '' : ABS(x) >= ABS(y) ? x > 0 ? 'left' : 'right' : y > 0 ? 'up' : 'down';
  }

  var getNow = Date.now || function () {
    return +new Date();
  };

  function addGesture(gesture) {
    return addAction('gestures', gesture);
  }

  var session      = {},
      targetIds    = {},
      slice        = [].slice,
      CAL_INTERVAL = 25,
      IDENTIFIER   = 'identifier';

  function getMultiCenter(touches) {
    var touchesLength   = touches.length,
        x = 0, y = 0, i = touchesLength;
    while (i-- > 0) {
      x += touches[i].pageX;
      y += touches[i].pageY;
    }
    return {
      x: ROUND(x / touchesLength),
      y: ROUND(y / touchesLength)
    };
  }

  function copySimpleTouchData(touch) {
    var touches  = [],
        _touches = touch.touches || [],
        i        = _touches.length;
    while (i-- > 0) {
      touches[i] = {
        pageX: ROUND(_touches[i].pageX),
        pageY: ROUND(_touches[i].pageY)
      };
    }
    return {
      timestamp: getNow(),
      gesture  : touch.gesture,
      touches  : touches,
      center   : getMultiCenter(_touches),
      deltaX   : touch.deltaX,
      deltaY   : touch.deltaY
    };
  }

  function calDelta(touch) {
    var type      = touch.gesture.type,
        center    = touch.center,
        offset    = session.offsetDelta || {},
        prevDelta = session.prevDelta || {},
        prevTouch = session.prevTouch || {};
    if (type === EVENT_START || type === EVENT_END) {
      prevDelta = session.prevDelta = {
        x: prevTouch.deltaX || 0,
        y: prevTouch.deltaY || 0
      };
      offset = session.offsetDelta = {
        x: center.x,
        y: center.y
      };
    }
    touch.deltaX = prevDelta.x + center.x - offset.x;
    touch.deltaY = prevDelta.y + center.y - offset.y;
  }

  function calTouchData(touch) {
    var touches = touch.touches;
    if (!session.firstTouch) {
      session.firstTouch = copySimpleTouchData(touch);
    }
    var firstTouch   = session.firstTouch,
        offsetCenter = firstTouch.center,
        center       = touch.center = getMultiCenter(touches);
    touch.timestamp = getNow();
    touch.deltaTime = touch.timestamp - firstTouch.timestamp;
    touch.distance  = getDistance(offsetCenter, center);
    calDelta(touch);
    calIntervalTouchData(touch);
  }

  function calIntervalTouchData(touch) {
    var last      = session.lastInterval || touch,
        deltaTime = touch.timestamp - last.timestamp, direction
    // velocity, velocityX, velocityY, direction;
    if (touch.gesture.type != EVENT_CANCEL && (deltaTime > CAL_INTERVAL ||
        last.velocity === undefined)) {
      var deltaX           = last.deltaX - touch.deltaX,
          deltaY           = last.deltaY - touch.deltaY
      direction            = getDirection(deltaX, deltaY) || last.direction;
      session.lastInterval = touch;
    } else {
      direction = last.direction;
    }
    touch.direction = direction;
  }

  function hasParent(node, parent) {
    while (node) {
      if (node === parent)
        return true;
      node = node.parentNode;
    }
    return false;
  }

  function uniqueArray(src, key, sort) { //数组去重
    var results = [],
        values  = [],
        i       = 0;
    while (i < src.length) {
      var val = key ? src[i][key] : src[i];
      values.indexOf(val) < 0 && results.push(src[i]);
      values[i++] = val;
    }
    sort ? results = key ? results.sort(function (a, b) {
      return a[key] > b[key];
    }) : results.sort() : '';
    return results;
  }

  function convertTouches(touches) {
    for (var i = 0; i < touches.length; i++) {
      touches[IDENTIFIER] || (touches[IDENTIFIER] = 0);
    }
    return touches;
  }

  function getTouches(event, touch) {
    var allTouches           = convertTouches(slice.call(event.touches || [event])),
        type                 = event.type,
        targetTouches        = [],
        changedTargetTouches = [];
    if ((type === EVENT_START || type === EVENT_MOVE) && allTouches.length === 1) {
      targetIds[allTouches[0][IDENTIFIER]] = true;
      targetTouches                        = allTouches;
      changedTargetTouches                 = allTouches;
      touch.target                         = event.target;
    } else {
      var changedTouches = convertTouches(slice.call(event.changedTouches || [event]));
      touch.target       = event.target;
      var sessionTarget  = session.target || event.target;
      targetTouches      = allTouches.filter(function (touch) {
        return hasParent(touch.target, sessionTarget);
      });
      type === EVENT_START && each(targetTouches, function (i, tt) { targetIds[tt[IDENTIFIER]] = true });
      each(changedTouches, function (i, ct) {
        var id = ct[IDENTIFIER];
        targetIds[id] && changedTargetTouches.push(ct);
        if (type === EVENT_END || type === EVENT_CANCEL) {
          delete targetIds[id];
        }
      });
      if (!changedTargetTouches.length) return false;
    }
    targetTouches            = uniqueArray(targetTouches.concat(changedTargetTouches), IDENTIFIER, true);
    var touchesLength        = targetTouches.length,
        changedTouchesLength = changedTargetTouches.length;
    if (type === EVENT_START && touchesLength === changedTouchesLength) { //first
      touch.isFirst = true;
      each(session, function (key) { delete session[key] }, true);
      session.target = event.target;
    }
    touch.isFinal        = ((type === EVENT_END || type === EVENT_CANCEL) && touchesLength - changedTouchesLength === 0);
    touch.touches        = targetTouches;
    touch.changedTouches = changedTargetTouches;
    return true;
  }

  var handleTouchEvent = function (event) {
    var touch = { gesture: event };
    if (!getTouches(event, touch)) return;
    calTouchData(touch);
    doAction('gestures', function (gesture) {
      gesture.handle(event, touch);
    });
    session.prevTouch = touch;
    event.type === EVENT_END && each(session, function (key) {
      delete session[key];
    }, true);
  };
  window.addEventListener(EVENT_START, handleTouchEvent);
  window.addEventListener(EVENT_MOVE, handleTouchEvent);
  window.addEventListener(EVENT_END, handleTouchEvent);
  window.addEventListener(EVENT_CANCEL, handleTouchEvent);

  //swipe[left|right|up|down]
  (function (name) {
    var swipeMaxTime     = 300,
        swipeMinDistance = 18;
    var handle           = function (event, touch) {
      switch (event.type) {
        case EVENT_END:
        case EVENT_CANCEL:
          touch.swipe = false;
          if (touch.direction && swipeMaxTime > touch.deltaTime &&
            touch.distance > swipeMinDistance) {
            touch.swipe = true;
            trigger(session.target, name, touch);
            trigger(session.target, name + touch.direction, touch);
          }
      }
    };
    addGesture({ name: name, index: 10, handle: handle })
  })('swipe');
  //gesture drag[start|left|right|up|down|end]
  (function (name) {
    var handle = function (event, touch) {
      var startDirection, target;
      switch (event.type) {
        case EVENT_MOVE:
          if (!touch.direction || !(target = session.target)) return;
          //修正direction,可在session期间自行锁定拖拽方向，方便开发scroll类不同方向拖拽插件嵌套
          if (session.lockDirection && (startDirection = session.startDirection)) {
            if (startDirection && startDirection !== touch.direction) {
              touch.direction = startDirection === 'up' || startDirection === 'down' ?
                touch.deltaY < 0 ? 'up' : 'down' : touch.deltaX < 0 ? 'left' : 'right';
            }
          }
          session.drag || trigger(target, name + 'start', touch);
          session.drag = true;
          trigger(target, name, touch);
          trigger(target, name + touch.direction, touch);
          break;
        case EVENT_END:
        case EVENT_CANCEL:
          session.drag && touch.isFinal && trigger(session.target, name + 'end', touch);
          break;
      }
    };
    addGesture({ name: name, index: 20, handle: handle })
  })('drag');
  //gesture tap
  (function (name) {
    var lastTarget, lastTapTime,
        tapMaxInterval = 200,
        tapMaxDistance = 25,
        tapMaxTime     = 250;
    var handle         = function (event, touch) {
      var target;
      switch (event.type) {
        case EVENT_END:
          if (!touch.isFinal) return;
          if (!(target = session.target) || target.disabled) return;
          if (touch.distance < tapMaxDistance && touch.deltaTime < tapMaxTime) {
            if (lastTarget && lastTarget === target) { //same target
              if (lastTapTime && (touch.timestamp - lastTapTime) < tapMaxInterval) return;
            }
            trigger(target, name, touch);
            lastTapTime = getNow();
            lastTarget  = target;
          }
      }
    };
    addGesture({ name: name, index: 30, handle: handle })
  })('tap');
  //gesture longtap
  (function (name) {
    var timer, holdTimeout = 500;
    var handle             = function (event, touch) {
      switch (event.type) {
        case EVENT_START:
          _clearTimeout(timer);
          timer = _setTimeout(function () {
            trigger(session.target, name, touch);
          }, holdTimeout);
          break;
        case EVENT_MOVE:
          touch.distance > 2 && _clearTimeout(timer);
          break;
        case EVENT_END:
        case EVENT_CANCEL:
          _clearTimeout(timer);
      }
    };
    addGesture({ name: name, index: 10, handle: handle })
  })('longtap');
  (function (name) {
    var timer;
    var handle = function (event, touch) {
      switch (event.type) {
        case EVENT_START:
          timer && _clearTimeout(timer);
          timer = _setTimeout(function () {
            touch.hold = true;
            trigger(session.target, name, touch);
          }, 0);
          break;
        case EVENT_END:
        case EVENT_CANCEL:
          if (timer) {
            _clearTimeout(timer), timer = null;
            trigger(session.target, 'release', touch);
          }
      }
    };
    addGesture({ name: name, index: 10, handle: handle })
  })('hold');

  var _parseFloat       = parseFloat,
      translateMatrixRE = /matrix(3d)?\((.+?)\)/;

  function getStyles(element, property) {
    var styles = window.getComputedStyle(element, null);
    return property ? styles.getPropertyValue(property) || styles[property] : styles;
  }

  function parseTranslateMatrix(translateString, position) {
    var matrix = translateString.match(translateMatrixRE),
        is3D   = matrix && matrix[1],
        result = {};
    if (matrix) {
      matrix = matrix[2].split(",");
      matrix = is3D === "3d" ? matrix.slice(12, 15) :
        matrix.concat(0).slice(4, 7);
    } else matrix = [0, 0, 0];
    result.x = _parseFloat(matrix[0]);
    result.y = _parseFloat(matrix[1]);
    result.z = _parseFloat(matrix[2]);
    return position && result.hasOwnProperty(position) ?
      result[position] : result;
  }

  function _extend(dst) { //浅复制
    for (var i = 1, ii = arguments.length; i < ii; i++) {
      var obj = arguments[i];
      if (obj) {
        var keys = Object.keys(obj);
        for (var j = 0, jj = keys.length; j < jj; j++) {
          var key  = keys[j];
          dst[key] = obj[key];
        }
      }
    }
    return dst;
  }

  // class 初始化,后续很多组件需要使用
  var initializing = false, fnTest = /\b_super\b/;
  var Class        = window.Class = function () {};
  Class.extend = function (props) {
    initializing  = true;
    var _super    = this.prototype,
        prototype = new this();
    initializing  = false;
    each(props || {}, function (name, prop) {
      prototype[name] = (typeof prop === 'function' &&
        typeof _super[name] === 'function' &&
        fnTest.test(prop)) ? function () {
        var tmp     = this._super;
        this._super = _super[name];
        var ret     = prop.apply(this, arguments);
        this._super = tmp;
        return ret;
      } : prop
    });

    function Clazz() {
      !initializing && this.init && this.init.apply(this, arguments);
    }

    Clazz.prototype = prototype;
    Clazz.extend    = Clazz.extend;
    return Clazz;
  };

  //
  Class._extend              = _extend;
  Class.session              = session;
  Class.each                 = each;
  Class.trigger              = trigger;
  Class.getStyles            = getStyles;
  Class.parseTranslateMatrix = parseTranslateMatrix;
})(window, Math);
