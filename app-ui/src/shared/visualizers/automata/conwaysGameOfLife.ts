import { drawBlock } from '../../utilities'
import { Automaton, CountValidNeighorsDelegate } from './automaton';

export class ConwaysGameOfLife extends Automaton {

    constructor(rowCount: number, columnCount: number, colors: string[], context: CanvasRenderingContext2D,
        blocksize: number, numStates: number, countValidneighbors: CountValidNeighorsDelegate) {

        super(rowCount, columnCount, colors, context, blocksize, numStates, 0, 0, countValidneighbors);
    }

    public renderNextFrame(): void {
        for (let i = 0; i < this.rowCount; i++) {
            for (let j = 0; j < this.columnCount; j++) {

                let liveCount = this.countValidNeighbors(this.state, i, j, this.rowCount, this.columnCount, 1, 1);

                this.tempState[i][j] = this.state[i][j];

                if (liveCount < 2 || liveCount > 3) {
                    if (this.state[i][j] == 1) {
                        this.tempState[i][j] = 0;
                        drawBlock(this.drawingContext, i, j, this.blockSize, this.colors[0]);
                    }
                } else if (liveCount == 2 || liveCount == 3) {
                    this.tempState[i][j] = this.state[i][j];
                    if (liveCount == 3) {
                        if (this.state[i][j] == 0) {
                            this.tempState[i][j] = 1;
                            drawBlock(this.drawingContext, i, j, this.blockSize, this.colors[1]);
                        }
                    }
                }
            }
        }
        let swapBuffer = this.tempState;
        this.tempState = this.state;
        this.state = swapBuffer;
    }
}