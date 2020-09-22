import "./../../main.css";
import "./gpujs_showcase.css";
import { Style } from "../../libs/style";
import { GPU } from "gpu.js";
import { Array2D, getGradientStopsRgb } from "./../../libs/uitils.js";

var animationHandle;
var animationAction;
var rendererOutlet = document.getElementById("renderer-panel");
var rendererSize = 750;
var gpuAutomataState = Array2D(rendererSize, rendererSize);
var gpuTempState = Array2D(rendererSize, rendererSize);
var automatonThreshold = 1;
var automatonNumStates = 16;
var style = new Style();
style.applyStyle();
var gpu = new GPU();
var constants;
var colors;

getColors();

function getColors() {
  colors = getGradientStopsRgb(
    style.getCurrentPallet().background,
    style.getCurrentPallet().foreground,
    automatonNumStates - 2
  );
  console.table(16 - colors.length);
  if (colors.length < 16) {
    var length = colors.length;
    for (var i = 0; i < 16 - length; i++) {
      colors.push({ r: 0, g: 0, b: 0 });
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
      if (stateMatrix[this.thread.x][this.thread.y] === 0) {
        this.color(
          this.constants.color0r,
          this.constants.color0g,
          this.constants.color0b
        );
      } else if (stateMatrix[this.thread.x][this.thread.y] === 1) {
        this.color(
          this.constants.color1r,
          this.constants.color1g,
          this.constants.color1b
        );
      } else if (stateMatrix[this.thread.x][this.thread.y] === 2) {
        this.color(
          this.constants.color2r,
          this.constants.color2g,
          this.constants.color2b
        );
      } else if (stateMatrix[this.thread.x][this.thread.y] === 3) {
        this.color(
          this.constants.color3r,
          this.constants.color3g,
          this.constants.color3b
        );
      } else if (stateMatrix[this.thread.x][this.thread.y] === 4) {
        this.color(
          this.constants.color4r,
          this.constants.color4g,
          this.constants.color4b
        );
      } else if (stateMatrix[this.thread.x][this.thread.y] === 5) {
        this.color(
          this.constants.color5r,
          this.constants.color5g,
          this.constants.color5b
        );
      } else if (stateMatrix[this.thread.x][this.thread.y] === 6) {
        this.color(
          this.constants.color6r,
          this.constants.color6g,
          this.constants.color6b
        );
      } else if (stateMatrix[this.thread.x][this.thread.y] === 7) {
        this.color(
          this.constants.color7r,
          this.constants.color7g,
          this.constants.color7b
        );
      } else if (stateMatrix[this.thread.x][this.thread.y] === 8) {
        this.color(
          this.constants.color8r,
          this.constants.color8g,
          this.constants.color8b
        );
      } else if (stateMatrix[this.thread.x][this.thread.y] === 9) {
        this.color(
          this.constants.color9r,
          this.constants.color9g,
          this.constants.color9b
        );
      } else if (stateMatrix[this.thread.x][this.thread.y] === 10) {
        this.color(
          this.constants.color10r,
          this.constants.color10g,
          this.constants.color10b
        );
      } else if (stateMatrix[this.thread.x][this.thread.y] === 11) {
        this.color(
          this.constants.color11r,
          this.constants.color11g,
          this.constants.color11b
        );
      } else if (stateMatrix[this.thread.x][this.thread.y] === 12) {
        this.color(
          this.constants.color12r,
          this.constants.color12g,
          this.constants.color12b
        );
      } else if (stateMatrix[this.thread.x][this.thread.y] === 13) {
        this.color(
          this.constants.color13r,
          this.constants.color13g,
          this.constants.color13b
        );
      } else if (stateMatrix[this.thread.x][this.thread.y] === 14) {
        this.color(
          this.constants.color14r,
          this.constants.color14g,
          this.constants.color14b
        );
      } else if (stateMatrix[this.thread.x][this.thread.y] === 15) {
        this.color(
          this.constants.color15r,
          this.constants.color15g,
          this.constants.color15b
        );
      }
    })
    .setOutput([rendererSize, rendererSize])
    .setGraphical(true)
    .setConstants(constants);
  var rendererCanvas = rndrr.canvas;
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
      var r = this.constants.rendererSize;
      var c = this.constants.rendererSize;
      var count = 0;
      var nextState = (stateMatrix[i][j] + 1) % this.constants.numStates;
      count = checkMooreNeighbourhood(stateMatrix, i, j, r, c, nextState);
      if (count >= this.constants.threshold) {
        return nextState;
      } else {
        return stateMatrix[i][j];
      }
    })
    .setOutput([rendererSize, rendererSize])
    .setConstants({
      rendererSize: rendererSize,
      threshold: automatonThreshold,
      numStates: automatonNumStates,
    })
    .setFunctions([checkMooreNeighbourhood]);
}

var processGameOfLife = getGameOfLifeProcess();
function getGameOfLifeProcess() {
  return gpu
    .createKernel(function (stateMatrix) {
      var i = this.thread.y;
      var j = this.thread.x;
      var r = this.constants.rendererSize;
      var c = this.constants.rendererSize;
      var count = 0;
      count = checkMooreNeighbourhood(stateMatrix, i, j, r, c, 1);
      var newState = stateMatrix[i][j];
      if (count < 2 || count > 3) {
        newState = 0;
      } else if (count == 2 || count == 3) {
        newState = stateMatrix[i][j];
        if(count == 3){
          newState = 1;
        }
      }
      return newState;
    })
    .setOutput([rendererSize, rendererSize])
    .setConstants({
      rendererSize: rendererSize,
    })
    .setFunctions([checkMooreNeighbourhood]);
}

var processNuemann = getNueMannProcess();
function getNueMannProcess() {
  return gpu
    .createKernel(function (stateMatrix) {
      var i = this.thread.y;
      var j = this.thread.x;
      var r = this.constants.rendererSize;
      var c = this.constants.rendererSize;
      var count = 0;
      var nextState = (stateMatrix[i][j] + 1) % this.constants.numStates;
      count = checkNuemannNeighbourhood(stateMatrix, i, j, r, c, nextState);
      if (count >= this.constants.threshold) {
        return nextState;
      } else {
        return stateMatrix[i][j];
      }
    })
    .setOutput([rendererSize, rendererSize])
    .setConstants({
      rendererSize: rendererSize,
      threshold: automatonThreshold,
      numStates: automatonNumStates,
    })
    .setFunctions([checkNuemannNeighbourhood]);
}

var processCross = getCrossProcess();
function getCrossProcess() {
  return gpu
    .createKernel(function (stateMatrix) {
      var i = this.thread.y;
      var j = this.thread.x;
      var r = this.constants.rendererSize;
      var c = this.constants.rendererSize;
      var count = 0;
      var nextState = (stateMatrix[i][j] + 1) % this.constants.numStates;
      count = checkCrossNeighbourhood(stateMatrix, i, j, r, c, nextState);
      if (count >= this.constants.threshold) {
        return nextState;
      } else {
        return stateMatrix[i][j];
      }
    })
    .setOutput([rendererSize, rendererSize])
    .setConstants({
      rendererSize: rendererSize,
      threshold: automatonThreshold,
      numStates: automatonNumStates,
    })
    .setFunctions([checkCrossNeighbourhood]);
}

function checkNuemannNeighbourhood(stateMatrix, i, j, r, c, nextState) {
  var count = 0;
  if (i - 1 >= 0) {
    if (stateMatrix[i - 1][j] == nextState) {
      count++;
    }
  }
  if (j + 1 < c) {
    if (stateMatrix[i][j + 1] == nextState) {
      count++;
    }
  }
  if (i + 1 < r) {
    if (stateMatrix[i + 1][j] == nextState) {
      count++;
    }
  }
  if (j - 1 >= 0) {
    if (stateMatrix[i][j - 1] == nextState) {
      count++;
    }
  }
  return count;
}

function checkCrossNeighbourhood(stateMatrix, i, j, r, c, nextState) {
  var count = 0;
  if (i - 1 >= 0 && j - 1 >= 0) {
    if (stateMatrix[i - 1][j - 1] == nextState) {
      count++;
    }
  }
  if (i - 1 >= 0 && j + 1 < c) {
    if (stateMatrix[i - 1][j + 1] == nextState) {
      count++;
    }
  }
  if (i + 1 < r && j + 1 < c) {
    if (stateMatrix[i + 1][j + 1] == nextState) {
      count++;
    }
  }
  if (i + 1 < r && j - 1 >= 0) {
    if (stateMatrix[i + 1][j - 1] == nextState) {
      count++;
    }
  }
  return count;
}

function checkMooreNeighbourhood(stateMatrix, i, j, r, c, nextState) {
  var count = 0;
  if (i - 1 >= 0 && j - 1 >= 0) {
    if (stateMatrix[i - 1][j - 1] == nextState) {
      count++;
    }
  }
  if (i - 1 >= 0) {
    if (stateMatrix[i - 1][j] == nextState) {
      count++;
    }
  }
  if (i - 1 >= 0 && j + 1 < c) {
    if (stateMatrix[i - 1][j + 1] == nextState) {
      count++;
    }
  }
  if (j + 1 < c) {
    if (stateMatrix[i][j + 1] == nextState) {
      count++;
    }
  }
  if (i + 1 < r && j + 1 < c) {
    if (stateMatrix[i + 1][j + 1] == nextState) {
      count++;
    }
  }
  if (i + 1 < r) {
    if (stateMatrix[i + 1][j] == nextState) {
      count++;
    }
  }
  if (i + 1 < r && j - 1 >= 0) {
    if (stateMatrix[i + 1][j - 1] == nextState) {
      count++;
    }
  }
  if (j - 1 >= 0) {
    if (stateMatrix[i][j - 1] == nextState) {
      count++;
    }
  }
  return count;
}

function resetState() {
  for (var i = 0; i < rendererSize; i++) {
    for (var j = 0; j < rendererSize; j++) {
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

function animate() {
  if (animationAction) {
    animationAction();
  }
  animationHandle = requestAnimationFrame(animate);
}

window.onItemClicked = onItemClicked;
function onItemClicked(item) {
  if (animationHandle) {
    cancelAnimationFrame(animationHandle);
  }
  switch (item) {
    case "square-cycles":
      animationAction = drawMooreCycles;
      automatonNumStates = 16;
      automatonThreshold = 1;
      processMoore = getMooreProcess();
      break;
    case "nuemann-cycles":
      animationAction = drawNuewMannCycles;
      automatonNumStates = 16;
      automatonThreshold = 1;
      processNuemann = getNueMannProcess();
      break;
    case "cross-cycles":
      animationAction = drawCrossCycles;
      automatonNumStates = 16;
      automatonThreshold = 1;
      processCross = getCrossProcess();
      break;
    case "cca-r1t3c4nm":
      animationAction = drawMooreCycles;
      automatonNumStates = 4;
      automatonThreshold = 3;
      processMoore = getMooreProcess();
      break;
    case "cca-r1t3c3nm":
      animationAction = drawMooreCycles;
      automatonNumStates = 3;
      automatonThreshold = 3;
      processMoore = getMooreProcess();
      break;
    case "game-of-life":
      animationAction = drawGameOfLife;
      automatonNumStates = 2;
      automatonThreshold = 3;
      processMoore = getGameOfLifeProcess();
      break;
    default:
      break;
  }
  getColors();
  console.table(constants);
  renderer = getRenderer();
  resetState();
  renderer(gpuAutomataState);
}

window.onStartClicked = onStartClicked;
function onStartClicked() {
  if (animationHandle) {
    cancelAnimationFrame(animationHandle);
  }
  animationHandle = requestAnimationFrame(animate);
}
