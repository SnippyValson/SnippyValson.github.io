import "./../../main.css";
import "./GpuJsShowcase.module.css";
import { Style } from "../../shared/style";
import { Array2D } from "../../shared/utilities";
import { getMooreProcess } from "./kernels/kernel";
import { getGameOfLifeProcess } from "./kernels/kernel";
import { getNueMannProcess } from "./kernels/kernel";
import { getCrossProcess } from "./kernels/kernel";
import { getRenderer } from "./kernels/kernel";
import { getColors } from "./utils";
import * as React from 'react';
import { ButtonList, IButtonListItem } from '../../shared/components/NavgationPanel';
import { TopBar } from '../../shared/components/TopBar';
import { IKernelRunShortcut } from "gpu.js";

type IProps = {

}

type IState = {
  message: string;
  buttonLabel: string;
}

export class GpuJsShowCase extends React.Component<IProps, IState> {

  private t1: number;
  private t2: number;
  private style: Style;
  private delay: number;
  private fps_t1: number;
  private fps_t2: number;
  private listItems: IButtonListItem[];
  private process: any;
  private renderer: IKernelRunShortcut;
  private gpuTempState:number[][];
  private rendererWidth: number;
  private rendererOutlet: React.RefObject<HTMLDivElement>;
  private rendererHeight: number;
  private animationHandle: number;
  private gpuAutomataState: number[][];

  state: Readonly<IState> = {
    message: "*",
    buttonLabel: "Start"
  }

  constructor(props: IProps) {
    super(props);
    this.rendererOutlet = React.createRef();
    this.t1 = performance.now();
    this.t2 = performance.now();
    this.fps_t1 = performance.now();
    this.fps_t2 = performance.now();
    this.delay = 0;
    this.style = new Style();
    this.state = { message: '*', buttonLabel: 'Start' };
    this.onItemClicked = this.onItemClicked.bind(this);
    this.onStartClicked = this.onStartClicked.bind(this);
    this.animate = this.animate.bind(this);
    this.updateRenderer = this.updateRenderer.bind(this);
    this.renderAndSwap = this.renderAndSwap.bind(this);
    this.listItems = [];
    this.listItems.push({ tag: 'square-cycles', displayText: 'CCA - R1/T1/C16/NM' });
    this.listItems.push({ tag: 'nuemann-cycles', displayText: 'CCA - R1/T1/C16/NN' });
    this.listItems.push({ tag: 'cross-cycles', displayText: 'CCA - R1/T1/C16/NC' });
    this.listItems.push({ tag: 'cca-r1t3c4nm', displayText: 'CCA - R1/T3/C4/NM' });
    this.listItems.push({ tag: 'cca-r1t3c3nm', displayText: 'CCA - R1/T3/C3/NM' });
    this.listItems.push({ tag: 'cca-r2t11c3nm', displayText: 'CCA - R2/T11/C3/NM' });
    this.listItems.push({ tag: 'cca-r2t5c8nm', displayText: 'CCA - R2/T5/C8/NM' });
    this.listItems.push({ tag: 'cca-r3t15c3nm', displayText: 'CCA - R3/T15/C3/NM' });
    this.listItems.push({ tag: 'cca-r2t9c4nm', displayText: 'CCA - R2/T9/C4/NM' });
    this.listItems.push({ tag: 'cca-r3t10c2nn', displayText: 'CCA - R3/T10/C2/NN' });
    this.listItems.push({ tag: 'cca-r2t5c3nn', displayText: 'CCA - R2/T5/C3/NN' });
    this.listItems.push({ tag: 'game-of-life', displayText: 'Game Of Life' });
  }

  componentDidMount() {
    this.rendererHeight = this.rendererOutlet.current.clientHeight - 15;
    this.rendererWidth = this.rendererOutlet.current.clientWidth;
    this.gpuAutomataState = Array2D(this.rendererHeight, this.rendererWidth);
    this.gpuTempState = Array2D(this.rendererHeight, this.rendererWidth);
    this.style.applyStyle();
    this.renderer = this.updateRenderer(this.rendererWidth, this.rendererHeight, getColors(this.style.getCurrentPallet().background, this.style.getCurrentPallet().foreground, 16 - 2));
    this.resetState(16);
    this.renderer(this.gpuAutomataState);
    /* Reposition the renderer canvas after rendring it once. */
    this.renderer = this.updateRenderer(this.rendererWidth, this.rendererHeight, getColors(this.style.getCurrentPallet().background, this.style.getCurrentPallet().foreground, 16 - 2));
    this.t1 = performance.now();
    this.setProcess("moore", this.rendererWidth, this.rendererHeight, 1, 16, 1);
  }

  componentWillUnmount() {
    if (this.animationHandle) {
      cancelAnimationFrame(this.animationHandle);
    }
    this.gpuAutomataState = [];
    this.gpuTempState = [];
  }

  /*
   * Update the GpuJs canvas renderer with the new dimensions and colors. 
   */
  updateRenderer(width: number, height: number, colors) {
    let renderer = getRenderer(width, height, colors);
    this.rendererOutlet.current.appendChild(renderer.canvas);
    return renderer;
  }

  /*
   * Update the automata state matrix with new random values.
   */
  resetState(numStates: number) {
    for (let i = 0; i < this.rendererHeight; i++) {
      for (let j = 0; j < this.rendererWidth; j++) {
        let state = Math.floor(Math.random() * numStates);
        this.gpuAutomataState[i][j] = state;
      }
    }
  }

  /*
   * Render the update automata state on the canvas and copy it back into the original matrix.
   */
  renderAndSwap() {
    this.renderer(this.gpuTempState);
    let buffer = this.gpuTempState;
    this.gpuAutomataState = this.gpuTempState;
    this.gpuTempState = buffer;
  }

  animate() {
    this.t2 = performance.now();
    this.fps_t2 = performance.now();
    if (this.fps_t2 - this.fps_t1 >= 1000) {
      this.delay = this.t2 - this.t1;
      this.fps_t1 = this.fps_t2;
      let numPointsPerFrame = ((this.rendererHeight * this.rendererWidth) / 1000000).toFixed(2);
      let framesPerSecond = Math.round(1000 / this.delay);
      let numPointsPerSecond = (((this.rendererHeight * this.rendererWidth) * Math.round(1000 / this.delay)) / 1000000).toFixed(2);
      let message = `Processed & plotted ${numPointsPerFrame}M points ${framesPerSecond} times/second. [${numPointsPerSecond}M points/second.] Phew!!!`;
      this.setState({ message: message });
    }
    this.t1 = this.t2;
    this.gpuTempState = this.process(this.gpuAutomataState);
    this.renderAndSwap();
    this.animationHandle = requestAnimationFrame(this.animate.bind(this));
  }

  /*
   * Specifes what process should be done on the automata state between renders.
   */
  setProcess(processName: string, width: number, height: number, threshold: number, numStates: number, range: number) {
    switch (processName) {
      case "moore": {
        this.process = getMooreProcess(width, height, threshold, numStates, range);
        this.reset(width, height, numStates);
      } break;
      case "cross": {
        this.process = getCrossProcess(width, height, threshold, numStates, range);
        this.reset(width, height, numStates);
      } break;
      case "neumann": {
        this.process = getNueMannProcess(width, height, threshold, numStates, range);
        this.reset(width, height, numStates);
      } break;
      case "gol": {
        this.process = getGameOfLifeProcess(width, height);
        this.reset(width, height, numStates);
      } break;
    }
  }

  /*
   * Reset the automata states and re-render it on the canvas.
   */
  reset(width: number, height: number, numStates: number) {
    this.renderer = this.updateRenderer(width, height, getColors(this.style.getCurrentPallet().background, this.style.getCurrentPallet().foreground, numStates - 2));
    this.resetState(numStates);
    this.renderer(this.gpuAutomataState);
  }

  onItemClicked(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, tag: string) {
    this.setState({ buttonLabel: "Start" });
    if (this.animationHandle) {
      cancelAnimationFrame(this.animationHandle);
    }
    switch (tag) {
      case "square-cycles":
        this.setProcess("moore", this.rendererWidth, this.rendererHeight, 1, 16, 1);
        break;
      case "nuemann-cycles":
        this.setProcess("neumann", this.rendererWidth, this.rendererHeight, 1, 16, 1);
        break;
      case "cross-cycles":
        this.setProcess("cross", this.rendererWidth, this.rendererHeight, 1, 16, 1);
        break;
      case "cca-r1t3c4nm":
        this.setProcess("moore", this.rendererWidth, this.rendererHeight, 3, 4, 1);
        break;
      case "cca-r1t3c3nm":
        this.setProcess("moore", this.rendererWidth, this.rendererHeight, 3, 3, 1);
        break;
      case "game-of-life":
        this.setProcess("gol", this.rendererWidth, this.rendererHeight, -1, 2, -1);
        break;
      case "cca-r2t11c3nm":
        this.setProcess("moore", this.rendererWidth, this.rendererHeight, 11, 3, 2);
        break;
      case "cca-r2t5c8nm":
        this.setProcess("moore", this.rendererWidth, this.rendererHeight, 5, 8, 2);
        break;
      case "cca-r3t15c3nm":
        this.setProcess("moore", this.rendererWidth, this.rendererHeight, 15, 3, 3);
        break;
      case "cca-r2t9c4nm":
        this.setProcess("moore", this.rendererWidth, this.rendererHeight, 9, 4, 2);
        break;
      case "cca-r3t10c2nn":
        this.setProcess("neumann", this.rendererWidth, this.rendererHeight, 10, 2, 3);
        break;
      case "cca-r2t5c3nn":
        this.setProcess("neumann", this.rendererWidth, this.rendererHeight, 1, 5, 1);
        break;
      default:
        break;
    }
  }

  onStartClicked() {
    if (this.state.buttonLabel == "Start") {
      this.setState({ buttonLabel: "Stop" });
      if (this.animationHandle) {
        cancelAnimationFrame(this.animationHandle);
      }
      this.animationHandle = requestAnimationFrame(this.animate);
    } else {
      this.setState({ buttonLabel: "Start" });
      if (this.animationHandle) {
        cancelAnimationFrame(this.animationHandle);
      }
    }
  }

  render() {
    return (
      <div style={{ width: '100%', height: '99%', margin: '0px', padding: '0px' }} className="pixel-app-container">
        <div className="pixel-app-header">
          <TopBar>
            <button className="pixel-button" style={{ marginLeft: '5px' }} id="start-button" onClick={this.onStartClicked}>{this.state.buttonLabel}</button>
            <label className="pixel-text-medium" style={{ marginLeft: '10px' }}>{this.state.message}</label>
          </TopBar>
        </div>
        <div className="pixel-app-side-panel pixel-slide-out">
          <ButtonList onItemClicked={this.onItemClicked} items={this.listItems}></ButtonList>
        </div>
        <div className="pixel-app-content" ref={this.rendererOutlet}>
        </div>
      </div>
    );
  }
}