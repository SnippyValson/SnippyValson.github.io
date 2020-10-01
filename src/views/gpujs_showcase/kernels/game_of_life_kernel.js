import { GPU } from "gpu.js";
const gpu = new GPU();

export function getGameOfLifeProcess(rendererWidth, rendererHeight) {
    return gpu
      .createKernel(function (stateMatrix) {
        let i = this.thread.y;
        let j = this.thread.x;
        let r = this.constants.rendererWidth;
        let c = this.constants.rendererHeight;
        let count = 0;
        count = checkMooreNeighbourhood(stateMatrix, i, j, r, c, 1, 1);
        let newState = stateMatrix[i][j];
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