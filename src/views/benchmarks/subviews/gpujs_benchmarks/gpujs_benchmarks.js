import React from "react";
import ReactDOM from "react-dom";
import "../../../../main.css";
import "./gpujs_benchmarks.css";
import { getRenderer } from "./../../../gpujs_showcase/kernels/render_kernel";
import { getColors } from "../../../gpujs_showcase/utils";
import { Style } from "../../../../global/style";
import { Array2D } from "./../../../../libs/uitils"
export class GpuJsBenchmarks extends React.Component {

    currentFps;
    style;
    gpuAutomataState; 
    gpuTempState;
    rendererCanvas;
    renderer;

    constructor(props) {
        super();
        this.currentFps = "XX fps";
        this.style = new Style();
        this.gpuAutomataState = Array2D(2000, 2000);
        this.gpuTempState = Array2D(2000, 2000);
    }

    componentDidMount() {
        this.renderer = this.UpdateRenderer(2000,2000, getColors(this.style.getCurrentPallet().background, this.style.getCurrentPallet().foreground, 14));
    }
    
    UpdateRenderer(width, height, colors) {
      let renderer = getRenderer(width, height, colors);
      let rendererCanvas = renderer.canvas;
      this.rendererCanvas = rendererCanvas;
      return renderer;
    }

    resetState(numStates) {
        for (let i = 0; i < rendererHeight; i++) {
          for (let j = 0; j < rendererWidth; j++) {
            let state = Math.floor(Math.random() * numStates);
            gpuAutomataState[i][j] = state;
          }
        }
        this.renderer(this.gpuAutomataState);
      }
      
    
   onStartClicked() {
        console.log("Start clicked.");
        console.log()
    }


    render() {
        return (
            <div>
                <div>
                    <button className = "pixel-button pixel-text-medium start-button" onClick = {this.onStartClicked.bind(this)}>Start</button>
                    <label className="pixel-text-medium fps-label">FPS : {this.currentFps}</label>
                </div>
            <div ref = {this.canvasHolderRef} className="render-panel">{this.rendererCanvas}</div>
            </div>
        );
    }
}