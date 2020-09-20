import { drawBlock } from '../libs/uitils.js'
import { Automaton } from './automaton.js';

export class ConwaysGameOfLife extends Automaton {
    
    constructor(rows, cols, colors, context, blocksize, numStates, neighbourhood) {
        super(rows, cols, colors, context, blocksize, numStates, 0 , 0, neighbourhood);
    }

    calculateAndDrawNextState() {
        for(var i = 0; i < this.size.rows; i++) {
            for(var j = 0; j < this.size.cols; j ++) {
                var neighbours = this.neighbourhood(i, j, this.state, this.size.rows, this.size.cols);
                var liveCount = 0;
                neighbours.forEach(neighbour => {
                    if(neighbour) {
                        liveCount ++;
                    }
                });
                this.tempState[i][j] = this.state[i][j];
                if(liveCount < 2 || liveCount > 3){
                    if(this.state[i][j] == 1) {
                        this.tempState[i][j] = 0;
                        drawBlock(this.drawingContext, i, j, this.blockSize, this.colors[0]);
                    }
                } else if( liveCount == 2 || liveCount == 3) {
                    this.tempState[i][j] = this.state[i][j];
                    if(liveCount == 3) {
                        if(this.state[i][j] == 0) {
                            this.tempState[i][j] = 1;
                            drawBlock(this.drawingContext, i, j, this.blockSize, this.colors[1]);
                       }
                    }
                }
            }
        }
        var t = this.tempState;
        this.tempState = this.state;
        this.state = t;  
    }
}