import { ColorPalletes } from "./colors.js";

export class Style {
  colorIndex;
  prevColorIndex;

  constructor() {
    this.colorIndex = Math.floor(Math.random() * ColorPalletes.length) + 0;
  }

  getCurrentPallet() {
    return ColorPalletes[this.colorIndex];
  }

  calculateNextPallet() {
    while (this.colorIndex == this.prevColorIndex) {
      this.colorIndex = Math.floor(Math.random() * ColorPalletes.length) + 0;
    }
    this.prevColorIndex = this.colorIndex;
  }

  applyStyle() {
    var pixelDivs = document.getElementsByClassName("pixel-div");
    for (let pd of pixelDivs) {
      pd.style.background = ColorPalletes[this.colorIndex].background;
      pd.style.color = ColorPalletes[this.colorIndex].foreground;
      pd.style.borderColor = ColorPalletes[this.colorIndex].foreground;
    }

    var pixelBodies = document.getElementsByClassName("pixel-body");
    for (let pbd of pixelBodies) {
      pbd.style.background = ColorPalletes[this.colorIndex].background;
    }

    var pixelInputs = document.getElementsByClassName("pixel-input");
    if (pixelInputs.length > 0) {
      for (let pi of pixelInputs) {
        pi.style.backgroundColor = ColorPalletes[this.colorIndex].background;
        pi.style.color = ColorPalletes[this.colorIndex].foreground;
        pi.style.borderColor = ColorPalletes[this.colorIndex].foreground;
      }
    }

    var pixelTextm = document.getElementsByClassName("pixel-text-medium");
    if (pixelTextm.length > 0) {
      for (let pt of pixelTextm) {
        pt.style.backgroundColor = ColorPalletes[this.colorIndex].background;
        pt.style.color = ColorPalletes[this.colorIndex].foreground;
        pt.style.borderColor = ColorPalletes[this.colorIndex].foreground;
      }
    }

    var pixelTexts = document.getElementsByClassName("pixel-text-small");
    if (pixelTexts.length > 0) {
      for (let pt of pixelTexts) {
        pt.style.backgroundColor = ColorPalletes[this.colorIndex].background;
        pt.style.color = ColorPalletes[this.colorIndex].foreground;
        pt.style.borderColor = ColorPalletes[this.colorIndex].foreground;
      }
    }

    var pixelButtons = document.getElementsByClassName("pixel-button");
    for (let pb of pixelButtons) {
      pb.style.background = ColorPalletes[this.colorIndex].background;
      pb.style.color = ColorPalletes[this.colorIndex].foreground;
      pb.style.borderColor = ColorPalletes[this.colorIndex].foreground;
      var colorIndex = this.colorIndex;
      pb.onmouseover = undefined;
      pb.onmouseover = function () {
        pb.style.background = ColorPalletes[colorIndex].foreground;
        pb.style.color = ColorPalletes[colorIndex].background;
      };

      pb.onmouseout = undefined;
      pb.onmouseout = function () {
        pb.style.background = ColorPalletes[colorIndex].background;
        pb.style.color = ColorPalletes[colorIndex].foreground;
      };

      pb.onmousedown = undefined;
      pb.onmousedown = function () {
        pb.style.background = ColorPalletes[colorIndex].background;
        pb.style.color = ColorPalletes[colorIndex].foreground;
      };

      pb.onmouseup = undefined;
      pb.onmouseup = function () {
        pb.style.background = ColorPalletes[colorIndex].foreground;
        pb.style.color = ColorPalletes[colorIndex].background;
      };
    }
  }
}
