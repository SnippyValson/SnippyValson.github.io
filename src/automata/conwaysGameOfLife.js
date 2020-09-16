import { Array2D, getMooreNeighbours, drawBooleanState, drawBlock } from './../uitils'

export class ConwaysGameOfLife {
    
    state;
    tempState;
    colors;
    size;
    drawingContext;
    blockSize;

    /*
     *  Initialize the states and randomize it.
     */
    constructor(rows, cols, colors, context, blocksize) {
        this.size = { rows : Math.round(rows), cols : Math.round(cols) };
        this.colors = colors;
        this.state =  Array2D(this.size.rows, this.size.cols);
        this.tempState = Array2D(this.size.rows, this.size.cols);
        this.drawingContext = context;
        this.blockSize = blocksize;
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

    calculateAndDrawNextState() {
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
                    if(this.state[i][j]) {
                        this.tempState[i][j] = false;
                        drawBlock(this.drawingContext, i, j, this.blockSize, this.colors[1]);
                    }
                } else if( liveCount == 2 || liveCount == 3) {
                    this.tempState[i][j] = this.state[i][j];
                    if(liveCount == 3) {
                        if(!this.state[i][j]) {
                            this.tempState[i][j] = true;
                            drawBlock(this.drawingContext, i, j, this.blockSize, this.colors[0]);
                       }
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

    drawCurrentState() {
        drawBooleanState(this.drawingContext, this.state, this.size.rows, this.size.cols, this.blockSize, this.colors[0], this.colors[1]);
    }
}