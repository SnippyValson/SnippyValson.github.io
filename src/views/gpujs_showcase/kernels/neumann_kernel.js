import { GPU } from "gpu.js";
var gpu = new GPU();

export function getNueMannProcess(rendererWidth, rendererHeight, automatonThreshold, automatonNumStates, automatonRange) {
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