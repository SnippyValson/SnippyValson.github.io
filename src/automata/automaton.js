import { drawState, Array2D } from './../libs/uitils'

export class Automaton {

    size;
    drawingContext;
    colors;
    numStates;
    range;
    threshold;
    blockSize;
    state;
    tempState;
    neighbourhood;

    constructor(rows, cols, colors, context, blockSize, numStates, range, threshold, neighbourhood) {
        this.size = { rows : Math.round(rows), cols : Math.round(cols) };
        this.drawingContext = context;
        this.colors = colors;
        this.numStates = numStates;
        this.range = range;
        this.threshold = threshold;
        this.blockSize = blockSize;
        this.state =  Array2D(this.size.rows, this.size.cols);
        this.tempState = Array2D(this.size.rows, this.size.cols);
        this.neighbourhood = neighbourhood;
        for(var i = 0 ; i < this.size.rows; i ++) {
            for(var j = 0; j < this.size.cols; j ++) {
                this.state[i][j] = Math.floor(Math.random() * numStates);
            }
        }
    }

    randomize() {
        for(var i = 0 ; i < this.size.rows; i ++) {
            for(var j = 0; j < this.size.cols; j ++) {
                this.state[i][j] = Math.floor(Math.random() * numStates);
                this.tempState[i][j] = 0;
            }
        }
    }

    getCurrentState() {
        return this.state;
    }

    drawCurrentState() {
        drawState(this.drawingContext, this.state, this.size.rows, this.size.cols, this.blockSize, this.colors);
    }
}