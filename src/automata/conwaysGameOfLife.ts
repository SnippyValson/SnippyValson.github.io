import { drawBlock } from '../shared/utilities'
import { Automaton } from './automaton';

export class ConwaysGameOfLife extends Automaton {
    
    constructor(rows: number, cols: number, colors: string[], context: CanvasRenderingContext2D, blocksize: number, numStates: number, neighbourhood: any) {
        super(rows, cols, colors, context, blocksize, numStates, 0 , 0, neighbourhood);
    }

    public updateParams(params: any): void{
        super.updateParams(params);
    }

    public renderNextFrame(): void {
        for(let i = 0; i < this.size.rows; i++) {
            for(let j = 0; j < this.size.cols; j ++) {
                let liveCount = this.neighbourhood(this.state, i, j, this.size.rows, this.size.cols, 1, 1);
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
        let t = this.tempState;
        this.tempState = this.state;
        this.state = t;  
    }
}