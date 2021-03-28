import { drawBlock, getGradientStops } from "./../libs/uitils";
import { IVisualizer } from "./visualizer";

enum Mode { Spiral,  DIAG_TL_BR, DIAG_BL_TR }

/**
 * Visualizes various matrix tarversals.
 * One traversal can be seen as being composed of multiple runs. For example one top left to bottom right traversal 
 * can be seen as being composed of multiple diagonal run. 
 */
export class MatrixTraversalVisualizer implements IVisualizer {

  /* The size of the matrix. */
  private size: any; 
  /* The 2D context on which the traversal is going to be visualized. */
  private drawingContext : RenderingContext;
  /* The foreground and background colors as part of the theme. */
  private colors: string[];
  /* The size of each colored block to be drawn. */
  private blockSize : number;
  /* Stores the row at which the current run must start. Eg : One diagonal run.*/
  private row_index: number;
  /* Stores the column at which the current run must start. */
  private column_index:  number;
  /* The indexer that is used to advance over rows, vertically. */
  private row_offset: number;
  /* The indexer that is used to advance over columns, horizontally. */
  private column_offset: number;
  /* Which traversal to draw. */
  private mode: Mode;
  /* The gradient stops between the background and the foreground colors. */
  private gradient: string[];
  /* Used to iterate over the gradient stops. */
  private gradientIndex: number;
  
  /**
   * Create a matrix traversal visualizer.
   * @param {number} rows - The number of rows of the matrix.
   * @param {number} cols - the number of columns of the matrix.
   * @param {number} colors - The foreground and the background color.
   * @param {RenderingContext} context  - The 2D rendering context on which the matrix is to be visualized.
   * @param {number} blockSize - The size of the colored block to be drawn. 
   */
  constructor(rows: number, cols: number, colors: string[], context: RenderingContext, blockSize: number) {
    this.size = { rows: Math.round(rows), cols: Math.round(cols) };
    this.drawingContext = context;
    this.colors = colors;
    this.blockSize = blockSize;
    this.row_index = 0;
    this.column_index = 0;
    this.row_offset = 0;
    this.column_offset = 0;
    this.mode = Mode.DIAG_TL_BR;
    this.gradient = getGradientStops(this.colors[0], this.colors[1], this.size.cols + this.size.rows - 2);
    this.gradientIndex = 0;
  }

  /**
   * Update the properties of the class.
   * @param {number} rows - The number of rows of the matrix.
   * @param {number} cols - the number of columns of the matrix.
   * @param {number} colors - The foreground and the background color.
   * @param {RenderingContext} context  - The 2D rendering context on which the matrix is to be visualized.
   * @param {number} blockSize - The size of the colored block to be drawn. 
   */
  public upate(rows: number, cols: number, colors: string[], context: RenderingContext, blockSize: number) : void {
    this.size = { rows: Math.round(rows), cols: Math.round(cols) };
    this.drawingContext = context;
    this.colors = colors;
    this.blockSize = blockSize;
    this.row_index = 0;
    this.column_index = 0;
    this.row_offset = 0;
    this.column_offset = 0;
    this.mode = Mode.DIAG_TL_BR;
  }

  private clearCanvas() {
    for(let i = 0; i < this.size.rows; i++) {
      for(let j = 0; j < this.size.cols; j++) {
        drawBlock(this.drawingContext, i, j, this.blockSize, this.colors[0]);
      }
    }
  }

  public renderNextFrame() : void {
    switch (this.mode) {
      case Mode.DIAG_TL_BR:
        {
          drawBlock(this.drawingContext, this.row_index - this.row_offset, this.column_index, this.blockSize, this.gradient[this.gradientIndex]);
          /* Top half.*/
          if (this.row_index < this.size.rows - 1) {
            this.column_index++;
            this.row_offset++;
            if (this.row_index - this.row_offset < 0) {
              this.row_index++;
              this.column_index = this.column_offset;
              this.row_offset = 0;
              this.gradientIndex++;
            }
          } else {
            /* Bottom Half. */
            this.column_index++;
            this.row_offset++;
            if (this.row_index - this.row_offset < 0) {
              this.column_index = ++this.column_offset;
              this.row_offset = 0;
              this.gradientIndex++;
            }
            if (this.column_offset > this.size.cols) {
              this.mode = Mode.Spiral;
              /*Prepare for next mode.*/
              this.row_index = 0;
              this.row_offset = 0;
              this.column_offset = 0;
              this.column_index = 0;
              this.gradientIndex = 0;
              this.gradient = getGradientStops(this.colors[0], this.colors[1], 398);
              /* Clear the canvas. */
              this.clearCanvas();
            }
          }
        }
        break;
      case Mode.DIAG_BL_TR:
        {
          drawBlock(this.drawingContext, this.row_index, this.column_index - this.column_offset, this.blockSize, this.gradient[this.gradientIndex]);
          /* Top half.*/
          if (this.column_index < this.size.cols) {
            this.row_index--;
            this.column_offset++;
            if (this.row_index < 0) {
              this.column_index++;
              this.row_index = this.size.rows - 1;
              this.column_offset = 0;
              this.gradientIndex++;
            }
          } else {
            /* Bottom Half. */
            this.row_index--;
            this.column_offset++;
            if (this.row_index < 0) {
              this.row_index = this.size.rows - ++this.row_offset;
              this.column_offset = 0;
              this.gradientIndex++;
            }
            if (this.row_offset > this.size.rows) {
              this.mode = Mode.DIAG_TL_BR;
              /*Prepare for next mode.*/
              this.row_index = 0;
              this.row_offset = 0;
              this.column_offset = 0;
              this.column_index = 0;
              this.gradientIndex = 0;
              this.gradient = getGradientStops(this.colors[0], this.colors[1], this.size.cols + this.size.rows - 2);
              /* Clear the canvas. */
              this.clearCanvas();            
            }
          }
        }
        break;
      case Mode.Spiral:
        {
          if (this.column_index < this.size.cols - 1 - this.column_offset && this.row_index != this.size.rows - 1 - this.row_offset && this.row_index == this.row_offset) {
            drawBlock(this.drawingContext, this.row_index, this.column_index, this.blockSize, this.colors[1]);
            if (this.row_index == Math.floor(this.size.rows / 2)) {
              this.column_index--;
            } else {
              this.column_index++;
            }
          }
          if (this.column_index == this.size.cols - 1 - this.column_offset) {
            drawBlock(this.drawingContext, this.row_index, this.column_index, this.blockSize, this.colors[1]);
            this.row_index++;
          }
          if (this.row_index == this.size.rows - 1 - this.row_offset) {
            drawBlock(this.drawingContext, this.row_index, this.column_index, this.blockSize, this.colors[1]);
            if (
              this.row_index == Math.floor(this.size.rows / 2) &&
              this.size.rows % 2 != 0
            ) {
              this.column_index++;
            } else {
              this.column_index--;
            }
          }
          if (this.column_index == this.column_offset) {
            drawBlock(this.drawingContext, this.row_index, this.column_index, this.blockSize, this.colors[1]);
            if (this.column_index == Math.floor(this.size.cols / 2) && this.size.cols % 2 != 0) {
              this.row_index++;
            } else {
              this.row_index--;
            }
            if (this.row_index == this.row_offset) {
              this.row_offset++;
              this.column_offset++;
              this.row_index = this.row_offset;
              this.column_index = this.column_offset;
            }
          }
          if (this.row_index < 0 || this.column_index < 0 || this.row_index > this.size.rows || this.column_index > this.size.cols) {
            this.mode = Mode.DIAG_BL_TR;
            /*Prepare for next mode.*/
            this.row_index = this.size.rows - 1;
            this.row_offset = 0;
            this.column_offset = 0;
            this.column_index = 0;
            this.gradientIndex = 0;
            this.gradient = getGradientStops(this.colors[0], this.colors[1], this.size.cols + this.size.rows - 2);
            /* Clear the canvas. */
            this.clearCanvas();
          }
        }
        break;
      default:
        break;
    }
  }

  public initialize() {
    this.clearCanvas();
  }
}
