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
},{"_css_loader":"C:/Users/snippyvalson/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"libs/uitils.js":[function(require,module,exports) {
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
exports.drawState = drawState;
exports.drawBlock = drawBlock;
exports.getGradientStops = getGradientStops;
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

  if (i - 1 >= 0) {
    neigbours.push(matrix[i - 1][j]);
  }

  if (j + 1 < c) {
    neigbours.push(matrix[i][j + 1]);
  }

  if (i + 1 < r) {
    neigbours.push(matrix[i + 1][j]);
  }

  if (j - 1 >= 0) {
    neigbours.push(matrix[i][j - 1]);
  }

  return neigbours;
}

function getCrossNeighbours(x, y, matrix, r, c) {
  var i = x;
  var j = y;
  var neigbours = [];

  if (i - 1 >= 0 && j - 1 >= 0) {
    neigbours.push(matrix[i - 1][j - 1]);
  }

  if (i - 1 >= 0 && j + 1 < c) {
    neigbours.push(matrix[i - 1][j + 1]);
  }

  if (i + 1 < r && j + 1 < c) {
    neigbours.push(matrix[i + 1][j + 1]);
  }

  if (i + 1 < r && j - 1 >= 0) {
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

function drawState(context, automataState, r, c, bsize, colors) {
  for (var i = 0; i < r; i++) {
    for (var j = 0; j < c; j++) {
      drawBlock(context, i, j, bsize, colors[automataState[i][j]]);
    }
  }
}

function drawBlock(context, x, y, blockSize, color) {
  context.beginPath();
  context.fillStyle = color;
  context.lineWidth = 0;
  context.rect(blockSize * y, blockSize * x, blockSize, blockSize);
  context.fill();
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function getGradientStops(startColor, endColor, numStops) {
  var startRGB = hexToRgb(startColor);
  var endRGB = hexToRgb(endColor);
  var rStep = Math.floor(Math.abs(startRGB.r - endRGB.r) / numStops);
  var gStep = Math.floor(Math.abs(startRGB.g - endRGB.g) / numStops);
  var bStep = Math.floor(Math.abs(startRGB.b - endRGB.b) / numStops);
  var colors = [];
  colors.push(hexToRgb(startColor));
  var s = colors[colors.length - 1];

  for (var i = 0; i < numStops; i++) {
    var c = {
      r: s.r + rStep,
      g: s.g + gStep,
      b: s.b + bStep
    };
    colors.push(c);
    s = colors[colors.length - 1];
  }

  colors.push(hexToRgb(endColor));
  colors = colors.map(function (c) {
    return rgbToHex(c.r, c.g, c.b);
  });
  return colors;
}
},{}],"libs/colors.js":[function(require,module,exports) {
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
},{}],"libs/style.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Style = void 0;

var _colors = require("./colors.js");

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Style = /*#__PURE__*/function () {
  function Style() {
    _classCallCheck(this, Style);

    _defineProperty(this, "colorIndex", void 0);

    _defineProperty(this, "prevColorIndex", void 0);

    this.colorIndex = Math.floor(Math.random() * _colors.ColorPalletes.length) + 0;
  }

  _createClass(Style, [{
    key: "getCurrentPallet",
    value: function getCurrentPallet() {
      return _colors.ColorPalletes[this.colorIndex];
    }
  }, {
    key: "calculateNextPallet",
    value: function calculateNextPallet() {
      while (this.colorIndex == this.prevColorIndex) {
        this.colorIndex = Math.floor(Math.random() * _colors.ColorPalletes.length) + 0;
      }

      this.prevColorIndex = this.colorIndex;
    }
  }, {
    key: "applyStyle",
    value: function applyStyle() {
      var _this = this;

      var pixelDivs = document.getElementsByClassName("pixel-div");

      var _iterator = _createForOfIteratorHelper(pixelDivs),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var pd = _step.value;
          pd.style.background = _colors.ColorPalletes[this.colorIndex].background;
          pd.style.color = _colors.ColorPalletes[this.colorIndex].foreground;
          pd.style.borderColor = _colors.ColorPalletes[this.colorIndex].foreground;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      var pixelBodies = document.getElementsByClassName("pixel-body");

      var _iterator2 = _createForOfIteratorHelper(pixelBodies),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var pbd = _step2.value;
          pbd.style.background = _colors.ColorPalletes[this.colorIndex].background;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      var pixelInputs = document.getElementsByClassName("pixel-input");

      if (pixelInputs.length > 0) {
        var _iterator3 = _createForOfIteratorHelper(pixelInputs),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var pi = _step3.value;
            pi.style.backgroundColor = _colors.ColorPalletes[this.colorIndex].background;
            pi.style.color = _colors.ColorPalletes[this.colorIndex].foreground;
            pi.style.borderColor = _colors.ColorPalletes[this.colorIndex].foreground;
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      }

      var pixelTextm = document.getElementsByClassName("pixel-text-medium");

      if (pixelTextm.length > 0) {
        var _iterator4 = _createForOfIteratorHelper(pixelTextm),
            _step4;

        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var pt = _step4.value;
            pt.style.backgroundColor = _colors.ColorPalletes[this.colorIndex].background;
            pt.style.color = _colors.ColorPalletes[this.colorIndex].foreground;
            pt.style.borderColor = _colors.ColorPalletes[this.colorIndex].foreground;
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }
      }

      var pixelTexts = document.getElementsByClassName("pixel-text-small");

      if (pixelTexts.length > 0) {
        var _iterator5 = _createForOfIteratorHelper(pixelTexts),
            _step5;

        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
            var _pt = _step5.value;
            _pt.style.backgroundColor = _colors.ColorPalletes[this.colorIndex].background;
            _pt.style.color = _colors.ColorPalletes[this.colorIndex].foreground;
            _pt.style.borderColor = _colors.ColorPalletes[this.colorIndex].foreground;
          }
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }
      }

      var pixelButtons = document.getElementsByClassName("pixel-button");

      var _iterator6 = _createForOfIteratorHelper(pixelButtons),
          _step6;

      try {
        var _loop = function _loop() {
          var pb = _step6.value;
          pb.style.background = _colors.ColorPalletes[_this.colorIndex].background;
          pb.style.color = _colors.ColorPalletes[_this.colorIndex].foreground;
          pb.style.borderColor = _colors.ColorPalletes[_this.colorIndex].foreground;
          colorIndex = _this.colorIndex;
          pb.onmouseover = undefined;

          pb.onmouseover = function () {
            pb.style.background = _colors.ColorPalletes[colorIndex].foreground;
            pb.style.color = _colors.ColorPalletes[colorIndex].background;
          };

          pb.onmouseout = undefined;

          pb.onmouseout = function () {
            pb.style.background = _colors.ColorPalletes[colorIndex].background;
            pb.style.color = _colors.ColorPalletes[colorIndex].foreground;
          };

          pb.onmousedown = undefined;

          pb.onmousedown = function () {
            pb.style.background = _colors.ColorPalletes[colorIndex].background;
            pb.style.color = _colors.ColorPalletes[colorIndex].foreground;
          };

          pb.onmouseup = undefined;

          pb.onmouseup = function () {
            pb.style.background = _colors.ColorPalletes[colorIndex].foreground;
            pb.style.color = _colors.ColorPalletes[colorIndex].background;
          };
        };

        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var colorIndex;

          _loop();
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }
    }
  }]);

  return Style;
}();

exports.Style = Style;
},{"./colors.js":"libs/colors.js"}],"automata/automaton.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Automaton = void 0;

var _uitils = require("./../libs/uitils");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Automaton = /*#__PURE__*/function () {
  function Automaton(rows, cols, colors, context, blockSize, numStates, range, threshold, neighbourhood) {
    _classCallCheck(this, Automaton);

    _defineProperty(this, "size", void 0);

    _defineProperty(this, "drawingContext", void 0);

    _defineProperty(this, "colors", void 0);

    _defineProperty(this, "numStates", void 0);

    _defineProperty(this, "range", void 0);

    _defineProperty(this, "threshold", void 0);

    _defineProperty(this, "blockSize", void 0);

    _defineProperty(this, "state", void 0);

    _defineProperty(this, "tempState", void 0);

    _defineProperty(this, "neighbourhood", void 0);

    this.size = {
      rows: Math.round(rows),
      cols: Math.round(cols)
    };
    this.drawingContext = context;
    this.colors = colors;
    this.numStates = numStates;
    this.range = range;
    this.threshold = threshold;
    this.blockSize = blockSize;
    this.state = (0, _uitils.Array2D)(this.size.rows, this.size.cols);
    this.tempState = (0, _uitils.Array2D)(this.size.rows, this.size.cols);
    this.neighbourhood = neighbourhood;

    for (var i = 0; i < this.size.rows; i++) {
      for (var j = 0; j < this.size.cols; j++) {
        this.state[i][j] = Math.floor(Math.random() * numStates);
      }
    }
  }

  _createClass(Automaton, [{
    key: "randomize",
    value: function randomize() {
      for (var i = 0; i < this.size.rows; i++) {
        for (var j = 0; j < this.size.cols; j++) {
          this.state[i][j] = Math.floor(Math.random() * numStates);
          this.tempState[i][j] = 0;
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
      (0, _uitils.drawState)(this.drawingContext, this.state, this.size.rows, this.size.cols, this.blockSize, this.colors);
    }
  }]);

  return Automaton;
}();

exports.Automaton = Automaton;
},{"./../libs/uitils":"libs/uitils.js"}],"automata/conwaysGameOfLife.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConwaysGameOfLife = void 0;

var _uitils = require("../libs/uitils.js");

var _automaton = require("./automaton.js");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var ConwaysGameOfLife = /*#__PURE__*/function (_Automaton) {
  _inherits(ConwaysGameOfLife, _Automaton);

  var _super = _createSuper(ConwaysGameOfLife);

  function ConwaysGameOfLife(rows, cols, colors, context, blocksize, numStates, neighbourhood) {
    _classCallCheck(this, ConwaysGameOfLife);

    return _super.call(this, rows, cols, colors, context, blocksize, numStates, 0, 0, neighbourhood);
  }

  _createClass(ConwaysGameOfLife, [{
    key: "calculateAndDrawNextState",
    value: function calculateAndDrawNextState() {
      for (var i = 0; i < this.size.rows; i++) {
        for (var j = 0; j < this.size.cols; j++) {
          var neighbours = this.neighbourhood(i, j, this.state, this.size.rows, this.size.cols);
          var liveCount = 0;
          neighbours.forEach(function (neighbour) {
            if (neighbour) {
              liveCount++;
            }
          });
          this.tempState[i][j] = this.state[i][j];

          if (liveCount < 2 || liveCount > 3) {
            if (this.state[i][j] == 1) {
              this.tempState[i][j] = 0;
              (0, _uitils.drawBlock)(this.drawingContext, i, j, this.blockSize, this.colors[0]);
            }
          } else if (liveCount == 2 || liveCount == 3) {
            this.tempState[i][j] = this.state[i][j];

            if (liveCount == 3) {
              if (this.state[i][j] == 0) {
                this.tempState[i][j] = 1;
                (0, _uitils.drawBlock)(this.drawingContext, i, j, this.blockSize, this.colors[1]);
              }
            }
          }
        }
      }

      var t = this.tempState;
      this.tempState = this.state;
      this.state = t;
    }
  }]);

  return ConwaysGameOfLife;
}(_automaton.Automaton);

exports.ConwaysGameOfLife = ConwaysGameOfLife;
},{"../libs/uitils.js":"libs/uitils.js","./automaton.js":"automata/automaton.js"}],"automata/cyclicCellularAutomata.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CyclicCellularAutomata = void 0;

var _uitils = require("./../libs/uitils.js");

var _automaton = require("./automaton.js");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var CyclicCellularAutomata = /*#__PURE__*/function (_Automaton) {
  _inherits(CyclicCellularAutomata, _Automaton);

  var _super = _createSuper(CyclicCellularAutomata);

  function CyclicCellularAutomata(rows, cols, colors, context, blockSize, numStates, range, threshold, neighbourhood) {
    _classCallCheck(this, CyclicCellularAutomata);

    console.log(threshold);
    return _super.call(this, rows, cols, colors, context, blockSize, numStates, range, threshold, neighbourhood);
  }

  _createClass(CyclicCellularAutomata, [{
    key: "calculateAndDrawNextState",
    value: function calculateAndDrawNextState() {
      var _this = this;

      for (var i = 0; i < this.size.rows; i++) {
        for (var j = 0; j < this.size.cols; j++) {
          var neighbours = this.neighbourhood(i, j, this.state, this.size.rows, this.size.cols);
          var liveCount = 0;
          neighbours.forEach(function (neighbour) {
            if (neighbour === (0, _uitils.getNextState)(_this.state[i][j], _this.numStates)) {
              liveCount++;
            }
          });

          if (liveCount >= this.threshold) {
            this.tempState[i][j] = (0, _uitils.getNextState)(this.state[i][j], this.numStates);
            (0, _uitils.drawBlock)(this.drawingContext, i, j, this.blockSize, this.colors[this.tempState[i][j]]);
          } else {
            this.tempState[i][j] = this.state[i][j];
          }
        }
      }

      var t = this.tempState;
      this.tempState = this.state;
      this.state = t;
    }
  }]);

  return CyclicCellularAutomata;
}(_automaton.Automaton);

exports.CyclicCellularAutomata = CyclicCellularAutomata;
},{"./../libs/uitils.js":"libs/uitils.js","./automaton.js":"automata/automaton.js"}],"main.js":[function(require,module,exports) {
"use strict";

require("./main.css");

var _uitils = require("./libs/uitils.js");

var _style = require("./libs/style");

var _conwaysGameOfLife = require("./automata/conwaysGameOfLife.js");

var _cyclicCellularAutomata = require("./automata/cyclicCellularAutomata");

var background = document.getElementById('background-canvas');
var backgroundContext = background.getContext("2d");
var info = document.getElementById('info');
var fpsInfo = document.getElementById('fps');
var animationRequest = undefined;
var numDivs = 150;
var prevAutomatonIndex = 0;
var automatonIndex = 0;
var automaton;
var automata = [];
var style = new _style.Style();

function initBackgroundAnimation() {
  style.applyStyle();

  if (animationRequest != undefined) {
    window.cancelAnimationFrame(animationRequest);
  }

  var width = document.body.clientWidth;
  var height = document.body.clientHeight;
  background.width = width;
  background.height = height;
  (0, _uitils.fillBackground)(backgroundContext, style.getCurrentPallet().background, width, height);
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

  blockSize = Math.round(blockSize);
  automata = [];
  automata.push({
    description: "Conway's game of life",
    rule: undefined,
    automaton: new _conwaysGameOfLife.ConwaysGameOfLife(rows, cols, [style.getCurrentPallet().background, style.getCurrentPallet().foreground], backgroundContext, blockSize, 2, _uitils.getMooreNeighbours)
  });
  automata.push({
    description: "Cyclic cellular automaton",
    rule: "R1/T1/C16/NM",
    automaton: new _cyclicCellularAutomata.CyclicCellularAutomata(rows, cols, (0, _uitils.getGradientStops)(style.getCurrentPallet().background, style.getCurrentPallet().foreground, 14), backgroundContext, blockSize, 16, 1, 1, _uitils.getMooreNeighbours)
  });
  automata.push({
    description: "Cyclic cellular automaton",
    rule: "R1/T1/C16/NN",
    automaton: new _cyclicCellularAutomata.CyclicCellularAutomata(rows, cols, (0, _uitils.getGradientStops)(style.getCurrentPallet().background, style.getCurrentPallet().foreground, 14), backgroundContext, blockSize, 16, 1, 1, _uitils.getNuemannNeighbours)
  });
  automata.push({
    description: "Cyclic cellular automaton",
    rule: "R1/T1/C16/NC",
    automaton: new _cyclicCellularAutomata.CyclicCellularAutomata(rows, cols, (0, _uitils.getGradientStops)(style.getCurrentPallet().background, style.getCurrentPallet().foreground, 14), backgroundContext, blockSize, 16, 1, 1, _uitils.getCrossNeighbours)
  });
  automata.push({
    description: "Cyclic cellular automaton",
    rule: "R1/T3/C4/NM",
    automaton: new _cyclicCellularAutomata.CyclicCellularAutomata(rows, cols, (0, _uitils.getGradientStops)(style.getCurrentPallet().background, style.getCurrentPallet().foreground, 2), backgroundContext, blockSize, 4, 1, 3, _uitils.getMooreNeighbours)
  });
  automata.push({
    description: "Cyclic cellular automaton",
    rule: "R1/T3/C3/NM",
    automaton: new _cyclicCellularAutomata.CyclicCellularAutomata(rows, cols, (0, _uitils.getGradientStops)(style.getCurrentPallet().background, style.getCurrentPallet().foreground, 1), backgroundContext, blockSize, 3, 1, 3, _uitils.getMooreNeighbours)
  });

  while (automatonIndex == prevAutomatonIndex) {
    automatonIndex = Math.floor(Math.random() * automata.length);
  }

  prevAutomatonIndex = automatonIndex;
  automaton = automata[automatonIndex].automaton;

  if (automata[automatonIndex].rule != undefined) {
    info.innerHTML = "".concat(automata[automatonIndex].description, ", Rule : ").concat(automata[automatonIndex].rule);
  } else {
    info.innerHTML = "".concat(automata[automatonIndex].description);
  }

  automaton.drawCurrentState();
  var t1 = Date.now();
  var t2 = Date.now();
  var ft1 = Date.now();
  var ft2 = Date.now();
  var fps = 0;

  function live() {
    t2 = Date.now();
    ft2 = Date.now();

    if (t2 - t1 >= 1000 / 30) {
      t1 = Date.now() - (t2 - t1) % (1000 / 30);
      fps++;
      automaton.calculateAndDrawNextState();
    }

    if (ft2 - ft1 >= 1000) {
      ft1 = Date.now() - (ft2 - ft1) % 1000;
      fpsInfo.innerHTML = "".concat(fps, " fps");
      fps = 0;
    }

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
  style.calculateNextPallet();
  initBackgroundAnimation();
}

window.showWorks = showWorks;

function showWorks(event) {
  var works = document.getElementById("works");

  if (works.classList.contains("fade-out")) {
    works.classList.remove("fade-out");
    works.classList.add("fade-in");
  }

  event.stopPropagation();
}

window.closeWorks = closeWorks;

function closeWorks(event) {
  console.log(event);
  var works = document.getElementById("works");

  if (works.classList.contains("fade-in")) {
    works.classList.remove("fade-in");
    works.classList.add("fade-out");
  }

  event.stopPropagation();
}
},{"./main.css":"main.css","./libs/uitils.js":"libs/uitils.js","./libs/style":"libs/style.js","./automata/conwaysGameOfLife.js":"automata/conwaysGameOfLife.js","./automata/cyclicCellularAutomata":"automata/cyclicCellularAutomata.js"}],"C:/Users/snippyvalson/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55581" + '/');

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