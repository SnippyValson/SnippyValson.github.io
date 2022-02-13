import "../../main.css";
import componentStyles from './Home.module.css'
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Style } from "../../shared/style";
import { ConwaysGameOfLife } from "../../shared/visualizers/automata/conwaysGameOfLife";
import { CyclicCellularAutomata } from "../../shared/visualizers/automata/cyclicCellularAutomata";
import { MatrixTraversalVisualizer } from "../../shared/visualizers/matrixTraversalVisualizer";
import { fillBackground, getGradientStops, checkCrossNeighbourhood, checkMooreNeighbourhood, checkNuemannNeighbourhood, debounce } from "../../shared/utilities";
import { MandelbrotVisualzier } from "shared/visualizers/fractals/mandelbrot";

type IProps = {}

type IState = {
  info: string,
  fpsInfo: string,
  showWorks: boolean
}

export class Home extends React.Component<IProps> {
  style: any;
  automaton: any;
  numDivs: number;
  background: any;
  visualizers: any[];
  automatonIndex: number;
  animationRequest: number;
  backgroundContext: CanvasRenderingContext2D;
  prevAutomatonIndex: number;
  debouncedResizeHandler: any;
  state: Readonly<IState>;

  constructor(props: IProps) {
    super(props);
    this.style = new Style();
    this.visualizers = [];
    this.automatonIndex = 0;
    this.prevAutomatonIndex = 0;
    this.animationRequest = undefined;
    this.numDivs = 150;
    this.state = { info: "*", fpsInfo: "*", showWorks: false };
  }

  componentDidMount() {
    this.background = this.refs.backgroundCanvas;
    this.backgroundContext = this.background.getContext("2d");
    this.initBackgroundAnimation();
    this.showWorks = this.showWorks.bind(this);
    this.closeWorks = this.closeWorks.bind(this);
    this.onGreetingClicked = this.onGreetingClicked.bind(this);
    this.debouncedResizeHandler = debounce(this.handleResize.bind(this), 250);
    window.addEventListener("resize", this.debouncedResizeHandler);
  }

  componentWillUnmount() {
    if (this.animationRequest != undefined) {
      window.cancelAnimationFrame(this.animationRequest);
    }
    window.removeEventListener("resize", this.debouncedResizeHandler);
  }

  initBackgroundAnimation() {
    this.style.applyStyle();

    /*
     * Cancel the previous animation.
     */
    if (this.animationRequest != undefined) {
      window.cancelAnimationFrame(this.animationRequest);
    }
    let width = document.body.clientWidth;
    let height = document.body.clientHeight;
    this.background.width = width;
    this.background.height = height;

    fillBackground(this.backgroundContext, this.style.getCurrentPallet().background, width, height);

    
    // Making sure that the new random index is not same as the previous one.
    while (this.automatonIndex == this.prevAutomatonIndex) {
      this.automatonIndex = Math.floor(Math.random() * 8);
    }

    let blockSize = 0;
    let rows = 0;
    let cols = 0;
    
    // Divide the largest dimension into predefined number of segements.
    if (width >= height) {
      
      // Divide the rows into 21 segments, for the matrix traversal.
      // Too many squares will cause the animations to take up too much time.
      if (this.automatonIndex == 7) {
        this.numDivs = 21;
      } else {
        this.numDivs = 150;
      }
      cols = this.numDivs;
      
      // Ciel the number, it's okay even if the squares extend beyond the viewport
      blockSize = Math.ceil(width / cols);
      rows = Math.ceil(height / blockSize);
    } else {
      if (height < 1000) {
        this.numDivs = 100;
      }
      if (this.automatonIndex == 6) {
        this.numDivs = 21;
      } else {
        this.numDivs = 150;
      }
      rows = this.numDivs;
      blockSize = Math.ceil(height / rows);
      cols = Math.ceil(width / blockSize);
    }
    rows = Math.round(rows);
    cols = Math.round(cols);
    blockSize = Math.round(blockSize);
    this.visualizers = [];
    this.visualizers.push({
      description: "Mandelbrot Set",
      rule: undefined,
      automaton: new MandelbrotVisualzier(rows, cols, [this.style.getCurrentPallet().background, this.style.getCurrentPallet().foreground],
        this.backgroundContext, blockSize)
    });
    this.visualizers.push({
      description: "Conway's game of life",
      rule: undefined,
      automaton: new ConwaysGameOfLife(rows, cols, [this.style.getCurrentPallet().background, this.style.getCurrentPallet().foreground],
        this.backgroundContext, blockSize, 2, checkMooreNeighbourhood),
    });
    this.visualizers.push({
      description: "Cyclic cellular automaton",
      rule: "R1/T1/C16/NM",
      automaton: new CyclicCellularAutomata(rows, cols, getGradientStops(this.style.getCurrentPallet().background, this.style.getCurrentPallet().foreground, 14),
        this.backgroundContext, blockSize, 16, 1, 1, checkMooreNeighbourhood),
    });
    this.visualizers.push({
      description: "Cyclic cellular automaton",
      rule: "R1/T1/C16/NN",
      automaton: new CyclicCellularAutomata(rows, cols, getGradientStops(this.style.getCurrentPallet().background, this.style.getCurrentPallet().foreground, 14),
        this.backgroundContext, blockSize, 16, 1, 1, checkNuemannNeighbourhood),
    });
    this.visualizers.push({
      description: "Cyclic cellular automaton",
      rule: "R1/T1/C16/NC",
      automaton: new CyclicCellularAutomata(rows, cols, getGradientStops(this.style.getCurrentPallet().background, this.style.getCurrentPallet().foreground, 14),
        this.backgroundContext, blockSize, 16, 1, 1, checkCrossNeighbourhood),
    });
    this.visualizers.push({
      description: "Cyclic cellular automaton",
      rule: "R1/T3/C4/NM",
      automaton: new CyclicCellularAutomata(rows, cols, getGradientStops(this.style.getCurrentPallet().background, this.style.getCurrentPallet().foreground, 2),
        this.backgroundContext, blockSize, 4, 1, 3, checkMooreNeighbourhood),
    });
    this.visualizers.push({
      description: "Cyclic cellular automaton",
      rule: "R1/T3/C3/NM",
      automaton: new CyclicCellularAutomata(rows, cols, getGradientStops(this.style.getCurrentPallet().background, this.style.getCurrentPallet().foreground, 1),
        this.backgroundContext, blockSize, 3, 1, 3, checkMooreNeighbourhood),
    });
    this.visualizers.push({
      description: "Matrix Traversal",
      rule: undefined,
      automaton: new MatrixTraversalVisualizer(rows, cols, [this.style.getCurrentPallet().background, this.style.getCurrentPallet().foreground],
        this.backgroundContext, blockSize),
    });
    this.prevAutomatonIndex = this.automatonIndex;
    this.automaton = this.visualizers[this.automatonIndex].automaton;

    /*
     * Rules only apply to Cyclic Cellular Automatons.
     */
    if (this.visualizers[this.automatonIndex].rule != undefined) {
      this.setState({ info: `${this.visualizers[this.automatonIndex].description}, Rule : ${this.visualizers[this.automatonIndex].rule}` });
    } else {
      this.setState({ info: `${this.visualizers[this.automatonIndex].description}` });
    }
    this.automaton.initialize();
    let frameLimiterT1 = performance.now();
    let frameLimiterT2 = performance.now();
    let frameCounterT1 = performance.now();
    let frameCounterT2 = performance.now();
    let fpsCount = 0;
    function live() {

      frameLimiterT2 = performance.now();
      frameCounterT2 = performance.now();

      /*
       * The animation frames should be drawn 30 times every second.
       */
      if (frameLimiterT2 - frameLimiterT1 >= 1000 / 30) {
        frameLimiterT1 = performance.now() - ((frameLimiterT2 - frameLimiterT1) % (1000 / 30));
        fpsCount++;
        this.automaton.renderNextFrame();
      }

      /*
       * Display the fps count every second.
       */
      if (frameCounterT2 - frameCounterT1 >= 1000) {
        frameCounterT1 = performance.now() - ((frameCounterT2 - frameCounterT1) % 1000);
        this.setState({ fpsInfo: `${fpsCount} FPS` });
        fpsCount = 0;
      }
      this.animationRequest = window.requestAnimationFrame(live.bind(this));
    }
    this.animationRequest = window.requestAnimationFrame(live.bind(this));
  }

  /*
   * Redraw and restart everything when the user re-sizes the window.
   */
  handleResize() {
    this.initBackgroundAnimation();
  }

  onGreetingClicked() {
    this.style.calculateNextPallet();
    this.initBackgroundAnimation();
  }

  showWorks(event: any) {
    this.setState({ showWorks: true });
    event.stopPropagation();
  }

  closeWorks(event: any) {
    this.setState({ showWorks: false });
    event.stopPropagation();
  }

  render() {
    return (
      <div className="home">
        <canvas ref="backgroundCanvas"></canvas>
        <div className="center-div unselectable pixel-div pixel-text-big" id="greeting" onClick={this.onGreetingClicked}>
          <p>
            Hi! I'm Snippy Valson.
          </p>
          <p><br /></p>
          <p>
            Welcome to my webpage!
          </p>
          <div className="center-h-container">
            <button className="pixel-button works-button" onClick={this.showWorks}>My Works!</button>
          </div>
        </div>
        <div className={`center-div unselectable pixel-div pixel-text-big ${this.state.showWorks ? 'fade-in' : 'fade-out'} pixel-dialog`}>
          <button className="pixel-button top-right" onClick={this.closeWorks}>x</button>
          <p className="pixel-text-medium">Click the buttons to navigate.</p>
          <div className="home-links">
            <Link className="pixel-button nav-button" to="/threejs-showcase" >Time based animation (3D)</Link>
            <Link className="pixel-button nav-button" to="/gpu-js-showcase">Gpu.js Showcase</Link>
            <Link className="pixel-button nav-button" to="/benchmarks">Benchmarks</Link>
          </div>
        </div>
        <div className={`${componentStyles["algorithm-info"]} unselectable pixel-div pixel-text-medium`}>
          {this.state.info}
        </div>
        <div className="fps-info unselectable pixel-div pixel-text-medium">
          {this.state.fpsInfo}
        </div>
      </div>
    );
  }
}