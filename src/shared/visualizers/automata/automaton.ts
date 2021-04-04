import { drawMatrix, Array2D } from '../../utilities'
import { IVisualizer } from '../visualizer';

export type CountValidNeighorsDelegate = (stateMatrix: number[][], rowIndex: number, columnIndex: number,
    rowCount: number, columnCount: number, validState: number, range: number) => number;

/**
 * Base class for all the automation visualizers.
 * Keeps a state matrix and updated each cell accoring to the state of the neighbouring cells.
 */
export class Automaton implements IVisualizer {

    /* The size of the state matrix. */
    protected size: any;
   
    /* The 2D context on which the automata has to be visualized. */
    protected drawingContext: CanvasRenderingContext2D;
    
    /* The colors corresponding to the states. */
    protected colors: string[];
    
    /* The number of state which each cell could be. */
    protected numStates: number;
    
    /* The range of the neighbourhood. */
    protected range: number;
    
    /* The threshold used in the calculation of next state. */
    protected threshold: number;
    
    /* The size of each of the colored square to be drawn on the canvas. */
    protected blockSize: number;
    
    /* The state matrix. */
    protected state: number[][];
    
    /* Temporary  state used during calculation of the next state. */
    protected tempState: number[][];
    
    /* The function used to get the  neighbouring cells. */
    protected countValidNeighbors: CountValidNeighorsDelegate;

    constructor(rowCount: number, columnCount: number, colors: string[], context: CanvasRenderingContext2D,
        blockSize: number, numStates: number, range: number, threshold: number,
        countValidNeighbors: CountValidNeighorsDelegate) {

        this.size = { rows: Math.round(rowCount), cols: Math.round(columnCount) };
        this.drawingContext = context;
        this.colors = colors;
        this.numStates = numStates;
        this.range = range;
        this.threshold = threshold;
        this.blockSize = blockSize;
        this.state = Array2D(this.size.rows, this.size.cols);
        this.tempState = Array2D(this.size.rows, this.size.cols);
        this.countValidNeighbors = countValidNeighbors;
        for (var i = 0; i < this.size.rows; i++) {
            for (var j = 0; j < this.size.cols; j++) {
                this.state[i][j] = Math.floor(Math.random() * numStates);
            }
        }
    }

    public initialize(): void {
        drawMatrix(this.drawingContext, this.state, this.size.rows, this.size.cols, this.blockSize, this.colors);
    }

    public renderNextFrame(): void { /* Must be overridden in child classes. */ }
}