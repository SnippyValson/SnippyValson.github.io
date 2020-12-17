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
var rendererOutlet = document.getElementById(Constants.id.RendererPanel);
var rendererHeight = rendererOutlet.clientHeight;
var rendererWidth = rendererOutlet.clientWidth;
var gpuAutomataState = Array2D(rendererHeight, rendererWidth);
var gpuTempState = Array2D(rendererHeight, rendererWidth);
var style = new Style();
var t1 = performance.now();
var t2 = performance.now();
var fps_t1 = performance.now();
var fps_t2 = performance.now();
var delay = 0;
var listButtons = document.getElementsByClassName(Constants.class.ListButton);
var process;
var renderer;

function setSelectedButton(selectedButton) {
  for (let listButton of listButtons) {
    listButton.classList.add(GlobalConstants.class.PixelButton);
    listButton.classList.remove(GlobalConstants.class.PixelButtonInverted);
  }
  selectedButton.classList.add(GlobalConstants.class.PixelButtonInverted);
  selectedButton.classList.remove(GlobalConstants.class.PixelButton);
}

function updateRenderer(width, height, colors) {
  let renderer = getRenderer(width, height, colors);
  rendererOutlet.innerHTML = "";
  rendererOutlet.appendChild(renderer.canvas);
  return renderer;
}

function resetState(numStates) {
  for (let i = 0; i < rendererHeight; i++) {
    for (let j = 0; j < rendererWidth; j++) {
      let state = Math.floor(Math.random() * numStates);
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

function animate() {
  t2 = performance.now();
  fps_t2 = performance.now();
  if (fps_t2 - fps_t1 >= 1000) {
    delay = t2 - t1;
    fps_t1 = fps_t2;
    document.getElementById(Constants.id.InfoLabel).innerHTML = `Processed & plotted ${(
      (rendererHeight * rendererWidth) / 1000000
    ).toFixed(2)}M points ${Math.round(1000 / delay)} times/second. [${(
      ((rendererHeight * rendererWidth) * Math.round(1000 / delay)) /
      1000000
    ).toFixed(2)}M points/second.] Phew!!!`;
  }
  t1 = t2;
  gpuTempState = process(gpuAutomataState);
  renderAndSwap();
  animationHandle = requestAnimationFrame(animate);
}

window.onItemClicked = onItemClicked;
function onItemClicked(item, element) {
  setSelectedButton(element);
  document.getElementById("start-button").innerHTML = "Start";
  if (animationHandle) {
    cancelAnimationFrame(animationHandle);
  }
  switch (item) {
    case Constants.id.r1t1c16nm:
      setProcess("moore", rendererWidth, rendererHeight, 1, 16, 1);
      break;
    case Constants.id.r1t1c16nn:
      setProcess("neumann", rendererWidth, rendererHeight, 1, 16, 1);
      break;
    case Constants.id.r1t1c16nc:
      setProcess("cross", rendererWidth, rendererHeight, 1, 16, 1);
      break;
    case Constants.id.r1t3c4nm:
      setProcess("moore", rendererWidth, rendererHeight, 3, 4, 1);
      break;
    case Constants.id.r1t3c3nm:
      setProcess("moore", rendererWidth, rendererHeight, 3, 3, 1);
      break;
    case Constants.id.gameoflife:
      setProcess("gol", rendererWidth, rendererHeight, -1, 2, -1);
      break;
    case Constants.id.r2t11c3nm:
      setProcess("moore", rendererWidth, rendererHeight, 11, 3, 2);
      break;
    case Constants.id.r2t5c8nm:
      setProcess("moore", rendererWidth, rendererHeight, 5, 8, 2);
      break;
    case Constants.id.r3t15c3nm:
      setProcess("moore", rendererWidth, rendererHeight, 15, 3, 3);
      break;
    case Constants.id.r2t9c4nm:
      setProcess("moore", rendererWidth, rendererHeight, 9, 4, 2);
      break;
    case Constants.id.r3t10c2nn:
      setProcess("neumann", rendererWidth, rendererHeight, 10, 2, 3);
      break;
    case Constants.id.r2t5c3nn:
      setProcess("neumann", rendererWidth, rendererHeight, 1, 5, 1);
      break;
    default:
      break;
  }
}

function setProcess(processName, width, height, threshold, numStates, range) {
  switch (processName) {
    case "moore": {
      process = getMooreProcess(width, height, threshold, numStates, range);
      reset(width, height, numStates);
    }
    break;
  case "cross": {
    process = getCrossProcess(width, height, threshold, numStates, range);
    reset(width, height, numStates);
  };
  break;
  case "neumann": {
    process = getNueMannProcess(width, height, threshold, numStates, range);
    reset(width, height, numStates);
  }
  break;
  case "gol": {
    process = getGameOfLifeProcess(width, height);
    reset(width, height, numStates);
  }
  break;
  }
}

function reset(width, height, numStates) {
  renderer = updateRenderer(width, height, getColors(style.getCurrentPallet().background, style.getCurrentPallet().foreground, numStates - 2));
  resetState(numStates);
  renderer(gpuAutomataState);
}

window.onStartClicked = onStartClicked;

function onStartClicked() {
  if (document.getElementById("start-button").innerHTML == "Start") {
    document.getElementById("start-button").innerHTML = "Stop";
    if (animationHandle) {
      cancelAnimationFrame(animationHandle);
    }
    animationHandle = requestAnimationFrame(animate);
  } else {
    document.getElementById("start-button").innerHTML = "Start";
    if (animationHandle) {
      cancelAnimationFrame(animationHandle);
    }
  }
}

style.applyStyle();
renderer = updateRenderer(rendererWidth, rendererHeight, getColors(style.getCurrentPallet().background, style.getCurrentPallet().foreground, 16 - 2));
resetState(16);
renderer(gpuAutomataState);
/* Reposition the renderer canvas after rendring it once. */
renderer = updateRenderer();
t1 = performance.now();
setProcess("moore", rendererWidth, rendererHeight, 1, 16, 1);
setSelectedButton(document.getElementById(Constants.id.r1t1c16nm));
