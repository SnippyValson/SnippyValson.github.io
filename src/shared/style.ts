import { ColorPalletes } from "./colors";

export class Style {
  
  colorIndex: number;
  prevColorIndex: number;

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
    document.documentElement.style.setProperty("--pixel-foreground", ColorPalletes[this.colorIndex].foreground);
    document.documentElement.style.setProperty("--pixel-background", ColorPalletes[this.colorIndex].background);
  }
}
