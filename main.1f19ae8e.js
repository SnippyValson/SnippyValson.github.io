// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"C:/Users/snippyvalson/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"C:/Users/snippyvalson/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"C:/Users/snippyvalson/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"main.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"C:/Users/snippyvalson/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"uitils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNuemannNeighbours = getNuemannNeighbours;
exports.getCrossNeighbours = getCrossNeighbours;
exports.getMooreNeighbours = getMooreNeighbours;
exports.getMooreNeighboursWrap = getMooreNeighboursWrap;
exports.getRandomColor = getRandomColor;
exports.rand = rand;
exports.getNextState = getNextState;
exports.fillBackground = fillBackground;
exports.drawBooleanState = drawBooleanState;
exports.drawBlock = drawBlock;
exports.Array2D = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function getNuemannNeighbours(x, y, matrix, r, c) {
  var i = x;
  var j = y;
  var neigbours = [];
  /* First row. */

  if (i === 0) {
    /* First element of first row. */
    if (j === 0) {
      neigbours.push(matrix[i][j + 1]);
      neigbours.push(matrix[i + 1][j]);
      /* Last element of the first row.*/
    } else if (j === c - 1) {
      neigbours.push(matrix[i + 1][j]);
      neigbours.push(matrix[i][j - 1]);
    } else {
      neigbours.push(matrix[i][j + 1]);
      neigbours.push(matrix[i + 1][j]);
      neigbours.push(matrix[i][j - 1]);
    }
    /* Last row. */

  } else if (i === r - 1) {
    /* First element of last row. */
    if (j === 0) {
      neigbours.push(matrix[i - 1][j]);
      neigbours.push(matrix[i][j + 1]);
      /* Last element of the last row.*/
    } else if (j === c - 1) {
      neigbours.push(matrix[i - 1][j]);
      neigbours.push(matrix[i][j - 1]);
    } else {
      neigbours.push(matrix[i - 1][j]);
      neigbours.push(matrix[i][j + 1]);
      neigbours.push(matrix[i][j - 1]);
    }
    /* First column */

  } else if (j === 0) {
    neigbours.push(matrix[i - 1][j]);
    neigbours.push(matrix[i][j + 1]);
    neigbours.push(matrix[i + 1][j]);
    /* Last column */
  } else if (j === c - 1) {
    neigbours.push(matrix[i + 1][j]);
    neigbours.push(matrix[i + 1][j]);
    neigbours.push(matrix[i][j - 1]);
  } else {
    neigbours.push(matrix[i - 1][j]);
    neigbours.push(matrix[i][j + 1]);
    neigbours.push(matrix[i + 1][j]);
    neigbours.push(matrix[i][j - 1]);
  }

  return neigbours;
}

function getCrossNeighbours(x, y, matrix, r, c) {
  var i = x;
  var j = y;
  var neigbours = [];
  /* First row. */

  if (i === 0) {
    /* First element of first row. */
    if (j === 0) {
      neigbours.push(matrix[i + 1][j + 1]);
      /* Last element of the first row.*/
    } else if (j === c - 1) {
      neigbours.push(matrix[i + 1][j - 1]);
    } else {
      neigbours.push(matrix[i + 1][j + 1]);
      neigbours.push(matrix[i + 1][j - 1]);
    }
    /* Last row. */

  } else if (i === r - 1) {
    /* First element of last row. */
    if (j === 0) {
      neigbours.push(matrix[i - 1][j + 1]);
      /* Last element of the last row.*/
    } else if (j === c - 1) {
      neigbours.push(matrix[i - 1][j - 1]);
    } else {
      neigbours.push(matrix[i - 1][j - 1]);
      neigbours.push(matrix[i - 1][j + 1]);
    }
    /* First column */

  } else if (j === 0) {
    neigbours.push(matrix[i - 1][j + 1]);
    neigbours.push(matrix[i + 1][j + 1]);
    /* Last column */
  } else if (j === c - 1) {
    neigbours.push(matrix[i - 1][j - 1]);
    neigbours.push(matrix[i + 1][j - 1]);
  } else {
    neigbours.push(matrix[i - 1][j - 1]);
    neigbours.push(matrix[i - 1][j + 1]);
    neigbours.push(matrix[i + 1][j + 1]);
    neigbours.push(matrix[i + 1][j - 1]);
  }

  return neigbours;
}

function getMooreNeighbours(x, y, matrix, r, c) {
  var i = x;
  var j = y;
  var neigbours = [];

  try {
    if (i - 1 >= 0 && j - 1 >= 0) {
      neigbours.push(matrix[i - 1][j - 1]);
    }

    if (i - 1 >= 0) {
      neigbours.push(matrix[i - 1][j]);
    }

    if (i - 1 >= 0 && j + 1 < c) {
      neigbours.push(matrix[i - 1][j + 1]);
    }

    if (j + 1 < c) {
      neigbours.push(matrix[i][j + 1]);
    }

    if (i + 1 < r && j + 1 < c) {
      neigbours.push(matrix[i + 1][j + 1]);
    }

    if (i + 1 < r) {
      neigbours.push(matrix[i + 1][j]);
    }

    if (i + 1 < r && j - 1 >= 0) {
      neigbours.push(matrix[i + 1][j - 1]);
    }

    if (j - 1 >= 0) {
      neigbours.push(matrix[i][j - 1]);
    }
  } catch (e) {}

  return neigbours;
}

function getMooreNeighboursWrap(x, y, matrix, r, c) {
  var i = x;
  var j = y;
  var neigbours = [];

  try {
    neigbours.push(matrix[(i - 1 + r) % r][(j - 1 + c) % c]);
    neigbours.push(matrix[(i - 1 + r) % r][j]);
    neigbours.push(matrix[(i - 1 + r) % r][(j + 1 + c) % c]);
    neigbours.push(matrix[i][(j + 1 + c) % c]);
    neigbours.push(matrix[(i + 1 + r) % r][(j + 1 + c) % c]);
    neigbours.push(matrix[(i + 1 + r) % r][j]);
    neigbours.push(matrix[(i + 1 + r) % r][(j - 1 + c) % c]);
    neigbours.push(matrix[i][(j - 1 + c) % c]);
  } catch (e) {}

  return neigbours;
}

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";

  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}

var Array2D = function Array2D(r, c) {
  return _toConsumableArray(Array(r)).map(function (x) {
    return Array(c).fill(0);
  });
};

exports.Array2D = Array2D;

function rand(min, max) {
  return Math.floor(Math.pow(10, 14) * Math.random() * Math.random()) % (max - min + 1) + min;
}

function getNextState(state, numStates) {
  return (state + 1) % numStates;
}

function fillBackground(context, color, width, height) {
  context.beginPath();
  context.fillStyle = color;
  context.rect(0, 0, width, height);
  context.fill();
}

function drawBooleanState(context, automataState, r, c, bsize, fg, bg) {
  for (var i = 0; i < r; i++) {
    for (var j = 0; j < c; j++) {
      if (automataState[i][j] == true) {
        context.beginPath();
        context.fillStyle = fg;
        context.rect(bsize * j, bsize * i, bsize, bsize);
        context.fill();
      } else {
        context.beginPath();
        context.fillStyle = bg;
        context.rect(bsize * j, bsize * i, bsize, bsize);
        context.fill();
      }
    }
  }
}

function drawBlock(context, x, y, blockSize, color) {
  context.beginPath();
  context.fillStyle = color;
  context.rect(blockSize * y, blockSize * x, blockSize, blockSize);
  context.fill();
}
},{}],"colors.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColorPalletes = void 0;
var ColorPalletes = [];
exports.ColorPalletes = ColorPalletes;
ColorPalletes.push({
  background: '#263862',
  foreground: '#96b0fc'
});
ColorPalletes.push({
  background: '#030f2d',
  foreground: '#00bcf9'
});
ColorPalletes.push({
  background: '#131314',
  foreground: '#91b5a4'
});
ColorPalletes.push({
  background: '#140e36',
  foreground: '#b82941'
});
ColorPalletes.push({
  background: '#2f4650',
  foreground: '#91eddf'
});
},{}],"automata/conwaysGameOfLife.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConwaysGameOfLife = void 0;

var _uitils = require("./../uitils");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ConwaysGameOfLife = /*#__PURE__*/function () {
  /*
   *  Initialize the states and randomize it.
   */
  function ConwaysGameOfLife(rows, cols, colors, context, blocksize) {
    _classCallCheck(this, ConwaysGameOfLife);

    _defineProperty(this, "state", void 0);

    _defineProperty(this, "tempState", void 0);

    _defineProperty(this, "colors", void 0);

    _defineProperty(this, "size", void 0);

    _defineProperty(this, "drawingContext", void 0);

    _defineProperty(this, "blockSize", void 0);

    this.size = {
      rows: Math.round(rows),
      cols: Math.round(cols)
    };
    this.colors = colors;
    this.state = (0, _uitils.Array2D)(this.size.rows, this.size.cols);
    this.tempState = (0, _uitils.Array2D)(this.size.rows, this.size.cols);
    this.drawingContext = context;
    this.blockSize = blocksize;

    for (var i = 0; i < this.size.rows; i++) {
      for (var j = 0; j < this.size.cols; j++) {
        this.state[i][j] = Math.random() >= 0.5;
      }
    }
  }

  _createClass(ConwaysGameOfLife, [{
    key: "randomize",
    value: function randomize() {
      for (var i = 0; i < this.size.rows; i++) {
        for (var j = 0; j < this.size.cols; j++) {
          this.state[i][j] = Math.random() >= 0.5;
          this.tempState[i][j] = false;
        }
      }
    }
  }, {
    key: "calculateAndDrawNextState",
    value: function calculateAndDrawNextState() {
      for (var i = 0; i < this.size.rows; i++) {
        for (var j = 0; j < this.size.cols; j++) {
          var neighbours = (0, _uitils.getMooreNeighbours)(i, j, this.state, this.size.rows, this.size.cols);
          var liveCount = 0;
          neighbours.forEach(function (neighbour) {
            if (neighbour) {
              liveCount++;
            }
          });

          if (liveCount < 2 || liveCount > 3) {
            if (this.state[i][j]) {
              this.tempState[i][j] = false;
              (0, _uitils.drawBlock)(this.drawingContext, i, j, this.blockSize, this.colors[1]);
            }
          } else if (liveCount == 2 || liveCount == 3) {
            this.tempState[i][j] = this.state[i][j];

            if (liveCount == 3) {
              if (!this.state[i][j]) {
                this.tempState[i][j] = true;
                (0, _uitils.drawBlock)(this.drawingContext, i, j, this.blockSize, this.colors[0]);
              }
            }
          }
        }
      }

      for (var i = 0; i < this.size.rows; i++) {
        for (var j = 0; j < this.size.cols; j++) {
          this.state[i][j] = this.tempState[i][j];
        }
      }
    }
  }, {
    key: "getCurrentState",
    value: function getCurrentState() {
      return this.state;
    }
  }, {
    key: "drawCurrentState",
    value: function drawCurrentState() {
      (0, _uitils.drawBooleanState)(this.drawingContext, this.state, this.size.rows, this.size.cols, this.blockSize, this.colors[0], this.colors[1]);
    }
  }]);

  return ConwaysGameOfLife;
}();

exports.ConwaysGameOfLife = ConwaysGameOfLife;
},{"./../uitils":"uitils.js"}],"main.js":[function(require,module,exports) {
"use strict";

require("./main.css");

var _uitils = require("./uitils.js");

var _colors = require("./colors");

var _conwaysGameOfLife = require("./automata/conwaysGameOfLife.js");

var background = document.getElementById('background-canvas');
var backgroundContext = background.getContext("2d");
var greeting = document.getElementById('greeting');
var animationRequest = undefined;
var numDivs = 100;
var ColorIndex = Math.floor(Math.random() * _colors.ColorPalletes.length) + 0;
console.log(ColorIndex);
var automaton;

function initBackgroundAnimation() {
  greeting.style.background = _colors.ColorPalletes[ColorIndex].background;
  greeting.style.color = _colors.ColorPalletes[ColorIndex].foreground;
  greeting.style.borderColor = _colors.ColorPalletes[ColorIndex].foreground;

  if (animationRequest != undefined) {
    window.cancelAnimationFrame(animationRequest);
  }

  var width = document.body.clientWidth;
  var height = document.body.clientHeight;
  background.width = width;
  background.height = height;
  (0, _uitils.fillBackground)(backgroundContext, _colors.ColorPalletes[ColorIndex].background, width, height);
  var blockSize = 0;
  var rows = 0;
  var cols = 0;

  if (width >= height) {
    if (width < 1000) {
      numDivs = 100;
    }

    cols = numDivs;
    blockSize = width / cols;
    rows = height / blockSize;
  } else {
    if (height < 1000) {
      numDivs = 100;
    }

    rows = numDivs;
    blockSize = height / rows;
    cols = width / blockSize;
  }

  automaton = new _conwaysGameOfLife.ConwaysGameOfLife(rows, cols, [_colors.ColorPalletes[ColorIndex].foreground, _colors.ColorPalletes[ColorIndex].background], backgroundContext, blockSize);
  automaton.drawCurrentState();

  function live() {
    automaton.calculateAndDrawNextState();
    animationRequest = window.requestAnimationFrame(live);
  }

  animationRequest = window.requestAnimationFrame(live);
}

initBackgroundAnimation();
window.onresize = handleResize;

function handleResize() {
  initBackgroundAnimation();
}

window.onGreetingClicked = onGreetingClicked;

function onGreetingClicked() {
  ColorIndex = Math.floor(Math.random() * _colors.ColorPalletes.length) + 0;
  initBackgroundAnimation();
}
},{"./main.css":"main.css","./uitils.js":"uitils.js","./colors":"colors.js","./automata/conwaysGameOfLife.js":"automata/conwaysGameOfLife.js"}],"C:/Users/snippyvalson/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52440" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/snippyvalson/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map