import { Array2D, getMooreNeighbours, drawBooleanState } from './../uitils'

export class ConwaysGameOfLife {
    
    state;
    tempState;
    colors;
    size;

    /*
     *  Initialize the states and randomize it.
     */
    constructor(rows, cols, colors) {
        this.size = { rows : Math.round(rows), cols : Math.round(cols) };
        this.colors = colors;
        this.state =  Array2D(this.size.rows, this.size.cols);
        this.tempState = Array2D(this.size.rows, this.size.cols);
        for(var i = 0 ; i < this.size.rows; i ++) {
            for(var j = 0; j < this.size.cols; j ++) {
                this.state[i][j] = Math.random() >= 0.5;
            }
        }
    }

    randomize() {
        for(var i = 0 ; i < this.size.rows; i ++) {
            for(var j = 0; j < this.size.cols; j ++) {
                this.state[i][j] = Math.random() >= 0.5;
                this.tempState[i][j] = false;
            }
        }
    }

    calculateNextState() {
        for(var i = 0; i < this.size.rows; i++) {
            for(var j = 0; j < this.size.cols; j ++) {
                var neighbours = getMooreNeighbours(i, j, this.state, this.size.rows, this.size.cols);
                var liveCount = 0;
                neighbours.forEach(neighbour => {
                    if(neighbour) {
                        liveCount ++;
                    }
                });
                if(liveCount < 2 || liveCount > 3){
                    this.tempState[i][j] = false;
                } else if( liveCount == 2 || liveCount == 3) {
                    this.tempState[i][j] = this.state[i][j];
                    if(liveCount == 3){
                        this.tempState[i][j] = true;
                    }
                }
            }
        }
        for(var i = 0; i < this.size.rows; i++) {
            for(var j = 0; j < this.size.cols; j ++) {
                this.state[i][j] = this.tempState[i][j];
            }
        }
    }

    getCurrentState() {
        return this.state;
    }

    drawCurrentState(context, blockSize) {
        drawBooleanState(context, this.state, this.size.rows, this.size.cols, blockSize, this.colors[0], this.colors[1]);
    }
}