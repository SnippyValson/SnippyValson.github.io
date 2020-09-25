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

    updateParams(params){
        if(params.rows != undefined){
            this.size.rows = params.rows;
        }
        if(params.cols != undefined){
            this.size.cols = params.cols;
        }
        if(params.colors != undefined){
            this.colors = params.colors;
        }
        if(params.numStates != undefined){
            this.numStates = params.numStates;
        }
        if(params.range != undefined){
            this.range = params.range;
        }
        if(params.numStates != undefined){
            this.threshold = params.threshold;
        }
        if(params.blockSize != undefined){
            this.blockSize = params.blockSize;
        }
        if(params.state != undefined){
            this.state = params.state;
        }
        if(params.neighbourhood != undefined){
            this.neighbourhood = params.neighbourhood;
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