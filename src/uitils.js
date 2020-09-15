export function getNuemannNeighbours(x, y, matrix, r, c) {
    var i = x;
    var j = y;
    var neigbours = [];
    /* First row. */
    if (i === 0) {
      /* First element of first row. */
      if (j === 0) {
        neigbours.push(matrix[i][j + 1]);
        neigbours.push(matrix[i + 1][j]);
        /* Last element of the first row.*/
      } else if (j === c - 1) {
        neigbours.push(matrix[i + 1][j]);
        neigbours.push(matrix[i][j - 1]);
      } else {
        neigbours.push(matrix[i][j + 1]);
        neigbours.push(matrix[i + 1][j]);
        neigbours.push(matrix[i][j - 1]);
      }
      /* Last row. */
    } else if (i === r - 1) {
      /* First element of last row. */
      if (j === 0) {
        neigbours.push(matrix[i - 1][j]);
        neigbours.push(matrix[i][j + 1]);
        /* Last element of the last row.*/
      } else if (j === c - 1) {
        neigbours.push(matrix[i - 1][j]);
        neigbours.push(matrix[i][j - 1]);
      } else {
        neigbours.push(matrix[i - 1][j]);
        neigbours.push(matrix[i][j + 1]);
        neigbours.push(matrix[i][j - 1]);
      }
      /* First column */
    } else if (j === 0) {
      neigbours.push(matrix[i - 1][j]);
      neigbours.push(matrix[i][j + 1]);
      neigbours.push(matrix[i + 1][j]);
      /* Last column */
    } else if (j === c - 1) {
      neigbours.push(matrix[i + 1][j]);
      neigbours.push(matrix[i + 1][j]);
      neigbours.push(matrix[i][j - 1]);
    } else {
      neigbours.push(matrix[i - 1][j]);
      neigbours.push(matrix[i][j + 1]);
      neigbours.push(matrix[i + 1][j]);
      neigbours.push(matrix[i][j - 1]);
    }
    return neigbours;
  }
  
  export function getCrossNeighbours(x, y, matrix, r, c) {
    var i = x;
    var j = y;
    var neigbours = [];
    /* First row. */
    if (i === 0) {
      /* First element of first row. */
      if (j === 0) {
        neigbours.push(matrix[i + 1][j + 1]);
        /* Last element of the first row.*/
      } else if (j === c - 1) {
        neigbours.push(matrix[i + 1][j - 1]);
      } else {
        neigbours.push(matrix[i + 1][j + 1]);
        neigbours.push(matrix[i + 1][j - 1]);
      }
      /* Last row. */
    } else if (i === r - 1) {
      /* First element of last row. */
      if (j === 0) {
        neigbours.push(matrix[i - 1][j + 1]);
        /* Last element of the last row.*/
      } else if (j === c - 1) {
        neigbours.push(matrix[i - 1][j - 1]);
      } else {
        neigbours.push(matrix[i - 1][j - 1]);
        neigbours.push(matrix[i - 1][j + 1]);
      }
      /* First column */
    } else if (j === 0) {
      neigbours.push(matrix[i - 1][j + 1]);
      neigbours.push(matrix[i + 1][j + 1]);
      /* Last column */
    } else if (j === c - 1) {
      neigbours.push(matrix[i - 1][j - 1]);
      neigbours.push(matrix[i + 1][j - 1]);
    } else {
      neigbours.push(matrix[i - 1][j - 1]);
      neigbours.push(matrix[i - 1][j + 1]);
      neigbours.push(matrix[i + 1][j + 1]);
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

export function drawBooleanState(context, automataState, r, c, bsize, fg, bg) {
  for(var i = 0; i < r; i++) {
      for(var j = 0; j < c; j ++) {
          if(automataState[i][j] == true) {
              context.beginPath();
              context.fillStyle = fg;
              context.rect(bsize * j , bsize * i , bsize, bsize);
              context.fill();
          } else {
              context.beginPath();
              context.fillStyle = bg;
              context.rect(bsize * j , bsize * i , bsize , bsize );
              context.fill();
          }
      }
  }
}
