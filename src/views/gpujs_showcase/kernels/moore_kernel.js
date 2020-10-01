import { GPU } from "gpu.js";
const gpu = new GPU();

export function getMooreProcess(rendererWidth, rendererHeight, automatonThreshold, automatonNumStates, automatonRange) {
    return gpu
      .createKernel(function (stateMatrix) {
        let i = this.thread.y;
        let j = this.thread.x;
        let r = this.constants.rendererHeight;
        let c = this.constants.rendererWidth;
        let count = 0;
        let nextState = (stateMatrix[i][j] + 1) % this.constants.numStates;
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

  function checkMooreNeighbourhood(stateMatrix, i, j, r, c, nextState, range) {
    let count = 0;
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