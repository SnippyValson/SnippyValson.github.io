import { drawBlock, getNextState } from '../shared/utilities'
import { Automaton } from './automaton';

export class CyclicCellularAutomata extends Automaton {

    constructor(rows: number, cols: number, colors: string[], context: CanvasRenderingContext2D,
        blockSize: number, numStates: number, range: number, threshold: number,
        checkNeighbourhood: (state: number[][], i: number, j: number, r: number, c: number,
            nextState: number, range: number) => number) {

        super(rows, cols, colors, context, blockSize, numStates, range, threshold, checkNeighbourhood);
    }

    public updateParams(params: any): void {
        super.updateParams(params);
    }

    public renderNextFrame(): void {
        for (let i = 0; i < this.size.rows; i++) {
            for (let j = 0; j < this.size.cols; j++) {
                let liveCount = this.neighbourhood(this.state, i, j, this.size.rows, this.size.cols, getNextState(this.state[i][j], this.numStates), 1);
                if (liveCount >= this.threshold) {
                    this.tempState[i][j] = getNextState(this.state[i][j], this.numStates);
                    drawBlock(this.drawingContext, i, j, this.blockSize, this.colors[this.tempState[i][j]]);
                }
                else {
                    this.tempState[i][j] = this.state[i][j];
                }
            }
        }
        let buffer = this.tempState;
        this.tempState = this.state;
        this.state = buffer;
    }
}