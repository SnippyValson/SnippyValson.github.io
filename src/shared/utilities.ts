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

export function drawMatrix(context: CanvasRenderingContext2D, matrix: number[][], rowCount: number, columnCount: number, blockSize: number, colors: string[]) {
  for (var i = 0; i < rowCount; i++) {
    for (var j = 0; j < columnCount; j++) {
      drawBlock(context, i, j, blockSize, colors[matrix[i][j]]);
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

export type StateColors = {
  color0r: number,
  color0g: number,
  color0b: number,
  color1r: number,
  color1g: number,
  color1b: number,
  color2r: number,
  color2g: number,
  color2b: number,
  color3r: number,
  color3g: number,
  color3b: number,
  color4r: number,
  color4g: number,
  color4b: number,
  color5r: number,
  color5g: number,
  color5b: number,
  color6r: number,
  color6g: number,
  color6b: number,
  color7r: number,
  color7g: number,
  color7b: number,
  color8r: number,
  color8g: number,
  color8b: number,
  color9r: number,
  color9g: number,
  color9b: number,
  color10r: number,
  color10g: number,
  color10b: number,
  color11r: number,
  color11g: number,
  color11b: number,
  color12r: number,
  color12g: number,
  color12b: number,
  color13r: number,
  color13g: number,
  color13b: number,
  color14r: number,
  color14g: number,
  color14b: number,
  color15r: number,
  color15g: number,
  color15b: number
}

export function getGradientStops16(color1: string, color2: string, numStops: number): StateColors {
    let colors = getGradientStopsRgb(color1, color2, numStops);
    if (colors.length < 16) {
      let length = colors.length;
      for (let i = 0; i < 16 - length; i++) {
        colors.push({ r: 0, g: 0, b: 0});
      }
    }
    return <StateColors>{
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