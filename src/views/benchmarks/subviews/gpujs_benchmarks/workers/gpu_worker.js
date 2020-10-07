import {
    GPU
  } from "gpu.js";
  
  var gpu = new GPU();
  var processMoore;
  var rendererHeight = 0;
  var rendererWidth = 0;
  var automatonThreshold = 1;
  var automatonNumStates = 16;
  var automatonRange = 1;
  var state;
  
  onmessage = function (e) {
    switch(e.data.mode) {
      case "create" : {
        rendererHeight = e.data.rendererHeight;
        rendererWidth = e.data.rendererWidth;
        automatonThreshold = e.data.automatonThreshold;
        automatonNumStates = e.data.automatonNumStates;
        automatonRange = e.data.automatonRange;
        processMoore = getMooreProcess();
      }break;
      default : {
        state = e.data.state;
        var output = processMoore(state);
        postMessage(output);
      }break;
    }
  }
  
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