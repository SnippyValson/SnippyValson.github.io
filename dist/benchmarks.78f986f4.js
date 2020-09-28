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
},{"_css_loader":"C:/Users/snippyvalson/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"views/benchmarks/benchmarks.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"C:/Users/snippyvalson/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"libs/colors.js":[function(require,module,exports) {
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
ColorPalletes.push({
  background: '#000000',
  foreground: '#63b762'
});
},{}],"libs/style.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Style = void 0;

var _colors = require("./colors.js");

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
      document.documentElement.style.setProperty("--pixel-foreground", _colors.ColorPalletes[this.colorIndex].foreground);
      document.documentElement.style.setProperty("--pixel-background", _colors.ColorPalletes[this.colorIndex].background);
    }
  }]);

  return Style;
}();

exports.Style = Style;
},{"./colors.js":"libs/colors.js"}],"views/benchmarks/benchmarks.js":[function(require,module,exports) {
"use strict";

require("./../../main.css");

require("./benchmarks.css");

var _style = require("../../libs/style");

var style = new _style.Style();
style.applyStyle();
var array = [];
var merged = [];
var numFinised = 0;
var arraySize = 80000;
var numPhysicalThreads = navigator.hardwareConcurrency;
var startTime = performance.now();
var endTime = performance.now();
var bubbleSortWorkers = [];
var quickSortWorkers = [];

for (var i = 0; i < numPhysicalThreads; i++) {
  var bubbleWorker = new Worker("/bubblesort_worker.7a0723df.js");

  bubbleWorker.onmessage = function (e) {
    if (numFinised == 0) {
      merged = e.data;
    } else {
      merged = mergeSortedArrays(merged, e.data);
    }

    numFinised++;

    if (numFinised == numPhysicalThreads) {
      endTime = performance.now();
      document.getElementById("multi-bubblesort-result").innerHTML = "".concat(endTime - startTime, " ms");
      document.getElementById("info-label").innerHTML = "Idle";
      showCheckBox("bubble-sort-multi-done");
    }
  };

  bubbleSortWorkers.push(bubbleWorker);
  var quickWorker = new Worker("/quicksort_worker.059f91c8.js");

  quickWorker.onmessage = function (e) {
    if (numFinised == 0) {
      merged = e.data;
    } else {
      merged = mergeSortedArrays(merged, e.data);
    }

    numFinised++;

    if (numFinised == numPhysicalThreads) {
      endTime = performance.now();
      document.getElementById("multi-quicksort-result").innerHTML = "".concat(endTime - startTime, " ms");
      document.getElementById("info-label").innerHTML = "Idle";
      showCheckBox("quick-sort-multi-done");
    }
  };

  quickSortWorkers.push(quickWorker);
}

var populationWorker = new Worker("/population_worker.af636754.js");

populationWorker.onmessage = function (e) {
  array = e.data;
  document.getElementById("info-label").innerHTML = "Idle";
  showCheckBox("populate-array-done");
};

var bubbleSortWorker = new Worker("/bubblesort_worker.7a0723df.js");

bubbleSortWorker.onmessage = function (e) {
  endTime = performance.now();
  document.getElementById("bubblesort-result").innerHTML = "".concat(endTime - startTime, " ms");
  document.getElementById("info-label").innerHTML = "Idle";
  showCheckBox("bubble-sort-done");
};

var quickSortWorker = new Worker("/quicksort_worker.059f91c8.js");

quickSortWorker.onmessage = function (e) {
  endTime = performance.now();
  document.getElementById("quicksort-result").innerHTML = "".concat(endTime - startTime, " ms");
  document.getElementById("info-label").innerHTML = "Idle";
  showCheckBox("quick-sort-done");
};

window.onItemCliked = onItemCliked;

function onItemCliked(item) {
  switch (item) {
    case "sorting-benchmarks":
      {}
      break;
  }
}

window.populateArray = populateArray;

function populateArray() {
  arraySize = parseInt(document.getElementById("count").value);
  document.getElementById("info-label").innerHTML = "Loading...";
  hideCheckBox("populate-array-done");
  populationWorker.postMessage(arraySize);
}

window.bubbleSortArray = bubbleSortArray;

function bubbleSortArray() {
  if (array == undefined || array.length == 0) {
    showModal("Please generate data.");
    return;
  } else if (array.length > 100000) {
    showModal("You are going to process a large array, this may cause your browswer to hang.");
  }

  document.getElementById("info-label").innerHTML = "Loading...";
  hideCheckBox("bubble-sort-done");
  startTime = performance.now();
  bubbleSortWorker.postMessage({
    array: array
  });
}

window.quickSortArray = quickSortArray;

function quickSortArray() {
  if (array == undefined || array.length == 0) {
    showModal("Please generate data.");
    return;
  } else if (array.length > 100000) {
    showModal("You are going to process a large array, this may cause your browswer to hang.");
  }

  document.getElementById("info-label").innerHTML = "Loading...";
  hideCheckBox("quick-sort-done");
  startTime = performance.now();
  quickSortWorker.postMessage({
    array: array
  });
}

window.multiBubbleSortArray = multiBubbleSortArray;

function multiBubbleSortArray() {
  if (array == undefined || array.length == 0) {
    showModal("Please generate data.");
    return;
  } else if (array.length > 100000) {
    showModal("You are going to process a large array, this may cause your browswer to hang.");
  }

  document.getElementById("info-label").innerHTML = "Loading...";
  hideCheckBox("bubble-sort-multi-done");
  startTime = performance.now();
  var index = 0;
  numFinised = 0;
  merged = [];
  var numSlices = numPhysicalThreads;
  var sliceLength = Math.floor(arraySize / numPhysicalThreads);
  var remaining = arraySize % numPhysicalThreads;

  if (remaining != 0) {
    numSlices--;
  }

  for (var _i = 0; _i < numSlices; _i++) {
    bubbleSortWorkers[_i].postMessage({
      array: array.slice(index, index + sliceLength)
    });

    index += sliceLength;
  }

  if (remaining != 0) {
    bubbleSortWorkers[numPhysicalThreads - 1].postMessage({
      array: array.slice(index, index + sliceLength + remaining)
    });
  }
}

window.multiQuickSortArray = multiQuickSortArray;

function multiQuickSortArray() {
  if (array == undefined || array.length == 0) {
    showModal("Please generate data.");
    return;
  } else if (array.length > 100000) {
    showModal("You are going to process a large array, this may cause your browswer to hang.");
  }

  document.getElementById("info-label").innerHTML = "Loading...";
  hideCheckBox("quick-sort-multi-done");
  startTime = performance.now();
  var index = 0;
  numFinised = 0;
  merged = [];
  var numSlices = numPhysicalThreads;
  var sliceLength = Math.floor(arraySize / numPhysicalThreads);
  var remaining = arraySize % numPhysicalThreads;

  if (remaining != 0) {
    numSlices--;
  }

  for (var _i2 = 0; _i2 < numSlices; _i2++) {
    quickSortWorkers[_i2].postMessage({
      array: array.slice(index, index + sliceLength)
    });

    index += sliceLength;
  }

  if (remaining != 0) {
    quickSortWorkers[numPhysicalThreads - 1].postMessage({
      array: array.slice(index, index + sliceLength + remaining)
    });
  }
}

window.closeMessage = closeMessage;

function closeMessage() {
  hideModal();
}

function showModal(message) {
  document.getElementById("modal-shadow").style.display = "block";
  document.getElementById("message").classList.remove("fade-out");
  document.getElementById("message").classList.add("fade-in");
  document.getElementById("message-content").innerHTML = message;
}

function hideModal() {
  document.getElementById("modal-shadow").style.display = "none";
  document.getElementById("message").classList.add("fade-out");
  document.getElementById("message").classList.remove("fade-in");
}

function mergeSortedArrays(a, b) {
  var count = a.length + b.length;
  var index = 0;
  var aIndex = 0;
  var bIndex = 0;
  var result = [];

  while (index < count) {
    if (a[aIndex] <= b[bIndex]) {
      result[index++] = a[aIndex];
      aIndex++;
    } else {
      result[index++] = b[bIndex];
      bIndex++;
    }

    if (aIndex == a.length - 1 || bIndex == b.length - 1) {
      break;
    }
  }

  if (aIndex == a.length - 1) {
    for (var _i3 = bIndex; _i3 < b.length; _i3++) {
      result[index++] = b[_i3];
    }
  } else if (bIndex == b.length - 1) {
    for (var _i4 = aIndex; _i4 < a.length; _i4++) {
      result[index++] = a[_i4];
    }
  }

  return result;
}

function showCheckBox(checkBoxId) {
  document.getElementById(checkBoxId).classList.remove("hidden");
  document.getElementById(checkBoxId).classList.add("visible");
}

function hideCheckBox(checkBoxId) {
  document.getElementById(checkBoxId).classList.remove("visible");
  document.getElementById(checkBoxId).classList.add("hidden");
}
},{"./../../main.css":"main.css","./benchmarks.css":"views/benchmarks/benchmarks.css","../../libs/style":"libs/style.js","./bubblesort_worker.js":[["bubblesort_worker.7a0723df.js","views/benchmarks/bubblesort_worker.js"],"bubblesort_worker.7a0723df.js.map","views/benchmarks/bubblesort_worker.js"],"./quicksort_worker.js":[["quicksort_worker.059f91c8.js","views/benchmarks/quicksort_worker.js"],"quicksort_worker.059f91c8.js.map","views/benchmarks/quicksort_worker.js"],"./population_worker.js":[["population_worker.af636754.js","views/benchmarks/population_worker.js"],"population_worker.af636754.js.map","views/benchmarks/population_worker.js"]}],"C:/Users/snippyvalson/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49230" + '/');

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
},{}]},{},["C:/Users/snippyvalson/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","views/benchmarks/benchmarks.js"], null)
//# sourceMappingURL=/benchmarks.78f986f4.js.map