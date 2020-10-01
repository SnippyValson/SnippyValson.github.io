import "./../../main.css";
import "./gpujs_showcase.css";
import {
  Style
} from "../../global/style";
import {
  Array2D
} from "./../../libs/uitils.js";
import {
  getMooreProcess
} from "./kernels/moore_kernel";
import {
  getGameOfLifeProcess
} from "./kernels/game_of_life_kernel";
import {
  getNueMannProcess
} from "./kernels/neumann_kernel";
import {
  getCrossProcess
} from "./kernels/cross_kernel";
import {
  getRenderer
} from "./kernels/render_kernel";
import {
  Constants
} from "./constants/constants";
import {
  getColors
} from "./utils";
import {
  Constants as GlobalConstants
} from "../../global/constants";

var animationHandle;
var animationAction;
var rendererOutlet = document.getElementById(Constants.id.RendererPanel);
var rendererHeight = rendererOutlet.clientHeight - 20;
var rendererWidth = rendererOutlet.clientWidth - 20;
var gpuAutomataState = Array2D(rendererHeight, rendererWidth);
var gpuTempState = Array2D(rendererHeight, rendererWidth);
var automatonThreshold = 1;
var automatonNumStates = 16;
var automatonRange = 1;
var style = new Style();
var rendererColors;
var t1 = performance.now();
var t2 = performance.now();
var fps_t1 = performance.now();
var fps_t2 = performance.now();
var delay = 0;
var numPoints = rendererHeight * rendererWidth;
var listButtons = document.getElementsByClassName(Constants.class.ListButton);
var processMoore = getMooreProcess(rendererWidth, rendererHeight, automatonThreshold, automatonNumStates, automatonRange);
var processGameOfLife = getGameOfLifeProcess(rendererWidth, rendererHeight);
var processNuemann = getNueMannProcess(rendererWidth, rendererHeight, automatonThreshold, automatonNumStates, automatonRange);
var processCross = getCrossProcess(rendererWidth, rendererHeight, automatonThreshold, automatonNumStates, automatonRange);
var renderer;

function setSelectedButton(selectedButton) {
  for (let listButton of listButtons) {
    listButton.classList.add(GlobalConstants.class.PixelButton);
    listButton.classList.remove(GlobalConstants.class.PixelButtonInverted);
  }
  selectedButton.classList.add(GlobalConstants.class.PixelButtonInverted);
  selectedButton.classList.remove(GlobalConstants.class.PixelButton);
}

function updateRenderer() {
  let renderer = getRenderer(rendererWidth, rendererHeight, rendererColors);
  let rendererCanvas = renderer.canvas;
  rendererOutlet.innerHTML = "";
  rendererOutlet.appendChild(renderer.canvas);
  rendererCanvas.style.marginTop = `${
    (rendererOutlet.clientHeight - rendererCanvas.clientHeight) / 2
  }${GlobalConstants.units.Pixel}`;
  rendererCanvas.style.marginLeft = `${
    (rendererOutlet.clientWidth - rendererCanvas.clientWidth) / 2
  }${GlobalConstants.units.Pixel}`;
  return renderer;
}

function resetState() {
  for (let i = 0; i < rendererHeight; i++) {
    for (let j = 0; j < rendererWidth; j++) {
      let state = Math.floor(Math.random() * automatonNumStates);
      gpuAutomataState[i][j] = state;
    }
  }
}

function renderAndSwap() {
  renderer(gpuTempState);
  let t = gpuTempState;
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
  t2 = performance.now();
  fps_t2 = performance.now();
  if (fps_t2 - fps_t1 >= 1000) {
    delay = t2 - t1;
    fps_t1 = fps_t2;
    document.getElementById(Constants.id.InfoLabel).innerHTML = `Processed & plotted ${(
      numPoints / 1000000
    ).toFixed(2)}M points ${Math.round(1000 / delay)} times/second. [${(
      (numPoints * Math.round(1000 / delay)) /
      1000000
    ).toFixed(2)}M points/second.] Phew!!!`;
  }
  t1 = t2;
  if (animationAction) {
    animationAction();
  }
  animationHandle = requestAnimationFrame(animate);
}

window.onItemClicked = onItemClicked;
function onItemClicked(item, element) {
  setSelectedButton(element);
  if (animationHandle) {
    cancelAnimationFrame(animationHandle);
  }
  switch (item) {
    case Constants.id.r1t1c16nm:
      animationAction = drawMooreCycles;
      automatonRange = 1;
      automatonThreshold = 1;
      automatonNumStates = 16;
      processMoore = getMooreProcess(rendererWidth, rendererHeight, automatonThreshold, automatonNumStates, automatonRange);
      break;
    case Constants.id.r1t1c16nn:
      animationAction = drawNuewMannCycles;
      automatonRange = 1;
      automatonThreshold = 1;
      automatonNumStates = 16;
      processNuemann = getNueMannProcess(rendererWidth, rendererHeight, automatonThreshold, automatonNumStates, automatonRange);
      break;
    case Constants.id.r1t1c16nc:
      animationAction = drawCrossCycles;
      automatonRange = 1;
      automatonThreshold = 1;
      automatonNumStates = 16;
      processCross = getCrossProcess(rendererWidth, rendererHeight, automatonThreshold, automatonNumStates, automatonRange);
      break;
    case Constants.id.r1t3c4nm:
      animationAction = drawMooreCycles;
      automatonRange = 1;
      automatonThreshold = 3;
      automatonNumStates = 4;
      processMoore = getMooreProcess(rendererWidth, rendererHeight, automatonThreshold, automatonNumStates, automatonRange);
      break;
    case Constants.id.r1t3c3nm:
      animationAction = drawMooreCycles;
      automatonRange = 1;
      automatonThreshold = 3;
      automatonNumStates = 3;
      processMoore = getMooreProcess(rendererWidth, rendererHeight, automatonThreshold, automatonNumStates, automatonRange);
      break;
    case Constants.id.gameoflife:
      animationAction = drawGameOfLife;
      automatonRange = 1;
      automatonThreshold = 3;
      automatonNumStates = 2;
      processMoore = getGameOfLifeProcess(rendererWidth, rendererHeight);
      break;
    case Constants.id.r2t11c3nm:
      animationAction = drawMooreCycles;
      automatonRange = 2;
      automatonThreshold = 11;
      automatonNumStates = 3;
      processMoore = getMooreProcess(rendererWidth, rendererHeight, automatonThreshold, automatonNumStates, automatonRange);
      break;
    case Constants.id.r2t5c8nm:
      animationAction = drawMooreCycles;
      automatonRange = 2;
      automatonThreshold = 5;
      automatonNumStates = 8;
      processMoore = getMooreProcess(rendererWidth, rendererHeight, automatonThreshold, automatonNumStates, automatonRange);
      break;
    case Constants.id.r3t15c3nm:
      animationAction = drawMooreCycles;
      automatonRange = 3;
      automatonThreshold = 15;
      automatonNumStates = 3;
      processMoore = getMooreProcess(rendererWidth, rendererHeight, automatonThreshold, automatonNumStates, automatonRange);
      break;
    case Constants.id.r2t9c4nm:
      animationAction = drawMooreCycles;
      automatonRange = 2;
      automatonThreshold = 9;
      automatonNumStates = 4;
      processMoore = getMooreProcess(rendererWidth, rendererHeight, automatonThreshold, automatonNumStates, automatonRange);
      break;
    case Constants.id.r3t10c2nn:
      animationAction = drawNuewMannCycles;
      automatonRange = 3;
      automatonThreshold = 10;
      automatonNumStates = 2;
      processNuemann = getNueMannProcess(rendererWidth, rendererHeight, automatonThreshold, automatonNumStates, automatonRange);
      break;
    case Constants.id.r2t5c3nn:
      animationAction = drawNuewMannCycles;
      automatonRange = 1;
      automatonThreshold = 1;
      automatonNumStates = 5;
      processNuemann = getNueMannProcess(rendererWidth, rendererHeight, automatonThreshold, automatonNumStates, automatonRange);
      break;
    default:
      break;
  }
  rendererColors = getColors(style.getCurrentPallet().background, style.getCurrentPallet().foreground, automatonNumStates - 2);
  renderer = updateRenderer();
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

style.applyStyle();
rendererColors = getColors(style.getCurrentPallet().background, style.getCurrentPallet().foreground, automatonNumStates - 2);
renderer = updateRenderer();
resetState();
renderer(gpuAutomataState);
/* Reposition the renderer canvas after rendring it once. */
renderer = updateRenderer();
t1 = performance.now();