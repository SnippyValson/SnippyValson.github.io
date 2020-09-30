import { GPU } from "gpu.js";
var gpu = new GPU();

export function getCrossProcess(rendererWidth, rendererHeight, automatonThreshold, automatonNumStates, automatonRange) {
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