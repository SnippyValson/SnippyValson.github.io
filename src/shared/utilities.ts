export function checkCrossNeighbourhood(stateMatrix: number[][], i: number, j: number, r: number, c: number,
  nextState: number, maxRange: number) {
  let count = 0;
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

export function checkMooreNeighbourhood(stateMatrix: number[][], i: number, j: number, r: number, c: number,
  nextState: number, range: number) {
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

export function checkNuemannNeighbourhood(stateMatrix: number[][], i: number, j: number, r: number, c: number,
  nextState: number, range: number) {
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

export function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export let Array2D = (r: number, c: number) => [...Array(r)].map((x) => Array(c).fill(0));

export function rand(min: number, max: number) {
  return (
    (Math.floor(Math.pow(10, 14) * Math.random() * Math.random()) %
      (max - min + 1)) +
    min
  );
}

export function getNextState(state: number, numStates: number): number {
  return (state + 1) % numStates;
}

export function fillBackground(context: CanvasRenderingContext2D, color: string | CanvasGradient | CanvasPattern, width: number, height: number) {
  context.beginPath();
  context.fillStyle = color;
  context.rect(0, 0, width, height);
  context.fill();
}

export function drawState(context: CanvasRenderingContext2D, automataState: number[][], r: number, c: number, bsize: number, colors: string[]) {
  for (var i = 0; i < r; i++) {
    for (var j = 0; j < c; j++) {
      drawBlock(context, i, j, bsize, colors[automataState[i][j]]);
    }
  }
}

export function drawBlock(context: CanvasRenderingContext2D, x: number, y: number, blockSize: number, color: string | CanvasGradient | CanvasPattern) {
  context.beginPath();
  context.fillStyle = color;
  context.lineWidth = 0;
  context.rect(blockSize * y, blockSize * x, blockSize, blockSize);
  context.fill();
}

function componentToHex(c: number) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r: number, g: number, b: number) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function hexToRgb(hex: string) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

export function getGradientStops(startColor: string, endColor: string, numStops: number) {
  var startRGB = hexToRgb(startColor);
  var endRGB = hexToRgb(endColor);
  var rStep = Math.floor(Math.abs(startRGB.r - endRGB.r) / numStops);
  var gStep = Math.floor(Math.abs(startRGB.g - endRGB.g) / numStops);
  var bStep = Math.floor(Math.abs(startRGB.b - endRGB.b) / numStops);
  var colors = [];
  colors.push(hexToRgb(startColor));
  var s = colors[colors.length - 1];
  for (var i = 0; i < numStops; i++) {
    var c = {
      r: s.r + rStep,
      g: s.g + gStep,
      b: s.b + bStep
    };
    colors.push(c);
    s = colors[colors.length - 1];
  }
  colors.push(hexToRgb(endColor))
  colors = colors.map(c => rgbToHex(c.r, c.g, c.b));
  return colors;
}

export function getGradientStopsRgb(startColor: string, endColor: string, numStops: number) {
  numStops = numStops + 1;
  var startRGB = hexToRgb(startColor);
  var endRGB = hexToRgb(endColor);
  var rStep = (endRGB.r - startRGB.r) / numStops;
  var gStep = (endRGB.g - startRGB.g) / numStops;
  var bStep = (endRGB.b - startRGB.b) / numStops;
  console.log(`${rStep} ${gStep} ${bStep}`);
  var colors = [];
  colors.push(hexToRgb(startColor));
  var s = colors[colors.length - 1];
  for (var i = 0; i < numStops - 1; i++) {
    var c = {
      r: s.r + rStep,
      g: s.g + gStep,
      b: s.b + bStep
    };
    colors.push(c);
    s = colors[colors.length - 1];
  }
  colors.push(hexToRgb(endColor))
  return colors;
}

export function debounce(func: Function, timeoutInterval: number, ...args: any[]) {
  let timeoutHandle: NodeJS.Timeout;
  console.log(args);
  return function debouncedFunction(...args: any[]) {
    console.log(args);
    const later = () => {
      clearTimeout(timeoutHandle);
      func(...args);
    };
    clearTimeout(timeoutHandle);
    timeoutHandle = setTimeout(later, timeoutInterval);
  };
}