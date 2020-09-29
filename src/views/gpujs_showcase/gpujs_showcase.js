import "./../../main.css";
import "./gpujs_showcase.css";
import { Style } from "../../global/style";
import { GPU } from "gpu.js";
import { Array2D, getGradientStopsRgb } from "./../../libs/uitils.js";

var animationHandle;
var animationAction;
var rendererOutlet = document.getElementById("renderer-panel");
var rendererHeight = rendererOutlet.clientHeight - 20;
var rendererWidth = rendererOutlet.clientWidth - 20;
var gpuAutomataState = Array2D(rendererHeight, rendererWidth);
var gpuTempState = Array2D(rendererHeight, rendererWidth);
var automatonThreshold = 1;
var automatonNumStates = 16;
var automatonRange = 1;
var style = new Style();
style.applyStyle();
var gpu = new GPU();
var constants;
var colors;
var t1 = Date.now();
var t2 = Date.now();
var numPoints = rendererHeight * rendererWidth;
var listButtons = document.getElementsByClassName("list-button");
var selectedButton = "square-cycles";

function setSelectedButton(selectedButton) {
  for (let listButton of listButtons) {
      listButton.classList.add("pixel-button");
      listButton.classList.remove("pixel-button-inverted");
  }
  selectedButton.classList.add("pixel-button-inverted");
  selectedButton.classList.remove("pixel-button");
}

getColors();

function getColors() {
  colors = getGradientStopsRgb(
    style.getCurrentPallet().background,
    style.getCurrentPallet().foreground,
    automatonNumStates - 2
  );
  if (colors.length < 16) {
    var length = colors.length;
    for (var i = 0; i < 16 - length; i++) {
      colors.push({
        r: 0,
        g: 0,
        b: 0,
      });
    }
  }
  constants = {
    color0r: colors[0].r / 255,
    color0g: colors[0].g / 255,
    color0b: colors[0].b / 255,
    color1r: colors[1].r / 255,
    color1g: colors[1].g / 255,
    color1b: colors[1].b / 255,
    color2r: colors[2].r / 255,
    color2g: colors[2].g / 255,
    color2b: colors[2].b / 255,
    color3r: colors[3].r / 255,
    color3g: colors[3].g / 255,
    color3b: colors[3].b / 255,
    color4r: colors[4].r / 255,
    color4g: colors[4].g / 255,
    color4b: colors[4].b / 255,
    color5r: colors[5].r / 255,
    color5g: colors[5].g / 255,
    color5b: colors[5].b / 255,
    color6r: colors[6].r / 255,
    color6g: colors[6].g / 255,
    color6b: colors[6].b / 255,
    color7r: colors[7].r / 255,
    color7g: colors[7].g / 255,
    color7b: colors[7].b / 255,
    color8r: colors[8].r / 255,
    color8g: colors[8].g / 255,
    color8b: colors[8].b / 255,
    color9r: colors[9].r / 255,
    color9g: colors[9].g / 255,
    color9b: colors[9].b / 255,
    color10r: colors[10].r / 255,
    color10g: colors[10].g / 255,
    color10b: colors[10].b / 255,
    color11r: colors[11].r / 255,
    color11g: colors[11].g / 255,
    color11b: colors[11].b / 255,
    color12r: colors[12].r / 255,
    color12g: colors[12].g / 255,
    color12b: colors[12].b / 255,
    color13r: colors[13].r / 255,
    color13g: colors[13].g / 255,
    color13b: colors[13].b / 255,
    color14r: colors[14].r / 255,
    color14g: colors[14].g / 255,
    color14b: colors[14].b / 255,
    color15r: colors[15].r / 255,
    color15g: colors[15].g / 255,
    color15b: colors[15].b / 255,
  };
}

var renderer = getRenderer();

function getRenderer() {
  var rndrr = gpu
    .createKernel(function (stateMatrix) {
      var i = this.thread.y;
      var j = this.thread.x;
      if (stateMatrix[i][j] === 0) {
        this.color(
          this.constants.color0r,
          this.constants.color0g,
          this.constants.color0b
        );
      } else if (stateMatrix[i][j] === 1) {
        this.color(
          this.constants.color1r,
          this.constants.color1g,
          this.constants.color1b
        );
      } else if (stateMatrix[i][j] === 2) {
        this.color(
          this.constants.color2r,
          this.constants.color2g,
          this.constants.color2b
        );
      } else if (stateMatrix[i][j] === 3) {
        this.color(
          this.constants.color3r,
          this.constants.color3g,
          this.constants.color3b
        );
      } else if (stateMatrix[i][j] === 4) {
        this.color(
          this.constants.color4r,
          this.constants.color4g,
          this.constants.color4b
        );
      } else if (stateMatrix[i][j] === 5) {
        this.color(
          this.constants.color5r,
          this.constants.color5g,
          this.constants.color5b
        );
      } else if (stateMatrix[i][j] === 6) {
        this.color(
          this.constants.color6r,
          this.constants.color6g,
          this.constants.color6b
        );
      } else if (stateMatrix[i][j] === 7) {
        this.color(
          this.constants.color7r,
          this.constants.color7g,
          this.constants.color7b
        );
      } else if (stateMatrix[i][j] === 8) {
        this.color(
          this.constants.color8r,
          this.constants.color8g,
          this.constants.color8b
        );
      } else if (stateMatrix[i][j] === 9) {
        this.color(
          this.constants.color9r,
          this.constants.color9g,
          this.constants.color9b
        );
      } else if (stateMatrix[i][j] === 10) {
        this.color(
          this.constants.color10r,
          this.constants.color10g,
          this.constants.color10b
        );
      } else if (stateMatrix[i][j] === 11) {
        this.color(
          this.constants.color11r,
          this.constants.color11g,
          this.constants.color11b
        );
      } else if (stateMatrix[i][j] === 12) {
        this.color(
          this.constants.color12r,
          this.constants.color12g,
          this.constants.color12b
        );
      } else if (stateMatrix[i][j] === 13) {
        this.color(
          this.constants.color13r,
          this.constants.color13g,
          this.constants.color13b
        );
      } else if (stateMatrix[i][j] === 14) {
        this.color(
          this.constants.color14r,
          this.constants.color14g,
          this.constants.color14b
        );
      } else if (stateMatrix[i][j] === 15) {
        this.color(
          this.constants.color15r,
          this.constants.color15g,
          this.constants.color15b
        );
      }
    })
    .setOutput([rendererWidth, rendererHeight])
    .setGraphical(true)
    .setConstants(constants);
  var rendererCanvas = rndrr.canvas;
  console.log(gpuAutomataState.length + " " + gpuAutomataState[0].length);
  console.log(rendererCanvas.width + " " + rendererCanvas.height);
  rendererOutlet.innerHTML = "";
  rendererOutlet.appendChild(rndrr.canvas);
  rendererCanvas.style.marginTop = `${
    (rendererOutlet.clientHeight - rendererCanvas.clientHeight) / 2
  }px`;
  rendererCanvas.style.marginLeft = `${
    (rendererOutlet.clientWidth - rendererCanvas.clientWidth) / 2
  }px`;
  return rndrr;
}

var processMoore = getMooreProcess();
function getMooreProcess() {
  return gpu
    .createKernel(function (stateMatrix) {
      var i = this.thread.y;
      var j = this.thread.x;
      var r = this.constants.rendererHeight;
      var c = this.constants.rendererWidth;
      var count = 0;
      var nextState = (stateMatrix[i][j] + 1) % this.constants.numStates;
      count = checkMooreNeighbourhood(
        stateMatrix,
        i,
        j,
        r,
        c,
        nextState,
        this.constants.range
      );
      if (count >= this.constants.threshold) {
        return nextState;
      } else {
        return stateMatrix[i][j];
      }
    })
    .setOutput([rendererWidth, rendererHeight])
    .setConstants({
      rendererWidth: rendererWidth,
      rendererHeight: rendererHeight,
      threshold: automatonThreshold,
      numStates: automatonNumStates,
      range: automatonRange,
    })
    .setFunctions([checkMooreNeighbourhood]);
}

var processGameOfLife = getGameOfLifeProcess();
function getGameOfLifeProcess() {
  return gpu
    .createKernel(function (stateMatrix) {
      var i = this.thread.y;
      var j = this.thread.x;
      var r = this.constants.rendererWidth;
      var c = this.constants.rendererHeight;
      var count = 0;
      count = checkMooreNeighbourhood(stateMatrix, i, j, r, c, 1, 1);
      var newState = stateMatrix[i][j];
      if (count < 2 || count > 3) {
        newState = 0;
      } else if (count == 2 || count == 3) {
        newState = stateMatrix[i][j];
        if (count == 3) {
          newState = 1;
        }
      }
      return newState;
    })
    .setOutput([rendererWidth, rendererHeight])
    .setConstants({
      rendererWidth: rendererHeight,
      rendererHeight: rendererWidth,
    })
    .setFunctions([checkMooreNeighbourhood]);
}

var processNuemann = getNueMannProcess();
function getNueMannProcess() {
  return gpu
    .createKernel(function (stateMatrix) {
      var i = this.thread.y;
      var j = this.thread.x;
      var r = this.constants.rendererWidth;
      var c = this.constants.rendererHeight;
      var count = 0;
      var nextState = (stateMatrix[i][j] + 1) % this.constants.numStates;
      count = checkNuemannNeighbourhood(
        stateMatrix,
        i,
        j,
        r,
        c,
        nextState,
        this.constants.range
      );
      if (count >= this.constants.threshold) {
        return nextState;
      } else {
        return stateMatrix[i][j];
      }
    })
    .setOutput([rendererWidth, rendererHeight])
    .setConstants({
      rendererWidth: rendererHeight,
      rendererHeight: rendererWidth,
      threshold: automatonThreshold,
      numStates: automatonNumStates,
      range: automatonRange,
    })
    .setFunctions([checkNuemannNeighbourhood]);
}

var processCross = getCrossProcess();
function getCrossProcess() {
  return gpu
    .createKernel(function (stateMatrix) {
      var i = this.thread.y;
      var j = this.thread.x;
      var r = this.constants.rendererWidth;
      var c = this.constants.rendererHeight;
      var count = 0;
      var nextState = (stateMatrix[i][j] + 1) % this.constants.numStates;
      count = checkCrossNeighbourhood(
        stateMatrix,
        i,
        j,
        r,
        c,
        nextState,
        this.constants.range
      );
      if (count >= this.constants.threshold) {
        return nextState;
      } else {
        return stateMatrix[i][j];
      }
    })
    .setOutput([rendererWidth, rendererHeight])
    .setConstants({
      rendererWidth: rendererHeight,
      rendererHeight: rendererWidth,
      threshold: automatonThreshold,
      numStates: automatonNumStates,
      range: automatonRange,
    })
    .setFunctions([checkCrossNeighbourhood]);
}

function checkNuemannNeighbourhood(stateMatrix, i, j, r, c, nextState, range) {
  var count = 0;
  for (let offset = 1; offset <= range; offset++) {
    if (j + offset < c) {
      if (stateMatrix[i][j + offset] == nextState) {
        count++;
      }
    }
    if (j - offset >= 0) {
      if (stateMatrix[i][j - offset] == nextState) {
        count++;
      }
    }
  }
  var bias = 1;
  for (let iOffset = 1; iOffset <= range; iOffset++) {
    for (let jOffset = -(range - bias); jOffset <= range - bias; jOffset++) {
      if (i - iOffset >= 0 && j + jOffset >= 0 && j + jOffset < c) {
        if (stateMatrix[i - iOffset][j + jOffset] == nextState) {
          count++;
        }
      }
      if (i + iOffset < r && j + jOffset >= 0 && j + jOffset < c) {
        if (stateMatrix[i + iOffset][j + jOffset] == nextState) {
          count++;
        }
      }
    }
    bias++;
  }
  return count;
}

function checkCrossNeighbourhood(stateMatrix, i, j, r, c, nextState, maxRange) {
  var count = 0;
  for (let range = 1; range <= maxRange; range++) {
    for (let k = 1; k <= range; k++) {
      if (i + k < r && j + k < c) {
        if (stateMatrix[i + k][j + k] == nextState) {
          count++;
        }
      }
    }
    for (let k = 1; k <= range; k++) {
      if (i + k < r && j - k >= 0) {
        if (stateMatrix[i + k][j - k] == nextState) {
          count++;
        }
      }
    }
    for (let k = 1; k <= range; k++) {
      if (i - k >= 0 && j + k < c) {
        if (stateMatrix[i - k][j + k] == nextState) {
          count++;
        }
      }
    }
    for (let k = 1; k <= range; k++) {
      if (i - k >= 0 && j - k >= 0) {
        if (stateMatrix[i - k][j - k] == nextState) {
          count++;
        }
      }
    }
  }
  return count;
}

function checkMooreNeighbourhood(stateMatrix, i, j, r, c, nextState, range) {
  var count = 0;
  for (let offset = 1; offset <= range; offset++) {
    if (j + offset < c) {
      if (stateMatrix[i][j + offset] == nextState) {
        count++;
      }
    }
    if (j - offset >= 0) {
      if (stateMatrix[i][j - offset] == nextState) {
        count++;
      }
    }
  }
  for (let iOffset = 1; iOffset <= range; iOffset++) {
    for (let jOffset = -range; jOffset <= range; jOffset++) {
      if (i - iOffset >= 0 && j + jOffset >= 0 && j + jOffset < c) {
        if (stateMatrix[i - iOffset][j + jOffset] == nextState) {
          count++;
        }
      }
      if (i + iOffset < r && j + jOffset >= 0 && j + jOffset < c) {
        if (stateMatrix[i + iOffset][j + jOffset] == nextState) {
          count++;
        }
      }
    }
  }
  return count;
}

function resetState() {
  for (var i = 0; i < rendererHeight; i++) {
    for (var j = 0; j < rendererWidth; j++) {
      var state = Math.floor(Math.random() * automatonNumStates);
      gpuAutomataState[i][j] = state;
    }
  }
}

resetState();
renderer(gpuAutomataState);
/* Reposition the renderer canvas after rendring it once. */
renderer = getRenderer();

function renderAndSwap() {
  renderer(gpuTempState);
  var t = gpuTempState;
  gpuAutomataState = gpuTempState;
  gpuTempState = t;
}

function drawMooreCycles() {
  gpuTempState = processMoore(gpuAutomataState);
  renderAndSwap();
}

function drawCrossCycles() {
  gpuTempState = processCross(gpuAutomataState);
  renderAndSwap();
}

function drawNuewMannCycles() {
  gpuTempState = processNuemann(gpuAutomataState);
  renderAndSwap();
}

function drawGameOfLife() {
  gpuTempState = processGameOfLife(gpuAutomataState);
  renderAndSwap();
}

t1 = Date.now();
var fps_t1 = Date.now();
var fps_t2 = Date.now();
var delay = 0;

function animate() {
  t2 = Date.now();
  fps_t2 = Date.now();
  if (fps_t2 - fps_t1 >= 1000) {
    delay = t2 - t1;
    fps_t1 = fps_t2;
  }
  t1 = t2;
  document.getElementById("info-label").innerHTML = `Processed & plotted ${(
    numPoints / 1000000
  ).toFixed(2)}M points ${Math.round(1000 / delay)} times/second. [${(
    (numPoints * Math.round(1000 / delay)) /
    1000000
  ).toFixed(2)}M points/second.] Phew!!!`;
  if (animationAction) {
    animationAction();
  }
  animationHandle = requestAnimationFrame(animate);
}

window.onItemClicked = onItemClicked;



// ==========================================
  var gpuWorker = new Worker("workers/gpu_worker.js");
  gpuWorker.onmessage = function(e) {
    gpuTempState = e.data;
    renderAndSwap();
    animationHandle = requestAnimationFrame(workerAnimate);
  }

  function workerAnimate() {
    gpuWorker.postMessage({state:gpuAutomataState, rendererHeight : rendererHeight, rendererWidth: rendererWidth, automatonNumStates : automatonNumStates, automatonRange:automatonRange, automatonThreshold : automatonThreshold });
  }
// ===========================================

function onItemClicked(item, element) {
  setSelectedButton(element);
  if (animationHandle) {
    cancelAnimationFrame(animationHandle);
  }
  switch (item) {
    case "square-cycles":
      animationAction = drawMooreCycles;
      automatonRange = 1;
      automatonThreshold = 1;
      automatonNumStates = 16;
      processMoore = getMooreProcess();
      break;
    case "nuemann-cycles":
      animationAction = drawNuewMannCycles;
      automatonRange = 1;
      automatonThreshold = 1;
      automatonNumStates = 16;
      processNuemann = getNueMannProcess();
      break;
    case "cross-cycles":
      animationAction = drawCrossCycles;
      automatonRange = 1;
      automatonThreshold = 1;
      automatonNumStates = 16;
      processCross = getCrossProcess();
      break;
    case "cca-r1t3c4nm":
      animationAction = drawMooreCycles;
      automatonRange = 1;
      automatonThreshold = 3;
      automatonNumStates = 4;
      processMoore = getMooreProcess();
      break;
    case "cca-r1t3c3nm":
      animationAction = drawMooreCycles;
      automatonRange = 1;
      automatonThreshold = 3;
      automatonNumStates = 3;
      processMoore = getMooreProcess();
      break;
    case "game-of-life":
      animationAction = drawGameOfLife;
      automatonRange = 1;
      automatonThreshold = 3;
      automatonNumStates = 2;
      processMoore = getGameOfLifeProcess();
      break;
    case "cca-r2t11c3nm":
      animationAction = drawMooreCycles;
      automatonRange = 2;
      automatonThreshold = 11;
      automatonNumStates = 3;
      processMoore = getMooreProcess();
      break;
    case "cca-r2t5c8nm":
      animationAction = drawMooreCycles;
      automatonRange = 2;
      automatonThreshold = 5;
      automatonNumStates = 8;
      processMoore = getMooreProcess();
      break;
    case "cca-r3t15c3nm":
      animationAction = drawMooreCycles;
      automatonRange = 3;
      automatonThreshold = 15;
      automatonNumStates = 3;
      processMoore = getMooreProcess();
      break;
    case "cca-r2t9c4nm":
      animationAction = drawMooreCycles;
      automatonRange = 2;
      automatonThreshold = 9;
      automatonNumStates = 4;
      processMoore = getMooreProcess();
      break;
    case "cca-r3t10c2nn":
      animationAction = drawNuewMannCycles;
      automatonRange = 3;
      automatonThreshold = 10;
      automatonNumStates = 2;
      processMoore = getNueMannProcess();
      break;
    case "cca-r2t5c3nn":
      animationAction = drawNuewMannCycles;
      automatonRange = 1;
      automatonThreshold = 1;
      automatonNumStates = 5;
      processMoore = getNueMannProcess();
      break;
    default:
      break;
  }
  getColors();
  renderer = getRenderer();
  resetState();
  renderer(gpuAutomataState);
}

window.onStartClicked = onStartClicked;

function onStartClicked() {
  if (animationHandle) {
    cancelAnimationFrame(animationHandle);
  }
  animationHandle = requestAnimationFrame(workerAnimate);
}
