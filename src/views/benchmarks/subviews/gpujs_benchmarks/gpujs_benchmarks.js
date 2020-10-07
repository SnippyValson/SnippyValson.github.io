import React from "react";
import "../../../../main.css";
import "./gpujs_benchmarks.css";
import { getRenderer } from "./../../../gpujs_showcase/kernels/render_kernel";
import { getColors } from "../../../gpujs_showcase/utils";
import { Style } from "../../../../global/style";
import { Array2D } from "./../../../../libs/uitils";
import { getMooreProcess } from "../../../gpujs_showcase/kernels/moore_kernel";
export class GpuJsBenchmarks extends React.Component {
  style;
  gpuAutomataState;
  gpuTempState;
  gpuRenderer;
  multiGpuRenderer;
  gridHeight = 2000;
  gridWidth = 2000;
  process;
  animationHandle;
  fps_t1 = performance.now();
  fps_t2 = performance.now();
  t1 = performance.now();
  t2 = performance.now();
  delay = 0;
  mode = "single-thread";
  liveRender = true;
  numFinished = 0;
  gpuWorkers = [];
  temp = [];

  constructor(props) {
    super();
    this.currentFps = "XX fps";
    this.style = new Style();
    this.style.applyStyle();
    this.gpuAutomataState = Array2D(this.gridWidth, this.gridHeight);
    this.gpuTempState = Array2D(this.gridWidth, this.gridHeight);
    this.state = { currentFps: 0 };
    this.gpuCanvasHolderRef = React.createRef();
    this.process = getMooreProcess(this.gridWidth, this.gridHeight, 1, 16, 1);
    this.UpdateRenderer.bind(this);
    this.animate.bind(this);

    for(let i = 0; i < navigator.hardwareConcurrency; i++ ){
      let gpuW = new Worker("workers/gpu_worker.js");
      gpuW.onmessage = (function(e) {
        this.numFinished++;
        this.temp[i] = e.data;
        if(this.numFinished == navigator.hardwareConcurrency) {
          for(let k = 0; k < this.temp[0].length - 2 ; k++){
            this.gpuTempState.push(this.temp[0][k]);
          }
          for(let j = 1; j< navigator.hardwareConcurrency - 1; j++){
            for(let k = 1; k < this.temp[j].length-1 ; k++){
              this.gpuTempState.push(this.temp[j][k]);
            }
          }
          for(let k = 2; k < this.temp[navigator.hardwareConcurrency-1].length ; k++){
            this.gpuTempState.push(this.temp[navigator.hardwareConcurrency-1][k]);
          }
          this.renderAndSwap(this.gpuRenderer);
          this.gpuTempState = [];
          this.temp = [];
          this.numFinished = 0;
          this.t2 = Date.now();
          this.fps_t2 = Date.now();
          if (this.fps_t2 - this.fps_t1 >= 1000) {
            this.delay = this.t2 - this.t1;
            this.fps_t1 = this.fps_t2;
            this.setState({ currentFps: Math.round(1000 / this.delay) });
          }
          this.t1 = this.t2;
          this.animationHandle = requestAnimationFrame(this.workerAnimate.bind(this));
        }
      }).bind(this);
      this.gpuWorkers.push(gpuW);
    }
  }

  componentDidMount() {
    let colors = getColors(
      this.style.getCurrentPallet().background,
      this.style.getCurrentPallet().foreground,
      14
    );
    this.gpuRenderer = this.UpdateRenderer(
      this.gridWidth,
      this.gridHeight,
      colors,
      this.gpuCanvasHolderRef
    );
    this.resetState(16, this.gpuRenderer);
  }

  UpdateRenderer(width, height, colors, ref) {
    let renderer = getRenderer(width, height, colors);
    let rendererCanvas = renderer.canvas;
    rendererCanvas.style.maxWidth = "250px";
    rendererCanvas.style.maxHeight = "250px";
    rendererCanvas.style.margin = "10px";
    ref.current.appendChild(rendererCanvas);
    return renderer;
  }

  resetState(numStates, renderer) {
    for (let i = 0; i < this.gridHeight; i++) {
      for (let j = 0; j < this.gridHeight; j++) {
        let state = Math.floor(Math.random() * numStates);
        this.gpuAutomataState[i][j] = state;
      }
    }
    renderer(this.gpuAutomataState);
  }

  animate(liveRender) {
    this.t2 = performance.now();
    this.fps_t2 = performance.now();
    if (this.fps_t2 - this.fps_t1 >= 1000) {
      this.delay = this.t2 - this.t1;
      this.fps_t1 = this.fps_t2;
      this.setState({ currentFps: Math.round(1000 / this.delay) });
    }
    this.t1 = this.t2;
    this.gpuTempState = this.process(this.gpuAutomataState);
    if(liveRender) {
      this.renderAndSwap(this.gpuRenderer);
    }
    this.animationHandle = requestAnimationFrame(this.animate.bind(this, this.liveRender));
  }

  renderAndSwap(renderer) {
    renderer(this.gpuTempState);
    let t = this.gpuTempState;
    this.gpuAutomataState = this.gpuTempState;
    this.gpuTempState = t;
  }

  onStartClicked(mode) {
    this.resetState(16, this.gpuRenderer);
    if (this.animationHandle) {
      cancelAnimationFrame(animationHandle);
    }
    this.t1 = performance.now();
    this.fps_t1 = performance.now();
    this.mode = mode;
    if(mode == "single-thread") {
      this.animationHandle = requestAnimationFrame(this.animate.bind(this, this.liveRender));
    } else if(mode == "multi-thread") {
      for(let i = 0; i < navigator.hardwareConcurrency; i++ ){
        this.gpuWorkers[i].postMessage({ mode : "create", state:this.gpuAutomataState, rendererHeight : 2 + this.gridHeight/navigator.hardwareConcurrency, rendererWidth: this.gridWidth, automatonNumStates : 16, automatonRange:1, automatonThreshold : 1 } );
      }
      this.gpuTempState = [];
      this.animationHandle = requestAnimationFrame(this.workerAnimate.bind(this));
    }
  }

  /* Multi threaded code. */

  workerAnimate() {
    var index = 0 ;
    var t = [];
    var ze = [];
    for(let z =0; z< this.gridWidth; z++){
      ze.push(-1);
    }
    t.push(ze);
    this.gpuAutomataState.slice(index, 1 + index + this.gridHeight/navigator.hardwareConcurrency).forEach(st=>{
      t.push(st);
    })
    this.gpuWorkers[0].postMessage({ mode: "process",  state:t });
    index += this.gridHeight/navigator.hardwareConcurrency;
    for(let i = 1; i < navigator.hardwareConcurrency - 1; i++ ){
      this.gpuWorkers[i].postMessage({ mode: "process",  state:this.gpuAutomataState.slice(index - 1, index + 1 + this.gridHeight/ navigator.hardwareConcurrency) });
      index += this.gridHeight/ navigator.hardwareConcurrency;
    }
    this.gpuWorkers[navigator.hardwareConcurrency - 1].postMessage({ mode: "process",  state:this.gpuAutomataState.slice(index - 2, index + this.gridHeight/ navigator.hardwareConcurrency) });
  }

  render() {
    return (
      <div>
        <div ref={this.gpuCanvasHolderRef} className="render-panel"></div>
        <div className="pixel-div section">
        <label className="pixel-text-medium description-label">
            GPU.js single threaded. 
          </label>
          <div>
            <button
              className="pixel-button pixel-text-medium start-button"
              onClick={this.onStartClicked.bind(this, "single-thread")}
            >
              Start
            </button>
            <label className="pixel-text-medium fps-label">
              FPS : {this.state.currentFps}
            </label>
          </div>
          <label className="pixel-text-medium fps-label">
            Average FPS : {this.state.currentFps}
          </label>
        </div>
        <div className="pixel-div section">
          <div>
            <button
              className="pixel-button pixel-text-medium start-button"
              onClick={this.onStartClicked.bind(this, "multi-thread")}
            >
              Start
            </button>
            <label className="pixel-text-medium fps-label">
              FPS : {this.state.currentFps}
            </label>
          </div>
          <label className="pixel-text-medium fps-label">
            Average FPS : {this.state.currentFps}
          </label>
        </div>
      </div>
    );
  }
}
