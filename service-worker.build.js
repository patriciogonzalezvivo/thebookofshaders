(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Deferred = void 0;
require("../_version.js");
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * The Deferred class composes Promises in a way that allows for them to be
 * resolved or rejected from outside the constructor. In most cases promises
 * should be used directly, but Deferreds can be necessary when the logic to
 * resolve a promise must be separate.
 *
 * @private
 */
class Deferred {
  /**
   * Creates a promise and exposes its resolve and reject functions as methods.
   */
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}
exports.Deferred = Deferred;

},{"../_version.js":13}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorkboxError = void 0;
var _messageGenerator = require("../models/messages/messageGenerator.js");
require("../_version.js");
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * Workbox errors should be thrown with this class.
 * This allows use to ensure the type easily in tests,
 * helps developers identify errors from workbox
 * easily and allows use to optimise error
 * messages correctly.
 *
 * @private
 */
class WorkboxError extends Error {
  /**
   *
   * @param {string} errorCode The error code that
   * identifies this particular error.
   * @param {Object=} details Any relevant arguments
   * that will help developers identify issues should
   * be added as a key on the context object.
   */
  constructor(errorCode, details) {
    const message = (0, _messageGenerator.messageGenerator)(errorCode, details);
    super(message);
    this.name = errorCode;
    this.details = details;
  }
}
exports.WorkboxError = WorkboxError;

},{"../_version.js":13,"../models/messages/messageGenerator.js":15}],4:[function(require,module,exports){
(function (process){(function (){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assert = void 0;
var _WorkboxError = require("../_private/WorkboxError.js");
require("../_version.js");
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/*
 * This method throws if the supplied value is not an array.
 * The destructed values are required to produce a meaningful error for users.
 * The destructed and restructured object is so it's clear what is
 * needed.
 */
const isArray = (value, details) => {
  if (!Array.isArray(value)) {
    throw new _WorkboxError.WorkboxError('not-an-array', details);
  }
};
const hasMethod = (object, expectedMethod, details) => {
  const type = typeof object[expectedMethod];
  if (type !== 'function') {
    details['expectedMethod'] = expectedMethod;
    throw new _WorkboxError.WorkboxError('missing-a-method', details);
  }
};
const isType = (object, expectedType, details) => {
  if (typeof object !== expectedType) {
    details['expectedType'] = expectedType;
    throw new _WorkboxError.WorkboxError('incorrect-type', details);
  }
};
const isInstance = (object,
// Need the general type to do the check later.
// eslint-disable-next-line @typescript-eslint/ban-types
expectedClass, details) => {
  if (!(object instanceof expectedClass)) {
    details['expectedClassName'] = expectedClass.name;
    throw new _WorkboxError.WorkboxError('incorrect-class', details);
  }
};
const isOneOf = (value, validValues, details) => {
  if (!validValues.includes(value)) {
    details['validValueDescription'] = `Valid values are ${JSON.stringify(validValues)}.`;
    throw new _WorkboxError.WorkboxError('invalid-value', details);
  }
};
const isArrayOfClass = (value,
// Need general type to do check later.
expectedClass,
// eslint-disable-line
details) => {
  const error = new _WorkboxError.WorkboxError('not-array-of-class', details);
  if (!Array.isArray(value)) {
    throw error;
  }
  for (const item of value) {
    if (!(item instanceof expectedClass)) {
      throw error;
    }
  }
};
const finalAssertExports = exports.assert = process.env.NODE_ENV === 'production' ? null : {
  hasMethod,
  isArray,
  isInstance,
  isOneOf,
  isType,
  isArrayOfClass
};

}).call(this)}).call(this,require('_process'))
},{"../_private/WorkboxError.js":3,"../_version.js":13,"_process":1}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cacheMatchIgnoreParams = cacheMatchIgnoreParams;
require("../_version.js");
/*
  Copyright 2020 Google LLC
  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

function stripParams(fullURL, ignoreParams) {
  const strippedURL = new URL(fullURL);
  for (const param of ignoreParams) {
    strippedURL.searchParams.delete(param);
  }
  return strippedURL.href;
}
/**
 * Matches an item in the cache, ignoring specific URL params. This is similar
 * to the `ignoreSearch` option, but it allows you to ignore just specific
 * params (while continuing to match on the others).
 *
 * @private
 * @param {Cache} cache
 * @param {Request} request
 * @param {Object} matchOptions
 * @param {Array<string>} ignoreParams
 * @return {Promise<Response|undefined>}
 */
async function cacheMatchIgnoreParams(cache, request, ignoreParams, matchOptions) {
  const strippedRequestURL = stripParams(request.url, ignoreParams);
  // If the request doesn't include any ignored params, match as normal.
  if (request.url === strippedRequestURL) {
    return cache.match(request, matchOptions);
  }
  // Otherwise, match by comparing keys
  const keysOptions = Object.assign(Object.assign({}, matchOptions), {
    ignoreSearch: true
  });
  const cacheKeys = await cache.keys(request, keysOptions);
  for (const cacheKey of cacheKeys) {
    const strippedCacheKeyURL = stripParams(cacheKey.url, ignoreParams);
    if (strippedRequestURL === strippedCacheKeyURL) {
      return cache.match(cacheKey, matchOptions);
    }
  }
  return;
}

},{"../_version.js":13}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cacheNames = void 0;
require("../_version.js");
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

const _cacheNameDetails = {
  googleAnalytics: 'googleAnalytics',
  precache: 'precache-v2',
  prefix: 'workbox',
  runtime: 'runtime',
  suffix: typeof registration !== 'undefined' ? registration.scope : ''
};
const _createCacheName = cacheName => {
  return [_cacheNameDetails.prefix, cacheName, _cacheNameDetails.suffix].filter(value => value && value.length > 0).join('-');
};
const eachCacheNameDetail = fn => {
  for (const key of Object.keys(_cacheNameDetails)) {
    fn(key);
  }
};
const cacheNames = exports.cacheNames = {
  updateDetails: details => {
    eachCacheNameDetail(key => {
      if (typeof details[key] === 'string') {
        _cacheNameDetails[key] = details[key];
      }
    });
  },
  getGoogleAnalyticsName: userCacheName => {
    return userCacheName || _createCacheName(_cacheNameDetails.googleAnalytics);
  },
  getPrecacheName: userCacheName => {
    return userCacheName || _createCacheName(_cacheNameDetails.precache);
  },
  getPrefix: () => {
    return _cacheNameDetails.prefix;
  },
  getRuntimeName: userCacheName => {
    return userCacheName || _createCacheName(_cacheNameDetails.runtime);
  },
  getSuffix: () => {
    return _cacheNameDetails.suffix;
  }
};

},{"../_version.js":13}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.canConstructResponseFromBodyStream = canConstructResponseFromBodyStream;
require("../_version.js");
/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

let supportStatus;
/**
 * A utility function that determines whether the current browser supports
 * constructing a new `Response` from a `response.body` stream.
 *
 * @return {boolean} `true`, if the current browser can successfully
 *     construct a `Response` from a `response.body` stream, `false` otherwise.
 *
 * @private
 */
function canConstructResponseFromBodyStream() {
  if (supportStatus === undefined) {
    const testResponse = new Response('');
    if ('body' in testResponse) {
      try {
        new Response(testResponse.body);
        supportStatus = true;
      } catch (error) {
        supportStatus = false;
      }
    }
    supportStatus = false;
  }
  return supportStatus;
}

},{"../_version.js":13}],8:[function(require,module,exports){
(function (process){(function (){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.executeQuotaErrorCallbacks = executeQuotaErrorCallbacks;
var _logger = require("../_private/logger.js");
var _quotaErrorCallbacks = require("../models/quotaErrorCallbacks.js");
require("../_version.js");
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * Runs all of the callback functions, one at a time sequentially, in the order
 * in which they were registered.
 *
 * @memberof workbox-core
 * @private
 */
async function executeQuotaErrorCallbacks() {
  if (process.env.NODE_ENV !== 'production') {
    _logger.logger.log(`About to run ${_quotaErrorCallbacks.quotaErrorCallbacks.size} ` + `callbacks to clean up caches.`);
  }
  for (const callback of _quotaErrorCallbacks.quotaErrorCallbacks) {
    await callback();
    if (process.env.NODE_ENV !== 'production') {
      _logger.logger.log(callback, 'is complete.');
    }
  }
  if (process.env.NODE_ENV !== 'production') {
    _logger.logger.log('Finished running callbacks.');
  }
}

}).call(this)}).call(this,require('_process'))
},{"../_private/logger.js":10,"../_version.js":13,"../models/quotaErrorCallbacks.js":17,"_process":1}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFriendlyURL = void 0;
require("../_version.js");
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

const getFriendlyURL = url => {
  const urlObj = new URL(String(url), location.href);
  // See https://github.com/GoogleChrome/workbox/issues/2323
  // We want to include everything, except for the origin if it's same-origin.
  return urlObj.href.replace(new RegExp(`^${location.origin}`), '');
};
exports.getFriendlyURL = getFriendlyURL;

},{"../_version.js":13}],10:[function(require,module,exports){
(function (process){(function (){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logger = void 0;
require("../_version.js");
/*
  Copyright 2019 Google LLC
  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

const logger = exports.logger = process.env.NODE_ENV === 'production' ? null : (() => {
  // Don't overwrite this value if it's already set.
  // See https://github.com/GoogleChrome/workbox/pull/2284#issuecomment-560470923
  if (!('__WB_DISABLE_DEV_LOGS' in globalThis)) {
    self.__WB_DISABLE_DEV_LOGS = false;
  }
  let inGroup = false;
  const methodToColorMap = {
    debug: `#7f8c8d`,
    log: `#2ecc71`,
    warn: `#f39c12`,
    error: `#c0392b`,
    groupCollapsed: `#3498db`,
    groupEnd: null // No colored prefix on groupEnd
  };

  const print = function (method, args) {
    if (self.__WB_DISABLE_DEV_LOGS) {
      return;
    }
    if (method === 'groupCollapsed') {
      // Safari doesn't print all console.groupCollapsed() arguments:
      // https://bugs.webkit.org/show_bug.cgi?id=182754
      if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
        console[method](...args);
        return;
      }
    }
    const styles = [`background: ${methodToColorMap[method]}`, `border-radius: 0.5em`, `color: white`, `font-weight: bold`, `padding: 2px 0.5em`];
    // When in a group, the workbox prefix is not displayed.
    const logPrefix = inGroup ? [] : ['%cworkbox', styles.join(';')];
    console[method](...logPrefix, ...args);
    if (method === 'groupCollapsed') {
      inGroup = true;
    }
    if (method === 'groupEnd') {
      inGroup = false;
    }
  };
  // eslint-disable-next-line @typescript-eslint/ban-types
  const api = {};
  const loggerMethods = Object.keys(methodToColorMap);
  for (const key of loggerMethods) {
    const method = key;
    api[method] = (...args) => {
      print(method, args);
    };
  }
  return api;
})();

}).call(this)}).call(this,require('_process'))
},{"../_version.js":13,"_process":1}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timeout = timeout;
require("../_version.js");
/*
  Copyright 2019 Google LLC
  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * Returns a promise that resolves and the passed number of milliseconds.
 * This utility is an async/await-friendly version of `setTimeout`.
 *
 * @param {number} ms
 * @return {Promise}
 * @private
 */
function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

},{"../_version.js":13}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.waitUntil = waitUntil;
require("../_version.js");
/*
  Copyright 2020 Google LLC
  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * A utility method that makes it easier to use `event.waitUntil` with
 * async functions and return the result.
 *
 * @param {ExtendableEvent} event
 * @param {Function} asyncFn
 * @return {Function}
 * @private
 */
function waitUntil(event, asyncFn) {
  const returnPromise = asyncFn();
  event.waitUntil(returnPromise);
  return returnPromise;
}

},{"../_version.js":13}],13:[function(require,module,exports){
"use strict";
// @ts-ignore
try {
    self['workbox:core:7.0.0'] && _();
}
catch (e) { }

},{}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.copyResponse = copyResponse;
var _canConstructResponseFromBodyStream = require("./_private/canConstructResponseFromBodyStream.js");
var _WorkboxError = require("./_private/WorkboxError.js");
require("./_version.js");
/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * Allows developers to copy a response and modify its `headers`, `status`,
 * or `statusText` values (the values settable via a
 * [`ResponseInit`]{@link https://developer.mozilla.org/en-US/docs/Web/API/Response/Response#Syntax}
 * object in the constructor).
 * To modify these values, pass a function as the second argument. That
 * function will be invoked with a single object with the response properties
 * `{headers, status, statusText}`. The return value of this function will
 * be used as the `ResponseInit` for the new `Response`. To change the values
 * either modify the passed parameter(s) and return it, or return a totally
 * new object.
 *
 * This method is intentionally limited to same-origin responses, regardless of
 * whether CORS was used or not.
 *
 * @param {Response} response
 * @param {Function} modifier
 * @memberof workbox-core
 */
async function copyResponse(response, modifier) {
  let origin = null;
  // If response.url isn't set, assume it's cross-origin and keep origin null.
  if (response.url) {
    const responseURL = new URL(response.url);
    origin = responseURL.origin;
  }
  if (origin !== self.location.origin) {
    throw new _WorkboxError.WorkboxError('cross-origin-copy-response', {
      origin
    });
  }
  const clonedResponse = response.clone();
  // Create a fresh `ResponseInit` object by cloning the headers.
  const responseInit = {
    headers: new Headers(clonedResponse.headers),
    status: clonedResponse.status,
    statusText: clonedResponse.statusText
  };
  // Apply any user modifications.
  const modifiedResponseInit = modifier ? modifier(responseInit) : responseInit;
  // Create the new response from the body stream and `ResponseInit`
  // modifications. Note: not all browsers support the Response.body stream,
  // so fall back to reading the entire body into memory as a blob.
  const body = (0, _canConstructResponseFromBodyStream.canConstructResponseFromBodyStream)() ? clonedResponse.body : await clonedResponse.blob();
  return new Response(body, modifiedResponseInit);
}

},{"./_private/WorkboxError.js":3,"./_private/canConstructResponseFromBodyStream.js":7,"./_version.js":13}],15:[function(require,module,exports){
(function (process){(function (){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messageGenerator = void 0;
var _messages = require("./messages.js");
require("../../_version.js");
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

const fallback = (code, ...args) => {
  let msg = code;
  if (args.length > 0) {
    msg += ` :: ${JSON.stringify(args)}`;
  }
  return msg;
};
const generatorFunction = (code, details = {}) => {
  const message = _messages.messages[code];
  if (!message) {
    throw new Error(`Unable to find message for code '${code}'.`);
  }
  return message(details);
};
const messageGenerator = exports.messageGenerator = process.env.NODE_ENV === 'production' ? fallback : generatorFunction;

}).call(this)}).call(this,require('_process'))
},{"../../_version.js":13,"./messages.js":16,"_process":1}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messages = void 0;
require("../../_version.js");
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

const messages = exports.messages = {
  'invalid-value': ({
    paramName,
    validValueDescription,
    value
  }) => {
    if (!paramName || !validValueDescription) {
      throw new Error(`Unexpected input to 'invalid-value' error.`);
    }
    return `The '${paramName}' parameter was given a value with an ` + `unexpected value. ${validValueDescription} Received a value of ` + `${JSON.stringify(value)}.`;
  },
  'not-an-array': ({
    moduleName,
    className,
    funcName,
    paramName
  }) => {
    if (!moduleName || !className || !funcName || !paramName) {
      throw new Error(`Unexpected input to 'not-an-array' error.`);
    }
    return `The parameter '${paramName}' passed into ` + `'${moduleName}.${className}.${funcName}()' must be an array.`;
  },
  'incorrect-type': ({
    expectedType,
    paramName,
    moduleName,
    className,
    funcName
  }) => {
    if (!expectedType || !paramName || !moduleName || !funcName) {
      throw new Error(`Unexpected input to 'incorrect-type' error.`);
    }
    const classNameStr = className ? `${className}.` : '';
    return `The parameter '${paramName}' passed into ` + `'${moduleName}.${classNameStr}` + `${funcName}()' must be of type ${expectedType}.`;
  },
  'incorrect-class': ({
    expectedClassName,
    paramName,
    moduleName,
    className,
    funcName,
    isReturnValueProblem
  }) => {
    if (!expectedClassName || !moduleName || !funcName) {
      throw new Error(`Unexpected input to 'incorrect-class' error.`);
    }
    const classNameStr = className ? `${className}.` : '';
    if (isReturnValueProblem) {
      return `The return value from ` + `'${moduleName}.${classNameStr}${funcName}()' ` + `must be an instance of class ${expectedClassName}.`;
    }
    return `The parameter '${paramName}' passed into ` + `'${moduleName}.${classNameStr}${funcName}()' ` + `must be an instance of class ${expectedClassName}.`;
  },
  'missing-a-method': ({
    expectedMethod,
    paramName,
    moduleName,
    className,
    funcName
  }) => {
    if (!expectedMethod || !paramName || !moduleName || !className || !funcName) {
      throw new Error(`Unexpected input to 'missing-a-method' error.`);
    }
    return `${moduleName}.${className}.${funcName}() expected the ` + `'${paramName}' parameter to expose a '${expectedMethod}' method.`;
  },
  'add-to-cache-list-unexpected-type': ({
    entry
  }) => {
    return `An unexpected entry was passed to ` + `'workbox-precaching.PrecacheController.addToCacheList()' The entry ` + `'${JSON.stringify(entry)}' isn't supported. You must supply an array of ` + `strings with one or more characters, objects with a url property or ` + `Request objects.`;
  },
  'add-to-cache-list-conflicting-entries': ({
    firstEntry,
    secondEntry
  }) => {
    if (!firstEntry || !secondEntry) {
      throw new Error(`Unexpected input to ` + `'add-to-cache-list-duplicate-entries' error.`);
    }
    return `Two of the entries passed to ` + `'workbox-precaching.PrecacheController.addToCacheList()' had the URL ` + `${firstEntry} but different revision details. Workbox is ` + `unable to cache and version the asset correctly. Please remove one ` + `of the entries.`;
  },
  'plugin-error-request-will-fetch': ({
    thrownErrorMessage
  }) => {
    if (!thrownErrorMessage) {
      throw new Error(`Unexpected input to ` + `'plugin-error-request-will-fetch', error.`);
    }
    return `An error was thrown by a plugins 'requestWillFetch()' method. ` + `The thrown error message was: '${thrownErrorMessage}'.`;
  },
  'invalid-cache-name': ({
    cacheNameId,
    value
  }) => {
    if (!cacheNameId) {
      throw new Error(`Expected a 'cacheNameId' for error 'invalid-cache-name'`);
    }
    return `You must provide a name containing at least one character for ` + `setCacheDetails({${cacheNameId}: '...'}). Received a value of ` + `'${JSON.stringify(value)}'`;
  },
  'unregister-route-but-not-found-with-method': ({
    method
  }) => {
    if (!method) {
      throw new Error(`Unexpected input to ` + `'unregister-route-but-not-found-with-method' error.`);
    }
    return `The route you're trying to unregister was not  previously ` + `registered for the method type '${method}'.`;
  },
  'unregister-route-route-not-registered': () => {
    return `The route you're trying to unregister was not previously ` + `registered.`;
  },
  'queue-replay-failed': ({
    name
  }) => {
    return `Replaying the background sync queue '${name}' failed.`;
  },
  'duplicate-queue-name': ({
    name
  }) => {
    return `The Queue name '${name}' is already being used. ` + `All instances of backgroundSync.Queue must be given unique names.`;
  },
  'expired-test-without-max-age': ({
    methodName,
    paramName
  }) => {
    return `The '${methodName}()' method can only be used when the ` + `'${paramName}' is used in the constructor.`;
  },
  'unsupported-route-type': ({
    moduleName,
    className,
    funcName,
    paramName
  }) => {
    return `The supplied '${paramName}' parameter was an unsupported type. ` + `Please check the docs for ${moduleName}.${className}.${funcName} for ` + `valid input types.`;
  },
  'not-array-of-class': ({
    value,
    expectedClass,
    moduleName,
    className,
    funcName,
    paramName
  }) => {
    return `The supplied '${paramName}' parameter must be an array of ` + `'${expectedClass}' objects. Received '${JSON.stringify(value)},'. ` + `Please check the call to ${moduleName}.${className}.${funcName}() ` + `to fix the issue.`;
  },
  'max-entries-or-age-required': ({
    moduleName,
    className,
    funcName
  }) => {
    return `You must define either config.maxEntries or config.maxAgeSeconds` + `in ${moduleName}.${className}.${funcName}`;
  },
  'statuses-or-headers-required': ({
    moduleName,
    className,
    funcName
  }) => {
    return `You must define either config.statuses or config.headers` + `in ${moduleName}.${className}.${funcName}`;
  },
  'invalid-string': ({
    moduleName,
    funcName,
    paramName
  }) => {
    if (!paramName || !moduleName || !funcName) {
      throw new Error(`Unexpected input to 'invalid-string' error.`);
    }
    return `When using strings, the '${paramName}' parameter must start with ` + `'http' (for cross-origin matches) or '/' (for same-origin matches). ` + `Please see the docs for ${moduleName}.${funcName}() for ` + `more info.`;
  },
  'channel-name-required': () => {
    return `You must provide a channelName to construct a ` + `BroadcastCacheUpdate instance.`;
  },
  'invalid-responses-are-same-args': () => {
    return `The arguments passed into responsesAreSame() appear to be ` + `invalid. Please ensure valid Responses are used.`;
  },
  'expire-custom-caches-only': () => {
    return `You must provide a 'cacheName' property when using the ` + `expiration plugin with a runtime caching strategy.`;
  },
  'unit-must-be-bytes': ({
    normalizedRangeHeader
  }) => {
    if (!normalizedRangeHeader) {
      throw new Error(`Unexpected input to 'unit-must-be-bytes' error.`);
    }
    return `The 'unit' portion of the Range header must be set to 'bytes'. ` + `The Range header provided was "${normalizedRangeHeader}"`;
  },
  'single-range-only': ({
    normalizedRangeHeader
  }) => {
    if (!normalizedRangeHeader) {
      throw new Error(`Unexpected input to 'single-range-only' error.`);
    }
    return `Multiple ranges are not supported. Please use a  single start ` + `value, and optional end value. The Range header provided was ` + `"${normalizedRangeHeader}"`;
  },
  'invalid-range-values': ({
    normalizedRangeHeader
  }) => {
    if (!normalizedRangeHeader) {
      throw new Error(`Unexpected input to 'invalid-range-values' error.`);
    }
    return `The Range header is missing both start and end values. At least ` + `one of those values is needed. The Range header provided was ` + `"${normalizedRangeHeader}"`;
  },
  'no-range-header': () => {
    return `No Range header was found in the Request provided.`;
  },
  'range-not-satisfiable': ({
    size,
    start,
    end
  }) => {
    return `The start (${start}) and end (${end}) values in the Range are ` + `not satisfiable by the cached response, which is ${size} bytes.`;
  },
  'attempt-to-cache-non-get-request': ({
    url,
    method
  }) => {
    return `Unable to cache '${url}' because it is a '${method}' request and ` + `only 'GET' requests can be cached.`;
  },
  'cache-put-with-no-response': ({
    url
  }) => {
    return `There was an attempt to cache '${url}' but the response was not ` + `defined.`;
  },
  'no-response': ({
    url,
    error
  }) => {
    let message = `The strategy could not generate a response for '${url}'.`;
    if (error) {
      message += ` The underlying error is ${error}.`;
    }
    return message;
  },
  'bad-precaching-response': ({
    url,
    status
  }) => {
    return `The precaching request for '${url}' failed` + (status ? ` with an HTTP status of ${status}.` : `.`);
  },
  'non-precached-url': ({
    url
  }) => {
    return `createHandlerBoundToURL('${url}') was called, but that URL is ` + `not precached. Please pass in a URL that is precached instead.`;
  },
  'add-to-cache-list-conflicting-integrities': ({
    url
  }) => {
    return `Two of the entries passed to ` + `'workbox-precaching.PrecacheController.addToCacheList()' had the URL ` + `${url} with different integrity values. Please remove one of them.`;
  },
  'missing-precache-entry': ({
    cacheName,
    url
  }) => {
    return `Unable to find a precached response in ${cacheName} for ${url}.`;
  },
  'cross-origin-copy-response': ({
    origin
  }) => {
    return `workbox-core.copyResponse() can only be used with same-origin ` + `responses. It was passed a response with origin ${origin}.`;
  },
  'opaque-streams-source': ({
    type
  }) => {
    const message = `One of the workbox-streams sources resulted in an ` + `'${type}' response.`;
    if (type === 'opaqueredirect') {
      return `${message} Please do not use a navigation request that results ` + `in a redirect as a source.`;
    }
    return `${message} Please ensure your sources are CORS-enabled.`;
  }
};

},{"../../_version.js":13}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.quotaErrorCallbacks = void 0;
require("../_version.js");
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

// Callbacks to be executed whenever there's a quota error.
// Can't change Function type right now.
// eslint-disable-next-line @typescript-eslint/ban-types
const quotaErrorCallbacks = exports.quotaErrorCallbacks = new Set();

},{"../_version.js":13}],18:[function(require,module,exports){
(function (process){(function (){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PrecacheController = void 0;
var _assert = require("workbox-core/_private/assert.js");
var _cacheNames = require("workbox-core/_private/cacheNames.js");
var _logger = require("workbox-core/_private/logger.js");
var _WorkboxError = require("workbox-core/_private/WorkboxError.js");
var _waitUntil = require("workbox-core/_private/waitUntil.js");
var _createCacheKey = require("./utils/createCacheKey.js");
var _PrecacheInstallReportPlugin = require("./utils/PrecacheInstallReportPlugin.js");
var _PrecacheCacheKeyPlugin = require("./utils/PrecacheCacheKeyPlugin.js");
var _printCleanupDetails = require("./utils/printCleanupDetails.js");
var _printInstallDetails = require("./utils/printInstallDetails.js");
var _PrecacheStrategy = require("./PrecacheStrategy.js");
require("./_version.js");
/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * Performs efficient precaching of assets.
 *
 * @memberof workbox-precaching
 */
class PrecacheController {
  /**
   * Create a new PrecacheController.
   *
   * @param {Object} [options]
   * @param {string} [options.cacheName] The cache to use for precaching.
   * @param {string} [options.plugins] Plugins to use when precaching as well
   * as responding to fetch events for precached assets.
   * @param {boolean} [options.fallbackToNetwork=true] Whether to attempt to
   * get the response from the network if there's a precache miss.
   */
  constructor({
    cacheName,
    plugins = [],
    fallbackToNetwork = true
  } = {}) {
    this._urlsToCacheKeys = new Map();
    this._urlsToCacheModes = new Map();
    this._cacheKeysToIntegrities = new Map();
    this._strategy = new _PrecacheStrategy.PrecacheStrategy({
      cacheName: _cacheNames.cacheNames.getPrecacheName(cacheName),
      plugins: [...plugins, new _PrecacheCacheKeyPlugin.PrecacheCacheKeyPlugin({
        precacheController: this
      })],
      fallbackToNetwork
    });
    // Bind the install and activate methods to the instance.
    this.install = this.install.bind(this);
    this.activate = this.activate.bind(this);
  }
  /**
   * @type {workbox-precaching.PrecacheStrategy} The strategy created by this controller and
   * used to cache assets and respond to fetch events.
   */
  get strategy() {
    return this._strategy;
  }
  /**
   * Adds items to the precache list, removing any duplicates and
   * stores the files in the
   * {@link workbox-core.cacheNames|"precache cache"} when the service
   * worker installs.
   *
   * This method can be called multiple times.
   *
   * @param {Array<Object|string>} [entries=[]] Array of entries to precache.
   */
  precache(entries) {
    this.addToCacheList(entries);
    if (!this._installAndActiveListenersAdded) {
      self.addEventListener('install', this.install);
      self.addEventListener('activate', this.activate);
      this._installAndActiveListenersAdded = true;
    }
  }
  /**
   * This method will add items to the precache list, removing duplicates
   * and ensuring the information is valid.
   *
   * @param {Array<workbox-precaching.PrecacheController.PrecacheEntry|string>} entries
   *     Array of entries to precache.
   */
  addToCacheList(entries) {
    if (process.env.NODE_ENV !== 'production') {
      _assert.assert.isArray(entries, {
        moduleName: 'workbox-precaching',
        className: 'PrecacheController',
        funcName: 'addToCacheList',
        paramName: 'entries'
      });
    }
    const urlsToWarnAbout = [];
    for (const entry of entries) {
      // See https://github.com/GoogleChrome/workbox/issues/2259
      if (typeof entry === 'string') {
        urlsToWarnAbout.push(entry);
      } else if (entry && entry.revision === undefined) {
        urlsToWarnAbout.push(entry.url);
      }
      const {
        cacheKey,
        url
      } = (0, _createCacheKey.createCacheKey)(entry);
      const cacheMode = typeof entry !== 'string' && entry.revision ? 'reload' : 'default';
      if (this._urlsToCacheKeys.has(url) && this._urlsToCacheKeys.get(url) !== cacheKey) {
        throw new _WorkboxError.WorkboxError('add-to-cache-list-conflicting-entries', {
          firstEntry: this._urlsToCacheKeys.get(url),
          secondEntry: cacheKey
        });
      }
      if (typeof entry !== 'string' && entry.integrity) {
        if (this._cacheKeysToIntegrities.has(cacheKey) && this._cacheKeysToIntegrities.get(cacheKey) !== entry.integrity) {
          throw new _WorkboxError.WorkboxError('add-to-cache-list-conflicting-integrities', {
            url
          });
        }
        this._cacheKeysToIntegrities.set(cacheKey, entry.integrity);
      }
      this._urlsToCacheKeys.set(url, cacheKey);
      this._urlsToCacheModes.set(url, cacheMode);
      if (urlsToWarnAbout.length > 0) {
        const warningMessage = `Workbox is precaching URLs without revision ` + `info: ${urlsToWarnAbout.join(', ')}\nThis is generally NOT safe. ` + `Learn more at https://bit.ly/wb-precache`;
        if (process.env.NODE_ENV === 'production') {
          // Use console directly to display this warning without bloating
          // bundle sizes by pulling in all of the logger codebase in prod.
          console.warn(warningMessage);
        } else {
          _logger.logger.warn(warningMessage);
        }
      }
    }
  }
  /**
   * Precaches new and updated assets. Call this method from the service worker
   * install event.
   *
   * Note: this method calls `event.waitUntil()` for you, so you do not need
   * to call it yourself in your event handlers.
   *
   * @param {ExtendableEvent} event
   * @return {Promise<workbox-precaching.InstallResult>}
   */
  install(event) {
    // waitUntil returns Promise<any>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return (0, _waitUntil.waitUntil)(event, async () => {
      const installReportPlugin = new _PrecacheInstallReportPlugin.PrecacheInstallReportPlugin();
      this.strategy.plugins.push(installReportPlugin);
      // Cache entries one at a time.
      // See https://github.com/GoogleChrome/workbox/issues/2528
      for (const [url, cacheKey] of this._urlsToCacheKeys) {
        const integrity = this._cacheKeysToIntegrities.get(cacheKey);
        const cacheMode = this._urlsToCacheModes.get(url);
        const request = new Request(url, {
          integrity,
          cache: cacheMode,
          credentials: 'same-origin'
        });
        await Promise.all(this.strategy.handleAll({
          params: {
            cacheKey
          },
          request,
          event
        }));
      }
      const {
        updatedURLs,
        notUpdatedURLs
      } = installReportPlugin;
      if (process.env.NODE_ENV !== 'production') {
        (0, _printInstallDetails.printInstallDetails)(updatedURLs, notUpdatedURLs);
      }
      return {
        updatedURLs,
        notUpdatedURLs
      };
    });
  }
  /**
   * Deletes assets that are no longer present in the current precache manifest.
   * Call this method from the service worker activate event.
   *
   * Note: this method calls `event.waitUntil()` for you, so you do not need
   * to call it yourself in your event handlers.
   *
   * @param {ExtendableEvent} event
   * @return {Promise<workbox-precaching.CleanupResult>}
   */
  activate(event) {
    // waitUntil returns Promise<any>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return (0, _waitUntil.waitUntil)(event, async () => {
      const cache = await self.caches.open(this.strategy.cacheName);
      const currentlyCachedRequests = await cache.keys();
      const expectedCacheKeys = new Set(this._urlsToCacheKeys.values());
      const deletedURLs = [];
      for (const request of currentlyCachedRequests) {
        if (!expectedCacheKeys.has(request.url)) {
          await cache.delete(request);
          deletedURLs.push(request.url);
        }
      }
      if (process.env.NODE_ENV !== 'production') {
        (0, _printCleanupDetails.printCleanupDetails)(deletedURLs);
      }
      return {
        deletedURLs
      };
    });
  }
  /**
   * Returns a mapping of a precached URL to the corresponding cache key, taking
   * into account the revision information for the URL.
   *
   * @return {Map<string, string>} A URL to cache key mapping.
   */
  getURLsToCacheKeys() {
    return this._urlsToCacheKeys;
  }
  /**
   * Returns a list of all the URLs that have been precached by the current
   * service worker.
   *
   * @return {Array<string>} The precached URLs.
   */
  getCachedURLs() {
    return [...this._urlsToCacheKeys.keys()];
  }
  /**
   * Returns the cache key used for storing a given URL. If that URL is
   * unversioned, like `/index.html', then the cache key will be the original
   * URL with a search parameter appended to it.
   *
   * @param {string} url A URL whose cache key you want to look up.
   * @return {string} The versioned URL that corresponds to a cache key
   * for the original URL, or undefined if that URL isn't precached.
   */
  getCacheKeyForURL(url) {
    const urlObject = new URL(url, location.href);
    return this._urlsToCacheKeys.get(urlObject.href);
  }
  /**
   * @param {string} url A cache key whose SRI you want to look up.
   * @return {string} The subresource integrity associated with the cache key,
   * or undefined if it's not set.
   */
  getIntegrityForCacheKey(cacheKey) {
    return this._cacheKeysToIntegrities.get(cacheKey);
  }
  /**
   * This acts as a drop-in replacement for
   * [`cache.match()`](https://developer.mozilla.org/en-US/docs/Web/API/Cache/match)
   * with the following differences:
   *
   * - It knows what the name of the precache is, and only checks in that cache.
   * - It allows you to pass in an "original" URL without versioning parameters,
   * and it will automatically look up the correct cache key for the currently
   * active revision of that URL.
   *
   * E.g., `matchPrecache('index.html')` will find the correct precached
   * response for the currently active service worker, even if the actual cache
   * key is `'/index.html?__WB_REVISION__=1234abcd'`.
   *
   * @param {string|Request} request The key (without revisioning parameters)
   * to look up in the precache.
   * @return {Promise<Response|undefined>}
   */
  async matchPrecache(request) {
    const url = request instanceof Request ? request.url : request;
    const cacheKey = this.getCacheKeyForURL(url);
    if (cacheKey) {
      const cache = await self.caches.open(this.strategy.cacheName);
      return cache.match(cacheKey);
    }
    return undefined;
  }
  /**
   * Returns a function that looks up `url` in the precache (taking into
   * account revision information), and returns the corresponding `Response`.
   *
   * @param {string} url The precached URL which will be used to lookup the
   * `Response`.
   * @return {workbox-routing~handlerCallback}
   */
  createHandlerBoundToURL(url) {
    const cacheKey = this.getCacheKeyForURL(url);
    if (!cacheKey) {
      throw new _WorkboxError.WorkboxError('non-precached-url', {
        url
      });
    }
    return options => {
      options.request = new Request(url);
      options.params = Object.assign({
        cacheKey
      }, options.params);
      return this.strategy.handle(options);
    };
  }
}
exports.PrecacheController = PrecacheController;

}).call(this)}).call(this,require('_process'))
},{"./PrecacheStrategy.js":20,"./_version.js":21,"./utils/PrecacheCacheKeyPlugin.js":26,"./utils/PrecacheInstallReportPlugin.js":27,"./utils/createCacheKey.js":28,"./utils/printCleanupDetails.js":31,"./utils/printInstallDetails.js":32,"_process":1,"workbox-core/_private/WorkboxError.js":3,"workbox-core/_private/assert.js":4,"workbox-core/_private/cacheNames.js":6,"workbox-core/_private/logger.js":10,"workbox-core/_private/waitUntil.js":12}],19:[function(require,module,exports){
(function (process){(function (){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PrecacheRoute = void 0;
var _logger = require("workbox-core/_private/logger.js");
var _getFriendlyURL = require("workbox-core/_private/getFriendlyURL.js");
var _Route = require("workbox-routing/Route.js");
var _generateURLVariations = require("./utils/generateURLVariations.js");
require("./_version.js");
/*
  Copyright 2020 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * A subclass of {@link workbox-routing.Route} that takes a
 * {@link workbox-precaching.PrecacheController}
 * instance and uses it to match incoming requests and handle fetching
 * responses from the precache.
 *
 * @memberof workbox-precaching
 * @extends workbox-routing.Route
 */
class PrecacheRoute extends _Route.Route {
  /**
   * @param {PrecacheController} precacheController A `PrecacheController`
   * instance used to both match requests and respond to fetch events.
   * @param {Object} [options] Options to control how requests are matched
   * against the list of precached URLs.
   * @param {string} [options.directoryIndex=index.html] The `directoryIndex` will
   * check cache entries for a URLs ending with '/' to see if there is a hit when
   * appending the `directoryIndex` value.
   * @param {Array<RegExp>} [options.ignoreURLParametersMatching=[/^utm_/, /^fbclid$/]] An
   * array of regex's to remove search params when looking for a cache match.
   * @param {boolean} [options.cleanURLs=true] The `cleanURLs` option will
   * check the cache for the URL with a `.html` added to the end of the end.
   * @param {workbox-precaching~urlManipulation} [options.urlManipulation]
   * This is a function that should take a URL and return an array of
   * alternative URLs that should be checked for precache matches.
   */
  constructor(precacheController, options) {
    const match = ({
      request
    }) => {
      const urlsToCacheKeys = precacheController.getURLsToCacheKeys();
      for (const possibleURL of (0, _generateURLVariations.generateURLVariations)(request.url, options)) {
        const cacheKey = urlsToCacheKeys.get(possibleURL);
        if (cacheKey) {
          const integrity = precacheController.getIntegrityForCacheKey(cacheKey);
          return {
            cacheKey,
            integrity
          };
        }
      }
      if (process.env.NODE_ENV !== 'production') {
        _logger.logger.debug(`Precaching did not find a match for ` + (0, _getFriendlyURL.getFriendlyURL)(request.url));
      }
      return;
    };
    super(match, precacheController.strategy);
  }
}
exports.PrecacheRoute = PrecacheRoute;

}).call(this)}).call(this,require('_process'))
},{"./_version.js":21,"./utils/generateURLVariations.js":29,"_process":1,"workbox-core/_private/getFriendlyURL.js":9,"workbox-core/_private/logger.js":10,"workbox-routing/Route.js":35}],20:[function(require,module,exports){
(function (process){(function (){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PrecacheStrategy = void 0;
var _copyResponse = require("workbox-core/copyResponse.js");
var _cacheNames = require("workbox-core/_private/cacheNames.js");
var _getFriendlyURL = require("workbox-core/_private/getFriendlyURL.js");
var _logger = require("workbox-core/_private/logger.js");
var _WorkboxError = require("workbox-core/_private/WorkboxError.js");
var _Strategy = require("workbox-strategies/Strategy.js");
require("./_version.js");
/*
  Copyright 2020 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * A {@link workbox-strategies.Strategy} implementation
 * specifically designed to work with
 * {@link workbox-precaching.PrecacheController}
 * to both cache and fetch precached assets.
 *
 * Note: an instance of this class is created automatically when creating a
 * `PrecacheController`; it's generally not necessary to create this yourself.
 *
 * @extends workbox-strategies.Strategy
 * @memberof workbox-precaching
 */
class PrecacheStrategy extends _Strategy.Strategy {
  /**
   *
   * @param {Object} [options]
   * @param {string} [options.cacheName] Cache name to store and retrieve
   * requests. Defaults to the cache names provided by
   * {@link workbox-core.cacheNames}.
   * @param {Array<Object>} [options.plugins] {@link https://developers.google.com/web/tools/workbox/guides/using-plugins|Plugins}
   * to use in conjunction with this caching strategy.
   * @param {Object} [options.fetchOptions] Values passed along to the
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters|init}
   * of all fetch() requests made by this strategy.
   * @param {Object} [options.matchOptions] The
   * {@link https://w3c.github.io/ServiceWorker/#dictdef-cachequeryoptions|CacheQueryOptions}
   * for any `cache.match()` or `cache.put()` calls made by this strategy.
   * @param {boolean} [options.fallbackToNetwork=true] Whether to attempt to
   * get the response from the network if there's a precache miss.
   */
  constructor(options = {}) {
    options.cacheName = _cacheNames.cacheNames.getPrecacheName(options.cacheName);
    super(options);
    this._fallbackToNetwork = options.fallbackToNetwork === false ? false : true;
    // Redirected responses cannot be used to satisfy a navigation request, so
    // any redirected response must be "copied" rather than cloned, so the new
    // response doesn't contain the `redirected` flag. See:
    // https://bugs.chromium.org/p/chromium/issues/detail?id=669363&desc=2#c1
    this.plugins.push(PrecacheStrategy.copyRedirectedCacheableResponsesPlugin);
  }
  /**
   * @private
   * @param {Request|string} request A request to run this strategy for.
   * @param {workbox-strategies.StrategyHandler} handler The event that
   *     triggered the request.
   * @return {Promise<Response>}
   */
  async _handle(request, handler) {
    const response = await handler.cacheMatch(request);
    if (response) {
      return response;
    }
    // If this is an `install` event for an entry that isn't already cached,
    // then populate the cache.
    if (handler.event && handler.event.type === 'install') {
      return await this._handleInstall(request, handler);
    }
    // Getting here means something went wrong. An entry that should have been
    // precached wasn't found in the cache.
    return await this._handleFetch(request, handler);
  }
  async _handleFetch(request, handler) {
    let response;
    const params = handler.params || {};
    // Fall back to the network if we're configured to do so.
    if (this._fallbackToNetwork) {
      if (process.env.NODE_ENV !== 'production') {
        _logger.logger.warn(`The precached response for ` + `${(0, _getFriendlyURL.getFriendlyURL)(request.url)} in ${this.cacheName} was not ` + `found. Falling back to the network.`);
      }
      const integrityInManifest = params.integrity;
      const integrityInRequest = request.integrity;
      const noIntegrityConflict = !integrityInRequest || integrityInRequest === integrityInManifest;
      // Do not add integrity if the original request is no-cors
      // See https://github.com/GoogleChrome/workbox/issues/3096
      response = await handler.fetch(new Request(request, {
        integrity: request.mode !== 'no-cors' ? integrityInRequest || integrityInManifest : undefined
      }));
      // It's only "safe" to repair the cache if we're using SRI to guarantee
      // that the response matches the precache manifest's expectations,
      // and there's either a) no integrity property in the incoming request
      // or b) there is an integrity, and it matches the precache manifest.
      // See https://github.com/GoogleChrome/workbox/issues/2858
      // Also if the original request users no-cors we don't use integrity.
      // See https://github.com/GoogleChrome/workbox/issues/3096
      if (integrityInManifest && noIntegrityConflict && request.mode !== 'no-cors') {
        this._useDefaultCacheabilityPluginIfNeeded();
        const wasCached = await handler.cachePut(request, response.clone());
        if (process.env.NODE_ENV !== 'production') {
          if (wasCached) {
            _logger.logger.log(`A response for ${(0, _getFriendlyURL.getFriendlyURL)(request.url)} ` + `was used to "repair" the precache.`);
          }
        }
      }
    } else {
      // This shouldn't normally happen, but there are edge cases:
      // https://github.com/GoogleChrome/workbox/issues/1441
      throw new _WorkboxError.WorkboxError('missing-precache-entry', {
        cacheName: this.cacheName,
        url: request.url
      });
    }
    if (process.env.NODE_ENV !== 'production') {
      const cacheKey = params.cacheKey || (await handler.getCacheKey(request, 'read'));
      // Workbox is going to handle the route.
      // print the routing details to the console.
      _logger.logger.groupCollapsed(`Precaching is responding to: ` + (0, _getFriendlyURL.getFriendlyURL)(request.url));
      _logger.logger.log(`Serving the precached url: ${(0, _getFriendlyURL.getFriendlyURL)(cacheKey instanceof Request ? cacheKey.url : cacheKey)}`);
      _logger.logger.groupCollapsed(`View request details here.`);
      _logger.logger.log(request);
      _logger.logger.groupEnd();
      _logger.logger.groupCollapsed(`View response details here.`);
      _logger.logger.log(response);
      _logger.logger.groupEnd();
      _logger.logger.groupEnd();
    }
    return response;
  }
  async _handleInstall(request, handler) {
    this._useDefaultCacheabilityPluginIfNeeded();
    const response = await handler.fetch(request);
    // Make sure we defer cachePut() until after we know the response
    // should be cached; see https://github.com/GoogleChrome/workbox/issues/2737
    const wasCached = await handler.cachePut(request, response.clone());
    if (!wasCached) {
      // Throwing here will lead to the `install` handler failing, which
      // we want to do if *any* of the responses aren't safe to cache.
      throw new _WorkboxError.WorkboxError('bad-precaching-response', {
        url: request.url,
        status: response.status
      });
    }
    return response;
  }
  /**
   * This method is complex, as there a number of things to account for:
   *
   * The `plugins` array can be set at construction, and/or it might be added to
   * to at any time before the strategy is used.
   *
   * At the time the strategy is used (i.e. during an `install` event), there
   * needs to be at least one plugin that implements `cacheWillUpdate` in the
   * array, other than `copyRedirectedCacheableResponsesPlugin`.
   *
   * - If this method is called and there are no suitable `cacheWillUpdate`
   * plugins, we need to add `defaultPrecacheCacheabilityPlugin`.
   *
   * - If this method is called and there is exactly one `cacheWillUpdate`, then
   * we don't have to do anything (this might be a previously added
   * `defaultPrecacheCacheabilityPlugin`, or it might be a custom plugin).
   *
   * - If this method is called and there is more than one `cacheWillUpdate`,
   * then we need to check if one is `defaultPrecacheCacheabilityPlugin`. If so,
   * we need to remove it. (This situation is unlikely, but it could happen if
   * the strategy is used multiple times, the first without a `cacheWillUpdate`,
   * and then later on after manually adding a custom `cacheWillUpdate`.)
   *
   * See https://github.com/GoogleChrome/workbox/issues/2737 for more context.
   *
   * @private
   */
  _useDefaultCacheabilityPluginIfNeeded() {
    let defaultPluginIndex = null;
    let cacheWillUpdatePluginCount = 0;
    for (const [index, plugin] of this.plugins.entries()) {
      // Ignore the copy redirected plugin when determining what to do.
      if (plugin === PrecacheStrategy.copyRedirectedCacheableResponsesPlugin) {
        continue;
      }
      // Save the default plugin's index, in case it needs to be removed.
      if (plugin === PrecacheStrategy.defaultPrecacheCacheabilityPlugin) {
        defaultPluginIndex = index;
      }
      if (plugin.cacheWillUpdate) {
        cacheWillUpdatePluginCount++;
      }
    }
    if (cacheWillUpdatePluginCount === 0) {
      this.plugins.push(PrecacheStrategy.defaultPrecacheCacheabilityPlugin);
    } else if (cacheWillUpdatePluginCount > 1 && defaultPluginIndex !== null) {
      // Only remove the default plugin; multiple custom plugins are allowed.
      this.plugins.splice(defaultPluginIndex, 1);
    }
    // Nothing needs to be done if cacheWillUpdatePluginCount is 1
  }
}
exports.PrecacheStrategy = PrecacheStrategy;
PrecacheStrategy.defaultPrecacheCacheabilityPlugin = {
  async cacheWillUpdate({
    response
  }) {
    if (!response || response.status >= 400) {
      return null;
    }
    return response;
  }
};
PrecacheStrategy.copyRedirectedCacheableResponsesPlugin = {
  async cacheWillUpdate({
    response
  }) {
    return response.redirected ? await (0, _copyResponse.copyResponse)(response) : response;
  }
};

}).call(this)}).call(this,require('_process'))
},{"./_version.js":21,"_process":1,"workbox-core/_private/WorkboxError.js":3,"workbox-core/_private/cacheNames.js":6,"workbox-core/_private/getFriendlyURL.js":9,"workbox-core/_private/logger.js":10,"workbox-core/copyResponse.js":14,"workbox-strategies/Strategy.js":42}],21:[function(require,module,exports){
"use strict";
// @ts-ignore
try {
    self['workbox:precaching:7.0.0'] && _();
}
catch (e) { }

},{}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addRoute = addRoute;
var _registerRoute = require("workbox-routing/registerRoute.js");
var _getOrCreatePrecacheController = require("./utils/getOrCreatePrecacheController.js");
var _PrecacheRoute = require("./PrecacheRoute.js");
require("./_version.js");
/*
  Copyright 2019 Google LLC
  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * Add a `fetch` listener to the service worker that will
 * respond to
 * [network requests]{@link https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers#Custom_responses_to_requests}
 * with precached assets.
 *
 * Requests for assets that aren't precached, the `FetchEvent` will not be
 * responded to, allowing the event to fall through to other `fetch` event
 * listeners.
 *
 * @param {Object} [options] See the {@link workbox-precaching.PrecacheRoute}
 * options.
 *
 * @memberof workbox-precaching
 */
function addRoute(options) {
  const precacheController = (0, _getOrCreatePrecacheController.getOrCreatePrecacheController)();
  const precacheRoute = new _PrecacheRoute.PrecacheRoute(precacheController, options);
  (0, _registerRoute.registerRoute)(precacheRoute);
}

},{"./PrecacheRoute.js":19,"./_version.js":21,"./utils/getOrCreatePrecacheController.js":30,"workbox-routing/registerRoute.js":38}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.precache = precache;
var _getOrCreatePrecacheController = require("./utils/getOrCreatePrecacheController.js");
require("./_version.js");
/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * Adds items to the precache list, removing any duplicates and
 * stores the files in the
 * {@link workbox-core.cacheNames|"precache cache"} when the service
 * worker installs.
 *
 * This method can be called multiple times.
 *
 * Please note: This method **will not** serve any of the cached files for you.
 * It only precaches files. To respond to a network request you call
 * {@link workbox-precaching.addRoute}.
 *
 * If you have a single array of files to precache, you can just call
 * {@link workbox-precaching.precacheAndRoute}.
 *
 * @param {Array<Object|string>} [entries=[]] Array of entries to precache.
 *
 * @memberof workbox-precaching
 */
function precache(entries) {
  const precacheController = (0, _getOrCreatePrecacheController.getOrCreatePrecacheController)();
  precacheController.precache(entries);
}

},{"./_version.js":21,"./utils/getOrCreatePrecacheController.js":30}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.precacheAndRoute = precacheAndRoute;
var _addRoute = require("./addRoute.js");
var _precache = require("./precache.js");
require("./_version.js");
/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * This method will add entries to the precache list and add a route to
 * respond to fetch events.
 *
 * This is a convenience method that will call
 * {@link workbox-precaching.precache} and
 * {@link workbox-precaching.addRoute} in a single call.
 *
 * @param {Array<Object|string>} entries Array of entries to precache.
 * @param {Object} [options] See the
 * {@link workbox-precaching.PrecacheRoute} options.
 *
 * @memberof workbox-precaching
 */
function precacheAndRoute(entries, options) {
  (0, _precache.precache)(entries);
  (0, _addRoute.addRoute)(options);
}

},{"./_version.js":21,"./addRoute.js":22,"./precache.js":23}],25:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _precacheAndRoute = require("./precacheAndRoute.js");
Object.keys(_precacheAndRoute).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _precacheAndRoute[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _precacheAndRoute[key];
    }
  });
});

},{"./precacheAndRoute.js":24}],26:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PrecacheCacheKeyPlugin = void 0;
require("../_version.js");
/*
  Copyright 2020 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * A plugin, designed to be used with PrecacheController, to translate URLs into
 * the corresponding cache key, based on the current revision info.
 *
 * @private
 */
class PrecacheCacheKeyPlugin {
  constructor({
    precacheController
  }) {
    this.cacheKeyWillBeUsed = async ({
      request,
      params
    }) => {
      // Params is type any, can't change right now.
      /* eslint-disable */
      const cacheKey = (params === null || params === void 0 ? void 0 : params.cacheKey) || this._precacheController.getCacheKeyForURL(request.url);
      /* eslint-enable */
      return cacheKey ? new Request(cacheKey, {
        headers: request.headers
      }) : request;
    };
    this._precacheController = precacheController;
  }
}
exports.PrecacheCacheKeyPlugin = PrecacheCacheKeyPlugin;

},{"../_version.js":21}],27:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PrecacheInstallReportPlugin = void 0;
require("../_version.js");
/*
  Copyright 2020 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * A plugin, designed to be used with PrecacheController, to determine the
 * of assets that were updated (or not updated) during the install event.
 *
 * @private
 */
class PrecacheInstallReportPlugin {
  constructor() {
    this.updatedURLs = [];
    this.notUpdatedURLs = [];
    this.handlerWillStart = async ({
      request,
      state
    }) => {
      // TODO: `state` should never be undefined...
      if (state) {
        state.originalRequest = request;
      }
    };
    this.cachedResponseWillBeUsed = async ({
      event,
      state,
      cachedResponse
    }) => {
      if (event.type === 'install') {
        if (state && state.originalRequest && state.originalRequest instanceof Request) {
          // TODO: `state` should never be undefined...
          const url = state.originalRequest.url;
          if (cachedResponse) {
            this.notUpdatedURLs.push(url);
          } else {
            this.updatedURLs.push(url);
          }
        }
      }
      return cachedResponse;
    };
  }
}
exports.PrecacheInstallReportPlugin = PrecacheInstallReportPlugin;

},{"../_version.js":21}],28:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCacheKey = createCacheKey;
var _WorkboxError = require("workbox-core/_private/WorkboxError.js");
require("../_version.js");
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

// Name of the search parameter used to store revision info.
const REVISION_SEARCH_PARAM = '__WB_REVISION__';
/**
 * Converts a manifest entry into a versioned URL suitable for precaching.
 *
 * @param {Object|string} entry
 * @return {string} A URL with versioning info.
 *
 * @private
 * @memberof workbox-precaching
 */
function createCacheKey(entry) {
  if (!entry) {
    throw new _WorkboxError.WorkboxError('add-to-cache-list-unexpected-type', {
      entry
    });
  }
  // If a precache manifest entry is a string, it's assumed to be a versioned
  // URL, like '/app.abcd1234.js'. Return as-is.
  if (typeof entry === 'string') {
    const urlObject = new URL(entry, location.href);
    return {
      cacheKey: urlObject.href,
      url: urlObject.href
    };
  }
  const {
    revision,
    url
  } = entry;
  if (!url) {
    throw new _WorkboxError.WorkboxError('add-to-cache-list-unexpected-type', {
      entry
    });
  }
  // If there's just a URL and no revision, then it's also assumed to be a
  // versioned URL.
  if (!revision) {
    const urlObject = new URL(url, location.href);
    return {
      cacheKey: urlObject.href,
      url: urlObject.href
    };
  }
  // Otherwise, construct a properly versioned URL using the custom Workbox
  // search parameter along with the revision info.
  const cacheKeyURL = new URL(url, location.href);
  const originalURL = new URL(url, location.href);
  cacheKeyURL.searchParams.set(REVISION_SEARCH_PARAM, revision);
  return {
    cacheKey: cacheKeyURL.href,
    url: originalURL.href
  };
}

},{"../_version.js":21,"workbox-core/_private/WorkboxError.js":3}],29:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateURLVariations = generateURLVariations;
var _removeIgnoredSearchParams = require("./removeIgnoredSearchParams.js");
require("../_version.js");
/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * Generator function that yields possible variations on the original URL to
 * check, one at a time.
 *
 * @param {string} url
 * @param {Object} options
 *
 * @private
 * @memberof workbox-precaching
 */
function* generateURLVariations(url, {
  ignoreURLParametersMatching = [/^utm_/, /^fbclid$/],
  directoryIndex = 'index.html',
  cleanURLs = true,
  urlManipulation
} = {}) {
  const urlObject = new URL(url, location.href);
  urlObject.hash = '';
  yield urlObject.href;
  const urlWithoutIgnoredParams = (0, _removeIgnoredSearchParams.removeIgnoredSearchParams)(urlObject, ignoreURLParametersMatching);
  yield urlWithoutIgnoredParams.href;
  if (directoryIndex && urlWithoutIgnoredParams.pathname.endsWith('/')) {
    const directoryURL = new URL(urlWithoutIgnoredParams.href);
    directoryURL.pathname += directoryIndex;
    yield directoryURL.href;
  }
  if (cleanURLs) {
    const cleanURL = new URL(urlWithoutIgnoredParams.href);
    cleanURL.pathname += '.html';
    yield cleanURL.href;
  }
  if (urlManipulation) {
    const additionalURLs = urlManipulation({
      url: urlObject
    });
    for (const urlToAttempt of additionalURLs) {
      yield urlToAttempt.href;
    }
  }
}

},{"../_version.js":21,"./removeIgnoredSearchParams.js":33}],30:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOrCreatePrecacheController = void 0;
var _PrecacheController = require("../PrecacheController.js");
require("../_version.js");
/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

let precacheController;
/**
 * @return {PrecacheController}
 * @private
 */
const getOrCreatePrecacheController = () => {
  if (!precacheController) {
    precacheController = new _PrecacheController.PrecacheController();
  }
  return precacheController;
};
exports.getOrCreatePrecacheController = getOrCreatePrecacheController;

},{"../PrecacheController.js":18,"../_version.js":21}],31:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.printCleanupDetails = printCleanupDetails;
var _logger = require("workbox-core/_private/logger.js");
require("../_version.js");
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * @param {string} groupTitle
 * @param {Array<string>} deletedURLs
 *
 * @private
 */
const logGroup = (groupTitle, deletedURLs) => {
  _logger.logger.groupCollapsed(groupTitle);
  for (const url of deletedURLs) {
    _logger.logger.log(url);
  }
  _logger.logger.groupEnd();
};
/**
 * @param {Array<string>} deletedURLs
 *
 * @private
 * @memberof workbox-precaching
 */
function printCleanupDetails(deletedURLs) {
  const deletionCount = deletedURLs.length;
  if (deletionCount > 0) {
    _logger.logger.groupCollapsed(`During precaching cleanup, ` + `${deletionCount} cached ` + `request${deletionCount === 1 ? ' was' : 's were'} deleted.`);
    logGroup('Deleted Cache Requests', deletedURLs);
    _logger.logger.groupEnd();
  }
}

},{"../_version.js":21,"workbox-core/_private/logger.js":10}],32:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.printInstallDetails = printInstallDetails;
var _logger = require("workbox-core/_private/logger.js");
require("../_version.js");
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * @param {string} groupTitle
 * @param {Array<string>} urls
 *
 * @private
 */
function _nestedGroup(groupTitle, urls) {
  if (urls.length === 0) {
    return;
  }
  _logger.logger.groupCollapsed(groupTitle);
  for (const url of urls) {
    _logger.logger.log(url);
  }
  _logger.logger.groupEnd();
}
/**
 * @param {Array<string>} urlsToPrecache
 * @param {Array<string>} urlsAlreadyPrecached
 *
 * @private
 * @memberof workbox-precaching
 */
function printInstallDetails(urlsToPrecache, urlsAlreadyPrecached) {
  const precachedCount = urlsToPrecache.length;
  const alreadyPrecachedCount = urlsAlreadyPrecached.length;
  if (precachedCount || alreadyPrecachedCount) {
    let message = `Precaching ${precachedCount} file${precachedCount === 1 ? '' : 's'}.`;
    if (alreadyPrecachedCount > 0) {
      message += ` ${alreadyPrecachedCount} ` + `file${alreadyPrecachedCount === 1 ? ' is' : 's are'} already cached.`;
    }
    _logger.logger.groupCollapsed(message);
    _nestedGroup(`View newly precached URLs.`, urlsToPrecache);
    _nestedGroup(`View previously precached URLs.`, urlsAlreadyPrecached);
    _logger.logger.groupEnd();
  }
}

},{"../_version.js":21,"workbox-core/_private/logger.js":10}],33:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeIgnoredSearchParams = removeIgnoredSearchParams;
require("../_version.js");
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * Removes any URL search parameters that should be ignored.
 *
 * @param {URL} urlObject The original URL.
 * @param {Array<RegExp>} ignoreURLParametersMatching RegExps to test against
 * each search parameter name. Matches mean that the search parameter should be
 * ignored.
 * @return {URL} The URL with any ignored search parameters removed.
 *
 * @private
 * @memberof workbox-precaching
 */
function removeIgnoredSearchParams(urlObject, ignoreURLParametersMatching = []) {
  // Convert the iterable into an array at the start of the loop to make sure
  // deletion doesn't mess up iteration.
  for (const paramName of [...urlObject.searchParams.keys()]) {
    if (ignoreURLParametersMatching.some(regExp => regExp.test(paramName))) {
      urlObject.searchParams.delete(paramName);
    }
  }
  return urlObject;
}

},{"../_version.js":21}],34:[function(require,module,exports){
(function (process){(function (){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RegExpRoute = void 0;
var _assert = require("workbox-core/_private/assert.js");
var _logger = require("workbox-core/_private/logger.js");
var _Route = require("./Route.js");
require("./_version.js");
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * RegExpRoute makes it easy to create a regular expression based
 * {@link workbox-routing.Route}.
 *
 * For same-origin requests the RegExp only needs to match part of the URL. For
 * requests against third-party servers, you must define a RegExp that matches
 * the start of the URL.
 *
 * @memberof workbox-routing
 * @extends workbox-routing.Route
 */
class RegExpRoute extends _Route.Route {
  /**
   * If the regular expression contains
   * [capture groups]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp#grouping-back-references},
   * the captured values will be passed to the
   * {@link workbox-routing~handlerCallback} `params`
   * argument.
   *
   * @param {RegExp} regExp The regular expression to match against URLs.
   * @param {workbox-routing~handlerCallback} handler A callback
   * function that returns a Promise resulting in a Response.
   * @param {string} [method='GET'] The HTTP method to match the Route
   * against.
   */
  constructor(regExp, handler, method) {
    if (process.env.NODE_ENV !== 'production') {
      _assert.assert.isInstance(regExp, RegExp, {
        moduleName: 'workbox-routing',
        className: 'RegExpRoute',
        funcName: 'constructor',
        paramName: 'pattern'
      });
    }
    const match = ({
      url
    }) => {
      const result = regExp.exec(url.href);
      // Return immediately if there's no match.
      if (!result) {
        return;
      }
      // Require that the match start at the first character in the URL string
      // if it's a cross-origin request.
      // See https://github.com/GoogleChrome/workbox/issues/281 for the context
      // behind this behavior.
      if (url.origin !== location.origin && result.index !== 0) {
        if (process.env.NODE_ENV !== 'production') {
          _logger.logger.debug(`The regular expression '${regExp.toString()}' only partially matched ` + `against the cross-origin URL '${url.toString()}'. RegExpRoute's will only ` + `handle cross-origin requests if they match the entire URL.`);
        }
        return;
      }
      // If the route matches, but there aren't any capture groups defined, then
      // this will return [], which is truthy and therefore sufficient to
      // indicate a match.
      // If there are capture groups, then it will return their values.
      return result.slice(1);
    };
    super(match, handler, method);
  }
}
exports.RegExpRoute = RegExpRoute;

}).call(this)}).call(this,require('_process'))
},{"./Route.js":35,"./_version.js":37,"_process":1,"workbox-core/_private/assert.js":4,"workbox-core/_private/logger.js":10}],35:[function(require,module,exports){
(function (process){(function (){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Route = void 0;
var _assert = require("workbox-core/_private/assert.js");
var _constants = require("./utils/constants.js");
var _normalizeHandler = require("./utils/normalizeHandler.js");
require("./_version.js");
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * A `Route` consists of a pair of callback functions, "match" and "handler".
 * The "match" callback determine if a route should be used to "handle" a
 * request by returning a non-falsy value if it can. The "handler" callback
 * is called when there is a match and should return a Promise that resolves
 * to a `Response`.
 *
 * @memberof workbox-routing
 */
class Route {
  /**
   * Constructor for Route class.
   *
   * @param {workbox-routing~matchCallback} match
   * A callback function that determines whether the route matches a given
   * `fetch` event by returning a non-falsy value.
   * @param {workbox-routing~handlerCallback} handler A callback
   * function that returns a Promise resolving to a Response.
   * @param {string} [method='GET'] The HTTP method to match the Route
   * against.
   */
  constructor(match, handler, method = _constants.defaultMethod) {
    if (process.env.NODE_ENV !== 'production') {
      _assert.assert.isType(match, 'function', {
        moduleName: 'workbox-routing',
        className: 'Route',
        funcName: 'constructor',
        paramName: 'match'
      });
      if (method) {
        _assert.assert.isOneOf(method, _constants.validMethods, {
          paramName: 'method'
        });
      }
    }
    // These values are referenced directly by Router so cannot be
    // altered by minificaton.
    this.handler = (0, _normalizeHandler.normalizeHandler)(handler);
    this.match = match;
    this.method = method;
  }
  /**
   *
   * @param {workbox-routing-handlerCallback} handler A callback
   * function that returns a Promise resolving to a Response
   */
  setCatchHandler(handler) {
    this.catchHandler = (0, _normalizeHandler.normalizeHandler)(handler);
  }
}
exports.Route = Route;

}).call(this)}).call(this,require('_process'))
},{"./_version.js":37,"./utils/constants.js":39,"./utils/normalizeHandler.js":41,"_process":1,"workbox-core/_private/assert.js":4}],36:[function(require,module,exports){
(function (process){(function (){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Router = void 0;
var _assert = require("workbox-core/_private/assert.js");
var _getFriendlyURL = require("workbox-core/_private/getFriendlyURL.js");
var _constants = require("./utils/constants.js");
var _logger = require("workbox-core/_private/logger.js");
var _normalizeHandler = require("./utils/normalizeHandler.js");
var _WorkboxError = require("workbox-core/_private/WorkboxError.js");
require("./_version.js");
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * The Router can be used to process a `FetchEvent` using one or more
 * {@link workbox-routing.Route}, responding with a `Response` if
 * a matching route exists.
 *
 * If no route matches a given a request, the Router will use a "default"
 * handler if one is defined.
 *
 * Should the matching Route throw an error, the Router will use a "catch"
 * handler if one is defined to gracefully deal with issues and respond with a
 * Request.
 *
 * If a request matches multiple routes, the **earliest** registered route will
 * be used to respond to the request.
 *
 * @memberof workbox-routing
 */
class Router {
  /**
   * Initializes a new Router.
   */
  constructor() {
    this._routes = new Map();
    this._defaultHandlerMap = new Map();
  }
  /**
   * @return {Map<string, Array<workbox-routing.Route>>} routes A `Map` of HTTP
   * method name ('GET', etc.) to an array of all the corresponding `Route`
   * instances that are registered.
   */
  get routes() {
    return this._routes;
  }
  /**
   * Adds a fetch event listener to respond to events when a route matches
   * the event's request.
   */
  addFetchListener() {
    // See https://github.com/Microsoft/TypeScript/issues/28357#issuecomment-436484705
    self.addEventListener('fetch', event => {
      const {
        request
      } = event;
      const responsePromise = this.handleRequest({
        request,
        event
      });
      if (responsePromise) {
        event.respondWith(responsePromise);
      }
    });
  }
  /**
   * Adds a message event listener for URLs to cache from the window.
   * This is useful to cache resources loaded on the page prior to when the
   * service worker started controlling it.
   *
   * The format of the message data sent from the window should be as follows.
   * Where the `urlsToCache` array may consist of URL strings or an array of
   * URL string + `requestInit` object (the same as you'd pass to `fetch()`).
   *
   * ```
   * {
   *   type: 'CACHE_URLS',
   *   payload: {
   *     urlsToCache: [
   *       './script1.js',
   *       './script2.js',
   *       ['./script3.js', {mode: 'no-cors'}],
   *     ],
   *   },
   * }
   * ```
   */
  addCacheListener() {
    // See https://github.com/Microsoft/TypeScript/issues/28357#issuecomment-436484705
    self.addEventListener('message', event => {
      // event.data is type 'any'
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (event.data && event.data.type === 'CACHE_URLS') {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const {
          payload
        } = event.data;
        if (process.env.NODE_ENV !== 'production') {
          _logger.logger.debug(`Caching URLs from the window`, payload.urlsToCache);
        }
        const requestPromises = Promise.all(payload.urlsToCache.map(entry => {
          if (typeof entry === 'string') {
            entry = [entry];
          }
          const request = new Request(...entry);
          return this.handleRequest({
            request,
            event
          });
          // TODO(philipwalton): TypeScript errors without this typecast for
          // some reason (probably a bug). The real type here should work but
          // doesn't: `Array<Promise<Response> | undefined>`.
        })); // TypeScript
        event.waitUntil(requestPromises);
        // If a MessageChannel was used, reply to the message on success.
        if (event.ports && event.ports[0]) {
          void requestPromises.then(() => event.ports[0].postMessage(true));
        }
      }
    });
  }
  /**
   * Apply the routing rules to a FetchEvent object to get a Response from an
   * appropriate Route's handler.
   *
   * @param {Object} options
   * @param {Request} options.request The request to handle.
   * @param {ExtendableEvent} options.event The event that triggered the
   *     request.
   * @return {Promise<Response>|undefined} A promise is returned if a
   *     registered route can handle the request. If there is no matching
   *     route and there's no `defaultHandler`, `undefined` is returned.
   */
  handleRequest({
    request,
    event
  }) {
    if (process.env.NODE_ENV !== 'production') {
      _assert.assert.isInstance(request, Request, {
        moduleName: 'workbox-routing',
        className: 'Router',
        funcName: 'handleRequest',
        paramName: 'options.request'
      });
    }
    const url = new URL(request.url, location.href);
    if (!url.protocol.startsWith('http')) {
      if (process.env.NODE_ENV !== 'production') {
        _logger.logger.debug(`Workbox Router only supports URLs that start with 'http'.`);
      }
      return;
    }
    const sameOrigin = url.origin === location.origin;
    const {
      params,
      route
    } = this.findMatchingRoute({
      event,
      request,
      sameOrigin,
      url
    });
    let handler = route && route.handler;
    const debugMessages = [];
    if (process.env.NODE_ENV !== 'production') {
      if (handler) {
        debugMessages.push([`Found a route to handle this request:`, route]);
        if (params) {
          debugMessages.push([`Passing the following params to the route's handler:`, params]);
        }
      }
    }
    // If we don't have a handler because there was no matching route, then
    // fall back to defaultHandler if that's defined.
    const method = request.method;
    if (!handler && this._defaultHandlerMap.has(method)) {
      if (process.env.NODE_ENV !== 'production') {
        debugMessages.push(`Failed to find a matching route. Falling ` + `back to the default handler for ${method}.`);
      }
      handler = this._defaultHandlerMap.get(method);
    }
    if (!handler) {
      if (process.env.NODE_ENV !== 'production') {
        // No handler so Workbox will do nothing. If logs is set of debug
        // i.e. verbose, we should print out this information.
        _logger.logger.debug(`No route found for: ${(0, _getFriendlyURL.getFriendlyURL)(url)}`);
      }
      return;
    }
    if (process.env.NODE_ENV !== 'production') {
      // We have a handler, meaning Workbox is going to handle the route.
      // print the routing details to the console.
      _logger.logger.groupCollapsed(`Router is responding to: ${(0, _getFriendlyURL.getFriendlyURL)(url)}`);
      debugMessages.forEach(msg => {
        if (Array.isArray(msg)) {
          _logger.logger.log(...msg);
        } else {
          _logger.logger.log(msg);
        }
      });
      _logger.logger.groupEnd();
    }
    // Wrap in try and catch in case the handle method throws a synchronous
    // error. It should still callback to the catch handler.
    let responsePromise;
    try {
      responsePromise = handler.handle({
        url,
        request,
        event,
        params
      });
    } catch (err) {
      responsePromise = Promise.reject(err);
    }
    // Get route's catch handler, if it exists
    const catchHandler = route && route.catchHandler;
    if (responsePromise instanceof Promise && (this._catchHandler || catchHandler)) {
      responsePromise = responsePromise.catch(async err => {
        // If there's a route catch handler, process that first
        if (catchHandler) {
          if (process.env.NODE_ENV !== 'production') {
            // Still include URL here as it will be async from the console group
            // and may not make sense without the URL
            _logger.logger.groupCollapsed(`Error thrown when responding to: ` + ` ${(0, _getFriendlyURL.getFriendlyURL)(url)}. Falling back to route's Catch Handler.`);
            _logger.logger.error(`Error thrown by:`, route);
            _logger.logger.error(err);
            _logger.logger.groupEnd();
          }
          try {
            return await catchHandler.handle({
              url,
              request,
              event,
              params
            });
          } catch (catchErr) {
            if (catchErr instanceof Error) {
              err = catchErr;
            }
          }
        }
        if (this._catchHandler) {
          if (process.env.NODE_ENV !== 'production') {
            // Still include URL here as it will be async from the console group
            // and may not make sense without the URL
            _logger.logger.groupCollapsed(`Error thrown when responding to: ` + ` ${(0, _getFriendlyURL.getFriendlyURL)(url)}. Falling back to global Catch Handler.`);
            _logger.logger.error(`Error thrown by:`, route);
            _logger.logger.error(err);
            _logger.logger.groupEnd();
          }
          return this._catchHandler.handle({
            url,
            request,
            event
          });
        }
        throw err;
      });
    }
    return responsePromise;
  }
  /**
   * Checks a request and URL (and optionally an event) against the list of
   * registered routes, and if there's a match, returns the corresponding
   * route along with any params generated by the match.
   *
   * @param {Object} options
   * @param {URL} options.url
   * @param {boolean} options.sameOrigin The result of comparing `url.origin`
   *     against the current origin.
   * @param {Request} options.request The request to match.
   * @param {Event} options.event The corresponding event.
   * @return {Object} An object with `route` and `params` properties.
   *     They are populated if a matching route was found or `undefined`
   *     otherwise.
   */
  findMatchingRoute({
    url,
    sameOrigin,
    request,
    event
  }) {
    const routes = this._routes.get(request.method) || [];
    for (const route of routes) {
      let params;
      // route.match returns type any, not possible to change right now.
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const matchResult = route.match({
        url,
        sameOrigin,
        request,
        event
      });
      if (matchResult) {
        if (process.env.NODE_ENV !== 'production') {
          // Warn developers that using an async matchCallback is almost always
          // not the right thing to do.
          if (matchResult instanceof Promise) {
            _logger.logger.warn(`While routing ${(0, _getFriendlyURL.getFriendlyURL)(url)}, an async ` + `matchCallback function was used. Please convert the ` + `following route to use a synchronous matchCallback function:`, route);
          }
        }
        // See https://github.com/GoogleChrome/workbox/issues/2079
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        params = matchResult;
        if (Array.isArray(params) && params.length === 0) {
          // Instead of passing an empty array in as params, use undefined.
          params = undefined;
        } else if (matchResult.constructor === Object &&
        // eslint-disable-line
        Object.keys(matchResult).length === 0) {
          // Instead of passing an empty object in as params, use undefined.
          params = undefined;
        } else if (typeof matchResult === 'boolean') {
          // For the boolean value true (rather than just something truth-y),
          // don't set params.
          // See https://github.com/GoogleChrome/workbox/pull/2134#issuecomment-513924353
          params = undefined;
        }
        // Return early if have a match.
        return {
          route,
          params
        };
      }
    }
    // If no match was found above, return and empty object.
    return {};
  }
  /**
   * Define a default `handler` that's called when no routes explicitly
   * match the incoming request.
   *
   * Each HTTP method ('GET', 'POST', etc.) gets its own default handler.
   *
   * Without a default handler, unmatched requests will go against the
   * network as if there were no service worker present.
   *
   * @param {workbox-routing~handlerCallback} handler A callback
   * function that returns a Promise resulting in a Response.
   * @param {string} [method='GET'] The HTTP method to associate with this
   * default handler. Each method has its own default.
   */
  setDefaultHandler(handler, method = _constants.defaultMethod) {
    this._defaultHandlerMap.set(method, (0, _normalizeHandler.normalizeHandler)(handler));
  }
  /**
   * If a Route throws an error while handling a request, this `handler`
   * will be called and given a chance to provide a response.
   *
   * @param {workbox-routing~handlerCallback} handler A callback
   * function that returns a Promise resulting in a Response.
   */
  setCatchHandler(handler) {
    this._catchHandler = (0, _normalizeHandler.normalizeHandler)(handler);
  }
  /**
   * Registers a route with the router.
   *
   * @param {workbox-routing.Route} route The route to register.
   */
  registerRoute(route) {
    if (process.env.NODE_ENV !== 'production') {
      _assert.assert.isType(route, 'object', {
        moduleName: 'workbox-routing',
        className: 'Router',
        funcName: 'registerRoute',
        paramName: 'route'
      });
      _assert.assert.hasMethod(route, 'match', {
        moduleName: 'workbox-routing',
        className: 'Router',
        funcName: 'registerRoute',
        paramName: 'route'
      });
      _assert.assert.isType(route.handler, 'object', {
        moduleName: 'workbox-routing',
        className: 'Router',
        funcName: 'registerRoute',
        paramName: 'route'
      });
      _assert.assert.hasMethod(route.handler, 'handle', {
        moduleName: 'workbox-routing',
        className: 'Router',
        funcName: 'registerRoute',
        paramName: 'route.handler'
      });
      _assert.assert.isType(route.method, 'string', {
        moduleName: 'workbox-routing',
        className: 'Router',
        funcName: 'registerRoute',
        paramName: 'route.method'
      });
    }
    if (!this._routes.has(route.method)) {
      this._routes.set(route.method, []);
    }
    // Give precedence to all of the earlier routes by adding this additional
    // route to the end of the array.
    this._routes.get(route.method).push(route);
  }
  /**
   * Unregisters a route with the router.
   *
   * @param {workbox-routing.Route} route The route to unregister.
   */
  unregisterRoute(route) {
    if (!this._routes.has(route.method)) {
      throw new _WorkboxError.WorkboxError('unregister-route-but-not-found-with-method', {
        method: route.method
      });
    }
    const routeIndex = this._routes.get(route.method).indexOf(route);
    if (routeIndex > -1) {
      this._routes.get(route.method).splice(routeIndex, 1);
    } else {
      throw new _WorkboxError.WorkboxError('unregister-route-route-not-registered');
    }
  }
}
exports.Router = Router;

}).call(this)}).call(this,require('_process'))
},{"./_version.js":37,"./utils/constants.js":39,"./utils/normalizeHandler.js":41,"_process":1,"workbox-core/_private/WorkboxError.js":3,"workbox-core/_private/assert.js":4,"workbox-core/_private/getFriendlyURL.js":9,"workbox-core/_private/logger.js":10}],37:[function(require,module,exports){
"use strict";
// @ts-ignore
try {
    self['workbox:routing:7.0.0'] && _();
}
catch (e) { }

},{}],38:[function(require,module,exports){
(function (process){(function (){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerRoute = registerRoute;
var _logger = require("workbox-core/_private/logger.js");
var _WorkboxError = require("workbox-core/_private/WorkboxError.js");
var _Route = require("./Route.js");
var _RegExpRoute = require("./RegExpRoute.js");
var _getOrCreateDefaultRouter = require("./utils/getOrCreateDefaultRouter.js");
require("./_version.js");
/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * Easily register a RegExp, string, or function with a caching
 * strategy to a singleton Router instance.
 *
 * This method will generate a Route for you if needed and
 * call {@link workbox-routing.Router#registerRoute}.
 *
 * @param {RegExp|string|workbox-routing.Route~matchCallback|workbox-routing.Route} capture
 * If the capture param is a `Route`, all other arguments will be ignored.
 * @param {workbox-routing~handlerCallback} [handler] A callback
 * function that returns a Promise resulting in a Response. This parameter
 * is required if `capture` is not a `Route` object.
 * @param {string} [method='GET'] The HTTP method to match the Route
 * against.
 * @return {workbox-routing.Route} The generated `Route`.
 *
 * @memberof workbox-routing
 */
function registerRoute(capture, handler, method) {
  let route;
  if (typeof capture === 'string') {
    const captureUrl = new URL(capture, location.href);
    if (process.env.NODE_ENV !== 'production') {
      if (!(capture.startsWith('/') || capture.startsWith('http'))) {
        throw new _WorkboxError.WorkboxError('invalid-string', {
          moduleName: 'workbox-routing',
          funcName: 'registerRoute',
          paramName: 'capture'
        });
      }
      // We want to check if Express-style wildcards are in the pathname only.
      // TODO: Remove this log message in v4.
      const valueToCheck = capture.startsWith('http') ? captureUrl.pathname : capture;
      // See https://github.com/pillarjs/path-to-regexp#parameters
      const wildcards = '[*:?+]';
      if (new RegExp(`${wildcards}`).exec(valueToCheck)) {
        _logger.logger.debug(`The '$capture' parameter contains an Express-style wildcard ` + `character (${wildcards}). Strings are now always interpreted as ` + `exact matches; use a RegExp for partial or wildcard matches.`);
      }
    }
    const matchCallback = ({
      url
    }) => {
      if (process.env.NODE_ENV !== 'production') {
        if (url.pathname === captureUrl.pathname && url.origin !== captureUrl.origin) {
          _logger.logger.debug(`${capture} only partially matches the cross-origin URL ` + `${url.toString()}. This route will only handle cross-origin requests ` + `if they match the entire URL.`);
        }
      }
      return url.href === captureUrl.href;
    };
    // If `capture` is a string then `handler` and `method` must be present.
    route = new _Route.Route(matchCallback, handler, method);
  } else if (capture instanceof RegExp) {
    // If `capture` is a `RegExp` then `handler` and `method` must be present.
    route = new _RegExpRoute.RegExpRoute(capture, handler, method);
  } else if (typeof capture === 'function') {
    // If `capture` is a function then `handler` and `method` must be present.
    route = new _Route.Route(capture, handler, method);
  } else if (capture instanceof _Route.Route) {
    route = capture;
  } else {
    throw new _WorkboxError.WorkboxError('unsupported-route-type', {
      moduleName: 'workbox-routing',
      funcName: 'registerRoute',
      paramName: 'capture'
    });
  }
  const defaultRouter = (0, _getOrCreateDefaultRouter.getOrCreateDefaultRouter)();
  defaultRouter.registerRoute(route);
  return route;
}

}).call(this)}).call(this,require('_process'))
},{"./RegExpRoute.js":34,"./Route.js":35,"./_version.js":37,"./utils/getOrCreateDefaultRouter.js":40,"_process":1,"workbox-core/_private/WorkboxError.js":3,"workbox-core/_private/logger.js":10}],39:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validMethods = exports.defaultMethod = void 0;
require("../_version.js");
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * The default HTTP method, 'GET', used when there's no specific method
 * configured for a route.
 *
 * @type {string}
 *
 * @private
 */
const defaultMethod = exports.defaultMethod = 'GET';
/**
 * The list of valid HTTP methods associated with requests that could be routed.
 *
 * @type {Array<string>}
 *
 * @private
 */
const validMethods = exports.validMethods = ['DELETE', 'GET', 'HEAD', 'PATCH', 'POST', 'PUT'];

},{"../_version.js":37}],40:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOrCreateDefaultRouter = void 0;
var _Router = require("../Router.js");
require("../_version.js");
/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

let defaultRouter;
/**
 * Creates a new, singleton Router instance if one does not exist. If one
 * does already exist, that instance is returned.
 *
 * @private
 * @return {Router}
 */
const getOrCreateDefaultRouter = () => {
  if (!defaultRouter) {
    defaultRouter = new _Router.Router();
    // The helpers that use the default Router assume these listeners exist.
    defaultRouter.addFetchListener();
    defaultRouter.addCacheListener();
  }
  return defaultRouter;
};
exports.getOrCreateDefaultRouter = getOrCreateDefaultRouter;

},{"../Router.js":36,"../_version.js":37}],41:[function(require,module,exports){
(function (process){(function (){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalizeHandler = void 0;
var _assert = require("workbox-core/_private/assert.js");
require("../_version.js");
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * @param {function()|Object} handler Either a function, or an object with a
 * 'handle' method.
 * @return {Object} An object with a handle method.
 *
 * @private
 */
const normalizeHandler = handler => {
  if (handler && typeof handler === 'object') {
    if (process.env.NODE_ENV !== 'production') {
      _assert.assert.hasMethod(handler, 'handle', {
        moduleName: 'workbox-routing',
        className: 'Route',
        funcName: 'constructor',
        paramName: 'handler'
      });
    }
    return handler;
  } else {
    if (process.env.NODE_ENV !== 'production') {
      _assert.assert.isType(handler, 'function', {
        moduleName: 'workbox-routing',
        className: 'Route',
        funcName: 'constructor',
        paramName: 'handler'
      });
    }
    return {
      handle: handler
    };
  }
};
exports.normalizeHandler = normalizeHandler;

}).call(this)}).call(this,require('_process'))
},{"../_version.js":37,"_process":1,"workbox-core/_private/assert.js":4}],42:[function(require,module,exports){
(function (process){(function (){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Strategy = void 0;
var _cacheNames = require("workbox-core/_private/cacheNames.js");
var _WorkboxError = require("workbox-core/_private/WorkboxError.js");
var _logger = require("workbox-core/_private/logger.js");
var _getFriendlyURL = require("workbox-core/_private/getFriendlyURL.js");
var _StrategyHandler = require("./StrategyHandler.js");
require("./_version.js");
/*
  Copyright 2020 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * An abstract base class that all other strategy classes must extend from:
 *
 * @memberof workbox-strategies
 */
class Strategy {
  /**
   * Creates a new instance of the strategy and sets all documented option
   * properties as public instance properties.
   *
   * Note: if a custom strategy class extends the base Strategy class and does
   * not need more than these properties, it does not need to define its own
   * constructor.
   *
   * @param {Object} [options]
   * @param {string} [options.cacheName] Cache name to store and retrieve
   * requests. Defaults to the cache names provided by
   * {@link workbox-core.cacheNames}.
   * @param {Array<Object>} [options.plugins] [Plugins]{@link https://developers.google.com/web/tools/workbox/guides/using-plugins}
   * to use in conjunction with this caching strategy.
   * @param {Object} [options.fetchOptions] Values passed along to the
   * [`init`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters)
   * of [non-navigation](https://github.com/GoogleChrome/workbox/issues/1796)
   * `fetch()` requests made by this strategy.
   * @param {Object} [options.matchOptions] The
   * [`CacheQueryOptions`]{@link https://w3c.github.io/ServiceWorker/#dictdef-cachequeryoptions}
   * for any `cache.match()` or `cache.put()` calls made by this strategy.
   */
  constructor(options = {}) {
    /**
     * Cache name to store and retrieve
     * requests. Defaults to the cache names provided by
     * {@link workbox-core.cacheNames}.
     *
     * @type {string}
     */
    this.cacheName = _cacheNames.cacheNames.getRuntimeName(options.cacheName);
    /**
     * The list
     * [Plugins]{@link https://developers.google.com/web/tools/workbox/guides/using-plugins}
     * used by this strategy.
     *
     * @type {Array<Object>}
     */
    this.plugins = options.plugins || [];
    /**
     * Values passed along to the
     * [`init`]{@link https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters}
     * of all fetch() requests made by this strategy.
     *
     * @type {Object}
     */
    this.fetchOptions = options.fetchOptions;
    /**
     * The
     * [`CacheQueryOptions`]{@link https://w3c.github.io/ServiceWorker/#dictdef-cachequeryoptions}
     * for any `cache.match()` or `cache.put()` calls made by this strategy.
     *
     * @type {Object}
     */
    this.matchOptions = options.matchOptions;
  }
  /**
   * Perform a request strategy and returns a `Promise` that will resolve with
   * a `Response`, invoking all relevant plugin callbacks.
   *
   * When a strategy instance is registered with a Workbox
   * {@link workbox-routing.Route}, this method is automatically
   * called when the route matches.
   *
   * Alternatively, this method can be used in a standalone `FetchEvent`
   * listener by passing it to `event.respondWith()`.
   *
   * @param {FetchEvent|Object} options A `FetchEvent` or an object with the
   *     properties listed below.
   * @param {Request|string} options.request A request to run this strategy for.
   * @param {ExtendableEvent} options.event The event associated with the
   *     request.
   * @param {URL} [options.url]
   * @param {*} [options.params]
   */
  handle(options) {
    const [responseDone] = this.handleAll(options);
    return responseDone;
  }
  /**
   * Similar to {@link workbox-strategies.Strategy~handle}, but
   * instead of just returning a `Promise` that resolves to a `Response` it
   * it will return an tuple of `[response, done]` promises, where the former
   * (`response`) is equivalent to what `handle()` returns, and the latter is a
   * Promise that will resolve once any promises that were added to
   * `event.waitUntil()` as part of performing the strategy have completed.
   *
   * You can await the `done` promise to ensure any extra work performed by
   * the strategy (usually caching responses) completes successfully.
   *
   * @param {FetchEvent|Object} options A `FetchEvent` or an object with the
   *     properties listed below.
   * @param {Request|string} options.request A request to run this strategy for.
   * @param {ExtendableEvent} options.event The event associated with the
   *     request.
   * @param {URL} [options.url]
   * @param {*} [options.params]
   * @return {Array<Promise>} A tuple of [response, done]
   *     promises that can be used to determine when the response resolves as
   *     well as when the handler has completed all its work.
   */
  handleAll(options) {
    // Allow for flexible options to be passed.
    if (options instanceof FetchEvent) {
      options = {
        event: options,
        request: options.request
      };
    }
    const event = options.event;
    const request = typeof options.request === 'string' ? new Request(options.request) : options.request;
    const params = 'params' in options ? options.params : undefined;
    const handler = new _StrategyHandler.StrategyHandler(this, {
      event,
      request,
      params
    });
    const responseDone = this._getResponse(handler, request, event);
    const handlerDone = this._awaitComplete(responseDone, handler, request, event);
    // Return an array of promises, suitable for use with Promise.all().
    return [responseDone, handlerDone];
  }
  async _getResponse(handler, request, event) {
    await handler.runCallbacks('handlerWillStart', {
      event,
      request
    });
    let response = undefined;
    try {
      response = await this._handle(request, handler);
      // The "official" Strategy subclasses all throw this error automatically,
      // but in case a third-party Strategy doesn't, ensure that we have a
      // consistent failure when there's no response or an error response.
      if (!response || response.type === 'error') {
        throw new _WorkboxError.WorkboxError('no-response', {
          url: request.url
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        for (const callback of handler.iterateCallbacks('handlerDidError')) {
          response = await callback({
            error,
            event,
            request
          });
          if (response) {
            break;
          }
        }
      }
      if (!response) {
        throw error;
      } else if (process.env.NODE_ENV !== 'production') {
        _logger.logger.log(`While responding to '${(0, _getFriendlyURL.getFriendlyURL)(request.url)}', ` + `an ${error instanceof Error ? error.toString() : ''} error occurred. Using a fallback response provided by ` + `a handlerDidError plugin.`);
      }
    }
    for (const callback of handler.iterateCallbacks('handlerWillRespond')) {
      response = await callback({
        event,
        request,
        response
      });
    }
    return response;
  }
  async _awaitComplete(responseDone, handler, request, event) {
    let response;
    let error;
    try {
      response = await responseDone;
    } catch (error) {
      // Ignore errors, as response errors should be caught via the `response`
      // promise above. The `done` promise will only throw for errors in
      // promises passed to `handler.waitUntil()`.
    }
    try {
      await handler.runCallbacks('handlerDidRespond', {
        event,
        request,
        response
      });
      await handler.doneWaiting();
    } catch (waitUntilError) {
      if (waitUntilError instanceof Error) {
        error = waitUntilError;
      }
    }
    await handler.runCallbacks('handlerDidComplete', {
      event,
      request,
      response,
      error: error
    });
    handler.destroy();
    if (error) {
      throw error;
    }
  }
}

/**
 * Classes extending the `Strategy` based class should implement this method,
 * and leverage the {@link workbox-strategies.StrategyHandler}
 * arg to perform all fetching and cache logic, which will ensure all relevant
 * cache, cache options, fetch options and plugins are used (per the current
 * strategy instance).
 *
 * @name _handle
 * @instance
 * @abstract
 * @function
 * @param {Request} request
 * @param {workbox-strategies.StrategyHandler} handler
 * @return {Promise<Response>}
 *
 * @memberof workbox-strategies.Strategy
 */
exports.Strategy = Strategy;

}).call(this)}).call(this,require('_process'))
},{"./StrategyHandler.js":43,"./_version.js":44,"_process":1,"workbox-core/_private/WorkboxError.js":3,"workbox-core/_private/cacheNames.js":6,"workbox-core/_private/getFriendlyURL.js":9,"workbox-core/_private/logger.js":10}],43:[function(require,module,exports){
(function (process){(function (){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StrategyHandler = void 0;
var _assert = require("workbox-core/_private/assert.js");
var _cacheMatchIgnoreParams = require("workbox-core/_private/cacheMatchIgnoreParams.js");
var _Deferred = require("workbox-core/_private/Deferred.js");
var _executeQuotaErrorCallbacks = require("workbox-core/_private/executeQuotaErrorCallbacks.js");
var _getFriendlyURL = require("workbox-core/_private/getFriendlyURL.js");
var _logger = require("workbox-core/_private/logger.js");
var _timeout = require("workbox-core/_private/timeout.js");
var _WorkboxError = require("workbox-core/_private/WorkboxError.js");
require("./_version.js");
/*
  Copyright 2020 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

function toRequest(input) {
  return typeof input === 'string' ? new Request(input) : input;
}
/**
 * A class created every time a Strategy instance instance calls
 * {@link workbox-strategies.Strategy~handle} or
 * {@link workbox-strategies.Strategy~handleAll} that wraps all fetch and
 * cache actions around plugin callbacks and keeps track of when the strategy
 * is "done" (i.e. all added `event.waitUntil()` promises have resolved).
 *
 * @memberof workbox-strategies
 */
class StrategyHandler {
  /**
   * Creates a new instance associated with the passed strategy and event
   * that's handling the request.
   *
   * The constructor also initializes the state that will be passed to each of
   * the plugins handling this request.
   *
   * @param {workbox-strategies.Strategy} strategy
   * @param {Object} options
   * @param {Request|string} options.request A request to run this strategy for.
   * @param {ExtendableEvent} options.event The event associated with the
   *     request.
   * @param {URL} [options.url]
   * @param {*} [options.params] The return value from the
   *     {@link workbox-routing~matchCallback} (if applicable).
   */
  constructor(strategy, options) {
    this._cacheKeys = {};
    /**
     * The request the strategy is performing (passed to the strategy's
     * `handle()` or `handleAll()` method).
     * @name request
     * @instance
     * @type {Request}
     * @memberof workbox-strategies.StrategyHandler
     */
    /**
     * The event associated with this request.
     * @name event
     * @instance
     * @type {ExtendableEvent}
     * @memberof workbox-strategies.StrategyHandler
     */
    /**
     * A `URL` instance of `request.url` (if passed to the strategy's
     * `handle()` or `handleAll()` method).
     * Note: the `url` param will be present if the strategy was invoked
     * from a workbox `Route` object.
     * @name url
     * @instance
     * @type {URL|undefined}
     * @memberof workbox-strategies.StrategyHandler
     */
    /**
     * A `param` value (if passed to the strategy's
     * `handle()` or `handleAll()` method).
     * Note: the `param` param will be present if the strategy was invoked
     * from a workbox `Route` object and the
     * {@link workbox-routing~matchCallback} returned
     * a truthy value (it will be that value).
     * @name params
     * @instance
     * @type {*|undefined}
     * @memberof workbox-strategies.StrategyHandler
     */
    if (process.env.NODE_ENV !== 'production') {
      _assert.assert.isInstance(options.event, ExtendableEvent, {
        moduleName: 'workbox-strategies',
        className: 'StrategyHandler',
        funcName: 'constructor',
        paramName: 'options.event'
      });
    }
    Object.assign(this, options);
    this.event = options.event;
    this._strategy = strategy;
    this._handlerDeferred = new _Deferred.Deferred();
    this._extendLifetimePromises = [];
    // Copy the plugins list (since it's mutable on the strategy),
    // so any mutations don't affect this handler instance.
    this._plugins = [...strategy.plugins];
    this._pluginStateMap = new Map();
    for (const plugin of this._plugins) {
      this._pluginStateMap.set(plugin, {});
    }
    this.event.waitUntil(this._handlerDeferred.promise);
  }
  /**
   * Fetches a given request (and invokes any applicable plugin callback
   * methods) using the `fetchOptions` (for non-navigation requests) and
   * `plugins` defined on the `Strategy` object.
   *
   * The following plugin lifecycle methods are invoked when using this method:
   * - `requestWillFetch()`
   * - `fetchDidSucceed()`
   * - `fetchDidFail()`
   *
   * @param {Request|string} input The URL or request to fetch.
   * @return {Promise<Response>}
   */
  async fetch(input) {
    const {
      event
    } = this;
    let request = toRequest(input);
    if (request.mode === 'navigate' && event instanceof FetchEvent && event.preloadResponse) {
      const possiblePreloadResponse = await event.preloadResponse;
      if (possiblePreloadResponse) {
        if (process.env.NODE_ENV !== 'production') {
          _logger.logger.log(`Using a preloaded navigation response for ` + `'${(0, _getFriendlyURL.getFriendlyURL)(request.url)}'`);
        }
        return possiblePreloadResponse;
      }
    }
    // If there is a fetchDidFail plugin, we need to save a clone of the
    // original request before it's either modified by a requestWillFetch
    // plugin or before the original request's body is consumed via fetch().
    const originalRequest = this.hasCallback('fetchDidFail') ? request.clone() : null;
    try {
      for (const cb of this.iterateCallbacks('requestWillFetch')) {
        request = await cb({
          request: request.clone(),
          event
        });
      }
    } catch (err) {
      if (err instanceof Error) {
        throw new _WorkboxError.WorkboxError('plugin-error-request-will-fetch', {
          thrownErrorMessage: err.message
        });
      }
    }
    // The request can be altered by plugins with `requestWillFetch` making
    // the original request (most likely from a `fetch` event) different
    // from the Request we make. Pass both to `fetchDidFail` to aid debugging.
    const pluginFilteredRequest = request.clone();
    try {
      let fetchResponse;
      // See https://github.com/GoogleChrome/workbox/issues/1796
      fetchResponse = await fetch(request, request.mode === 'navigate' ? undefined : this._strategy.fetchOptions);
      if (process.env.NODE_ENV !== 'production') {
        _logger.logger.debug(`Network request for ` + `'${(0, _getFriendlyURL.getFriendlyURL)(request.url)}' returned a response with ` + `status '${fetchResponse.status}'.`);
      }
      for (const callback of this.iterateCallbacks('fetchDidSucceed')) {
        fetchResponse = await callback({
          event,
          request: pluginFilteredRequest,
          response: fetchResponse
        });
      }
      return fetchResponse;
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        _logger.logger.log(`Network request for ` + `'${(0, _getFriendlyURL.getFriendlyURL)(request.url)}' threw an error.`, error);
      }
      // `originalRequest` will only exist if a `fetchDidFail` callback
      // is being used (see above).
      if (originalRequest) {
        await this.runCallbacks('fetchDidFail', {
          error: error,
          event,
          originalRequest: originalRequest.clone(),
          request: pluginFilteredRequest.clone()
        });
      }
      throw error;
    }
  }
  /**
   * Calls `this.fetch()` and (in the background) runs `this.cachePut()` on
   * the response generated by `this.fetch()`.
   *
   * The call to `this.cachePut()` automatically invokes `this.waitUntil()`,
   * so you do not have to manually call `waitUntil()` on the event.
   *
   * @param {Request|string} input The request or URL to fetch and cache.
   * @return {Promise<Response>}
   */
  async fetchAndCachePut(input) {
    const response = await this.fetch(input);
    const responseClone = response.clone();
    void this.waitUntil(this.cachePut(input, responseClone));
    return response;
  }
  /**
   * Matches a request from the cache (and invokes any applicable plugin
   * callback methods) using the `cacheName`, `matchOptions`, and `plugins`
   * defined on the strategy object.
   *
   * The following plugin lifecycle methods are invoked when using this method:
   * - cacheKeyWillByUsed()
   * - cachedResponseWillByUsed()
   *
   * @param {Request|string} key The Request or URL to use as the cache key.
   * @return {Promise<Response|undefined>} A matching response, if found.
   */
  async cacheMatch(key) {
    const request = toRequest(key);
    let cachedResponse;
    const {
      cacheName,
      matchOptions
    } = this._strategy;
    const effectiveRequest = await this.getCacheKey(request, 'read');
    const multiMatchOptions = Object.assign(Object.assign({}, matchOptions), {
      cacheName
    });
    cachedResponse = await caches.match(effectiveRequest, multiMatchOptions);
    if (process.env.NODE_ENV !== 'production') {
      if (cachedResponse) {
        _logger.logger.debug(`Found a cached response in '${cacheName}'.`);
      } else {
        _logger.logger.debug(`No cached response found in '${cacheName}'.`);
      }
    }
    for (const callback of this.iterateCallbacks('cachedResponseWillBeUsed')) {
      cachedResponse = (await callback({
        cacheName,
        matchOptions,
        cachedResponse,
        request: effectiveRequest,
        event: this.event
      })) || undefined;
    }
    return cachedResponse;
  }
  /**
   * Puts a request/response pair in the cache (and invokes any applicable
   * plugin callback methods) using the `cacheName` and `plugins` defined on
   * the strategy object.
   *
   * The following plugin lifecycle methods are invoked when using this method:
   * - cacheKeyWillByUsed()
   * - cacheWillUpdate()
   * - cacheDidUpdate()
   *
   * @param {Request|string} key The request or URL to use as the cache key.
   * @param {Response} response The response to cache.
   * @return {Promise<boolean>} `false` if a cacheWillUpdate caused the response
   * not be cached, and `true` otherwise.
   */
  async cachePut(key, response) {
    const request = toRequest(key);
    // Run in the next task to avoid blocking other cache reads.
    // https://github.com/w3c/ServiceWorker/issues/1397
    await (0, _timeout.timeout)(0);
    const effectiveRequest = await this.getCacheKey(request, 'write');
    if (process.env.NODE_ENV !== 'production') {
      if (effectiveRequest.method && effectiveRequest.method !== 'GET') {
        throw new _WorkboxError.WorkboxError('attempt-to-cache-non-get-request', {
          url: (0, _getFriendlyURL.getFriendlyURL)(effectiveRequest.url),
          method: effectiveRequest.method
        });
      }
      // See https://github.com/GoogleChrome/workbox/issues/2818
      const vary = response.headers.get('Vary');
      if (vary) {
        _logger.logger.debug(`The response for ${(0, _getFriendlyURL.getFriendlyURL)(effectiveRequest.url)} ` + `has a 'Vary: ${vary}' header. ` + `Consider setting the {ignoreVary: true} option on your strategy ` + `to ensure cache matching and deletion works as expected.`);
      }
    }
    if (!response) {
      if (process.env.NODE_ENV !== 'production') {
        _logger.logger.error(`Cannot cache non-existent response for ` + `'${(0, _getFriendlyURL.getFriendlyURL)(effectiveRequest.url)}'.`);
      }
      throw new _WorkboxError.WorkboxError('cache-put-with-no-response', {
        url: (0, _getFriendlyURL.getFriendlyURL)(effectiveRequest.url)
      });
    }
    const responseToCache = await this._ensureResponseSafeToCache(response);
    if (!responseToCache) {
      if (process.env.NODE_ENV !== 'production') {
        _logger.logger.debug(`Response '${(0, _getFriendlyURL.getFriendlyURL)(effectiveRequest.url)}' ` + `will not be cached.`, responseToCache);
      }
      return false;
    }
    const {
      cacheName,
      matchOptions
    } = this._strategy;
    const cache = await self.caches.open(cacheName);
    const hasCacheUpdateCallback = this.hasCallback('cacheDidUpdate');
    const oldResponse = hasCacheUpdateCallback ? await (0, _cacheMatchIgnoreParams.cacheMatchIgnoreParams)(
    // TODO(philipwalton): the `__WB_REVISION__` param is a precaching
    // feature. Consider into ways to only add this behavior if using
    // precaching.
    cache, effectiveRequest.clone(), ['__WB_REVISION__'], matchOptions) : null;
    if (process.env.NODE_ENV !== 'production') {
      _logger.logger.debug(`Updating the '${cacheName}' cache with a new Response ` + `for ${(0, _getFriendlyURL.getFriendlyURL)(effectiveRequest.url)}.`);
    }
    try {
      await cache.put(effectiveRequest, hasCacheUpdateCallback ? responseToCache.clone() : responseToCache);
    } catch (error) {
      if (error instanceof Error) {
        // See https://developer.mozilla.org/en-US/docs/Web/API/DOMException#exception-QuotaExceededError
        if (error.name === 'QuotaExceededError') {
          await (0, _executeQuotaErrorCallbacks.executeQuotaErrorCallbacks)();
        }
        throw error;
      }
    }
    for (const callback of this.iterateCallbacks('cacheDidUpdate')) {
      await callback({
        cacheName,
        oldResponse,
        newResponse: responseToCache.clone(),
        request: effectiveRequest,
        event: this.event
      });
    }
    return true;
  }
  /**
   * Checks the list of plugins for the `cacheKeyWillBeUsed` callback, and
   * executes any of those callbacks found in sequence. The final `Request`
   * object returned by the last plugin is treated as the cache key for cache
   * reads and/or writes. If no `cacheKeyWillBeUsed` plugin callbacks have
   * been registered, the passed request is returned unmodified
   *
   * @param {Request} request
   * @param {string} mode
   * @return {Promise<Request>}
   */
  async getCacheKey(request, mode) {
    const key = `${request.url} | ${mode}`;
    if (!this._cacheKeys[key]) {
      let effectiveRequest = request;
      for (const callback of this.iterateCallbacks('cacheKeyWillBeUsed')) {
        effectiveRequest = toRequest(await callback({
          mode,
          request: effectiveRequest,
          event: this.event,
          // params has a type any can't change right now.
          params: this.params // eslint-disable-line
        }));
      }

      this._cacheKeys[key] = effectiveRequest;
    }
    return this._cacheKeys[key];
  }
  /**
   * Returns true if the strategy has at least one plugin with the given
   * callback.
   *
   * @param {string} name The name of the callback to check for.
   * @return {boolean}
   */
  hasCallback(name) {
    for (const plugin of this._strategy.plugins) {
      if (name in plugin) {
        return true;
      }
    }
    return false;
  }
  /**
   * Runs all plugin callbacks matching the given name, in order, passing the
   * given param object (merged ith the current plugin state) as the only
   * argument.
   *
   * Note: since this method runs all plugins, it's not suitable for cases
   * where the return value of a callback needs to be applied prior to calling
   * the next callback. See
   * {@link workbox-strategies.StrategyHandler#iterateCallbacks}
   * below for how to handle that case.
   *
   * @param {string} name The name of the callback to run within each plugin.
   * @param {Object} param The object to pass as the first (and only) param
   *     when executing each callback. This object will be merged with the
   *     current plugin state prior to callback execution.
   */
  async runCallbacks(name, param) {
    for (const callback of this.iterateCallbacks(name)) {
      // TODO(philipwalton): not sure why `any` is needed. It seems like
      // this should work with `as WorkboxPluginCallbackParam[C]`.
      await callback(param);
    }
  }
  /**
   * Accepts a callback and returns an iterable of matching plugin callbacks,
   * where each callback is wrapped with the current handler state (i.e. when
   * you call each callback, whatever object parameter you pass it will
   * be merged with the plugin's current state).
   *
   * @param {string} name The name fo the callback to run
   * @return {Array<Function>}
   */
  *iterateCallbacks(name) {
    for (const plugin of this._strategy.plugins) {
      if (typeof plugin[name] === 'function') {
        const state = this._pluginStateMap.get(plugin);
        const statefulCallback = param => {
          const statefulParam = Object.assign(Object.assign({}, param), {
            state
          });
          // TODO(philipwalton): not sure why `any` is needed. It seems like
          // this should work with `as WorkboxPluginCallbackParam[C]`.
          return plugin[name](statefulParam);
        };
        yield statefulCallback;
      }
    }
  }
  /**
   * Adds a promise to the
   * [extend lifetime promises]{@link https://w3c.github.io/ServiceWorker/#extendableevent-extend-lifetime-promises}
   * of the event event associated with the request being handled (usually a
   * `FetchEvent`).
   *
   * Note: you can await
   * {@link workbox-strategies.StrategyHandler~doneWaiting}
   * to know when all added promises have settled.
   *
   * @param {Promise} promise A promise to add to the extend lifetime promises
   *     of the event that triggered the request.
   */
  waitUntil(promise) {
    this._extendLifetimePromises.push(promise);
    return promise;
  }
  /**
   * Returns a promise that resolves once all promises passed to
   * {@link workbox-strategies.StrategyHandler~waitUntil}
   * have settled.
   *
   * Note: any work done after `doneWaiting()` settles should be manually
   * passed to an event's `waitUntil()` method (not this handler's
   * `waitUntil()` method), otherwise the service worker thread my be killed
   * prior to your work completing.
   */
  async doneWaiting() {
    let promise;
    while (promise = this._extendLifetimePromises.shift()) {
      await promise;
    }
  }
  /**
   * Stops running the strategy and immediately resolves any pending
   * `waitUntil()` promises.
   */
  destroy() {
    this._handlerDeferred.resolve(null);
  }
  /**
   * This method will call cacheWillUpdate on the available plugins (or use
   * status === 200) to determine if the Response is safe and valid to cache.
   *
   * @param {Request} options.request
   * @param {Response} options.response
   * @return {Promise<Response|undefined>}
   *
   * @private
   */
  async _ensureResponseSafeToCache(response) {
    let responseToCache = response;
    let pluginsUsed = false;
    for (const callback of this.iterateCallbacks('cacheWillUpdate')) {
      responseToCache = (await callback({
        request: this.request,
        response: responseToCache,
        event: this.event
      })) || undefined;
      pluginsUsed = true;
      if (!responseToCache) {
        break;
      }
    }
    if (!pluginsUsed) {
      if (responseToCache && responseToCache.status !== 200) {
        responseToCache = undefined;
      }
      if (process.env.NODE_ENV !== 'production') {
        if (responseToCache) {
          if (responseToCache.status !== 200) {
            if (responseToCache.status === 0) {
              _logger.logger.warn(`The response for '${this.request.url}' ` + `is an opaque response. The caching strategy that you're ` + `using will not cache opaque responses by default.`);
            } else {
              _logger.logger.debug(`The response for '${this.request.url}' ` + `returned a status code of '${response.status}' and won't ` + `be cached as a result.`);
            }
          }
        }
      }
    }
    return responseToCache;
  }
}
exports.StrategyHandler = StrategyHandler;

}).call(this)}).call(this,require('_process'))
},{"./_version.js":44,"_process":1,"workbox-core/_private/Deferred.js":2,"workbox-core/_private/WorkboxError.js":3,"workbox-core/_private/assert.js":4,"workbox-core/_private/cacheMatchIgnoreParams.js":5,"workbox-core/_private/executeQuotaErrorCallbacks.js":8,"workbox-core/_private/getFriendlyURL.js":9,"workbox-core/_private/logger.js":10,"workbox-core/_private/timeout.js":11}],44:[function(require,module,exports){
"use strict";
// @ts-ignore
try {
    self['workbox:strategies:7.0.0'] && _();
}
catch (e) { }

},{}],45:[function(require,module,exports){
"use strict";

var _precacheAndRoute = require("workbox-precaching/precacheAndRoute");
(0, _precacheAndRoute.precacheAndRoute)([{
  "revision": "698748bc26658d45af1b51e08ed52d90",
  "url": "00/cmyk-halftone.frag"
}, {
  "revision": "5a7a781fb005e769c2d6b86a3c948f79",
  "url": "00/cmyk-halftone.png"
}, {
  "revision": "71734d3abc90cab0dcfa09099d710cae",
  "url": "00/gutenpress.jpg"
}, {
  "revision": "f7e018c9b3e3fa0b40e067680b826d2e",
  "url": "00/halftone.frag"
}, {
  "revision": "586c7fa87620049a52ec2583cee16090",
  "url": "00/halftone.png"
}, {
  "revision": "a9591e7fe1639a32ff9eb7a861f4c468",
  "url": "00/journey.jpg"
}, {
  "revision": "f9d55c3d3a525fa3d9402e2f3826af72",
  "url": "00/vangogh.jpg"
}, {
  "revision": "f09969045417d3446c75d212960a0744",
  "url": "01/00.jpeg"
}, {
  "revision": "f9b3e64b339555190bf412790b9579dd",
  "url": "01/03.jpeg"
}, {
  "revision": "f1dfa3171a2f536da2c10d68711b3baa",
  "url": "01/04.jpeg"
}, {
  "revision": "6cc9bdb7760c800f4e3d488bd242c133",
  "url": "01/print.png"
}, {
  "revision": "3345c84cb082fba3a095f05948f822c0",
  "url": "01/typepress.jpg"
}, {
  "revision": "a69600d7e43d68787f62aa4e957044bc",
  "url": "02/hello_world.frag"
}, {
  "revision": "74540e1db6eae393c600962b70413170",
  "url": "02/hello_world.png"
}, {
  "revision": "51783537c800a226a387c3237f50ebee",
  "url": "03/08.png"
}, {
  "revision": "c0f1a7ef57047e43de992b28a3656946",
  "url": "03/space.frag"
}, {
  "revision": "6a0489b16ea920ed5035eb6910900e2a",
  "url": "03/space.png"
}, {
  "revision": "0b47058218a96f868d7b2d7014a6e61b",
  "url": "03/time.frag"
}, {
  "revision": "759d48914e09710190c5e00cc7af2b07",
  "url": "03/time.png"
}, {
  "revision": "b0af228f63220b8d8cd8d3e5d83f64a2",
  "url": "04/blender/00.png"
}, {
  "revision": "d3ba95ebe979f741a4f748aaca941b6a",
  "url": "04/blender/01.png"
}, {
  "revision": "06f17b41dd35cf46d483bd00abc92fb4",
  "url": "04/blender/02.png"
}, {
  "revision": "827b8f0b3030368e5225f28c34c1ac3e",
  "url": "04/blender/03.png"
}, {
  "revision": "21f6e4008459766f1bb9e8859231ce0c",
  "url": "04/glslEditor-00.gif"
}, {
  "revision": "1a719eac3c6ba827bfe16a632ca156f1",
  "url": "04/glslEditor-01.gif"
}, {
  "revision": "2ee2a7c870a2f2c40231b9dd17b85d29",
  "url": "04/glslGallery.gif"
}, {
  "revision": "031e971b037e30fdf391b37628224c13",
  "url": "04/glslViewer.gif"
}, {
  "revision": "649e02fdc0133ef2e40560fc782edfb7",
  "url": "04/openFrameworks/bin/data/shader.frag"
}, {
  "revision": "e21219cca58ced8f0fa9131d6c5f3c69",
  "url": "04/processing/data/shader.frag"
}, {
  "revision": "d9171b678a6f7454361b029fa46a9de5",
  "url": "04/sfml/CMakeLists.txt"
}, {
  "revision": "e4012636c4cecccf8a6fa53f8b3e9653",
  "url": "04/sfml/data/shader.frag"
}, {
  "revision": "8d24eb7547812ba1d1a8895cff7db72e",
  "url": "04/three_js/index.html"
}, {
  "revision": "dd9720ee2ec9c711f6e6490d1362e1c7",
  "url": "05/anthony-mattox-ribbon.jpg"
}, {
  "revision": "cc91ab2f12a70c3e5eb4c8e39a94d313",
  "url": "05/cubicpulse.frag"
}, {
  "revision": "853aea036ee6ea80a3eca6b99ccf94ef",
  "url": "05/cubicpulse.png"
}, {
  "revision": "f53614534e379b982921c7bb15d7da61",
  "url": "05/easing.frag"
}, {
  "revision": "108a17ddefe50c50816890345a3b4fe4",
  "url": "05/easing.png"
}, {
  "revision": "618c7f3d419b5b231e4871f187f861aa",
  "url": "05/expo.frag"
}, {
  "revision": "51453262b1f809e3334b4b2360f63aee",
  "url": "05/expo.png"
}, {
  "revision": "b003079260f5de7ca975429235d9466c",
  "url": "05/expstep.frag"
}, {
  "revision": "e2f7c81bda1eac5d6efb478ba9b623d5",
  "url": "05/expstep.png"
}, {
  "revision": "c8998e44efaed72aea0be7aa4e1c9d01",
  "url": "05/grapher.png"
}, {
  "revision": "f87a158d17026b5dde868958bd38d1b6",
  "url": "05/graphtoy.png"
}, {
  "revision": "87b5bf3b7a7c405dd8aaae05a51d584e",
  "url": "05/harmonics.gif"
}, {
  "revision": "d1c3e955df34317293192831378eff5c",
  "url": "05/harmonics.png"
}, {
  "revision": "a024b3b137560415626c5c30f90438a6",
  "url": "05/impulse.frag"
}, {
  "revision": "d9689aa99f64cea82478213a7c0ac104",
  "url": "05/impulse.png"
}, {
  "revision": "c4d1d2227f74e644b7b9ed060dd8acb3",
  "url": "05/kynd.png"
}, {
  "revision": "713d128170d4f6d8d29b3da360629d0d",
  "url": "05/linear.frag"
}, {
  "revision": "108a17ddefe50c50816890345a3b4fe4",
  "url": "05/linear.png"
}, {
  "revision": "c5a13794b40aed4b72595bf6f62ae14e",
  "url": "05/mr_miyagi.jpg"
}, {
  "revision": "c39350eeeb46691637bad97cfa53484e",
  "url": "05/parabola.frag"
}, {
  "revision": "32ec274a15a7810a4e3122d3c45e4011",
  "url": "05/parabola.png"
}, {
  "revision": "a4af648424aa8af656d2119a4388697a",
  "url": "05/pcurve.frag"
}, {
  "revision": "c9a9603c39743307aa1bab7433ed05ff",
  "url": "05/pcurve.png"
}, {
  "revision": "154540aa13c64d7f085f81e33bc79270",
  "url": "05/shadershop.png"
}, {
  "revision": "ecf5ba982ff3de01fb074a8dc58d6715",
  "url": "05/sincos.gif"
}, {
  "revision": "91c8dd2cf9628235475da36cb82f17e7",
  "url": "05/sincos.png"
}, {
  "revision": "b0c830e44588e0fe8712d528cebfa838",
  "url": "05/smoothstep.frag"
}, {
  "revision": "669f5a169a88bd3418b5cbd44f0fa768",
  "url": "05/smoothstep.png"
}, {
  "revision": "52219c6e8f9cf7d58ef83ad38e2c6b7d",
  "url": "05/step.frag"
}, {
  "revision": "3e449ab273825783614359752e186242",
  "url": "05/step.png"
}, {
  "revision": "14c0694c14471062b20182b54782cd79",
  "url": "06/colorwheel.png"
}, {
  "revision": "d76d7c416aae63b6cdf1ca076301009e",
  "url": "06/easing.frag"
}, {
  "revision": "ba995085afcdd42b796f62276bd42430",
  "url": "06/easing.png"
}, {
  "revision": "fa632ae3603a1fefe427c603b4f34a72",
  "url": "06/gradient.frag"
}, {
  "revision": "24d83759699d692c6034dcc8a1655612",
  "url": "06/gradient.png"
}, {
  "revision": "3770c6d09980fa779906410640f61c26",
  "url": "06/hsb-colorwheel.frag"
}, {
  "revision": "3d059ae1f04144e9b5e4aab629d83ad3",
  "url": "06/hsb-colorwheel.png"
}, {
  "revision": "7b0ce5c4da6d16b0a8376ebedfb306ac",
  "url": "06/hsb.frag"
}, {
  "revision": "a134d5477fbd4cf9917f21664a207d44",
  "url": "06/hsb.png"
}, {
  "revision": "c5c21e899808d9bfc89feafaa8359250",
  "url": "06/klee.jpg"
}, {
  "revision": "7baf4ae04de5fea2d1fc36772df9be3b",
  "url": "06/mix-f.jpg"
}, {
  "revision": "4ae865cd058ba800745221635b28670f",
  "url": "06/mix-vec.jpg"
}, {
  "revision": "e249fed1e517c5f05c3c233fdc37168a",
  "url": "06/mix.frag"
}, {
  "revision": "24b74e03b2e56aaa0fbd4fd4d02f7249",
  "url": "06/mix.png"
}, {
  "revision": "62d3c4a17664c37d6e14e8b40fdc2573",
  "url": "06/spectrums.jpg"
}, {
  "revision": "3ecebf8093999bd3557a4f648087791a",
  "url": "06/turner.jpg"
}, {
  "revision": "eeb822e8e60e9791c3298ebffe660754",
  "url": "07/arrow.frag"
}, {
  "revision": "031bdba45a79511ff983a02fae67915f",
  "url": "07/arrow.png"
}, {
  "revision": "f98b9e4dfb8234bd1e50b5d4c4f9ad14",
  "url": "07/batman.frag"
}, {
  "revision": "460748ef075599aef897208354796690",
  "url": "07/batman.png"
}, {
  "revision": "b8888910a9a4e340f1a2cd7f4c5dea2a",
  "url": "07/circle-making.frag"
}, {
  "revision": "5bc29d730546fdbd7841b828ef291cb3",
  "url": "07/circle-making.png"
}, {
  "revision": "8e71c4108b43e9edd08a61d27ba43b3d",
  "url": "07/circle.frag"
}, {
  "revision": "14b8abc9b4d27450b2fb454998556436",
  "url": "07/circle.jpg"
}, {
  "revision": "1adb61eb716670a39d17f68e6da8812f",
  "url": "07/circle.png"
}, {
  "revision": "83c0605db9dca7ed632c1cbdbcf03c9b",
  "url": "07/compass.jpg"
}, {
  "revision": "86c2bb517f1ebb869a89569959ea384a",
  "url": "07/cross.frag"
}, {
  "revision": "a6c5f68ef457419abc92571b05bbd6bc",
  "url": "07/cross.png"
}, {
  "revision": "fe5e732918557f7d476f3bc9fba22aa8",
  "url": "07/distance-field.jpg"
}, {
  "revision": "d0f9d01372920555dc765c1f9151b16c",
  "url": "07/froebel.jpg"
}, {
  "revision": "348eb48cd0ae1e1f01cc4ced94f9b853",
  "url": "07/grid_paper.jpg"
}, {
  "revision": "d222bb888009106bf306644b2e647da8",
  "url": "07/hypotenuse.png"
}, {
  "revision": "b139e2dcb85d1681512846bbab9c8a7a",
  "url": "07/line.frag"
}, {
  "revision": "103ea2ae1f7264249040670dd16ef044",
  "url": "07/line.png"
}, {
  "revision": "db5305f2bfe52d2a589bc1425298f747",
  "url": "07/mangold.jpg"
}, {
  "revision": "13ee3fd163bc407b655e887e471326ff",
  "url": "07/mondrian.jpg"
}, {
  "revision": "ce39cec0d0db8bcd76ef118bc1c9ea8b",
  "url": "07/polar.frag"
}, {
  "revision": "1a369a1c4e17e5758264c210edb0daa7",
  "url": "07/polar.png"
}, {
  "revision": "16559fbeddbba3444b1d9ba17973bcc0",
  "url": "07/rect-01.jpg"
}, {
  "revision": "03f5b574de7d5bcaeb348bcf85b5e1f2",
  "url": "07/rect-02.jpg"
}, {
  "revision": "dae450f99643911c566d7532394e9488",
  "url": "07/rect-df.frag"
}, {
  "revision": "d4633595428a3da4d1f9530bd78fe187",
  "url": "07/rect-df.png"
}, {
  "revision": "6a31bc8a9016a8e5dad455e8b971dc87",
  "url": "07/rect-making.frag"
}, {
  "revision": "1b9619917ecf31747410826e973d829f",
  "url": "07/rect-making.png"
}, {
  "revision": "dce52a5f12cdbb7fba65af0de5d791cb",
  "url": "07/rect.frag"
}, {
  "revision": "16eff652185e1d66ff1c1b53bac6ef4c",
  "url": "07/rect.png"
}, {
  "revision": "06a8d8f30c0617803a454a7d0228f373",
  "url": "07/shapes.frag"
}, {
  "revision": "e284733da951c9f7a6ac6e03deda723c",
  "url": "07/shapes.png"
}, {
  "revision": "0e5ca89e7b8427d718966888645dbf67",
  "url": "07/tmp/tritri.frag"
}, {
  "revision": "f0924a0a43f4bddeec96223e1fb0f7f5",
  "url": "07/tmp/warp-shape.frag"
}, {
  "revision": "afb9daaf7af4b07055e525f55e80d290",
  "url": "07/triangle-making.frag"
}, {
  "revision": "9ba7a12a24da2d70ca8aa38ff8ee6c9a",
  "url": "07/triangle-making.png"
}, {
  "revision": "42ea93c9a78623adc2cdf2142eb7ea7b",
  "url": "07/triangle.frag"
}, {
  "revision": "921b64e568ed4aeaaed5d38cafd0ccb7",
  "url": "07/triangle.png"
}, {
  "revision": "33d4f8af7b51d419604f5235c591ba6c",
  "url": "07/zen-garden.jpg"
}, {
  "revision": "4b41754948c99d08fb301465bf8d5a35",
  "url": "08/2drotmat.png"
}, {
  "revision": "2e623c87eec160503abdd7611ae8c015",
  "url": "08/3drotmat.png"
}, {
  "revision": "6be5571b6931f664739ae73c514ce8aa",
  "url": "08/3dtransmat.png"
}, {
  "revision": "b4f1676aefe8d2ce487dd42542d200b1",
  "url": "08/cross-animated.frag"
}, {
  "revision": "f9b871df7988221849d9882b5852df53",
  "url": "08/cross-animated.png"
}, {
  "revision": "0095ec68b438c10c8b5a131cfc4028fb",
  "url": "08/cross-rotate.frag"
}, {
  "revision": "43d87420635c569cd249351f3fe73955",
  "url": "08/cross-rotate.png"
}, {
  "revision": "cdf7e5afadaa1be0e0d654adb46c6de0",
  "url": "08/cross-scale.frag"
}, {
  "revision": "566ac431ad28b53464baa188430cbc2d",
  "url": "08/cross-scale.png"
}, {
  "revision": "9c075f623818536b44d60aea9f06441f",
  "url": "08/cross-translate.frag"
}, {
  "revision": "6f2363e8975c91233b1e6c76ae3b4936",
  "url": "08/cross-translate.png"
}, {
  "revision": "f9dbdff93115bd36565fc2f37883fc88",
  "url": "08/cross.frag"
}, {
  "revision": "8011256ee787ba169ce968aaf04ad0f6",
  "url": "08/cross.png"
}, {
  "revision": "8ea98d2605c783013a789825bce4a0d6",
  "url": "08/matrices.frag"
}, {
  "revision": "a65f69fbb899fcf5327899e27cf8d37e",
  "url": "08/matrices.png"
}, {
  "revision": "1b67b09014fc0d1b30f6934533e0da85",
  "url": "08/matrix.frag"
}, {
  "revision": "c8d33000ec2512689ce40d6866f595e3",
  "url": "08/matrix.png"
}, {
  "revision": "81c95bade51a5ae46d0ae4ec403fdbe8",
  "url": "08/matrixes.png"
}, {
  "revision": "ae5c72cf0b60a3048796f333dbc6201d",
  "url": "08/rotate.jpg"
}, {
  "revision": "9042d1cf1c61a63fc1fcd30076ddb5f5",
  "url": "08/rotmat.png"
}, {
  "revision": "371bb5f2b47430ed8d9d90cdd505878c",
  "url": "08/scale.png"
}, {
  "revision": "eacf194a10bc023a717de1d70ce93be3",
  "url": "08/translate.jpg"
}, {
  "revision": "3f957fc75cfca09862ab7ce9026213f0",
  "url": "08/yuv.frag"
}, {
  "revision": "dcb9860f61aec82157a2a132c216c77d",
  "url": "08/yuv.png"
}, {
  "revision": "d179a6e63fd3a5b9717a8dc643159a35",
  "url": "09/brick.jpg"
}, {
  "revision": "3e8ef1533f4e3a12129068fb395e6386",
  "url": "09/bricks.frag"
}, {
  "revision": "9e0882857564b9b14ffeb71021392e16",
  "url": "09/bricks.png"
}, {
  "revision": "6fa58f7e4ad838738afdd19f47253ad3",
  "url": "09/checks.frag"
}, {
  "revision": "4cbc421d967d18985e49632b5d34bb72",
  "url": "09/checks.png"
}, {
  "revision": "ddfce91794071a9595fe498384a573e3",
  "url": "09/cross.frag"
}, {
  "revision": "e8c3daf82a638c50d8ca24f39e2973b0",
  "url": "09/cross.png"
}, {
  "revision": "45af3b08fa6f07ed0568a532885349aa",
  "url": "09/deco.frag"
}, {
  "revision": "24954ad45bb94f6b6b9534cf6d0d1252",
  "url": "09/deco.png"
}, {
  "revision": "bab81a564032952b6e70a003e4180260",
  "url": "09/diamondtiles-long.png"
}, {
  "revision": "1c1773bf6661291f5ec0ccd17f5e7d6d",
  "url": "09/diamondtiles.frag"
}, {
  "revision": "0bfac69855870c230b85cac0bfd06b39",
  "url": "09/diamondtiles.png"
}, {
  "revision": "2cdbbe7d75f7202778a3c2750a4fda0e",
  "url": "09/dots.frag"
}, {
  "revision": "b1c235162d340e776ece36137d9c30b1",
  "url": "09/dots.png"
}, {
  "revision": "1110cfc2ce27fc35aee391694dabf6d5",
  "url": "09/dots1.frag"
}, {
  "revision": "43d7b8db5eb369c9e0ee3ec08abae716",
  "url": "09/dots1.png"
}, {
  "revision": "fc55c24fecd88c4d566a6a35bfa07854",
  "url": "09/dots2.frag"
}, {
  "revision": "b90bf486519c2fe99e71cd5478a1e639",
  "url": "09/dots2.png"
}, {
  "revision": "54ea4d8f1fc41362122f0dc65914ab9d",
  "url": "09/dots3.frag"
}, {
  "revision": "d628573ac786438ec0c4d2b182c540a0",
  "url": "09/dots3.png"
}, {
  "revision": "317a83f16d73c2a1f814d536a341dff1",
  "url": "09/dots4.frag"
}, {
  "revision": "49d0ecbe73f8867035a86b629fe47057",
  "url": "09/dots4.png"
}, {
  "revision": "74746efba6b608df3e9a29006f44d168",
  "url": "09/dots5.frag"
}, {
  "revision": "5be7789e0b7ccc7758cbd924534c0428",
  "url": "09/dots5.png"
}, {
  "revision": "36ca048b0722578376b4949eace3de5a",
  "url": "09/geometricpatters.png"
}, {
  "revision": "aa32ddb2665df18f431eb439498f58f4",
  "url": "09/grid-making.frag"
}, {
  "revision": "865284b4fa4b98a75ad69930daf6c4a7",
  "url": "09/grid-making.png"
}, {
  "revision": "7b38b19c0d6571f8987121467e8f0f11",
  "url": "09/grid-side.frag"
}, {
  "revision": "13fec31895e13161d473d2aa2b09ca56",
  "url": "09/grid-side.png"
}, {
  "revision": "80c4bcac372aa6ce5ed5f46ac1c7113a",
  "url": "09/grid.frag"
}, {
  "revision": "9931a5273bfc4ef471b6a915fe26547b",
  "url": "09/grid.png"
}, {
  "revision": "3b6998ab106f3c4c4d09ffbdbe559d68",
  "url": "09/iching-01.frag"
}, {
  "revision": "58f0bbfd1ecda5d4b9c6eb2563f2183e",
  "url": "09/iching-01.png"
}, {
  "revision": "577e1e8a47967e231c9f4e7dd214a112",
  "url": "09/lines-wave.frag"
}, {
  "revision": "f989514d8438acc3930b887eed923209",
  "url": "09/lines-wave.png"
}, {
  "revision": "5fd7c84a238976f935aeca920db907b0",
  "url": "09/lines.frag"
}, {
  "revision": "8f5daadc9228e44dc8d9eb00897c3a36",
  "url": "09/lines.png"
}, {
  "revision": "965fbf481ed55dc42640af5cc9e211a3",
  "url": "09/marching_dots.frag"
}, {
  "revision": "b784e8a4e82fb958783542814fcc5382",
  "url": "09/marching_dots.png"
}, {
  "revision": "e8363a7eafefe910cbee99159218568d",
  "url": "09/mirrortiles.frag"
}, {
  "revision": "8063cf3371356766f4b17a01d1de6c79",
  "url": "09/mirrortiles.png"
}, {
  "revision": "421ebb88cd94f8ac8ced005d8058cded",
  "url": "09/nuts.frag"
}, {
  "revision": "118874dc022ecd1bc54f267edae4630c",
  "url": "09/nuts.png"
}, {
  "revision": "ad85122270fc59d9e7f71aff77515680",
  "url": "09/rotatedtiles.frag"
}, {
  "revision": "2b78da43c1fbb877b975f8499da64fdc",
  "url": "09/rotatedtiles.png"
}, {
  "revision": "e82d4b94290686670fe645cd03e39df3",
  "url": "09/tartan.jpg"
}, {
  "revision": "4cfcc883f7d1c4468300c382555fb735",
  "url": "09/truchet-00.png"
}, {
  "revision": "9a903e2d86803d5c251770c77f67dede",
  "url": "09/truchet-01.png"
}, {
  "revision": "84a47b4e5d3cfc4a45eaf55726490bae",
  "url": "09/truchet.frag"
}, {
  "revision": "9193e9a005757f4995c67f2ef720d981",
  "url": "09/truchet.png"
}, {
  "revision": "8e5830aed3e96720769a712db3bba2a0",
  "url": "09/warmerdam.jpg"
}, {
  "revision": "b67a0a6ae26bb07598b5306570b3aa34",
  "url": "09/zigzag.frag"
}, {
  "revision": "ba2eb42fd70d34c9ff916eb534864e32",
  "url": "09/zigzag.png"
}, {
  "revision": "9d2be0cf54f2a2d7bfcb62d04e9e6e7d",
  "url": "10/1d-random.frag"
}, {
  "revision": "30ff8fd0e408750a3f8405d793e34445",
  "url": "10/1d-random.png"
}, {
  "revision": "a584ad8582081bda05f76bfffea738de",
  "url": "10/2d-random-dots.frag"
}, {
  "revision": "4db61dc7d71969fef562e9e1bacaa0dc",
  "url": "10/2d-random-dots.png"
}, {
  "revision": "38a306b95e0f44ef5be39f5099b4d404",
  "url": "10/2d-random-mosaic.frag"
}, {
  "revision": "4eaa00df14ba3df87b9f838e7551ee5f",
  "url": "10/2d-random-mosaic.png"
}, {
  "revision": "9974bb1b1dfbafe74727107d4d0ca1d0",
  "url": "10/2d-random-truchet.frag"
}, {
  "revision": "d697f337dd5bd6bc2b687d18d6ed2e4c",
  "url": "10/2d-random-truchet.png"
}, {
  "revision": "39502681a046d79305196ba3159d9c4f",
  "url": "10/2d-random.frag"
}, {
  "revision": "28ab92b176b4e314158cb059be4fd9c1",
  "url": "10/2d-random.png"
}, {
  "revision": "23a2094f5e5539a030462064d336a0e6",
  "url": "10/iching-02.frag"
}, {
  "revision": "97a8040d1f6d3e12caa645402fc1f172",
  "url": "10/iching-02.png"
}, {
  "revision": "cd266e195a25251a8bd2c1407779568e",
  "url": "10/ikeda-00.frag"
}, {
  "revision": "35e1ccb951e963e36a74a4c97251a76e",
  "url": "10/ikeda-00.png"
}, {
  "revision": "14984b9636809f285572aa0b28a9270d",
  "url": "10/ikeda-03.frag"
}, {
  "revision": "dc5d16608db544073c6db4d8a84439a6",
  "url": "10/ikeda-03.png"
}, {
  "revision": "770504512caa1161f7eb6c42ea04af40",
  "url": "10/ikeda-04.frag"
}, {
  "revision": "e1ebfcdf059e5eec8c0d176bbb45ba26",
  "url": "10/ikeda-04.png"
}, {
  "revision": "901328a7cb65dd138901d849619cb2fa",
  "url": "10/ikeda-digits.frag"
}, {
  "revision": "1af8f9156ab1cc52a7f6125d5fa4aa64",
  "url": "10/ikeda-digits.png"
}, {
  "revision": "be930434f32633e0fac5d758127700c3",
  "url": "10/ikeda-numered-grid.frag"
}, {
  "revision": "29096c80216ace776deedeb1ebd42b14",
  "url": "10/ikeda-numered-grid.png"
}, {
  "revision": "eb697a8e06e35d1fc982f5660d1e7347",
  "url": "10/ikeda-simple-grid.frag"
}, {
  "revision": "96e1d080414d6e8ae66d562613020cf9",
  "url": "10/ikeda-simple-grid.png"
}, {
  "revision": "c0b42e8a18d3ebfb699d89a015a8738a",
  "url": "10/matrix.frag"
}, {
  "revision": "83b902e132748df563951fc8e12912ab",
  "url": "10/matrix.png"
}, {
  "revision": "2e44a4707006119627d9b32d863b7e9a",
  "url": "10/ryoji-ikeda.jpg"
}, {
  "revision": "3838aecc70201936b766b6945c07191d",
  "url": "11/00.png"
}, {
  "revision": "f71f22ef621e49e28cf28edfb56819b5",
  "url": "11/01.png"
}, {
  "revision": "b99cfa882bcc7a525bb0a783bcfef705",
  "url": "11/02.png"
}, {
  "revision": "c47d4abdf6676b61373d0b09473f75e6",
  "url": "11/03.jpg"
}, {
  "revision": "5d7dee683be8e8efca1741d668ec52cc",
  "url": "11/04.jpg"
}, {
  "revision": "a95e501aabd2e7c12a7fab15ef1d037d",
  "url": "11/05.jpg"
}, {
  "revision": "1e9cf865bdd77717a1f8b489435dc3f4",
  "url": "11/1d-noise.frag"
}, {
  "revision": "9fb21f359837d61ef1825d6a8b24f55c",
  "url": "11/1d-noise.png"
}, {
  "revision": "679b0168a8087931c4e45f0d772424c8",
  "url": "11/2^N.png"
}, {
  "revision": "e3986c729f3ab6a73edac2176b7d9c64",
  "url": "11/2d-gnoise.frag"
}, {
  "revision": "aafcbb413a95cf87c0af2c430e6a354c",
  "url": "11/2d-gnoise.png"
}, {
  "revision": "aafc25dfc7aed636f26573083a9cdee6",
  "url": "11/2d-noise.frag"
}, {
  "revision": "94c1cbd22373c4d919514e2afafd7f57",
  "url": "11/2d-noise.png"
}, {
  "revision": "9a866613eeacc434204683b289887ff4",
  "url": "11/2d-pnoise.frag"
}, {
  "revision": "11794fbdff5f35997980853d2197ad96",
  "url": "11/2d-pnoise.png"
}, {
  "revision": "d3360463d7c1b72a308d5c7e28e1ed55",
  "url": "11/2d-snoise-clear.frag"
}, {
  "revision": "13becd8456c3928fcfc1d55b9cb94719",
  "url": "11/2d-snoise-clear.png"
}, {
  "revision": "c5279e395e3a7776e398bb6ea0445220",
  "url": "11/2d-snoise.frag"
}, {
  "revision": "13becd8456c3928fcfc1d55b9cb94719",
  "url": "11/2d-snoise.png"
}, {
  "revision": "ed0fb9b87c7e0f8c039ae1b9ed0bd6d2",
  "url": "11/2d-vnoise.frag"
}, {
  "revision": "8b7625c12803900b2eaf4c76ab3767b2",
  "url": "11/3d-noise.frag"
}, {
  "revision": "4ec26e4f36bb0bb0c0f4bea6ea880f43",
  "url": "11/3d-noise.png"
}, {
  "revision": "eb8ae1a37bbdb1d6617a819d96657fbd",
  "url": "11/3d-pnoise.frag"
}, {
  "revision": "211720a2d7a0b6b23ee2c370599ba5d2",
  "url": "11/3d-pnoise.png"
}, {
  "revision": "0c61131db188f871da99bd308a2f77e6",
  "url": "11/3d-snoise.frag"
}, {
  "revision": "cee291f7a97cc6a04c8164df698f9c7a",
  "url": "11/3d-snoise.png"
}, {
  "revision": "8d919d034879c6add1889ec77aae1429",
  "url": "11/circleWave-noise.frag"
}, {
  "revision": "a236fc0013b26b879eb1e96b2145596e",
  "url": "11/circleWave-noise.png"
}, {
  "revision": "0eecfc5e045126a9c765ba67ce72282f",
  "url": "11/gradient-noise.png"
}, {
  "revision": "6d333966d2da27e24567a3e3d7ddf67c",
  "url": "11/iching-03.frag"
}, {
  "revision": "68c93828fe3901117e927e2d6220d84e",
  "url": "11/iching-03.png"
}, {
  "revision": "fc14b8c4b49b87b40ab0c616c4ac4133",
  "url": "11/lava-lamp.frag"
}, {
  "revision": "7318b04a311c3c16b4ba9bd8ee30242a",
  "url": "11/lava-lamp.png"
}, {
  "revision": "0ed09225f424d9fc0ef7cf7a277e3b07",
  "url": "11/mcb.jpg"
}, {
  "revision": "d543dca4383ca6306f38d585ef2bcfc1",
  "url": "11/pollock.jpg"
}, {
  "revision": "8afcd1adb76c898d1b5aad2c0a0bfad9",
  "url": "11/robert_hodgin.jpg"
}, {
  "revision": "0c8ea22a8a282c74fb3d86a79d75f4ad",
  "url": "11/rothko.jpg"
}, {
  "revision": "8eb58882296d94d785cf6d1e93752654",
  "url": "11/simplex-grid-00.png"
}, {
  "revision": "d7e04b5f2c87bbdc244a79ef5ffeaf05",
  "url": "11/simplex-grid-01.png"
}, {
  "revision": "e6a95e77a466559139c44bba17e75761",
  "url": "11/simplex-grid-02.png"
}, {
  "revision": "94fb990b322ab89160bbb9498a1236ef",
  "url": "11/simplex-grid.frag"
}, {
  "revision": "171a0d2385a428775e6c7115340d691c",
  "url": "11/simplex-grid.png"
}, {
  "revision": "f1abdb14a73bd48177e37ea3c3821163",
  "url": "11/simplex-noise.png"
}, {
  "revision": "e5960c3ae87ae1654a6b92c08c372365",
  "url": "11/splatter-long.png"
}, {
  "revision": "b7b40876c6823c2685e881baf6f02af4",
  "url": "11/splatter.frag"
}, {
  "revision": "3becf233ec70ebb4f67abc3759269cd3",
  "url": "11/splatter.png"
}, {
  "revision": "33c936853cc461c01b624d01c456fbc5",
  "url": "11/texture-00.jpg"
}, {
  "revision": "d072fe8df63ea0632ec9112e07c7c7a5",
  "url": "11/texture-01.jpg"
}, {
  "revision": "9435b6306f58920891f6d230de4f3f3b",
  "url": "11/texture-02.jpg"
}, {
  "revision": "0cf9386fc1e9fa8a3f77654c878b055e",
  "url": "11/texture-03.jpg"
}, {
  "revision": "a7ec837685318314a2611a846f956d81",
  "url": "11/texture-04.jpg"
}, {
  "revision": "540b65eb2a12a0ecc60881ae4dbf2dfa",
  "url": "11/texture-05.jpg"
}, {
  "revision": "96e641288fdc7446a604299b98821f93",
  "url": "11/texture-06.jpg"
}, {
  "revision": "b2968bbc4d5fdabea864ec7fbc2ed2a3",
  "url": "11/texture-99.jpg"
}, {
  "revision": "14a6bf9155de5f625291c74718f0abf9",
  "url": "11/tmp/2d-snoise-normal.frag"
}, {
  "revision": "0509f71864db5fa8367722d33964f152",
  "url": "11/tmp/3d-snoise-normal.frag"
}, {
  "revision": "66e896876c4d8e37050498a184d5c89c",
  "url": "11/tmp/circleDistortion.frag"
}, {
  "revision": "8025a0313a5ddabdbf9e53b15d132e06",
  "url": "11/tmp/circleWave-noiseChannels.frag"
}, {
  "revision": "dab64e0e1ec82401c3376c6f0d5a99af",
  "url": "11/tmp/displace-grid.frag"
}, {
  "revision": "c2eef417aeb5594e4b4da487cc47e5a9",
  "url": "11/tmp/displace-lines.frag"
}, {
  "revision": "98d0c38c64520b82c84b55370fc87e76",
  "url": "11/tmp/noise-move.frag"
}, {
  "revision": "57daf3f739e90ece9a15ed79c30286b1",
  "url": "11/tmp/simplex-pattern-00.frag"
}, {
  "revision": "e4a86fe2ed76abe4dfeed0675c0e028f",
  "url": "11/tmp/simplex-pattern-01.frag"
}, {
  "revision": "700ff7dfd08599433a5f263dfc5f3ced",
  "url": "11/tmp/simplex-pattern-02.frag"
}, {
  "revision": "87c8551b6164143b3f7c7d8bf0385b02",
  "url": "11/tmp/simplex-pattern-03.frag"
}, {
  "revision": "2f527d19899dfa00fa27e3f1c7cc5a65",
  "url": "11/tmp/simplex-pattern-04.frag"
}, {
  "revision": "9d54ef9b1de56d564e86114ccc586563",
  "url": "11/tmp/vortex.frag"
}, {
  "revision": "2f115ff984b4e018d9dccc6eae30c9ca",
  "url": "11/tmp/warp-grid.frag"
}, {
  "revision": "8709e9da5b8c1c362acfa7bb142c7a7d",
  "url": "11/tron.jpg"
}, {
  "revision": "2a5995b5d144ef4d8b1dae43d1369405",
  "url": "11/value-noise.png"
}, {
  "revision": "491108b45daf224299aef831eedea3ad",
  "url": "11/wood-long.png"
}, {
  "revision": "4e77079052f24fedefdaeef051b3d5f4",
  "url": "11/wood.frag"
}, {
  "revision": "ac861e791e43f978f7c52800e5e260d8",
  "url": "11/wood.png"
}, {
  "revision": "649ca72ea2bebe88d04540e238eb2a04",
  "url": "12/2d-cnoise-2x2.frag"
}, {
  "revision": "5d8604584327eb771166ff576b4d9f1c",
  "url": "12/2d-cnoise-2x2.png"
}, {
  "revision": "6bc754cf41873517a3a8344f7f9a3fbe",
  "url": "12/2d-cnoise-2x2x2.frag"
}, {
  "revision": "855ab9a97f60868646acc853d09c55ac",
  "url": "12/2d-cnoise-2x2x2.png"
}, {
  "revision": "07a83a693f9923259479bf6ccfc11c8f",
  "url": "12/2d-cnoise.frag"
}, {
  "revision": "8f587017fb451ef4d218ea41b181261d",
  "url": "12/2d-cnoise.png"
}, {
  "revision": "eaf79e9fe1858dca6ac4e0f971494091",
  "url": "12/2d-voronoi.frag"
}, {
  "revision": "a27adc0dd69da4c42628e5a7688216ee",
  "url": "12/2d-voronoi.gif"
}, {
  "revision": "44088d8a89632149871bfaf5fa8497da",
  "url": "12/2d-voronoi.png"
}, {
  "revision": "a92b3edec62b48e1484327ea4e905802",
  "url": "12/2d-voronoise.frag"
}, {
  "revision": "da6ffef3758062a79f69740c73096771",
  "url": "12/2d-voronoise.png"
}, {
  "revision": "1700a350c8e19f956ff2adeba49dbce3",
  "url": "12/3d-cnoise.frag"
}, {
  "revision": "29d64708c9cc5c6ced69c76d538f9da4",
  "url": "12/3d-cnoise.png"
}, {
  "revision": "e50e35e6c14766c5459c74d6abc2cb20",
  "url": "12/accretion.jpg"
}, {
  "revision": "fc075602e497957768d0a1738115d20f",
  "url": "12/cell-00.png"
}, {
  "revision": "59b6620699e7759c1e567f168faa9be3",
  "url": "12/cell-01.png"
}, {
  "revision": "b7dad58c6407aaa7ce4c31b13c5bf90f",
  "url": "12/cell-02.png"
}, {
  "revision": "09d72c6bed5508503d68642e5e416cd7",
  "url": "12/cell.frag"
}, {
  "revision": "521d8ea31a92b4036a3099aabeb903fe",
  "url": "12/cell.png"
}, {
  "revision": "e0954a56d0584e2ac7ca65e1e099b58f",
  "url": "12/cellnoise-00.frag"
}, {
  "revision": "cc5208a998cc38f2fbda53cce336a45c",
  "url": "12/cellnoise-00.png"
}, {
  "revision": "8f17a6f0871efba12882edb9b112290a",
  "url": "12/cellnoise-01.frag"
}, {
  "revision": "8811efdbd71b505291fd150fd2dae9d5",
  "url": "12/cellnoise-01.png"
}, {
  "revision": "9e94385f4e906d92ef04cc621543dc62",
  "url": "12/cellnoise-02.frag"
}, {
  "revision": "3a78a0ca149220d38ce3280ab4639d58",
  "url": "12/cellnoise-02.png"
}, {
  "revision": "6571c8f6bd53b6786743c7a981ced2ff",
  "url": "12/cellnoise.png"
}, {
  "revision": "5b746de5acf290ed06db3ee235718cfd",
  "url": "12/cracks.frag"
}, {
  "revision": "a7900f1ae6491487304d01a55aab17bd",
  "url": "12/cracks.png"
}, {
  "revision": "211a35cc466de57e6b28ece8d7475b8f",
  "url": "12/DeyrolleFilm.png"
}, {
  "revision": "952a93fbad86fecedad034ab8deece6b",
  "url": "12/dragonfly.jpg"
}, {
  "revision": "74c013d31cd75ee092ff7e8a66c68dc7",
  "url": "12/metaballs.frag"
}, {
  "revision": "ac35e27f3d06378613cd6349ff074041",
  "url": "12/metaballs.png"
}, {
  "revision": "b9bdac3a9e80a197fea224f6365165a7",
  "url": "12/monokot_root.jpg"
}, {
  "revision": "76068a1f193e9c843f8c8e794f6f162d",
  "url": "12/reza.png"
}, {
  "revision": "d40a261fceeab2cd0cd8e0809669ab15",
  "url": "12/saraceno.jpg"
}, {
  "revision": "e07737c652ee4ece26436bc06b7c9c32",
  "url": "12/solas.png"
}, {
  "revision": "1d17ff2c605457b215ac1f3e06f632e3",
  "url": "12/stippling.frag"
}, {
  "revision": "6071cfe394f07acd654a72059789a78a",
  "url": "12/stippling.png"
}, {
  "revision": "3d17ecd0ab52876b82a64e3b2e779cf1",
  "url": "12/tissue.frag"
}, {
  "revision": "40c017c4426bcdfe35b66fd4c0a2cf26",
  "url": "12/tissue.png"
}, {
  "revision": "0483c472cc3164f02f65898800358a9f",
  "url": "12/tmp/particle-gradient.frag"
}, {
  "revision": "e3d69b13679dc4315db71d73ccb69cc3",
  "url": "12/tmp/particle-texture.frag"
}, {
  "revision": "96f0011a1747f1b098aaa8c489ce9323",
  "url": "12/vorono-00.frag"
}, {
  "revision": "79ba7fc12a84290b82d2d13c5bcde796",
  "url": "12/vorono-00.png"
}, {
  "revision": "fd44116c78115c2ae154b0195d80de68",
  "url": "12/vorono-01.frag"
}, {
  "revision": "cfa15a48d034661e33ec2bd831e1a346",
  "url": "12/vorono-01.png"
}, {
  "revision": "1cf884091984f7599edd5301eb806b61",
  "url": "13/1d-fbm.frag"
}, {
  "revision": "65cb9d40dd982c949b888d7a648dfc5a",
  "url": "13/1d-fbm.png"
}, {
  "revision": "2b2dd7d8a07129e9cb626fd70ce79583",
  "url": "13/2d-fbm.frag"
}, {
  "revision": "ba8c82a0eece63b15c334843df71a638",
  "url": "13/2d-fbm.png"
}, {
  "revision": "dbadf735184b91c0ed0c173e88cef2ff",
  "url": "13/clouds.frag"
}, {
  "revision": "b360fcac45d3f4ea21f73718ea994cdd",
  "url": "13/clouds.png"
}, {
  "revision": "3672d6475aeed90c4ead590958bf67d4",
  "url": "13/holdsworth.jpg"
}, {
  "revision": "ca805a3db28a4c476104cde3fd8a0de4",
  "url": "13/noise.frag"
}, {
  "revision": "803ecca9eb9c1787bf8710227cf0d0cf",
  "url": "13/noise.png"
}, {
  "revision": "6c8700e71c16f455cf1d3a1c26343cd9",
  "url": "13/quiles.jpg"
}, {
  "revision": "1a4872349efec5487e0020e0686d7051",
  "url": "13/rangel.jpg"
}, {
  "revision": "268f8ac877442190552f85bf3bdc434f",
  "url": "13/ridge-long.png"
}, {
  "revision": "06e8273490beff19ccece9c63c5c15d7",
  "url": "13/ridge.frag"
}, {
  "revision": "2671fa85d77aa7a8c1f8157311ff13bc",
  "url": "13/ridge.png"
}, {
  "revision": "f422e5e68c3b3fc266ae5ff82adc6a50",
  "url": "13/turbulence-long.png"
}, {
  "revision": "cd43ae5b4fb33652bac241e58c757e8b",
  "url": "13/turbulence.frag"
}, {
  "revision": "8f1bd1b071ebe0d24561ed9c7a947ed8",
  "url": "13/turbulence.png"
}, {
  "revision": "27a4c30d4c5f2cd86441abf6c6ddf15d",
  "url": "15/01.jpg"
}, {
  "revision": "0e0b104549dd2aa459e5436715ed0ab7",
  "url": "15/02.jpg"
}, {
  "revision": "cf8af66912ea9f5b3c81166fe987fa74",
  "url": "15/03.jpg"
}, {
  "revision": "6e9f375f3824e21ea318e70447656898",
  "url": "15/04.jpg"
}, {
  "revision": "e10be06d3e07f96feb86c6cc83a00ca9",
  "url": "15/hokusai.jpg"
}, {
  "revision": "47963265a25fef13d709fbe1ada304ef",
  "url": "15/muybridge.jpg"
}, {
  "revision": "1fd1a4af21523751d9d8c65d0acf7062",
  "url": "15/nicephore.jpg"
}, {
  "revision": "ae884ace15e837005eb9d6bbd76ec005",
  "url": "15/Prokudin-Gorskii-00.jpg"
}, {
  "revision": "ce2dd255c04485657021d468c727bb71",
  "url": "15/Prokudin-Gorskii-01.jpg"
}, {
  "revision": "e1951d1e436b97285ac573fb5bbfbd9c",
  "url": "15/Prokudin-Gorskii-02.jpg"
}, {
  "revision": "d0361fb6adb6179dbb74262e90a7dcac",
  "url": "15/Prokudin-Gorskii-03.jpg"
}, {
  "revision": "b63be0d21fe3b6997129b838826fb5a8",
  "url": "15/Prokudin-Gorskii-04.jpg"
}, {
  "revision": "f25bf422715fd8668ab695ef31582c1e",
  "url": "15/Prokudin-Gorskii-05.jpg"
}, {
  "revision": "b5ff44ebda7c5ce76dbebbc51a149161",
  "url": "15/Prokudin-Gorskii-06.jpg"
}, {
  "revision": "bd11db064fe3e889e1cd15c7e2a438e3",
  "url": "15/Prokudin-Gorskii-07.jpg"
}, {
  "revision": "8f89b6cf2e283a2f9a11592ac423d515",
  "url": "15/Prokudin-Gorskii-08.jpg"
}, {
  "revision": "469292d69e34d0746128673c51954314",
  "url": "15/Prokudin-Gorskii-09.jpg"
}, {
  "revision": "ff86a3d99f5b5e4235ebc9fb1fb23064",
  "url": "15/texture-kaleidoscope.frag"
}, {
  "revision": "586c7fa87620049a52ec2583cee16090",
  "url": "15/texture-kaleidoscope.png"
}, {
  "revision": "2b4315390a56b361efe4fb71affd6d33",
  "url": "15/texture-noise.frag"
}, {
  "revision": "586c7fa87620049a52ec2583cee16090",
  "url": "15/texture-noise.png"
}, {
  "revision": "0b8a4ab38fe3c5da178c23b58fef978c",
  "url": "15/texture-resolution.frag"
}, {
  "revision": "586c7fa87620049a52ec2583cee16090",
  "url": "15/texture-resolution.png"
}, {
  "revision": "8bacf6a0adc0cd9e110d28c4afcc0392",
  "url": "15/texture-sprite.frag"
}, {
  "revision": "586c7fa87620049a52ec2583cee16090",
  "url": "15/texture-sprite.png"
}, {
  "revision": "0bdb9b40991048e1abcc0c4bc541e851",
  "url": "15/texture-stereo-00.jpg"
}, {
  "revision": "930a6ce52ed33408e1e7f15cbf6f4b29",
  "url": "15/texture-stereo-01.jpg"
}, {
  "revision": "4995ed715979f3d0421107783ed671ef",
  "url": "15/texture-stereo-02.jpg"
}, {
  "revision": "a0eea8a69efdfe0d059fad232b82eeb0",
  "url": "15/texture-stereo-03.jpg"
}, {
  "revision": "531fbca5695cd7690832812b0b610750",
  "url": "15/texture-stereo-04.jpg"
}, {
  "revision": "e718e7bdb3f55bd393dee4009eb9f3cc",
  "url": "15/texture-stereo-05.jpg"
}, {
  "revision": "ebbd4fa0bea2291733568db8d319cb68",
  "url": "15/texture-stereo-06.jpg"
}, {
  "revision": "8967efdf96e6e88402d69f7f218db080",
  "url": "15/texture-stereo.frag"
}, {
  "revision": "586c7fa87620049a52ec2583cee16090",
  "url": "15/texture-stereo.png"
}, {
  "revision": "ff8793b80a5794020dbead2cc644eee9",
  "url": "15/texture.frag"
}, {
  "revision": "586c7fa87620049a52ec2583cee16090",
  "url": "15/texture.png"
}, {
  "revision": "b9708d49b089b00798c7b8193d88a9ed",
  "url": "16/00.jpg"
}, {
  "revision": "2b6df59c1ea8daac1f6af0bd65379018",
  "url": "16/01.jpg"
}, {
  "revision": "02659389e0a0b5c50b1a82ffaccb8a65",
  "url": "16/02.jpg"
}, {
  "revision": "4fdd9c105e13e467ebb6df507690aa6c",
  "url": "16/03.jpg"
}, {
  "revision": "e306ba28d7104b37f70349447677f7c7",
  "url": "16/04.jpg"
}, {
  "revision": "3e8cf4a6c0d0c27fc8ea111fe476a291",
  "url": "16/05.jpg"
}, {
  "revision": "e1a2bbc90800213ea25ec7b221373f96",
  "url": "16/add.frag"
}, {
  "revision": "586c7fa87620049a52ec2583cee16090",
  "url": "16/add.png"
}, {
  "revision": "ee2555dcb698e066e9e1600ef595ba02",
  "url": "16/blend.frag"
}, {
  "revision": "586c7fa87620049a52ec2583cee16090",
  "url": "16/blend.png"
}, {
  "revision": "ac517a05ad97c18009ed9946cde990aa",
  "url": "16/diff.frag"
}, {
  "revision": "586c7fa87620049a52ec2583cee16090",
  "url": "16/diff.png"
}, {
  "revision": "d9db364aa4a9a779b0d6540b13627867",
  "url": "16/div.frag"
}, {
  "revision": "586c7fa87620049a52ec2583cee16090",
  "url": "16/div.png"
}, {
  "revision": "1e5df4fa1fa9b0667b6be543314ed45f",
  "url": "16/inv.frag"
}, {
  "revision": "586c7fa87620049a52ec2583cee16090",
  "url": "16/inv.png"
}, {
  "revision": "27aa01ebc3cd2fc6bf2d48a855580b56",
  "url": "16/mult.frag"
}, {
  "revision": "586c7fa87620049a52ec2583cee16090",
  "url": "16/mult.png"
}, {
  "revision": "f3891953ba48f2f0e53c48afbe3fd95a",
  "url": "16/operations.frag"
}, {
  "revision": "586c7fa87620049a52ec2583cee16090",
  "url": "16/operations.png"
}, {
  "revision": "27aa01ebc3cd2fc6bf2d48a855580b56",
  "url": "16/sub.frag"
}, {
  "revision": "586c7fa87620049a52ec2583cee16090",
  "url": "16/sub.png"
}, {
  "revision": "a2df559edc26e9eee5ed80061fa01eac",
  "url": "18/grain.frag"
}, {
  "revision": "586c7fa87620049a52ec2583cee16090",
  "url": "18/grain.png"
}, {
  "revision": "ed5c929a3d644e9b0e28aea9ace81249",
  "url": "18/hatch.frag"
}, {
  "revision": "a65f69fbb899fcf5327899e27cf8d37e",
  "url": "18/hatch.png"
}, {
  "revision": "e10be06d3e07f96feb86c6cc83a00ca9",
  "url": "18/hokusai.jpg"
}, {
  "revision": "feb59af36936936cc832d005fcce1bb9",
  "url": "18/lut-0000.png"
}, {
  "revision": "7f52e2843fad8feae7e581cc90d7cf26",
  "url": "18/lut-0001.png"
}, {
  "revision": "9920c33db81f0a35a277d0a763771536",
  "url": "18/lut-0002.png"
}, {
  "revision": "a0e2924af93f2ce62b3a49fb31e775e9",
  "url": "18/lut-0003.png"
}, {
  "revision": "c89e5c3c6c8ae2e6d3b3517614b1d90d",
  "url": "18/lut-0004.png"
}, {
  "revision": "2c981a17415a7f5edec7034383b184b5",
  "url": "18/lut-0005.png"
}, {
  "revision": "3bacc092f884d369559382194cd67d8f",
  "url": "18/lut-0006.png"
}, {
  "revision": "3b87aa37936d9ea2a1664f1b5be6e867",
  "url": "18/lut-0007.png"
}, {
  "revision": "e993ca0a5aa90e9fa2056eba32a326c7",
  "url": "18/lut-0008.png"
}, {
  "revision": "1a309da3eb437eec03dc190162cdc407",
  "url": "18/lut-0009.png"
}, {
  "revision": "42b22271ab8402558c390ea94bfed53b",
  "url": "18/lut-0010.png"
}, {
  "revision": "d47342902ba1d1dfdc36a21a2c3f4fbc",
  "url": "18/lut-0011.png"
}, {
  "revision": "ae6231f16a2590c16b882fd2a0c2e1d9",
  "url": "18/lut-0012.png"
}, {
  "revision": "ecfdf3d424795ae0fcd8900ae13940f3",
  "url": "18/lut-0013.png"
}, {
  "revision": "50ed53dff943c82d07958f864ae92b8c",
  "url": "18/lut-plain.frag"
}, {
  "revision": "a7caf04cd0aa7b46ba9346a628735963",
  "url": "18/lut-plain.png"
}, {
  "revision": "3ac0de45ef3547be80e8d4d61cbda34c",
  "url": "18/lut.frag"
}, {
  "revision": "586c7fa87620049a52ec2583cee16090",
  "url": "18/lut.png"
}, {
  "revision": "4a51d2e113b0bedaf3af583a184fdf35",
  "url": "appendix/04/strong_type.jpg"
}, {
  "revision": "75635438c42de104f097321f84dbbd40",
  "url": "appendix/04/vector.jpg"
}, {
  "revision": "bf6c14925e66edb1526b6c9489b3c042",
  "url": "css/github.css"
}, {
  "revision": "e10b985f11be01a7e447a1f801055446",
  "url": "css/style-ch.css"
}, {
  "revision": "88aaf868b203111dc4f250c57cd8f2aa",
  "url": "css/style-jp.css"
}, {
  "revision": "ce095c53c74db756db3f96a62889d4c1",
  "url": "css/style.css"
}, {
  "revision": "d9f9574b0d1cfd816316535bbc8cca85",
  "url": "docker-compose.yml"
}, {
  "revision": "7f3f48b0d7f33b36369290cbdd4b1ab4",
  "url": "favicon.gif"
}, {
  "revision": "de6a22265428e92c815650805051b023",
  "url": "favicon.png"
}, {
  "revision": "012cf6a10129e2275d79d6adac7f3b02",
  "url": "fonts/MaterialIcons-Regular.woff"
}, {
  "revision": "570eb83859dc23dd0eec423a49e147fe",
  "url": "fonts/MaterialIcons-Regular.woff2"
}, {
  "revision": "a1260fc23f929cc5109bf721e192655a",
  "url": "graph.html"
}, {
  "revision": "bf59863a29817339bb6254857420aa62",
  "url": "service-worker.build.js"
}, {
  "revision": "583a75deb303ae3270b593cb48530975",
  "url": "src/glslCanvas/build/GlslCanvas.js"
}, {
  "revision": "a06505b09f7dd95b3d70e71594e03e54",
  "url": "src/glslCanvas/build/GlslCanvas.min.js"
}, {
  "revision": "14ab975bb08682f0e38eb5654bab6708",
  "url": "src/glslCanvas/data/logo.jpg"
}, {
  "revision": "1167b1072f06b316eb825b96502916b3",
  "url": "src/glslCanvas/data/moon.jpg"
}, {
  "revision": "fe9b1ceb99d1bcaf415dd7fdd605d21a",
  "url": "src/glslEditor/build/glslEditor.css"
}, {
  "revision": "7e3364596f3e78230a653ebfb58bd1fe",
  "url": "src/glslEditor/build/glslEditor.js"
}, {
  "revision": "de28f8dc1494997dfae7c5e3d7e7d55b",
  "url": "src/glslEditor/build/glslEditor.min.js"
}, {
  "revision": "57c243f84d68d5ef3a885ec74664b184",
  "url": "src/glslGallery/build/glslGallery.css"
}, {
  "revision": "d70cc691cfa236ba21dcc2691059070d",
  "url": "src/glslGallery/build/glslGallery.js"
}, {
  "revision": "b2b8d5f83423e2954b146b4c891d0654",
  "url": "src/highlight.min.js"
}, {
  "revision": "46438811d0e87fc6c287b4152a2adf96",
  "url": "src/main.js"
}, {
  "revision": "0ed02aa5fd36ff498dbb5912091e95b6",
  "url": "src/moon/moon.frag"
}, {
  "revision": "c707424c90991c82c8da9090dd83136f",
  "url": "src/moon/moon.jpg"
}, {
  "revision": "332597e2e723a325f8e6e2758a6ff543",
  "url": "thumb.jpg"
}, {
  "revision": "f7bf5dfd2bb5214e3b118498e8468d35",
  "url": "thumb.png"
}, {
  "revision": "c222c4f9e80fbe2aa59f8cc3b8fadf8f",
  "url": "src/glslEditor/build/glslEditor.css.map"
}, {
  "revision": "70847d47308a964d9a6084b3fe7c37af",
  "url": "src/glslGallery/build/glslGallery.css.map"
}, {
  "revision": "d0c96f95194e0971fc66fdb8ef2ef96f",
  "url": "/"
}, {
  "revision": "d5a172b92a91529d6b724fe974b8a0ff",
  "url": "edit.php"
}, {
  "revision": "6640e44b25930740757173cd3880711f",
  "url": "glossary/"
}, {
  "revision": "3d9579b559f05bbd94e35ce6315c3bb1",
  "url": "appendix/"
}, {
  "revision": "692ad4409b6b8911970318400b092ae1",
  "url": "/00/"
}, {
  "revision": "2b27bc340fd8626f5ade686319751de1",
  "url": "/00/?lan=id"
}, {
  "revision": "57f80ee26f01f7d17a5170b545064768",
  "url": "/00/?lan=vi"
}, {
  "revision": "afefef830960b731cc57d23f702f0541",
  "url": "/00/?lan=jp"
}, {
  "revision": "9844de1f77a8ea2e173b17ad90975742",
  "url": "/00/?lan=ch"
}, {
  "revision": "789a4ed267597f32ad9a0c1f4607540a",
  "url": "/00/?lan=kr"
}, {
  "revision": "7cc9137510156c186a3752f9aa299671",
  "url": "/00/?lan=es"
}, {
  "revision": "2392428f517aad70adcdf45d15a71044",
  "url": "/00/?lan=pt"
}, {
  "revision": "8b27b5acda06313e7e418c8e21cd3246",
  "url": "/00/?lan=fr"
}, {
  "revision": "f2e8ee1bc051f4d96d63e71ae2fa6f37",
  "url": "/00/?lan=it"
}, {
  "revision": "3e2cc8a9d2e917960346ac6b7a84f29c",
  "url": "/00/?lan=de"
}, {
  "revision": "20dd44b932a9d9dd211ca102e538193a",
  "url": "/00/?lan=ru"
}, {
  "revision": "8d559750ecc139f3fa7590650e332674",
  "url": "/00/?lan=pl"
}, {
  "revision": "7e8d407e7e45a62eea05a44957d0d854",
  "url": "/01/"
}, {
  "revision": "0249198b7eed28ba401c748114bb1574",
  "url": "/01/?lan=id"
}, {
  "revision": "d4c077d757bfec30f4511c5ce96e7745",
  "url": "/01/?lan=vi"
}, {
  "revision": "3fb8ea56638f84c8b21f930ef3fe4141",
  "url": "/01/?lan=jp"
}, {
  "revision": "65c4f1aab1d2a2bf6b935530c85eef4a",
  "url": "/01/?lan=ch"
}, {
  "revision": "674ea6611495abc86c55b8725d46c181",
  "url": "/01/?lan=kr"
}, {
  "revision": "21a2372f190a25fd41f804e747527dd2",
  "url": "/01/?lan=es"
}, {
  "revision": "cdb2154cbf74d4c832d7c4da3581c198",
  "url": "/01/?lan=pt"
}, {
  "revision": "1308a7680227a82602d59ba1b9a647a8",
  "url": "/01/?lan=fr"
}, {
  "revision": "02bd0af4374e0c43245073f442584ee5",
  "url": "/01/?lan=it"
}, {
  "revision": "02da945ced33d9000f461f3ce2e8424a",
  "url": "/01/?lan=de"
}, {
  "revision": "3c917314c02ec27762e76073b5e0fcaa",
  "url": "/01/?lan=ru"
}, {
  "revision": "9977e4656d51a20b7713a56d2a73114d",
  "url": "/01/?lan=pl"
}, {
  "revision": "3f22d527d363f4db6ad81729cda08b09",
  "url": "/02/"
}, {
  "revision": "9de57f935072f306f545ece152af7368",
  "url": "/02/?lan=id"
}, {
  "revision": "d3dd7aebcce6c1f5bc1ad3d2c05ba70b",
  "url": "/02/?lan=vi"
}, {
  "revision": "90fa85b8cb555ccdfc80edfd7ce46f93",
  "url": "/02/?lan=jp"
}, {
  "revision": "c03aa701b4b33a924763f272360c4329",
  "url": "/02/?lan=ch"
}, {
  "revision": "57e295c58bdc7823f0f88d8965c69f2d",
  "url": "/02/?lan=kr"
}, {
  "revision": "6aad54e4a7aa3640d3a56eb13b669ee5",
  "url": "/02/?lan=es"
}, {
  "revision": "fd681004908344cbf27f4e09c8de5950",
  "url": "/02/?lan=pt"
}, {
  "revision": "cd739b7a473d18e2fe3bdf4835aa2151",
  "url": "/02/?lan=fr"
}, {
  "revision": "1359a9f6951c802a8a5ee98230049b26",
  "url": "/02/?lan=it"
}, {
  "revision": "a29166a2a163c7ff6b95b56303f4dd51",
  "url": "/02/?lan=de"
}, {
  "revision": "aaa1e282ba922cef89799bfb2512a4ef",
  "url": "/02/?lan=ru"
}, {
  "revision": "273537c3020735f1d46ac30639aa8eb9",
  "url": "/02/?lan=pl"
}, {
  "revision": "65d0b27fa88e8416e9e071191a181114",
  "url": "/03/"
}, {
  "revision": "98522be286c6b359c36dec185c356a45",
  "url": "/03/?lan=id"
}, {
  "revision": "e7c8a4f87c1b51a6444ae32d80b60ce0",
  "url": "/03/?lan=vi"
}, {
  "revision": "719024c70ef3cb518134f4831211a681",
  "url": "/03/?lan=jp"
}, {
  "revision": "e1135fd6030cb3c3c3f8ebd4014f6f8a",
  "url": "/03/?lan=ch"
}, {
  "revision": "a3fc001fb49ea7123b7c3f3b40e0cfc5",
  "url": "/03/?lan=kr"
}, {
  "revision": "88e82604229c4bbce5d574c6898c0449",
  "url": "/03/?lan=es"
}, {
  "revision": "308ff982a8b93266cd00f924e61778c2",
  "url": "/03/?lan=pt"
}, {
  "revision": "533853c9a60d398849b4fff92cbefbea",
  "url": "/03/?lan=fr"
}, {
  "revision": "00bc0780a9893092499e8addaa80b8d3",
  "url": "/03/?lan=it"
}, {
  "revision": "06f96413d48a8aea547c3101be52d27b",
  "url": "/03/?lan=de"
}, {
  "revision": "1011691f065a9515e0ee71006809e2d4",
  "url": "/03/?lan=ru"
}, {
  "revision": "dcbebd39e3deae70efa6eba1170859db",
  "url": "/03/?lan=pl"
}, {
  "revision": "1381447ef2636e15e6685c584a9a964b",
  "url": "/04/"
}, {
  "revision": "de2f94b066f0ece802fcd862f7ee5881",
  "url": "/04/?lan=id"
}, {
  "revision": "34875d6fffaba13112f1637b44bee736",
  "url": "/04/?lan=vi"
}, {
  "revision": "931cc76d1ed39efd4a92b8efd1029abb",
  "url": "/04/?lan=jp"
}, {
  "revision": "da6553ea05251ca2278550d743871616",
  "url": "/04/?lan=ch"
}, {
  "revision": "25e80ec49b0200935d4fa7cee8ecdd91",
  "url": "/04/?lan=kr"
}, {
  "revision": "72f73f270d4eb4ee72d4e4308de56632",
  "url": "/04/?lan=es"
}, {
  "revision": "a04ed71e1384b5073e47a5ffb340ae8a",
  "url": "/04/?lan=pt"
}, {
  "revision": "cfd819f2c8e42f23c31ed241d3cd5b0f",
  "url": "/04/?lan=fr"
}, {
  "revision": "13cabc81f3e1505101c3e06c33b05f9f",
  "url": "/04/?lan=it"
}, {
  "revision": "2d371324440b7704b2d0bc5c9bbebe57",
  "url": "/04/?lan=de"
}, {
  "revision": "f19eb92af80d8d1d7b876c10950798c3",
  "url": "/04/?lan=ru"
}, {
  "revision": "6ba81e1787f84fc202c076d1ca06ab76",
  "url": "/04/?lan=pl"
}, {
  "revision": "e188a616b051facce8ab081721f7a953",
  "url": "/05/"
}, {
  "revision": "120a74dfba86dd011efedf093a85aa37",
  "url": "/05/?lan=id"
}, {
  "revision": "0b30a4a7511f26ed70e4d5157f3a2c5f",
  "url": "/05/?lan=vi"
}, {
  "revision": "c9aaeb430600e4f344f3805425d9032c",
  "url": "/05/?lan=jp"
}, {
  "revision": "ef3f6f3105dd9f35455011862eb01872",
  "url": "/05/?lan=ch"
}, {
  "revision": "3a3eb5c80de7f67b14efce194be9b36c",
  "url": "/05/?lan=kr"
}, {
  "revision": "86b85bd9c6a75a059be594f33f1888ce",
  "url": "/05/?lan=es"
}, {
  "revision": "ebb8bda2350749814613c4d3d9004d40",
  "url": "/05/?lan=pt"
}, {
  "revision": "dc0a2a5b24f0531a7ad687ea82924b87",
  "url": "/05/?lan=fr"
}, {
  "revision": "8a15265d451767fa640321855a49ab22",
  "url": "/05/?lan=it"
}, {
  "revision": "341da74e9a56008ab298d5d3abcc8386",
  "url": "/05/?lan=de"
}, {
  "revision": "1fc6076e754e8fd584f8cb5eb9b8d53a",
  "url": "/05/?lan=ru"
}, {
  "revision": "e5c467347e091649e9c18102cf061a39",
  "url": "/05/?lan=pl"
}, {
  "revision": "4f4988246a6092a3fd038742e39a5ba5",
  "url": "/06/"
}, {
  "revision": "e74de4481a54a9df5764a82cc74fdfba",
  "url": "/06/?lan=id"
}, {
  "revision": "b932ad1999d5b0292ee241faf4770442",
  "url": "/06/?lan=vi"
}, {
  "revision": "5ae84e3a1f1389420c4092fd3320ddb3",
  "url": "/06/?lan=jp"
}, {
  "revision": "caddc9a5a69ad9ff49ae9d83f7bf697d",
  "url": "/06/?lan=ch"
}, {
  "revision": "d85e0deefeae18e1f9eecacb7c414552",
  "url": "/06/?lan=kr"
}, {
  "revision": "d5960de5932309079cad9b649821b520",
  "url": "/06/?lan=es"
}, {
  "revision": "f27922f3cb52df4c6f5ee4319879d1f2",
  "url": "/06/?lan=pt"
}, {
  "revision": "b7c10664155cbf420d79e58a536e0726",
  "url": "/06/?lan=fr"
}, {
  "revision": "4a4e7e9b346229b8657f0797717e7a85",
  "url": "/06/?lan=it"
}, {
  "revision": "b7420662520de2dd4b647562e4e8b314",
  "url": "/06/?lan=de"
}, {
  "revision": "7719ad4c82536f36e2251d2d2fb9bce9",
  "url": "/06/?lan=ru"
}, {
  "revision": "d656f0357515b455e7bc1918c37913b8",
  "url": "/06/?lan=pl"
}, {
  "revision": "834a636f4212294b56f3e8d48e62c9ad",
  "url": "/07/"
}, {
  "revision": "b4e37d94f6b38f735241a54775f6cf3f",
  "url": "/07/?lan=id"
}, {
  "revision": "369e38e8bc9cfd7155f2e78c38ab0a9d",
  "url": "/07/?lan=vi"
}, {
  "revision": "30708ec7fca559f05658e671d49475fb",
  "url": "/07/?lan=jp"
}, {
  "revision": "ead815794614076784308ae9b5f61843",
  "url": "/07/?lan=ch"
}, {
  "revision": "44690d2a73513316eab386891706588e",
  "url": "/07/?lan=kr"
}, {
  "revision": "98674dc2d70f52b1bcc27571766db7ce",
  "url": "/07/?lan=es"
}, {
  "revision": "7b05c2621d5ba25590e9d02698b6aad8",
  "url": "/07/?lan=pt"
}, {
  "revision": "68cdba48ef32041f6334b34d13431e6b",
  "url": "/07/?lan=fr"
}, {
  "revision": "691c0095bf68d7b119f7ecbec287f742",
  "url": "/07/?lan=it"
}, {
  "revision": "e6ee90445f02740c8a4eb4aff9a288e2",
  "url": "/07/?lan=de"
}, {
  "revision": "e5acdf4cb7d2432abf4b18b3dee769e5",
  "url": "/07/?lan=ru"
}, {
  "revision": "fec2bee0d7ab9f71b9b31224c0bf222b",
  "url": "/07/?lan=pl"
}, {
  "revision": "a3b17071862163615d1d26914c46921a",
  "url": "/08/"
}, {
  "revision": "bff09c407d694a4d4e330464f2f7a709",
  "url": "/08/?lan=id"
}, {
  "revision": "3d14167ba26fe0c5e81046ebb10244d2",
  "url": "/08/?lan=vi"
}, {
  "revision": "8b94f61c7f39cba28de0e3cc121750a8",
  "url": "/08/?lan=jp"
}, {
  "revision": "4f44a65d7a5848017d86d9268dd50b35",
  "url": "/08/?lan=ch"
}, {
  "revision": "f52a76f18e85937dbcd9e9686721ba95",
  "url": "/08/?lan=kr"
}, {
  "revision": "4170da59409efceaa84312ec3880751c",
  "url": "/08/?lan=es"
}, {
  "revision": "ed40fd07081d57fd3a37ba3a9b61ea5b",
  "url": "/08/?lan=pt"
}, {
  "revision": "1559574c922562fa5f1669332645be82",
  "url": "/08/?lan=fr"
}, {
  "revision": "67dd9e7c0c10e1df1fdd416f1c8a2b9e",
  "url": "/08/?lan=it"
}, {
  "revision": "474d4a143739e446f901871bb9c0bc55",
  "url": "/08/?lan=de"
}, {
  "revision": "9343a4f74f4b25f764f3186f8ae6da1d",
  "url": "/08/?lan=ru"
}, {
  "revision": "ff71684fd31d15606e7917d515cfa631",
  "url": "/08/?lan=pl"
}, {
  "revision": "396f8a9a69b4cfaef305aa2e948cbcf9",
  "url": "/09/"
}, {
  "revision": "074360d46fdcfd76de489321515654b6",
  "url": "/09/?lan=id"
}, {
  "revision": "39e811a7c48f041891afb1ad4cf1f6f7",
  "url": "/09/?lan=vi"
}, {
  "revision": "c5a4f8fc1f28221b31c554a425e3b4e4",
  "url": "/09/?lan=jp"
}, {
  "revision": "aa866b0f4bfedc17cfd14d5634403714",
  "url": "/09/?lan=ch"
}, {
  "revision": "dd41195756d4f9e973849cbc6099189b",
  "url": "/09/?lan=kr"
}, {
  "revision": "813fb35461f03a33bb386ba59ce8cf08",
  "url": "/09/?lan=es"
}, {
  "revision": "01f0bf0a8ee76fbab9713790031cace3",
  "url": "/09/?lan=pt"
}, {
  "revision": "61cfcd997877cd525119a940a0796150",
  "url": "/09/?lan=fr"
}, {
  "revision": "3cb689a026c9920a0765717ec0d37844",
  "url": "/09/?lan=it"
}, {
  "revision": "896303757a672a6b64a626c1088a6f8e",
  "url": "/09/?lan=de"
}, {
  "revision": "2f01c448094fdb090958fe381725e871",
  "url": "/09/?lan=ru"
}, {
  "revision": "6264edf135f07fae1caec4ae74e74cae",
  "url": "/09/?lan=pl"
}, {
  "revision": "2d6c09e66ae85a18bf39450a7ac943fc",
  "url": "/10/"
}, {
  "revision": "9f8570d23aec186dcdcd5a8ff5f0dbae",
  "url": "/10/?lan=id"
}, {
  "revision": "3f72fc02e405a9cd8acf23ea369f29ba",
  "url": "/10/?lan=vi"
}, {
  "revision": "cc2d21782c098849d9d01cab1ac3add2",
  "url": "/10/?lan=jp"
}, {
  "revision": "139819e0ee3749b809c349f82c0c8818",
  "url": "/10/?lan=ch"
}, {
  "revision": "e80190f55c0f88edabf00b143b637d56",
  "url": "/10/?lan=kr"
}, {
  "revision": "b4f8f86e4b41bb27cff938a578efee4b",
  "url": "/10/?lan=es"
}, {
  "revision": "308e7df0f9d73dcf07568aa42d706bd3",
  "url": "/10/?lan=pt"
}, {
  "revision": "d9ed6ffbf1b0ad763bf1fd0c5ce34c5b",
  "url": "/10/?lan=fr"
}, {
  "revision": "f6653e81573ae78304d548e19fe44966",
  "url": "/10/?lan=it"
}, {
  "revision": "96c48f73e5e6eae40468a6ad28c5aeb7",
  "url": "/10/?lan=de"
}, {
  "revision": "f09aba328f7fec1eb53b6d3a956b791e",
  "url": "/10/?lan=ru"
}, {
  "revision": "16daa8ea4c20f403e66e5cfaded22b99",
  "url": "/10/?lan=pl"
}, {
  "revision": "0680247acce8ddbf3c75eba31356d181",
  "url": "/11/"
}, {
  "revision": "9bc0267f3566fc21906953579d83e27c",
  "url": "/11/?lan=id"
}, {
  "revision": "1975cd543022661e8da532e4444c4e7a",
  "url": "/11/?lan=vi"
}, {
  "revision": "ea8c6b0054f277a5ad99d58cf019fb18",
  "url": "/11/?lan=jp"
}, {
  "revision": "84ce245c221f3a87cad52e3be325417b",
  "url": "/11/?lan=ch"
}, {
  "revision": "61747a2bdb0f2b87eca5b5cfd7d77a74",
  "url": "/11/?lan=kr"
}, {
  "revision": "731c3dab47c569cc2c165a8f1c0e4b07",
  "url": "/11/?lan=es"
}, {
  "revision": "c7a5fee17f00beabc91022edddb78264",
  "url": "/11/?lan=pt"
}, {
  "revision": "c89501637a299d0ed53889ec58d16533",
  "url": "/11/?lan=fr"
}, {
  "revision": "70f285a7723da72ed70385eb96894674",
  "url": "/11/?lan=it"
}, {
  "revision": "08b2b34cdeee1cbafc02abd184a96276",
  "url": "/11/?lan=de"
}, {
  "revision": "466005360e65fa923907a2394fd2d287",
  "url": "/11/?lan=ru"
}, {
  "revision": "f4165483d057d0c57b1c36b75b67691d",
  "url": "/11/?lan=pl"
}, {
  "revision": "87024be55947adf1c98d9a58b2658d4b",
  "url": "/12/"
}, {
  "revision": "1decfa026b5559d8f1f96b2ee613a3b2",
  "url": "/12/?lan=id"
}, {
  "revision": "cae7e6f8838ad422ea3c9e63e31ecbb1",
  "url": "/12/?lan=vi"
}, {
  "revision": "941df888fcf7ecaf3626d9504e8b777a",
  "url": "/12/?lan=jp"
}, {
  "revision": "886117a5689d12307c7d6ef493beaa5c",
  "url": "/12/?lan=ch"
}, {
  "revision": "d7f8e33d1b877f66baaddfa6bcb35da1",
  "url": "/12/?lan=kr"
}, {
  "revision": "d7f8e33d1b877f66baaddfa6bcb35da1",
  "url": "/12/?lan=es"
}, {
  "revision": "1a35c892553732c8dbb717e9bcf863fe",
  "url": "/12/?lan=pt"
}, {
  "revision": "1ad782851d513bfd748fc45dd7ae1519",
  "url": "/12/?lan=fr"
}, {
  "revision": "d7f8e33d1b877f66baaddfa6bcb35da1",
  "url": "/12/?lan=it"
}, {
  "revision": "6bc0b31f2b6e3f49c6f59ad9051172fb",
  "url": "/12/?lan=de"
}, {
  "revision": "2543aca6d8315f1408cbd95a607ead81",
  "url": "/12/?lan=ru"
}, {
  "revision": "375d4de6ee26e232a6c8e0a986cacc70",
  "url": "/12/?lan=pl"
}, {
  "revision": "a0a5649e3acb3e9354e0012246363a6a",
  "url": "/13/"
}, {
  "revision": "a3f70c4b5dda951e6e9e20b195529c1a",
  "url": "/13/?lan=id"
}, {
  "revision": "fff741282783508d86f2a79301510ade",
  "url": "/13/?lan=vi"
}, {
  "revision": "abcb5c5bb7155ecc981ced2fc9e31602",
  "url": "/13/?lan=jp"
}, {
  "revision": "21fa1c82a65d5feb939352c1166042ea",
  "url": "/13/?lan=ch"
}, {
  "revision": "6096a10dcdbf511420e0030f343abb51",
  "url": "/13/?lan=kr"
}, {
  "revision": "6096a10dcdbf511420e0030f343abb51",
  "url": "/13/?lan=es"
}, {
  "revision": "8d3b26febb5aec0424d5f5f3bd4f03a0",
  "url": "/13/?lan=pt"
}, {
  "revision": "1151c30407336555802670eee61b8a9b",
  "url": "/13/?lan=fr"
}, {
  "revision": "6096a10dcdbf511420e0030f343abb51",
  "url": "/13/?lan=it"
}, {
  "revision": "bcc2b0a12e825611b09dceebee729821",
  "url": "/13/?lan=de"
}, {
  "revision": "20aee6f8ce9d96f4016b78edac0a2c10",
  "url": "/13/?lan=ru"
}, {
  "revision": "1676b4fc3969c5f8a4d3bbe9d030742d",
  "url": "/13/?lan=pl"
}, {
  "revision": "cccb2ae5b6af6525c2e970b340b7062e",
  "url": "/14/"
}, {
  "revision": "6d8a2f701567f1d86a2f384da3a10952",
  "url": "/14/?lan=id"
}, {
  "revision": "6d8a2f701567f1d86a2f384da3a10952",
  "url": "/14/?lan=vi"
}, {
  "revision": "6d8a2f701567f1d86a2f384da3a10952",
  "url": "/14/?lan=jp"
}, {
  "revision": "6d8a2f701567f1d86a2f384da3a10952",
  "url": "/14/?lan=ch"
}, {
  "revision": "6d8a2f701567f1d86a2f384da3a10952",
  "url": "/14/?lan=kr"
}, {
  "revision": "6d8a2f701567f1d86a2f384da3a10952",
  "url": "/14/?lan=es"
}, {
  "revision": "3f430280702b957fb54b27e547d671de",
  "url": "/14/?lan=pt"
}, {
  "revision": "6d8a2f701567f1d86a2f384da3a10952",
  "url": "/14/?lan=fr"
}, {
  "revision": "6d8a2f701567f1d86a2f384da3a10952",
  "url": "/14/?lan=it"
}, {
  "revision": "6d8a2f701567f1d86a2f384da3a10952",
  "url": "/14/?lan=de"
}, {
  "revision": "6d8a2f701567f1d86a2f384da3a10952",
  "url": "/14/?lan=ru"
}, {
  "revision": "6d8a2f701567f1d86a2f384da3a10952",
  "url": "/14/?lan=pl"
}, {
  "revision": "4e524a5a28155854fcc54e50e2b2eb12",
  "url": "/15/"
}, {
  "revision": "436cde287c05944bc22e22df7e7b2eb6",
  "url": "/15/?lan=id"
}, {
  "revision": "436cde287c05944bc22e22df7e7b2eb6",
  "url": "/15/?lan=vi"
}, {
  "revision": "436cde287c05944bc22e22df7e7b2eb6",
  "url": "/15/?lan=jp"
}, {
  "revision": "eb2eedf27f931c98b9c5f655833895da",
  "url": "/15/?lan=ch"
}, {
  "revision": "436cde287c05944bc22e22df7e7b2eb6",
  "url": "/15/?lan=kr"
}, {
  "revision": "436cde287c05944bc22e22df7e7b2eb6",
  "url": "/15/?lan=es"
}, {
  "revision": "999ce241d211f034b40a8c9db3323706",
  "url": "/15/?lan=pt"
}, {
  "revision": "436cde287c05944bc22e22df7e7b2eb6",
  "url": "/15/?lan=fr"
}, {
  "revision": "436cde287c05944bc22e22df7e7b2eb6",
  "url": "/15/?lan=it"
}, {
  "revision": "436cde287c05944bc22e22df7e7b2eb6",
  "url": "/15/?lan=de"
}, {
  "revision": "436cde287c05944bc22e22df7e7b2eb6",
  "url": "/15/?lan=ru"
}, {
  "revision": "436cde287c05944bc22e22df7e7b2eb6",
  "url": "/15/?lan=pl"
}, {
  "revision": "191f1545ff905f75fe8f8d450b6096f4",
  "url": "/16/"
}, {
  "revision": "27ac7fdb352e53e38d961daafc71d32f",
  "url": "/16/?lan=id"
}, {
  "revision": "27ac7fdb352e53e38d961daafc71d32f",
  "url": "/16/?lan=vi"
}, {
  "revision": "27ac7fdb352e53e38d961daafc71d32f",
  "url": "/16/?lan=jp"
}, {
  "revision": "27ac7fdb352e53e38d961daafc71d32f",
  "url": "/16/?lan=ch"
}, {
  "revision": "27ac7fdb352e53e38d961daafc71d32f",
  "url": "/16/?lan=kr"
}, {
  "revision": "27ac7fdb352e53e38d961daafc71d32f",
  "url": "/16/?lan=es"
}, {
  "revision": "27ac7fdb352e53e38d961daafc71d32f",
  "url": "/16/?lan=pt"
}, {
  "revision": "27ac7fdb352e53e38d961daafc71d32f",
  "url": "/16/?lan=fr"
}, {
  "revision": "27ac7fdb352e53e38d961daafc71d32f",
  "url": "/16/?lan=it"
}, {
  "revision": "27ac7fdb352e53e38d961daafc71d32f",
  "url": "/16/?lan=de"
}, {
  "revision": "27ac7fdb352e53e38d961daafc71d32f",
  "url": "/16/?lan=ru"
}, {
  "revision": "27ac7fdb352e53e38d961daafc71d32f",
  "url": "/16/?lan=pl"
}, {
  "revision": "b946557240c9db9fce1a3610c4c8d80b",
  "url": "/17/"
}, {
  "revision": "64888efc972d3a6876a8bfc4f0f6da8f",
  "url": "/17/?lan=id"
}, {
  "revision": "64888efc972d3a6876a8bfc4f0f6da8f",
  "url": "/17/?lan=vi"
}, {
  "revision": "64888efc972d3a6876a8bfc4f0f6da8f",
  "url": "/17/?lan=jp"
}, {
  "revision": "64888efc972d3a6876a8bfc4f0f6da8f",
  "url": "/17/?lan=ch"
}, {
  "revision": "64888efc972d3a6876a8bfc4f0f6da8f",
  "url": "/17/?lan=kr"
}, {
  "revision": "64888efc972d3a6876a8bfc4f0f6da8f",
  "url": "/17/?lan=es"
}, {
  "revision": "64888efc972d3a6876a8bfc4f0f6da8f",
  "url": "/17/?lan=pt"
}, {
  "revision": "64888efc972d3a6876a8bfc4f0f6da8f",
  "url": "/17/?lan=fr"
}, {
  "revision": "64888efc972d3a6876a8bfc4f0f6da8f",
  "url": "/17/?lan=it"
}, {
  "revision": "64888efc972d3a6876a8bfc4f0f6da8f",
  "url": "/17/?lan=de"
}, {
  "revision": "64888efc972d3a6876a8bfc4f0f6da8f",
  "url": "/17/?lan=ru"
}, {
  "revision": "64888efc972d3a6876a8bfc4f0f6da8f",
  "url": "/17/?lan=pl"
}, {
  "revision": "d44779c8d6799936c9064d2f84d4c4f8",
  "url": "/18/"
}, {
  "revision": "64888efc972d3a6876a8bfc4f0f6da8f",
  "url": "/18/?lan=id"
}, {
  "revision": "64888efc972d3a6876a8bfc4f0f6da8f",
  "url": "/18/?lan=vi"
}, {
  "revision": "64888efc972d3a6876a8bfc4f0f6da8f",
  "url": "/18/?lan=jp"
}, {
  "revision": "64888efc972d3a6876a8bfc4f0f6da8f",
  "url": "/18/?lan=ch"
}, {
  "revision": "64888efc972d3a6876a8bfc4f0f6da8f",
  "url": "/18/?lan=kr"
}, {
  "revision": "64888efc972d3a6876a8bfc4f0f6da8f",
  "url": "/18/?lan=es"
}, {
  "revision": "64888efc972d3a6876a8bfc4f0f6da8f",
  "url": "/18/?lan=pt"
}, {
  "revision": "64888efc972d3a6876a8bfc4f0f6da8f",
  "url": "/18/?lan=fr"
}, {
  "revision": "64888efc972d3a6876a8bfc4f0f6da8f",
  "url": "/18/?lan=it"
}, {
  "revision": "64888efc972d3a6876a8bfc4f0f6da8f",
  "url": "/18/?lan=de"
}, {
  "revision": "64888efc972d3a6876a8bfc4f0f6da8f",
  "url": "/18/?lan=ru"
}, {
  "revision": "64888efc972d3a6876a8bfc4f0f6da8f",
  "url": "/18/?lan=pl"
}, {
  "revision": "3245525f5a1ed2c34cf7b9466d15aae2",
  "url": "/glossary/?search=GL_ES"
}, {
  "revision": "f11631ebd4a0ff5060da2bcf4e2036fc",
  "url": "/glossary/?search=GL_ES&lan=vi"
}, {
  "revision": "ab4f4e842e6aedc66505c9c72b2f22b1",
  "url": "/glossary/?search=abs"
}, {
  "revision": "734b8a2fcb632d5fd74741504c62b608",
  "url": "/glossary/?search=abs&lan=vi"
}, {
  "revision": "b7e3d2949b4da8fdd3079abb6de8ec75",
  "url": "/glossary/?search=acos"
}, {
  "revision": "84722a2de0e6f1eaceb5ab7f95d912d1",
  "url": "/glossary/?search=acos&lan=vi"
}, {
  "revision": "fad8042fe53811a9c2a82db0b735fd44",
  "url": "/glossary/?search=all"
}, {
  "revision": "5039586c04db42eba28b83c4f037c34a",
  "url": "/glossary/?search=all&lan=vi"
}, {
  "revision": "e420e09e60ddee691d3516f81105c090",
  "url": "/glossary/?search=any"
}, {
  "revision": "b78462b6512a3896c328d860a38645f3",
  "url": "/glossary/?search=any&lan=vi"
}, {
  "revision": "58164ed0bd7808d80d9b6ef031e17fbe",
  "url": "/glossary/?search=asin"
}, {
  "revision": "a14d0297a23c1420cd287e8ccc186203",
  "url": "/glossary/?search=asin&lan=vi"
}, {
  "revision": "bbe139dcf2da2ff9a31720780a13ecae",
  "url": "/glossary/?search=atan"
}, {
  "revision": "5808483fd0b506f782cd4438d6f75652",
  "url": "/glossary/?search=atan&lan=vi"
}, {
  "revision": "883ffd2637bcdcbdfc95837f96fae69d",
  "url": "/glossary/?search=attribute"
}, {
  "revision": "81b9c6abcb4f0741369f6fcc77e0616b",
  "url": "/glossary/?search=attribute&lan=vi"
}, {
  "revision": "a4e95fdb785cd7bd8ff60f968b882419",
  "url": "/glossary/?search=bool"
}, {
  "revision": "3a97528159727f2c27dbf99222087faa",
  "url": "/glossary/?search=bool&lan=vi"
}, {
  "revision": "70ac6c52e688984a94f5014f7db9fbc4",
  "url": "/glossary/?search=bvec2"
}, {
  "revision": "f0758532ac1798789b695e7f7a67f9cc",
  "url": "/glossary/?search=bvec2&lan=vi"
}, {
  "revision": "83d1fc6c1f766ebcba37ab0d5d3b7453",
  "url": "/glossary/?search=bvec3"
}, {
  "revision": "3ab85ed51c18008d52a77a727f544919",
  "url": "/glossary/?search=bvec3&lan=vi"
}, {
  "revision": "e93c2319e6e942aee3bf9bd956911e3e",
  "url": "/glossary/?search=bvec4"
}, {
  "revision": "fa89a6e05865a85188f2adf884cda722",
  "url": "/glossary/?search=bvec4&lan=vi"
}, {
  "revision": "82176920364febdf371711e3e1557045",
  "url": "/glossary/?search=ceil"
}, {
  "revision": "a3c8ee128379edcc7003f01e4f4e2ca4",
  "url": "/glossary/?search=ceil&lan=vi"
}, {
  "revision": "711cd969d1d2fa24d1df872cb1bfd8f2",
  "url": "/glossary/?search=clamp"
}, {
  "revision": "6cfb6125fa021a14d5ec2e0be2ca5dd0",
  "url": "/glossary/?search=clamp&lan=vi"
}, {
  "revision": "fa630d931ebc79918a2aaad6e3db0b72",
  "url": "/glossary/?search=const"
}, {
  "revision": "a150f38482086f294ebc9884acee508a",
  "url": "/glossary/?search=const&lan=vi"
}, {
  "revision": "4e70f2d8fab7ce6415870ccf852a707d",
  "url": "/glossary/?search=cos"
}, {
  "revision": "d552605ef318768d16bf69bcbc42703d",
  "url": "/glossary/?search=cos&lan=vi"
}, {
  "revision": "becce88b13852f496afce907d4a87ff8",
  "url": "/glossary/?search=cross"
}, {
  "revision": "aa16e1d58c39353ea4c01c918790f24f",
  "url": "/glossary/?search=cross&lan=vi"
}, {
  "revision": "ce2e2f2d9a55dc79bf484430ebdbd6d6",
  "url": "/glossary/?search=dFdx"
}, {
  "revision": "c61c21404d7798cb5ee0e911e51f068a",
  "url": "/glossary/?search=dFdx&lan=vi"
}, {
  "revision": "fb0512bfc949b1dbde827dbd4e1aeb21",
  "url": "/glossary/?search=dFdy"
}, {
  "revision": "a6c9021570a9519a1f21be3f1dddfb8e",
  "url": "/glossary/?search=dFdy&lan=vi"
}, {
  "revision": "89b452adbf5e45e1402ac04a179e9658",
  "url": "/glossary/?search=degrees"
}, {
  "revision": "6b6f86ef487ffb7d7837c703f0d5fc6d",
  "url": "/glossary/?search=degrees&lan=vi"
}, {
  "revision": "4690319ca31b37df24a0dda4439a8834",
  "url": "/glossary/?search=distance"
}, {
  "revision": "078713dc197100aeb178a1eb3412afa7",
  "url": "/glossary/?search=distance&lan=vi"
}, {
  "revision": "b02af60b95e6db51810415275a849c78",
  "url": "/glossary/?search=dot"
}, {
  "revision": "aab9ebfa64e832506f83c525d5110ab4",
  "url": "/glossary/?search=dot&lan=vi"
}, {
  "revision": "c4da85799b2eb544e96e153aa81592db",
  "url": "/glossary/?search=equal"
}, {
  "revision": "58c0296965b4a2deb75e91abbccb65e6",
  "url": "/glossary/?search=equal&lan=vi"
}, {
  "revision": "2997d83ac791ba838eae6a5705cba9fe",
  "url": "/glossary/?search=exp"
}, {
  "revision": "edccfc4cff27b2d2c07d42aa68fac6a5",
  "url": "/glossary/?search=exp&lan=vi"
}, {
  "revision": "6f254202369d18716ac8d7a0e22bc2ef",
  "url": "/glossary/?search=exp2"
}, {
  "revision": "9c72303b8ec840d654235c53c9af2947",
  "url": "/glossary/?search=exp2&lan=vi"
}, {
  "revision": "ed7d2d93dc6059a589c6e6529ef88279",
  "url": "/glossary/?search=faceforward"
}, {
  "revision": "2a6551ff9119b3b159836fd0d37743d3",
  "url": "/glossary/?search=faceforward&lan=vi"
}, {
  "revision": "7b8d6d84799a936cdb7009c0a3f7aaea",
  "url": "/glossary/?search=float"
}, {
  "revision": "aeb5280236ebdc03eaece75851bb31bd",
  "url": "/glossary/?search=float&lan=vi"
}, {
  "revision": "0bc24492d2413e799653bc553b6659b1",
  "url": "/glossary/?search=floor"
}, {
  "revision": "761f3cc43658b929c6c1c72a86cf513e",
  "url": "/glossary/?search=floor&lan=vi"
}, {
  "revision": "9509dbf23469d7f4d5b5b6c2ce2007f9",
  "url": "/glossary/?search=fract"
}, {
  "revision": "16e76f5b495a38606c9e5dd9e3d40825",
  "url": "/glossary/?search=fract&lan=vi"
}, {
  "revision": "b8b32e33c47cebea69afe0aa73d85cd4",
  "url": "/glossary/?search=gl_FragColor"
}, {
  "revision": "32530b7bf47032092bf378cffc4c0308",
  "url": "/glossary/?search=gl_FragColor&lan=vi"
}, {
  "revision": "f83d360e7fbccf953eb4941d255cc98a",
  "url": "/glossary/?search=gl_FragCoord"
}, {
  "revision": "f351624ecc9da07fee5bc1e21b703db2",
  "url": "/glossary/?search=gl_FragCoord&lan=vi"
}, {
  "revision": "d5a39f35bfd429d29b330f44f64e294d",
  "url": "/glossary/?search=gl_FrontFacing"
}, {
  "revision": "01f74dac15be12fdbead4fa5428caac1",
  "url": "/glossary/?search=gl_FrontFacing&lan=vi"
}, {
  "revision": "282a9c63a3da02ec6e6f9540d32eca59",
  "url": "/glossary/?search=gl_MaxCombinedTextureImageUnits"
}, {
  "revision": "cdeccd05988d8a6e331cf9616562ace2",
  "url": "/glossary/?search=gl_MaxCombinedTextureImageUnits&lan=vi"
}, {
  "revision": "564aa993f18327bae36c0822f2dc767c",
  "url": "/glossary/?search=gl_MaxDrawBuffers"
}, {
  "revision": "87e756bf4d332c4c3978800d97a75dc4",
  "url": "/glossary/?search=gl_MaxDrawBuffers&lan=vi"
}, {
  "revision": "99b5ffd7fb430163e0b6e626257f37ea",
  "url": "/glossary/?search=gl_MaxFragmentUniformVectors"
}, {
  "revision": "202bbbc02d14cc9b4442b4cf686b19de",
  "url": "/glossary/?search=gl_MaxFragmentUniformVectors&lan=vi"
}, {
  "revision": "e112b57bb650605a158e5e61ceb833b7",
  "url": "/glossary/?search=gl_MaxTextureImageUnits"
}, {
  "revision": "27ece5f5dfa6507b03a525548114b89d",
  "url": "/glossary/?search=gl_MaxTextureImageUnits&lan=vi"
}, {
  "revision": "f15ca02f638930785cecf99ee22e5c2a",
  "url": "/glossary/?search=gl_MaxVaryingVectors"
}, {
  "revision": "0ff98bce310d322385f52453062af749",
  "url": "/glossary/?search=gl_MaxVaryingVectors&lan=vi"
}, {
  "revision": "c7453088e1934a022106a8f79085a06c",
  "url": "/glossary/?search=gl_MaxVertexAttribs"
}, {
  "revision": "2d3c50ed1326e00da379dfc44bfc8b7c",
  "url": "/glossary/?search=gl_MaxVertexAttribs&lan=vi"
}, {
  "revision": "868fe2253585d30282ce3a99d0cc8d3a",
  "url": "/glossary/?search=gl_MaxVertexTextureImageUnits"
}, {
  "revision": "eda02b012cc6005bf89441f15e712145",
  "url": "/glossary/?search=gl_MaxVertexTextureImageUnits&lan=vi"
}, {
  "revision": "5c6e79d65c3f114e729a7d00afbe1b5c",
  "url": "/glossary/?search=gl_PointCoord"
}, {
  "revision": "7d803898484731961b67028373a5874a",
  "url": "/glossary/?search=gl_PointCoord&lan=vi"
}, {
  "revision": "e1eca27ccf35b082a2556d432d51761c",
  "url": "/glossary/?search=gl_PointSize"
}, {
  "revision": "4b39080629f64ee45fdf910a47546da7",
  "url": "/glossary/?search=gl_PointSize&lan=vi"
}, {
  "revision": "862579c247928fd20942a1cd599dba73",
  "url": "/glossary/?search=gl_Position"
}, {
  "revision": "398a2aee8a8ed2ac53224bbfe0cbc0fa",
  "url": "/glossary/?search=gl_Position&lan=vi"
}, {
  "revision": "c0ff8a1264b46862205af65d8f13b39c",
  "url": "/glossary/?search=greaterThan"
}, {
  "revision": "ce9f4b1180b8af39c582d07409ad4117",
  "url": "/glossary/?search=greaterThan&lan=vi"
}, {
  "revision": "e65cd49889ca8372fa5efdb14e7ff9cb",
  "url": "/glossary/?search=greaterThanEqual"
}, {
  "revision": "344c3f51444e6683f64b69b1049ada7c",
  "url": "/glossary/?search=greaterThanEqual&lan=vi"
}, {
  "revision": "5cd6f105b274b5e3b8ac9925c428f2c6",
  "url": "/glossary/?search=highp"
}, {
  "revision": "c4f9361cedc6fe04d6e4479af3a32f23",
  "url": "/glossary/?search=highp&lan=vi"
}, {
  "revision": "be16a2e7918b723752ad4f5c29a8e33b",
  "url": "/glossary/?search=in"
}, {
  "revision": "ff1b722fb543106d161eb17ee94bc644",
  "url": "/glossary/?search=in&lan=vi"
}, {
  "revision": "2ffd59990cfe637d52ff17a67f10fdf0",
  "url": "/glossary/?search=inout"
}, {
  "revision": "322038adee81b3861589ed0ef36ecacc",
  "url": "/glossary/?search=inout&lan=vi"
}, {
  "revision": "abd161bec60bc7a50a939106df50871c",
  "url": "/glossary/?search=int"
}, {
  "revision": "a8ad0db98e8e72f495c8fd7a2673fb45",
  "url": "/glossary/?search=int&lan=vi"
}, {
  "revision": "522d373c8eb72da523a4cc7a86adc436",
  "url": "/glossary/?search=inversesqrt"
}, {
  "revision": "9f56f34a7014b157afed6b19a0f2eb27",
  "url": "/glossary/?search=inversesqrt&lan=vi"
}, {
  "revision": "7eaa0efc6de433a7da92ea3a86a00d8f",
  "url": "/glossary/?search=ivec2"
}, {
  "revision": "39f63f79d3b478128cb6c15e5fd08175",
  "url": "/glossary/?search=ivec2&lan=vi"
}, {
  "revision": "d57d601f28c7c2678ff459c5d56279d5",
  "url": "/glossary/?search=ivec3"
}, {
  "revision": "33c39e882768e9a39008ad38f53dacdc",
  "url": "/glossary/?search=ivec3&lan=vi"
}, {
  "revision": "f791daaaf320246fbe97bd77e7dd1363",
  "url": "/glossary/?search=ivec4"
}, {
  "revision": "08d688a26c4a29be78bc700817888832",
  "url": "/glossary/?search=ivec4&lan=vi"
}, {
  "revision": "1d278673954628b16bc733a6784d5c85",
  "url": "/glossary/?search=length"
}, {
  "revision": "cdae801aa34b394380cf91fe858ebe58",
  "url": "/glossary/?search=length&lan=vi"
}, {
  "revision": "5446fd2564c66897fc705497684d6bea",
  "url": "/glossary/?search=lessThan"
}, {
  "revision": "75c2ce915966e882eed32cd5e3a9324a",
  "url": "/glossary/?search=lessThan&lan=vi"
}, {
  "revision": "cca5e9a1d22d3bd8c3097a8271b09378",
  "url": "/glossary/?search=lessThanEqual"
}, {
  "revision": "6babfa7d3f3bfc060bb77312dc6b251d",
  "url": "/glossary/?search=lessThanEqual&lan=vi"
}, {
  "revision": "002a82496621b5441d45344c864e2d2f",
  "url": "/glossary/?search=log"
}, {
  "revision": "883b19cfa381080652801c5f1a8e7b9c",
  "url": "/glossary/?search=log&lan=vi"
}, {
  "revision": "db54a90ae6c574f5fb738260e32eff40",
  "url": "/glossary/?search=log2"
}, {
  "revision": "db39ae4b8412748a71308f86f72566e8",
  "url": "/glossary/?search=log2&lan=vi"
}, {
  "revision": "046895ff3735c7807239c69a16df6d6c",
  "url": "/glossary/?search=lowp"
}, {
  "revision": "d6a15e48e17b68635c83ada4997f01fc",
  "url": "/glossary/?search=lowp&lan=vi"
}, {
  "revision": "18d37ea932540cbca7a14c9e24e74594",
  "url": "/glossary/?search=main"
}, {
  "revision": "f92efaa5a0cc4a873f8ca63c26295967",
  "url": "/glossary/?search=main&lan=vi"
}, {
  "revision": "e25c2e0e5a5626482ce818e597137047",
  "url": "/glossary/?search=mat2"
}, {
  "revision": "56f622aed957cdb0fb3256aa1a848a40",
  "url": "/glossary/?search=mat2&lan=vi"
}, {
  "revision": "52f6bab555f4ebcb29196e5e7f887fe9",
  "url": "/glossary/?search=mat3"
}, {
  "revision": "482a32a6030f3152fb694342f0264132",
  "url": "/glossary/?search=mat3&lan=vi"
}, {
  "revision": "c40035b86599d227f1774c538171b3f2",
  "url": "/glossary/?search=mat4"
}, {
  "revision": "aea971e4d65c5c4d6bccba6d38c3dcec",
  "url": "/glossary/?search=mat4&lan=vi"
}, {
  "revision": "91206a449b4e57141cdf3c0434c31d17",
  "url": "/glossary/?search=matrixCompMult"
}, {
  "revision": "a0c09efb6b8e034228d686b9f860e561",
  "url": "/glossary/?search=matrixCompMult&lan=vi"
}, {
  "revision": "ab501f63f599e4c749a752c8d2215503",
  "url": "/glossary/?search=max"
}, {
  "revision": "6e45f253ae78eb8d1395bcca32d56059",
  "url": "/glossary/?search=max&lan=vi"
}, {
  "revision": "5bb2f4c24934cfb79956ba3ef0413a15",
  "url": "/glossary/?search=mediump"
}, {
  "revision": "bd1cb776b417804389d8a3c078c98a4d",
  "url": "/glossary/?search=mediump&lan=vi"
}, {
  "revision": "194200d0350c65cfef651b82c370d0e9",
  "url": "/glossary/?search=min"
}, {
  "revision": "065143bc8f31f7ef5084f8d55af0cef9",
  "url": "/glossary/?search=min&lan=vi"
}, {
  "revision": "cce0abcbb083c65135b1ac607693afca",
  "url": "/glossary/?search=mix"
}, {
  "revision": "decae8d593735d73759744dd90335f6d",
  "url": "/glossary/?search=mix&lan=vi"
}, {
  "revision": "f25d02b89e32116e0e49f665338df52b",
  "url": "/glossary/?search=mod"
}, {
  "revision": "d8edc88b750d73cfa9594b6f7d4d5ca6",
  "url": "/glossary/?search=mod&lan=vi"
}, {
  "revision": "c3f596222ac2b9940e1b24164e38c0a0",
  "url": "/glossary/?search=normalize"
}, {
  "revision": "c45ac04b5f2ec0ce8c67619248df1f53",
  "url": "/glossary/?search=normalize&lan=vi"
}, {
  "revision": "620fa521131b52ea3d5bbb8a026e7272",
  "url": "/glossary/?search=not"
}, {
  "revision": "834acb40f5beb600656991fbe8cc29aa",
  "url": "/glossary/?search=not&lan=vi"
}, {
  "revision": "a524fcb4551883233e9f9fb64a415bd9",
  "url": "/glossary/?search=notEqual"
}, {
  "revision": "d320b2e63d8e3177fe1a2247a3024bfb",
  "url": "/glossary/?search=notEqual&lan=vi"
}, {
  "revision": "18c49660c5ee89a85c897472a7a50890",
  "url": "/glossary/?search=out"
}, {
  "revision": "7ada58845b44ed1c109bcc74508521a0",
  "url": "/glossary/?search=out&lan=vi"
}, {
  "revision": "1f027f9744783228ae102f706ce3252e",
  "url": "/glossary/?search=pow"
}, {
  "revision": "d1a0dab877e3ba88876c022ee6813a02",
  "url": "/glossary/?search=pow&lan=vi"
}, {
  "revision": "a1a19afb1be0a82ae86c2207abf01ed4",
  "url": "/glossary/?search=precision"
}, {
  "revision": "6fcfe3447426373242e63fcf6f9c6e88",
  "url": "/glossary/?search=precision&lan=vi"
}, {
  "revision": "3e6a3ec8b05b9ca2f6d9417b19ccaf77",
  "url": "/glossary/?search=radians"
}, {
  "revision": "6d25ac7a06650a82f2a38f840839a9e4",
  "url": "/glossary/?search=radians&lan=vi"
}, {
  "revision": "34649fa7cb344f344e812825097c6091",
  "url": "/glossary/?search=reflect"
}, {
  "revision": "be2c185c6e021da4e3c32dfb0cffd084",
  "url": "/glossary/?search=reflect&lan=vi"
}, {
  "revision": "d4cb392e57510fcf1cc929a5de7dd828",
  "url": "/glossary/?search=refract"
}, {
  "revision": "9e62f9ce6087d5d83c18355f4662c352",
  "url": "/glossary/?search=refract&lan=vi"
}, {
  "revision": "51801fe03c107e317ec3ee908f8c98f5",
  "url": "/glossary/?search=return"
}, {
  "revision": "57bcc2aa0970133c030ecc82759793af",
  "url": "/glossary/?search=return&lan=vi"
}, {
  "revision": "2e8b01000ec8fa1758f78073f14f9fea",
  "url": "/glossary/?search=sampler2D"
}, {
  "revision": "e809301ea2d888aea7a8a2fe5890f886",
  "url": "/glossary/?search=sampler2D&lan=vi"
}, {
  "revision": "da52292aee64881a5788f69e774423fe",
  "url": "/glossary/?search=samplerCube"
}, {
  "revision": "d354c847e3ba8a82bca1204564580925",
  "url": "/glossary/?search=samplerCube&lan=vi"
}, {
  "revision": "7c42aaafe2a9704d3b3e9bde0ca2571a",
  "url": "/glossary/?search=sign"
}, {
  "revision": "279d19aca87e56ded0f9b36510883664",
  "url": "/glossary/?search=sign&lan=vi"
}, {
  "revision": "e8163a3c5c0b83b2be01093cd088b24f",
  "url": "/glossary/?search=sin"
}, {
  "revision": "9364b4f06eb1e38c2be15f9abb2a082c",
  "url": "/glossary/?search=sin&lan=vi"
}, {
  "revision": "f1c4c5c2bcaee21ee06543d85dbfa4a4",
  "url": "/glossary/?search=smoothstep"
}, {
  "revision": "7132a03032cbf81154ec49ac2009970a",
  "url": "/glossary/?search=smoothstep&lan=vi"
}, {
  "revision": "3c49f00357074e1ab0796573e6e30fd6",
  "url": "/glossary/?search=sqrt"
}, {
  "revision": "72ea37c7463046fb6a9c6f044cb1de3a",
  "url": "/glossary/?search=sqrt&lan=vi"
}, {
  "revision": "cdaed6e2f79f0f24a1721357fddf68c4",
  "url": "/glossary/?search=step"
}, {
  "revision": "25e2faf332e1ef47ce36c53295d919a8",
  "url": "/glossary/?search=step&lan=vi"
}, {
  "revision": "d622faba16b0828da208d22f410d4015",
  "url": "/glossary/?search=struct"
}, {
  "revision": "7bec42ec7ec598e97c57573f4dd1eb7a",
  "url": "/glossary/?search=struct&lan=vi"
}, {
  "revision": "b5726934153d44d60191929a1947abce",
  "url": "/glossary/?search=tan"
}, {
  "revision": "502d48ce8a63bc72ab2a5f4681fedc32",
  "url": "/glossary/?search=tan&lan=vi"
}, {
  "revision": "fc577d203537f443d8db822b5423c861",
  "url": "/glossary/?search=texture2D"
}, {
  "revision": "83d8a21ab05ced5935c1ad99f55ec8c3",
  "url": "/glossary/?search=texture2D&lan=vi"
}, {
  "revision": "39d3a7a75040b95fcb9a9c65c8dde323",
  "url": "/glossary/?search=textureCube"
}, {
  "revision": "c7a5bfc5181134356ccbcb1fc51e3e1d",
  "url": "/glossary/?search=textureCube&lan=vi"
}, {
  "revision": "5562b98afdec868b9b163fdf8cce62b2",
  "url": "/glossary/?search=uniform"
}, {
  "revision": "76f3caac7dddb7e9177c361ca2e79a49",
  "url": "/glossary/?search=uniform&lan=vi"
}, {
  "revision": "fce2fa420f9aa28de83122ae4ff6d3b2",
  "url": "/glossary/?search=varying"
}, {
  "revision": "b3206bee91f96dda9452b1a95131756a",
  "url": "/glossary/?search=varying&lan=vi"
}, {
  "revision": "f44c448f245c70dae724624833201d40",
  "url": "/glossary/?search=vec2"
}, {
  "revision": "75fa048ab7066f33ff1231209dc0e054",
  "url": "/glossary/?search=vec2&lan=vi"
}, {
  "revision": "91d966181324f9485c570032c5d8fb2f",
  "url": "/glossary/?search=vec3"
}, {
  "revision": "21864f045b74f3219e62df64c31c8656",
  "url": "/glossary/?search=vec3&lan=vi"
}, {
  "revision": "4b4e6db7deab4d24e521a3dd9c588f7e",
  "url": "/glossary/?search=vec4"
}, {
  "revision": "f7f14e281c324d59dc60f2c56e5d5b64",
  "url": "/glossary/?search=vec4&lan=vi"
}, {
  "revision": "cf2175c8925404dde87fe822a610fe0b",
  "url": "/glossary/?search=void"
}, {
  "revision": "3c354e4ea7e2ddab1f76dfcdb00ebcc5",
  "url": "/glossary/?search=void&lan=vi"
}, {
  "revision": "ad41ff18fc5d92b6e5d5f3f38931f3ad",
  "url": "/appendix/00/"
}, {
  "revision": "3182ea9cafcc543823b5a5aa5e1d1b0b",
  "url": "/appendix/00/?lan=id"
}, {
  "revision": "0bed7e6472c2870db15a14d1e20b6a4d",
  "url": "/appendix/00/?lan=vi"
}, {
  "revision": "b9f433967c707441e8acb420f761a14e",
  "url": "/appendix/00/?lan=jp"
}, {
  "revision": "7cfd2858ba27eaf456d280cc66ca377a",
  "url": "/appendix/00/?lan=ch"
}, {
  "revision": "b9f433967c707441e8acb420f761a14e",
  "url": "/appendix/00/?lan=kr"
}, {
  "revision": "b9f433967c707441e8acb420f761a14e",
  "url": "/appendix/00/?lan=es"
}, {
  "revision": "b9f433967c707441e8acb420f761a14e",
  "url": "/appendix/00/?lan=pt"
}, {
  "revision": "edea54724f5dd5ff9516ed8d1b156c7e",
  "url": "/appendix/00/?lan=fr"
}, {
  "revision": "312ac1c3a68c8d48494b90f9e221d164",
  "url": "/appendix/00/?lan=it"
}, {
  "revision": "d411836d2a838232b15b85defb902d00",
  "url": "/appendix/00/?lan=de"
}, {
  "revision": "13c04095f9d8944f92107883b7cdb45c",
  "url": "/appendix/00/?lan=ru"
}, {
  "revision": "3bcdf75670644ba556c24ec63981de06",
  "url": "/appendix/00/?lan=pl"
}, {
  "revision": "5c665721ad73b4dda76135db7299ad4c",
  "url": "/appendix/01/"
}, {
  "revision": "85b14efa49aa7bb23cc4679dd723c2ef",
  "url": "/appendix/01/?lan=id"
}, {
  "revision": "0c80b3677f15a39466e9248ee9b71b06",
  "url": "/appendix/01/?lan=vi"
}, {
  "revision": "0c466981e621ea76bf603143cd9fdddb",
  "url": "/appendix/01/?lan=jp"
}, {
  "revision": "6d01dc3bc3af712e48f5572d6e092f93",
  "url": "/appendix/01/?lan=ch"
}, {
  "revision": "0c466981e621ea76bf603143cd9fdddb",
  "url": "/appendix/01/?lan=kr"
}, {
  "revision": "0c466981e621ea76bf603143cd9fdddb",
  "url": "/appendix/01/?lan=es"
}, {
  "revision": "0c466981e621ea76bf603143cd9fdddb",
  "url": "/appendix/01/?lan=pt"
}, {
  "revision": "a11f1a3ea26b6eac887fe869f24793aa",
  "url": "/appendix/01/?lan=fr"
}, {
  "revision": "7e6afda3cfcf085721945cb6abe8c4b5",
  "url": "/appendix/01/?lan=it"
}, {
  "revision": "0be9aba96c69867a7d5873623d790b74",
  "url": "/appendix/01/?lan=de"
}, {
  "revision": "78556d294cf23b543d8a4fcf14bd095e",
  "url": "/appendix/01/?lan=ru"
}, {
  "revision": "f0f934a63bfb42a1eb5421fa410099c0",
  "url": "/appendix/01/?lan=pl"
}, {
  "revision": "bd6684c686a469ad4d79f40ca986f22c",
  "url": "/appendix/02/"
}, {
  "revision": "b7ae806dc226ba94cb41a33ff3391f52",
  "url": "/appendix/02/?lan=id"
}, {
  "revision": "904eacad4e5dfe68ba5d242e0d68d76d",
  "url": "/appendix/02/?lan=vi"
}, {
  "revision": "2c2ebc56c1bfec969feb4bfa707db0a4",
  "url": "/appendix/02/?lan=jp"
}, {
  "revision": "8c7907319a7f4b7150645a9ae1d02c89",
  "url": "/appendix/02/?lan=ch"
}, {
  "revision": "2c2ebc56c1bfec969feb4bfa707db0a4",
  "url": "/appendix/02/?lan=kr"
}, {
  "revision": "2c2ebc56c1bfec969feb4bfa707db0a4",
  "url": "/appendix/02/?lan=es"
}, {
  "revision": "2c2ebc56c1bfec969feb4bfa707db0a4",
  "url": "/appendix/02/?lan=pt"
}, {
  "revision": "049c5f3b71e9a9f41577d548fdb5861f",
  "url": "/appendix/02/?lan=fr"
}, {
  "revision": "cf7093cc59e5cf0fa7838643537c3356",
  "url": "/appendix/02/?lan=it"
}, {
  "revision": "1fdd497fcc608ba7012ed4c556eaa692",
  "url": "/appendix/02/?lan=de"
}, {
  "revision": "69a0421b6b7043f51830cab8c09afa50",
  "url": "/appendix/02/?lan=ru"
}, {
  "revision": "50aa88c94d76c6fc14993d87e43bebf9",
  "url": "/appendix/02/?lan=pl"
}, {
  "revision": "a0f8f3e8795821a6e5246b152dada334",
  "url": "/appendix/03/"
}, {
  "revision": "5ab82c76d51fa7f6221423de81c5be5a",
  "url": "/appendix/03/?lan=id"
}, {
  "revision": "b3f3388c79cdea8397ca47762598894d",
  "url": "/appendix/03/?lan=vi"
}, {
  "revision": "9bcebb84eb5da821393d798fd140fd89",
  "url": "/appendix/03/?lan=jp"
}, {
  "revision": "ed5c617e165d7a206d04059d95e44df0",
  "url": "/appendix/03/?lan=ch"
}, {
  "revision": "9bcebb84eb5da821393d798fd140fd89",
  "url": "/appendix/03/?lan=kr"
}, {
  "revision": "9bcebb84eb5da821393d798fd140fd89",
  "url": "/appendix/03/?lan=es"
}, {
  "revision": "9bcebb84eb5da821393d798fd140fd89",
  "url": "/appendix/03/?lan=pt"
}, {
  "revision": "9bcebb84eb5da821393d798fd140fd89",
  "url": "/appendix/03/?lan=fr"
}, {
  "revision": "72e088a59f92d15a2e529fb7fce20455",
  "url": "/appendix/03/?lan=it"
}, {
  "revision": "61676bdd4eb30535a103183fa9b80756",
  "url": "/appendix/03/?lan=de"
}, {
  "revision": "e1758c48ced15665867fc1409d033f1a",
  "url": "/appendix/03/?lan=ru"
}, {
  "revision": "fd9223afc87cf09beacd2da890c43ad3",
  "url": "/appendix/03/?lan=pl"
}, {
  "revision": "e585ed1a9915f46cbbe519fd15d565ba",
  "url": "/appendix/04/"
}, {
  "revision": "78a9bb66d05f763b138a64c0675cdbe6",
  "url": "/appendix/04/?lan=id"
}, {
  "revision": "8129a636b90316ef8663ed161c93362f",
  "url": "/appendix/04/?lan=vi"
}, {
  "revision": "78a9bb66d05f763b138a64c0675cdbe6",
  "url": "/appendix/04/?lan=jp"
}, {
  "revision": "78a9bb66d05f763b138a64c0675cdbe6",
  "url": "/appendix/04/?lan=ch"
}, {
  "revision": "78a9bb66d05f763b138a64c0675cdbe6",
  "url": "/appendix/04/?lan=kr"
}, {
  "revision": "78a9bb66d05f763b138a64c0675cdbe6",
  "url": "/appendix/04/?lan=es"
}, {
  "revision": "78a9bb66d05f763b138a64c0675cdbe6",
  "url": "/appendix/04/?lan=pt"
}, {
  "revision": "78a9bb66d05f763b138a64c0675cdbe6",
  "url": "/appendix/04/?lan=fr"
}, {
  "revision": "78a9bb66d05f763b138a64c0675cdbe6",
  "url": "/appendix/04/?lan=it"
}, {
  "revision": "78a9bb66d05f763b138a64c0675cdbe6",
  "url": "/appendix/04/?lan=de"
}, {
  "revision": "504151fed00a62b3a6e0377c73e30604",
  "url": "/appendix/04/?lan=ru"
}, {
  "revision": "78a9bb66d05f763b138a64c0675cdbe6",
  "url": "/appendix/04/?lan=pl"
}, {
  "revision": "e29708a08ab10cf71f59943b12c53218",
  "url": "/appendix/05/"
}, {
  "revision": "f8320c6b1d2978faccb58153e4c813fe",
  "url": "/appendix/05/?lan=id"
}, {
  "revision": "c2ddfec7bdd8b4eeea821a4d0a038375",
  "url": "/appendix/05/?lan=vi"
}, {
  "revision": "f8320c6b1d2978faccb58153e4c813fe",
  "url": "/appendix/05/?lan=jp"
}, {
  "revision": "f8320c6b1d2978faccb58153e4c813fe",
  "url": "/appendix/05/?lan=ch"
}, {
  "revision": "f8320c6b1d2978faccb58153e4c813fe",
  "url": "/appendix/05/?lan=kr"
}, {
  "revision": "f8320c6b1d2978faccb58153e4c813fe",
  "url": "/appendix/05/?lan=es"
}, {
  "revision": "f8320c6b1d2978faccb58153e4c813fe",
  "url": "/appendix/05/?lan=pt"
}, {
  "revision": "f8320c6b1d2978faccb58153e4c813fe",
  "url": "/appendix/05/?lan=fr"
}, {
  "revision": "f8320c6b1d2978faccb58153e4c813fe",
  "url": "/appendix/05/?lan=it"
}, {
  "revision": "f8320c6b1d2978faccb58153e4c813fe",
  "url": "/appendix/05/?lan=de"
}, {
  "revision": "f8320c6b1d2978faccb58153e4c813fe",
  "url": "/appendix/05/?lan=ru"
}, {
  "revision": "f8320c6b1d2978faccb58153e4c813fe",
  "url": "/appendix/05/?lan=pl"
}, {
  "revision": "16d8d3b8dca782f5ee553df7e839180c",
  "url": "/appendix/06/"
}, {
  "revision": "8d55f9a0d530972464138f3dc9eebd21",
  "url": "/appendix/06/?lan=id"
}, {
  "revision": "0459d6ef7a9d5d426152d1a46ab184e2",
  "url": "/appendix/06/?lan=vi"
}, {
  "revision": "8d55f9a0d530972464138f3dc9eebd21",
  "url": "/appendix/06/?lan=jp"
}, {
  "revision": "8d55f9a0d530972464138f3dc9eebd21",
  "url": "/appendix/06/?lan=ch"
}, {
  "revision": "8d55f9a0d530972464138f3dc9eebd21",
  "url": "/appendix/06/?lan=kr"
}, {
  "revision": "8d55f9a0d530972464138f3dc9eebd21",
  "url": "/appendix/06/?lan=es"
}, {
  "revision": "8d55f9a0d530972464138f3dc9eebd21",
  "url": "/appendix/06/?lan=pt"
}, {
  "revision": "8d55f9a0d530972464138f3dc9eebd21",
  "url": "/appendix/06/?lan=fr"
}, {
  "revision": "8d55f9a0d530972464138f3dc9eebd21",
  "url": "/appendix/06/?lan=it"
}, {
  "revision": "8d55f9a0d530972464138f3dc9eebd21",
  "url": "/appendix/06/?lan=de"
}, {
  "revision": "8d55f9a0d530972464138f3dc9eebd21",
  "url": "/appendix/06/?lan=ru"
}, {
  "revision": "8d55f9a0d530972464138f3dc9eebd21",
  "url": "/appendix/06/?lan=pl"
}]);
self.addEventListener("message", event => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

},{"workbox-precaching/precacheAndRoute":25}]},{},[45]);
