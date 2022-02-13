import { GPU, IKernelFunctionThis, ThreadKernelVariable } from "gpu.js";

interface IMooreConstants {
  rendererWidth: number,
  rendererHeight: number,
  threshold: number,
  numStates: number,
  range: number,
}

type MooreThis = {
  constants: IMooreConstants
} & IKernelFunctionThis;

var gpu: GPU = new GPU();
var processMoore: any;
var rendererHeight: number = 0;
var rendererWidth: number = 0;
var automatonThreshold: number = 1;
var automatonNumStates: number = 16;
var automatonRange: number = 1;
var state: number[][];

onmessage = function (e) {
  switch (e.data.mode) {
    case "create": {
      rendererHeight = e.data.rendererHeight;
      rendererWidth = e.data.rendererWidth;
      automatonThreshold = e.data.automatonThreshold;
      automatonNumStates = e.data.automatonNumStates;
      automatonRange = e.data.automatonRange;
      processMoore = getMooreProcess();
    } break;
    default: {
      state = e.data.state;
      var output = processMoore(state);
      postMessage(output);
    } break;
  }
}

function mooreKernelFunction(this: MooreThis, stateMatrix: number[][]) {
  var i = this.thread.y;
  var j = this.thread.x;
  var r = this.constants.rendererHeight;
  var c = this.constants.rendererWidth;
  var count = 0;
  var nextState = (stateMatrix[i][j] + 1) % this.constants.numStates;
  count = checkMooreNeighbourhood(stateMatrix, i, j, r, c, nextState, this.constants.range);
  if (count >= this.constants.threshold) {
    return nextState;
  } else {
    return stateMatrix[i][j];
  }
}

function getMooreProcess() {
  return gpu
    .createKernel<typeof mooreKernelFunction>(mooreKernelFunction)
    .setOutput([rendererWidth, rendererHeight])
    .setConstants<IMooreConstants>({
      rendererWidth: rendererWidth,
      rendererHeight: rendererHeight,
      threshold: automatonThreshold,
      numStates: automatonNumStates,
      range: automatonRange,
    })
    .setFunctions([checkMooreNeighbourhood]);
}

function checkMooreNeighbourhood(stateMatrix: number[][], i: number, j: number, r: number, c: number, nextState: number, range: number) {
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