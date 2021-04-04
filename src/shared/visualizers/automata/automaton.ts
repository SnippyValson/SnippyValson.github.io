import { drawMatrix, Array2D } from '../../utilities'
import { IVisualizer } from '../visualizer';

export type CountValidNeighorsDelegate = (stateMatrix: number[][], rowIndex: number, columnIndex: number,
    rowCount: number, columnCount: number, validState: number, range: number) => number;

/**
 * Base class for all the automation visualizers.
 * Keeps a state matrix and updated each cell accoring to the state of the neighbouring cells.
 */
export class Automaton implements IVisualizer {

    /* The state matrix. */
    protected state: number[][];

    /* Temporary  state used during calculation of the next state. */
    protected tempState: number[][];

    constructor(protected rowCount: number, protected columnCount: number, protected colors: string[], 
        protected drawingContext: CanvasRenderingContext2D, protected blockSize: number, 
        protected numStates: number, protected range: number, protected threshold: number,
        protected countValidNeighbors: CountValidNeighorsDelegate) {

        this.threshold = threshold;
        this.blockSize = blockSize;
        this.state = Array2D(this.rowCount, this.rowCount);
        this.tempState = Array2D(this.rowCount, this.rowCount);
        for (var i = 0; i < this.rowCount; i++) {
            for (var j = 0; j < this.columnCount; j++) {
                this.state[i][j] = Math.floor(Math.random() * numStates);
            }
        }
    }

    public initialize(): void {
        drawMatrix(this.drawingContext, this.state, this.rowCount, this.columnCount, this.blockSize, this.colors);
    }

    public renderNextFrame(): void { /* Must be overridden in child classes. */ }
}