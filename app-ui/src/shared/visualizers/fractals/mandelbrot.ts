import { AllHTMLAttributes } from "react";
import { Array2D, drawMatrix } from "shared/utilities";
import { IVisualizer } from "../visualizer";

export class MandelbrotVisualzier implements IVisualizer {

    private planeMatrix: number[][];

    constructor(private rowCount: number, private columnCount: number, private colors: string[],
        private drawingContext: CanvasRenderingContext2D, private blockSize: number) {

        this.planeMatrix = Array2D(Math.round(rowCount), Math.round(columnCount));
        for (var i = 0; i < Math.round(this.rowCount); i++) {
            for (var j = 0; j < Math.round(this.columnCount); j++) {
                this.planeMatrix[i][j] = 0;
            }
        }
    }

    renderNextFrame(): void {
        let originX = this.columnCount / 2;
        let originY = this.rowCount / 2
        let minorAxisCount = this.rowCount < this.columnCount ? this.rowCount : this.columnCount;
        
    }

    initialize(): void {
        for (var i = 0; i < Math.round(this.rowCount); i++) {
            for (var j = 0; j < Math.round(this.columnCount); j++) {
                if(i == Math.round(this.rowCount / 2) || j == Math.round(this.columnCount / 2)) {
                    this.planeMatrix[i][j] = 1;
                }
            }
        }
        drawMatrix(this.drawingContext, this.planeMatrix, this.rowCount, this.columnCount, this.blockSize, this.colors);
    }
}