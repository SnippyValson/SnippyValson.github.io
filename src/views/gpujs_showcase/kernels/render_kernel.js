import { GPU } from "gpu.js";
var gpu = new GPU();

export function getRenderer(rendererWidth, rendererHeight, colors) {
    var rndrr = gpu
      .createKernel(function (stateMatrix) {
        var i = this.thread.y;
        var j = this.thread.x;
        if (stateMatrix[i][j] === 0) {
          this.color(
            this.constants.color0r,
            this.constants.color0g,
            this.constants.color0b
          );
        } else if (stateMatrix[i][j] === 1) {
          this.color(
            this.constants.color1r,
            this.constants.color1g,
            this.constants.color1b
          );
        } else if (stateMatrix[i][j] === 2) {
          this.color(
            this.constants.color2r,
            this.constants.color2g,
            this.constants.color2b
          );
        } else if (stateMatrix[i][j] === 3) {
          this.color(
            this.constants.color3r,
            this.constants.color3g,
            this.constants.color3b
          );
        } else if (stateMatrix[i][j] === 4) {
          this.color(
            this.constants.color4r,
            this.constants.color4g,
            this.constants.color4b
          );
        } else if (stateMatrix[i][j] === 5) {
          this.color(
            this.constants.color5r,
            this.constants.color5g,
            this.constants.color5b
          );
        } else if (stateMatrix[i][j] === 6) {
          this.color(
            this.constants.color6r,
            this.constants.color6g,
            this.constants.color6b
          );
        } else if (stateMatrix[i][j] === 7) {
          this.color(
            this.constants.color7r,
            this.constants.color7g,
            this.constants.color7b
          );
        } else if (stateMatrix[i][j] === 8) {
          this.color(
            this.constants.color8r,
            this.constants.color8g,
            this.constants.color8b
          );
        } else if (stateMatrix[i][j] === 9) {
          this.color(
            this.constants.color9r,
            this.constants.color9g,
            this.constants.color9b
          );
        } else if (stateMatrix[i][j] === 10) {
          this.color(
            this.constants.color10r,
            this.constants.color10g,
            this.constants.color10b
          );
        } else if (stateMatrix[i][j] === 11) {
          this.color(
            this.constants.color11r,
            this.constants.color11g,
            this.constants.color11b
          );
        } else if (stateMatrix[i][j] === 12) {
          this.color(
            this.constants.color12r,
            this.constants.color12g,
            this.constants.color12b
          );
        } else if (stateMatrix[i][j] === 13) {
          this.color(
            this.constants.color13r,
            this.constants.color13g,
            this.constants.color13b
          );
        } else if (stateMatrix[i][j] === 14) {
          this.color(
            this.constants.color14r,
            this.constants.color14g,
            this.constants.color14b
          );
        } else if (stateMatrix[i][j] === 15) {
          this.color(
            this.constants.color15r,
            this.constants.color15g,
            this.constants.color15b
          );
        }
      })
      .setOutput([rendererWidth, rendererHeight])
      .setGraphical(true)
      .setConstants(colors);
      return rndrr;
    }