import { drawBlock, getNextState } from './../libs/uitils.js'
import { Automaton } from './automaton.js';

export class CyclicCellularAutomata extends Automaton {

    constructor(rows, cols, colors, context, blockSize, numStates, range, threshold, neighbourhood) {
        console.log(threshold);
        super(rows, cols, colors, context, blockSize, numStates, range, threshold, neighbourhood);
    }

    calculateAndDrawNextState() {
        for(var i = 0; i < this.size.rows; i++) {
            for(var j = 0; j < this.size.cols; j ++) {
                var neighbours = this.neighbourhood(i, j, this.state, this.size.rows, this.size.cols);
                var liveCount = 0;
                neighbours.forEach(neighbour => {
                    if(neighbour === getNextState(this.state[i][j], this.numStates)) {
                        liveCount ++;
                    }
                });
                if(liveCount >= this.threshold){
                    this.tempState[i][j] = getNextState(this.state[i][j], this.numStates);
                    drawBlock(this.drawingContext, i, j, this.blockSize, this.colors[this.tempState[i][j]]);
                }
                else{
                    this.tempState[i][j] = this.state[i][j];
                }
            }
        } 
        var t = this.tempState;
        this.tempState = this.state;
        this.state = t;
    }
}