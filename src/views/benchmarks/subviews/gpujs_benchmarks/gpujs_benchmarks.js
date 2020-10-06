import React from "react";
import ReactDOM from "react-dom";
import "../../../../main.css";
import "./gpujs_benchmarks.css";
import { getRenderer } from "./../../../gpujs_showcase/kernels/render_kernel";
import { getColors } from "../../../gpujs_showcase/utils";
import { Style } from "../../../../global/style";
import { Array2D } from "./../../../../libs/uitils";
import { getMooreProcess } from "../../../gpujs_showcase/kernels/moore_kernel"
export class GpuJsBenchmarks extends React.Component {
    style;
    gpuAutomataState; 
    gpuTempState;
    renderer;
    gridHeight = 3162; 
    gridWidth = 3162;
    process;
    animationHandle;
    fps_t1 = performance.now();
    fps_t2 = performance.now();
    t1 = performance.now();
    t2 = performance.now();
    delay = 0;

    constructor(props) {
        super();
        this.currentFps = "XX fps";
        this.style = new Style();
        this.style.applyStyle();
        this.gpuAutomataState = Array2D(this.gridWidth, this.gridHeight);
        this.gpuTempState = Array2D(this.gridWidth, this.gridHeight);
        this.state = { rendererCanvas : undefined, currentFps : 0 };
        this.canvasHolderRef = React.createRef();
        this.process = getMooreProcess(this.gridWidth, this.gridHeight, 1, 16, 1);
        this.UpdateRenderer.bind(this);
        this.animate.bind(this);
    }

    componentDidMount() {
        let colors = getColors(this.style.getCurrentPallet().background, this.style.getCurrentPallet().foreground, 14);
        this.renderer = this.UpdateRenderer(this.gridWidth, this.gridHeight, colors);
    }
    
    UpdateRenderer(width, height, colors) {
      let renderer = getRenderer(width, height, colors);
      let rendererCanvas = renderer.canvas;
      rendererCanvas.style.maxWidth = '200px';
      rendererCanvas.style.maxHeight = '200px';
      rendererCanvas.style.margin = "10px";
      this.setState( { rendererCanvas : rendererCanvas }, () => {
        console.log(this.state.rendererCanvas);
        this.canvasHolderRef.current.appendChild(this.state.rendererCanvas);
      });
      return renderer;
    }

    resetState(numStates) {
        for (let i = 0; i < this.gridHeight; i++) {
          for (let j = 0; j < this.gridHeight; j++) {
            let state = Math.floor(Math.random() * numStates);
            this.gpuAutomataState[i][j] = state;
          }
        }
        this.renderer(this.gpuAutomataState);
      }
      
    
    animate() {
        this.t2 = performance.now();
        this.fps_t2 = performance.now();
        if (this.fps_t2 - this.fps_t1 >= 1000) {
          this.delay = this.t2 - this.t1;
          this.fps_t1 = this.fps_t2;
          this.setState({ currentFps : Math.round(1000 / this.delay) });
        }
        this.t1 = this.t2;
        this.gpuTempState = this.process(this.gpuAutomataState);
        this.renderAndSwap();
        this.animationHandle = requestAnimationFrame(this.animate.bind(this));
      }

    renderAndSwap() {
        this.renderer(this.gpuTempState);
        let t = this.gpuTempState;
        this.gpuAutomataState = this.gpuTempState;
        this.gpuTempState = t;
      }

   onStartClicked() {
        this.resetState(16);
        if (this.animationHandle) {
            cancelAnimationFrame(animationHandle);
          }
          this.t1 = performance.now();
          this.fps_t1 = performance.now();
          this.animationHandle = requestAnimationFrame(this.animate.bind(this));
    }


    render() {
        return (
            <div>
                <div className="pixel-div section">
                    <div>
                        <button className = "pixel-button pixel-text-medium start-button" onClick = {this.onStartClicked.bind(this)}>Start</button>
                        <label className="pixel-text-medium fps-label">FPS : {this.state.currentFps}</label>
                    </div>
                    <div ref = {this.canvasHolderRef} className="render-panel"></div>
                    <label className="pixel-text-medium fps-label">Average FPS : {this.state.currentFps}</label>
                </div>
                <div className="pixel-div section">
                    <div>
                        <button className = "pixel-button pixel-text-medium start-button" onClick = {this.onStartClicked.bind(this)}>Start</button>
                        <label className="pixel-text-medium fps-label">FPS : {this.state.currentFps}</label>
                    </div>
                    <div ></div>
                    <label className="pixel-text-medium fps-label">Average FPS : {this.state.currentFps}</label>
                </div>
            </div> 
        );
    }
}