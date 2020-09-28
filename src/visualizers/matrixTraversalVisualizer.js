import { drawState, Array2D, drawBlock, getGradientStops } from "./../libs/uitils";

export class MatrixTraversalVisualizer {
  size;
  drawingContext;
  colors;
  blockSize;
  state;
  row_index;
  column_index;
  row_offset;
  column_offset;
  mode;
  gradient;
  gradientIndex;
  constructor(rows, cols, colors, context, blockSize) {
    this.size = { rows: Math.round(rows), cols: Math.round(cols) };
    this.drawingContext = context;
    this.colors = colors;
    this.blockSize = blockSize;
    this.state = Array2D(this.size.rows, this.size.cols);
    this.row_index = 0;
    this.column_index = 0;
    this.row_offset = 0;
    this.column_offset = 0;
    this.mode = "DIAG_TL_BR";
    for (var i = 0; i < this.size.rows; i++) {
      for (var j = 0; j < this.size.cols; j++) {
        this.state[i][j] = 0;
      }
    }
    this.gradient = getGradientStops(this.colors[0], this.colors[1], this.size.cols + this.size.rows -2);
    this.gradientIndex = 0;
  }

  upate(rows, cols, colors, context, blockSize) {
    this.size = { rows: Math.round(rows), cols: Math.round(cols) };
    this.drawingContext = context;
    this.colors = colors;
    this.blockSize = blockSize;
    this.state = Array2D(this.size.rows, this.size.cols);
    this.row_index = 0;
    this.column_index = 0;
    this.row_offset = 0;
    this.column_offset = 0;
    this.mode = "DIAG_TL_BR";
    for (var i = 0; i < this.size.rows; i++) {
      for (var j = 0; j < this.size.cols; j++) {
        this.state[i][j] = 0;
      }
    }
  }

  getCurrentState() {
    return this.state;
  }

  calculateAndDrawNextState() {
    switch (this.mode) {
      case "DIAG_TL_BR":
        {
          drawBlock(
            this.drawingContext,
            this.row_index - this.row_offset,
            this.column_index,
            this.blockSize,
            this.gradient[this.gradientIndex]
          );
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
              this.mode = "Spiral";
              /*Prepare for next mode.*/
              this.row_index = 0;
              this.row_offset = 0;
              this.column_offset = 0;
              this.column_index = 0;
              this.gradientIndex = 0;
              this.gradient = getGradientStops(this.colors[0], this.colors[1], 398);
              console.table(this.gradient);
              /* Clear the canvas. */
              drawState(
                this.drawingContext,
                this.state,
                this.size.rows,
                this.size.cols,
                this.blockSize,
                this.colors
              );
            }
          }
        }
        break;
      case "DIAG_BL_TR":
        {
          drawBlock(
            this.drawingContext,
            this.row_index,
            this.column_index - this.column_offset,
            this.blockSize,
            this.gradient[this.gradientIndex]
          );
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
              this.mode = "DIAG_TL_BR";
              /*Prepare for next mode.*/
              this.row_index = 0;
              this.row_offset = 0;
              this.column_offset = 0;
              this.column_index = 0;
              this.gradientIndex = 0;
              this.gradient = getGradientStops(this.colors[0], this.colors[1], this.size.cols + this.size.rows -2);
              /* Clear the canvas. */
              drawState(
                this.drawingContext,
                this.state,
                this.size.rows,
                this.size.cols,
                this.blockSize,
                this.colors
              );
            }
          }
        }
        break;
      case "Spiral":
        {
          if (
            this.column_index < this.size.cols - 1 - this.column_offset &&
            this.row_index != this.size.rows - 1 - this.row_offset &&
            this.row_index == this.row_offset
          ) {
            drawBlock(
              this.drawingContext,
              this.row_index,
              this.column_index,
              this.blockSize,
              this.colors[1]
            );
            if (this.row_index == Math.floor(this.size.rows / 2)) {
              this.column_index--;
            } else {
              this.column_index++;
            }
          }
          if (this.column_index == this.size.cols - 1 - this.column_offset) {
            drawBlock(
              this.drawingContext,
              this.row_index,
              this.column_index,
              this.blockSize,
              this.colors[1]
            );
            this.row_index++;
          }
          if (this.row_index == this.size.rows - 1 - this.row_offset) {
            drawBlock(
              this.drawingContext,
              this.row_index,
              this.column_index,
              this.blockSize,
              this.colors[1]
            );
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
            drawBlock(
              this.drawingContext,
              this.row_index,
              this.column_index,
              this.blockSize,
              this.colors[1]
            );
            if (
              this.column_index == Math.floor(this.size.cols / 2) &&
              this.size.cols % 2 != 0
            ) {
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
          if (
            this.row_index < 0 ||
            this.column_index < 0 ||
            this.row_index > this.size.rows ||
            this.column_index > this.size.cols
          ) {
            this.mode = "DIAG_BL_TR";
            /*Prepare for next mode.*/
            this.row_index = this.size.rows - 1;
            this.row_offset = 0;
            this.column_offset = 0;
            this.column_index = 0;
            this.gradientIndex = 0;
            this.gradient = getGradientStops(this.colors[0], this.colors[1], this.size.cols + this.size.rows -2);
            /* Clear the canvas. */
            drawState(
              this.drawingContext,
              this.state,
              this.size.rows,
              this.size.cols,
              this.blockSize,
              this.colors
            );
          }
        }
        break;
      default:
        break;
    }
  }

  drawCurrentState() {
    drawState(
      this.drawingContext,
      this.state,
      this.size.rows,
      this.size.cols,
      this.blockSize,
      this.colors
    );
  }
}
