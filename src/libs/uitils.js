export function getNuemannNeighbours(x, y, matrix, r, c) {
    var i = x;
    var j = y;
    var neigbours = [];
    if(i-1 >= 0) {
      neigbours.push(matrix[i - 1][j]);
    }
    if(j+1 < c) {
      neigbours.push(matrix[i][j + 1]);
    }
    if(i+1 < r ) {
      neigbours.push(matrix[i + 1][j]);
    }
    if(j-1 >=0) {
      neigbours.push(matrix[i][j - 1]);
    }
    return neigbours;
  }
  
  export function getCrossNeighbours(x, y, matrix, r, c) {
    var i = x;
    var j = y;
    var neigbours = [];
    if(i-1 >= 0 && j-1 >= 0) {
      neigbours.push(matrix[i - 1][j - 1]);
    }
    if(i-1 >= 0 && j+1 < c) {
      neigbours.push(matrix[i - 1][j + 1]);
    }
    if(i+1 < r && j+1 < c) {
      neigbours.push(matrix[i + 1][j + 1]);
    }
    if(i+1 < r && j-1 >=0) {
      neigbours.push(matrix[i + 1][j - 1]);
    }
    return neigbours;
  }
  
  export function getMooreNeighbours(x, y, matrix, r, c) {
    var i = x;
    var j = y;
    var neigbours = [];
    try{
        if(i-1 >= 0 && j-1 >= 0) {
            neigbours.push(matrix[i - 1][j - 1]);
        }
        if(i-1 >= 0) {
            neigbours.push(matrix[i - 1][j]);
        }
        if(i-1 >= 0 && j+1 < c) {
            neigbours.push(matrix[i - 1][j + 1]);
        }
        if(j+1 < c) {
            neigbours.push(matrix[i][j + 1]);
        }
        if(i+1 < r && j+1 < c) {
            neigbours.push(matrix[i + 1][j + 1]);
        }
        if(i+1 < r ) {
            neigbours.push(matrix[i + 1][j]);
        }
        if(i+1 < r && j-1 >=0) {
            neigbours.push(matrix[i + 1][j - 1]);
        }
        if(j-1 >=0) {
            neigbours.push(matrix[i][j - 1]);
        }
    } catch(e){

    }
    return neigbours;
  }
  
  export function getMooreNeighboursWrap(x, y, matrix, r, c) {
    var i = x;
    var j = y;
    var neigbours = [];
    try{
        neigbours.push(matrix[(i - 1 + r) % r][(j - 1 + c) % c]);
        neigbours.push(matrix[(i - 1 + r) % r][j]);
        neigbours.push(matrix[(i - 1 + r) % r][(j + 1 + c) % c]);
        neigbours.push(matrix[i][(j + 1 + c) % c]);
        neigbours.push(matrix[(i + 1 + r) % r][(j + 1 + c) % c]);
        neigbours.push(matrix[(i + 1 + r) % r][j]);
        neigbours.push(matrix[(i + 1 + r) % r][(j - 1 + c) % c]);
        neigbours.push(matrix[i][(j - 1 + c) % c]);
    }
    catch(e) {

    }
    return neigbours;
  }

  export function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
  export let Array2D = (r, c) => [...Array(r)].map((x) => Array(c).fill(0));
  
  export function rand(min, max) {
    return (
      (Math.floor(Math.pow(10, 14) * Math.random() * Math.random()) %
        (max - min + 1)) +
      min
    );
  }
  
  export function getNextState(state, numStates) {
    return (state + 1) % numStates;
  }
  
  export function fillBackground(context ,color, width, height) {
    context.beginPath();
    context.fillStyle = color;
    context.rect(0,0, width, height);
    context.fill();
}

export function drawState(context, automataState, r, c, bsize, colors) {
  for(var i = 0; i < r; i++) {
      for(var j = 0; j < c; j ++) {
          drawBlock(context, i, j, bsize, colors[automataState[i][j]]);
      }
  }
}

export function drawBlock(context, x, y, blockSize, color) {
  context.beginPath();
  context.fillStyle = color;
  context.lineWidth = 0; 
  context.rect(blockSize * y , blockSize * x , blockSize, blockSize);
  context.fill();
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

export function getGradientStops(startColor, endColor, numStops) {
  var startRGB = hexToRgb(startColor);
  var endRGB = hexToRgb(endColor);
  var rStep = Math.floor(Math.abs(startRGB.r - endRGB.r) / numStops);
  var gStep = Math.floor(Math.abs(startRGB.g - endRGB.g) / numStops);
  var bStep = Math.floor(Math.abs(startRGB.b - endRGB.b) / numStops);
  var colors = [];
  colors.push(hexToRgb(startColor));
  var s = colors[colors.length - 1];
  for(var i = 0; i < numStops; i++){
    var c = { r: s.r + rStep, g: s.g + gStep, b: s.b+ bStep };
    colors.push(c);
    s = colors[colors.length - 1];
  }
  colors.push(hexToRgb(endColor))
  colors = colors.map(c=> rgbToHex(c.r, c.g, c.b));
  return colors;
}
