import { Array2D, drawMatrix } from "shared/utilities";
import { IVisualizer } from "../visualizer";

export class MandelbrotVisualzier implements IVisualizer {

    private planeMatrix: number[][];

    constructor(private rowCount: number, private columnCount: number, private colors: string[],
        private drawingContext: CanvasRenderingContext2D, private blockSize: number) {

        this.planeMatrix = Array2D(Math.round(rowCount), Math.round(columnCount));
        for (var i = 0; i < Math.round(rowCount); i++) {
            for (var j = 0; j < Math.round(columnCount); j++) {
                this.planeMatrix[i][j] = Math.floor(Math.random() * 2);
            }
        }
    }

    renderNextFrame(): void {
        let originX = this.columnCount / 2;
        let originY = this.rowCount / 2
        let minorAxisCount = this.rowCount < this.columnCount ? this.rowCount : this.columnCount;
    }

    initialize(): void {
        drawMatrix(this.drawingContext, this.planeMatrix, this.rowCount, this.columnCount, this.blockSize, this.colors);
    }
}