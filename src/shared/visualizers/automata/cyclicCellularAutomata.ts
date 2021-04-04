import { drawBlock, getNextState } from '../../utilities'
import { Automaton, CountValidNeighorsDelegate,  } from './automaton';

export class CyclicCellularAutomata extends Automaton {

    constructor(rows: number, cols: number, colors: string[], context: CanvasRenderingContext2D,
        blockSize: number, numStates: number, range: number, threshold: number,
        countValidNeighbors: CountValidNeighorsDelegate) {

        super(rows, cols, colors, context, blockSize, numStates, range, threshold, countValidNeighbors);
    }

    public renderNextFrame(): void {
        for (let i = 0; i < this.rowCount; i++) {
            for (let j = 0; j < this.columnCount; j++) {

                let liveCount = this.countValidNeighbors(this.state, i, j, this.rowCount, this.columnCount, getNextState(this.state[i][j], this.numStates), 1);

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