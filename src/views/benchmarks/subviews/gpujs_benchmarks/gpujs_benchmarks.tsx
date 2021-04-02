import * as React from "react";
import "../../../../main.css";
import "./gpujs_benchmarks.css";
import { getRenderer } from "../../../gpujs_showcase/kernels/kernel";
import { getColors, StateColors } from "../../../gpujs_showcase/utils";
import { Style } from "../../../../shared/style";
import { Array2D } from "../../../../shared/utilities";
import { getMooreProcess } from "../../../gpujs_showcase/kernels/kernel";

type IProps = {}

type IState = {
  currentFps: number,
  sGpuButtonText: string,
  mGpuButtonText: string
}

export class GpuJsBenchmarks extends React.Component<IProps, IState> {

  private style: any;
  private gpuAutomataState: number[][];
  private gpuTempState: number[][];
  private gpuRenderer: any;
  private gridHeight: number = 2000;
  private gridWidth: number = 2000;
  private process: any;
  private animationHandle: number;
  private frameCounterT1: number = performance.now();
  private frameCounterT2: number = performance.now();
  private frameT1: number = performance.now();
  private frameT2: number = performance.now();
  private delay: number = 0;
  private liveRender: boolean = true;
  private gpuWorkers: any = [];
  private processRunning: boolean = false;
  private gpuCanvasHolderRef: React.RefObject<HTMLDivElement>;

  state: Readonly<IState> = {
    currentFps: 0,
    sGpuButtonText: "Start",
    mGpuButtonText: "Start"
  }

  constructor(props: IProps) {
    super(props);
    this.style = new Style();
    this.style.applyStyle();
    this.gpuCanvasHolderRef = React.createRef();
    this.UpdateRenderer.bind(this);
    this.animate.bind(this);
  }

  componentDidMount() {
    this.gpuAutomataState = Array2D(this.gridWidth, this.gridHeight);
    this.gpuTempState = Array2D(this.gridWidth, this.gridHeight);
    this.process = getMooreProcess(this.gridWidth, this.gridHeight, 1, 16, 1);
    this.createGpuWorkers();
    let colors = getColors(this.style.getCurrentPallet().background, this.style.getCurrentPallet().foreground, 14);
    this.gpuRenderer = this.UpdateRenderer(this.gridWidth, this.gridHeight, colors, this.gpuCanvasHolderRef);
    this.resetState(16, this.gpuRenderer);
  }

  componentWillUnmount() {
    if (this.animationHandle) {
      cancelAnimationFrame(this.animationHandle);
    }
    this.gpuAutomataState = [];
    this.gpuTempState = [];
    this.gpuRenderer = undefined;
    this.gpuWorkers.forEach((gpuWorkers: any) => {
      gpuWorkers.terminate();
    });
    this.gpuWorkers = [];
    this.process = undefined;  
  }

  createGpuWorkers() {
    for (let i = 0; i < navigator.hardwareConcurrency; i++) {
      let gpuW = new Worker("workers/gpu_worker.ts");
      gpuW.onmessage = (function (e: any) {
        this.numFinished++;
        this.temp[i] = e.data;
        if (this.numFinished == navigator.hardwareConcurrency) {
          for (let k = 0; k < this.temp[0].length - 2; k++) {
            this.gpuTempState.push(this.temp[0][k]);
          }
          for (let j = 1; j < navigator.hardwareConcurrency - 1; j++) {
            for (let k = 1; k < this.temp[j].length - 1; k++) {
              this.gpuTempState.push(this.temp[j][k]);
            }
          }
          for (let k = 2; k < this.temp[navigator.hardwareConcurrency - 1].length; k++) {
            this.gpuTempState.push(this.temp[navigator.hardwareConcurrency - 1][k]);
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

  UpdateRenderer(width: number, height: number, colors: StateColors, ref: React.RefObject<HTMLDivElement>) {
    let renderer = getRenderer(width, height, colors);
    let rendererCanvas = renderer.canvas;
    rendererCanvas.style.width = "750px";
    rendererCanvas.style.height = "750px";
    rendererCanvas.style.margin = "10px";
    ref.current.appendChild(rendererCanvas);
    return renderer;
  }

  resetState(numStates: number, renderer: any) {
    for (let i = 0; i < this.gridHeight; i++) {
      for (let j = 0; j < this.gridHeight; j++) {
        let state = Math.floor(Math.random() * numStates);
        this.gpuAutomataState[i][j] = state;
      }
    }
    renderer(this.gpuAutomataState);
  }

  animate(liveRender: boolean) {
    this.frameT2 = performance.now();
    this.frameCounterT2 = performance.now();
    if (this.frameCounterT2 - this.frameCounterT1 >= 1000) {
      this.delay = this.frameT2 - this.frameT1;
      this.frameCounterT1 = this.frameCounterT2;
      this.setState({ currentFps: Math.round(1000 / this.delay) });
    }
    this.frameT1 = this.frameT2;
    this.gpuTempState = this.process(this.gpuAutomataState);
    if (liveRender) {
      this.renderAndSwap(this.gpuRenderer);
    }
    this.animationHandle = requestAnimationFrame(this.animate.bind(this, this.liveRender));
  }

  renderAndSwap(renderer: any) {
    renderer(this.gpuTempState);
    let t = this.gpuTempState;
    this.gpuAutomataState = this.gpuTempState;
    this.gpuTempState = t;
  }

  prepareToStart() {
    this.resetState(16, this.gpuRenderer);
    if (this.animationHandle) {
      cancelAnimationFrame(this.animationHandle);
    }
    this.frameT1 = performance.now();
    this.frameCounterT1 = performance.now();
  }

  onStartClicked(mode: string) {
    switch (mode) {
      case "single-thread": {
        if (this.state.sGpuButtonText === "Start") {
          if (this.processRunning) {
            alert("Please stop the running operation.");
            return;
          }
          this.prepareToStart();
          this.animationHandle = requestAnimationFrame(this.animate.bind(this, this.liveRender));
          this.setState({ sGpuButtonText: "Stop" });
          this.processRunning = true;
        } else {
          if (this.animationHandle) {
            cancelAnimationFrame(this.animationHandle);
          }
          this.resetState(16, this.gpuRenderer);
          this.setState({ sGpuButtonText: "Start" });
          this.processRunning = false;
        }
      } break;
      case "multi-thread": {
        if (this.state.mGpuButtonText === "Start") {
          if (this.processRunning) {
            alert("Please stop the running operation.");
            return;
          }
          this.prepareToStart();
          if (this.gpuWorkers.length === 0) {
            this.createGpuWorkers();
          }
          this.gpuWorkers.forEach((gpuWorkers: any) => {
            gpuWorkers.postMessage({ mode: "create", state: this.gpuAutomataState, rendererHeight: 2 + this.gridHeight / navigator.hardwareConcurrency, rendererWidth: this.gridWidth, automatonNumStates: 16, automatonRange: 1, automatonThreshold: 1 });
          });
          this.gpuTempState = [];
          this.animationHandle = requestAnimationFrame(this.workerAnimate.bind(this));
          this.setState({ mGpuButtonText: "Stop" });
          this.processRunning = true;
        } else {
          this.gpuWorkers.forEach((gpuWorkers: any) => {
            gpuWorkers.terminate();
          });
          this.gpuWorkers = [];
          if (this.animationHandle) {
            cancelAnimationFrame(this.animationHandle);
          }
          this.resetState(16, this.gpuRenderer);
          this.setState({ mGpuButtonText: "Start" });
          this.processRunning = false;
        }
      } break;
    }
  }

  /* Multi threaded code. */
  workerAnimate() {
    var index = 0;

    // The first slice should have -1s as the first row, since the radius 1 neighbrhood shouldn't be affected.
    var firstSlice = [];

    // The row of -1s
    var dummyRow = [];
    for (let z = 0; z < this.gridWidth; z++) {
      dummyRow.push(-1);
    }
    firstSlice.push(dummyRow);
    this.gpuAutomataState.slice(index, index + (this.gridHeight / navigator.hardwareConcurrency)).forEach(row => {
      firstSlice.push(row);
    })
    this.gpuWorkers[0].postMessage({ mode: "process", state: firstSlice });
    index += this.gridHeight / navigator.hardwareConcurrency;

    // The rest of the slices can be normal.
    for (let i = 1; i < navigator.hardwareConcurrency - 1; i++) {
      this.gpuWorkers[i].postMessage({ mode: "process", state: this.gpuAutomataState.slice(index - 1, index + (this.gridHeight / navigator.hardwareConcurrency)) });
      index += this.gridHeight / navigator.hardwareConcurrency;
    }

    // The last slice should have the first row as -1s as well.
    var dummyRowForLast = [];
    for (let z = 0; z < this.gridWidth; z++) {
      dummyRowForLast.push(-1);
    }
    var lastSlice = this.gpuAutomataState.slice(index - 2, index + this.gridHeight / navigator.hardwareConcurrency);
    lastSlice.push(dummyRowForLast);
    this.gpuWorkers[navigator.hardwareConcurrency - 1].postMessage({ mode: "process", state: lastSlice });
  }

  render() {
    return (
      <div>
        <div className="container">
          <label className="pixel-text-medium fps-label">
            FPS : {this.state.currentFps}
          </label>
        </div>
        <div ref={this.gpuCanvasHolderRef} className="render-panel"></div>
        <div className="pixel-div section">
          <label className="pixel-text-medium description-label">
            GPU.js single threaded.
          </label>
          <div className="middle-section">
            <button className="pixel-button pixel-text-medium start-button" onClick={this.onStartClicked.bind(this, "single-thread")}>
              {this.state.sGpuButtonText}
            </button>
          </div>
          <label className="pixel-text-medium fps-label">
            Average FPS : {this.state.currentFps}
          </label>
        </div>
        <div className="pixel-div section">
          <label className="pixel-text-medium description-label">
            GPU.js multi threaded.
          </label>
          <div className="middle-section">
            <button className="pixel-button pixel-text-medium start-button" onClick={this.onStartClicked.bind(this, "multi-thread")} >
              {this.state.mGpuButtonText}
            </button>
          </div>
          <label className="pixel-text-medium fps-label">
            Average FPS : {this.state.currentFps}
          </label>
        </div>
      </div>
    );
  }
}
