import "./../../main.css";
import "./gpujs_showcase.css";
import { Style } from "../../common/style";
import { Array2D } from "./../../libs/uitils.js";
import { getMooreProcess } from "./kernels/moore_kernel";
import { getGameOfLifeProcess } from "./kernels/game_of_life_kernel";
import { getNueMannProcess } from "./kernels/neumann_kernel";
import { getCrossProcess } from "./kernels/cross_kernel";
import { getRenderer } from "./kernels/render_kernel";
import { Constants } from "./constants/constants";
import { getColors } from "./utils";
import React from 'react';
import { ButtonList } from './../../common/common_components/button_list';
import { TopBar }  from './../../common/common_components/top_bar';

export class GpuJsShowCase extends React.Component {

  t1;
  t2;
  style;
  delay;
  fps_t1;
  fps_t2;
  list_items;
  process;
  renderer;
  listButtons;
  gpuTempState;
  rendererWidth;
  rendererOutlet;
  rendererHeight;
  animationHandle;
  gpuAutomataState;

  constructor(props) {
    super(props);
    this.rendererOutlet = React.createRef();
    this.t1 = performance.now();
    this.t2 = performance.now();
    this.fps_t1 = performance.now();
    this.fps_t2 = performance.now();
    this.delay = 0;
    this.style = new Style();
    this.state = { message : '*', buttonLabel : 'Start' };
    this.onItemClicked = this.onItemClicked.bind(this);
    this.onStartClicked = this.onStartClicked.bind(this);
    this.animate = this.animate.bind(this);
    this.updateRenderer = this.updateRenderer.bind(this);
    this.renderAndSwap = this.renderAndSwap.bind(this);
    this.list_items = [];
    this.list_items.push({ tag : 'square-cycles', displayText : 'CCA - R1/T1/C16/NM' });
    this.list_items.push({ tag : 'nuemann-cycles', displayText : 'CCA - R1/T1/C16/NN' });
    this.list_items.push({ tag : 'cross-cycles', displayText : 'CCA - R1/T1/C16/NC' });
    this.list_items.push({ tag : 'cca-r1t3c4nm', displayText : 'CCA - R1/T3/C4/NM' });
    this.list_items.push({ tag : 'cca-r1t3c3nm', displayText : 'CCA - R1/T3/C3/NM' });
    this.list_items.push({ tag : 'cca-r2t11c3nm', displayText : 'CCA - R2/T11/C3/NM' });
    this.list_items.push({ tag : 'cca-r2t5c8nm', displayText : 'CCA - R2/T5/C8/NM' });
    this.list_items.push({ tag : 'cca-r3t15c3nm', displayText : 'CCA - R3/T15/C3/NM' });
    this.list_items.push({ tag : 'cca-r2t9c4nm', displayText : 'CCA - R2/T9/C4/NM' });
    this.list_items.push({ tag : 'cca-r3t10c2nn', displayText : 'CCA - R3/T10/C2/NN' });
    this.list_items.push({ tag : 'cca-r2t5c3nn', displayText : 'CCA - R2/T5/C3/NN' });
    this.list_items.push({ tag : 'game-of-life', displayText : 'Game Of Life'});
  }

  componentDidMount() {
     this.rendererHeight = this.rendererOutlet.current.clientHeight - 20;
     this.rendererWidth = this.rendererOutlet.current.clientWidth;
     this.gpuAutomataState = Array2D(this.rendererHeight, this.rendererWidth);
     this.gpuTempState = Array2D(this.rendererHeight, this.rendererWidth);
     this.style.applyStyle();
     this.renderer = this.updateRenderer(this.rendererWidth, this.rendererHeight, getColors(this.style.getCurrentPallet().background, this.style.getCurrentPallet().foreground, 16 - 2));
     this.resetState(16);
     this.renderer(this.gpuAutomataState);
     /* Reposition the renderer canvas after rendring it once. */
     this.renderer = this.updateRenderer();
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
  updateRenderer(width, height, colors) {
    let renderer = getRenderer(width, height, colors);
    this.rendererOutlet.current.appendChild(renderer.canvas);
    return renderer;
  }

  /*
   * Update the automata state matrix with new random values.
   */
  resetState(numStates) {
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
      let message = `Processed & plotted ${ numPointsPerFrame }M points ${ framesPerSecond } times/second. [${ numPointsPerSecond }M points/second.] Phew!!!`;
      this.setState({ message : message });
    }
    this.t1 = this.t2;
    this.gpuTempState = this.process(this.gpuAutomataState);
    this.renderAndSwap();
    this.animationHandle = requestAnimationFrame(this.animate.bind(this));
  }

  /*
   * Specifes what process should be done on the automata state between renders.
   */
  setProcess(processName, width, height, threshold, numStates, range) {
    switch (processName) {
      case "moore": {
        this.process = getMooreProcess(width, height, threshold, numStates, range);
        this.reset(width, height, numStates);
      }
      break;
      case "cross": {
        this.process = getCrossProcess(width, height, threshold, numStates, range);
        this.reset(width, height, numStates);
      };
      break;
      case "neumann": {
        this.process = getNueMannProcess(width, height, threshold, numStates, range);
        this.reset(width, height, numStates);
      }
      break;
      case "gol": {
        this.process = getGameOfLifeProcess(width, height);
        this.reset(width, height, numStates);
      }
      break;
    }
  }

  /*
   * Reset the automata states and re-render it on the canvas.
   */
  reset(width, height, numStates) {
    this.renderer = this.updateRenderer(width, height, getColors(this.style.getCurrentPallet().background, this.style.getCurrentPallet().foreground, numStates - 2));
    this.resetState(numStates);
    this.renderer(this.gpuAutomataState);
  }

  onItemClicked(button, item) {
    this.setState({ buttonLabel : "Start" });
    if (this.animationHandle) {
      cancelAnimationFrame(this.animationHandle);
    }
    switch (item) {
      case Constants.id.r1t1c16nm:
        this.setProcess("moore", this.rendererWidth, this.rendererHeight, 1, 16, 1);
        break;
      case Constants.id.r1t1c16nn:
        this.setProcess("neumann", this.rendererWidth, this.rendererHeight, 1, 16, 1);
        break;
      case Constants.id.r1t1c16nc:
        this.setProcess("cross", this.rendererWidth, this.rendererHeight, 1, 16, 1);
        break;
      case Constants.id.r1t3c4nm:
        this.setProcess("moore", this.rendererWidth, this.rendererHeight, 3, 4, 1);
        break;
      case Constants.id.r1t3c3nm:
        this.setProcess("moore", this.rendererWidth, this.rendererHeight, 3, 3, 1);
        break;
      case Constants.id.gameoflife:
        this.setProcess("gol", this.rendererWidth, this.rendererHeight, -1, 2, -1);
        break;
      case Constants.id.r2t11c3nm:
        this.setProcess("moore", this.rendererWidth, this.rendererHeight, 11, 3, 2);
        break;
      case Constants.id.r2t5c8nm:
        this.setProcess("moore", this.rendererWidth, this.rendererHeight, 5, 8, 2);
        break;
      case Constants.id.r3t15c3nm:
        this.setProcess("moore", this.rendererWidth, this.rendererHeight, 15, 3, 3);
        break;
      case Constants.id.r2t9c4nm:
        this.setProcess("moore", this.rendererWidth, this.rendererHeight, 9, 4, 2);
        break;
      case Constants.id.r3t10c2nn:
        this.setProcess("neumann", this.rendererWidth, this.rendererHeight, 10, 2, 3);
        break;
      case Constants.id.r2t5c3nn:
        this.setProcess("neumann", this.rendererWidth, this.rendererHeight, 1, 5, 1);
        break;
      default:
        break;
    }
  }

  onStartClicked() {
    if (this.state.buttonLabel == "Start") {
      this.setState({ buttonLabel : "Stop" });
      if (this.animationHandle) {
        cancelAnimationFrame(this.animationHandle);
      }
      this.animationHandle = requestAnimationFrame(this.animate);
    } else {
      this.setState({ buttonLabel : "Start" });
      if (this.animationHandle) {
        cancelAnimationFrame(this.animationHandle);
      }
    }
  }

  render() {
    return (
      <div style = {{width : '99%', height : '99%', margin : '0px', padding : '0px'}} className = "pixel-app-container">
        <div className="pixel-app-header">
          <TopBar>
            <button className="pixel-button" style ={{ marginLeft : '5px'  }} id="start-button" onClick={this.onStartClicked}>{this.state.buttonLabel}</button>
            <label className="pixel-text-medium" style={{ marginLeft : '10px' }}>{this.state.message}</label>
          </TopBar>
        </div>
        <div className = "pixel-app-side-panel">
            <ButtonList onItemClicked = { this.onItemClicked } items = { this.list_items }></ButtonList>
        </div>
        <div className = "pixel-app-content" ref={this.rendererOutlet}>
        </div>
      </div>
    );
  }
}