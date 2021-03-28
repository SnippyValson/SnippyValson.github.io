import { drawBlock, getNextState } from './../libs/uitils'
import { Automaton } from './automaton';

export class CyclicCellularAutomata extends Automaton {

    constructor(rows: number, cols: number, colors: string[], context: RenderingContext, blockSize: number, numStates: number, range: number, threshold: number, neighbourhood: Function) {
        super(rows, cols, colors, context, blockSize, numStates, range, threshold, neighbourhood);
    }

    public updateParams(params: any): void{
        super.updateParams(params);
    }

    public renderNextFrame(): void {
        for(let i = 0; i < this.size.rows; i++) {
            for(let j = 0; j < this.size.cols; j ++) {
                let neighbours = this.neighbourhood(i, j, this.state, this.size.rows, this.size.cols);
                let liveCount = 0;
                neighbours.forEach((neighbour: number) => {
                    if(neighbour === getNextState(this.state[i][j], this.numStates)) {
                        liveCount ++;
                    }
                });
                if(liveCount >= this.threshold) {
                    this.tempState[i][j] = getNextState(this.state[i][j], this.numStates);
                    drawBlock(this.drawingContext, i, j, this.blockSize, this.colors[this.tempState[i][j]]);
                }
                else{
                    this.tempState[i][j] = this.state[i][j];
                }
            }
        } 
        let buffer = this.tempState;
        this.tempState = this.state;
        this.state = buffer;
    }
}