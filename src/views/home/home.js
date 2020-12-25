import './home.css';
import "../../main.css";
import React from 'react';
import { Link } from 'react-router-dom';
import { Style } from "../../global/style.js";
import { ConwaysGameOfLife } from "../../automata/conwaysGameOfLife.js";
import { CyclicCellularAutomata } from "../../automata/cyclicCellularAutomata";
import { MatrixTraversalVisualizer } from "../../visualizers/matrixTraversalVisualizer";
import { fillBackground, getGradientStops, getMooreNeighbours, getNuemannNeighbours, getCrossNeighbours, } from "../../libs/uitils.js";

export class Home extends React.Component 
{
    style;
    automaton;
    numDivs;
    background;
    visualizers;
    automatonIndex;
    animationRequest;
    backgroundContext;
    prevAutomatonIndex

    constructor(props){
        super(props);
        this.style = new Style();
        this.visualizers = [];
        this.automatonIndex = 0;
        this.prevAutomatonIndex = 0;
        this.animationRequest = undefined;
        this.numDivs = 150;
        this.state = { info : "*", fpsInfo : "*", showWorks : false }; 
        console.log('Home created');
    }

    componentDidMount() {
        this.background = this.refs.backgroundCanvas;
        this.backgroundContext = this.background.getContext("2d");
        this.initBackgroundAnimation();
        this.showWorks = this.showWorks.bind(this);
        this.closeWorks = this.closeWorks.bind(this);
        this.onGreetingClicked = this.onGreetingClicked.bind(this);
        window.addEventListener("resize", this.handleResize.bind(this));
    }

    componentWillUnmount()
    {
        if (this.animationRequest != undefined) {
          window.cancelAnimationFrame(this.animationRequest);
        }
        window.removeEventListener("resize", this.handleResize.bind(this));
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

        /*
         * Making sure that the new random index is not same as the previous one.
         */
        while (this.automatonIndex == this.prevAutomatonIndex) {
          this.automatonIndex = Math.floor(Math.random() * 7);
        }
        let blockSize = 0;
        let rows = 0;
        let cols = 0;
        if (width >= height) {
          if (width < 1000) {
            this.numDivs = 100;
          }
          if (this.automatonIndex == 6) {
            this.numDivs = 21;
          } else {
            this.numDivs = 150;
          }
          cols = this.numDivs;
          blockSize = width / cols;
          rows = height / blockSize;
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
          blockSize = height / rows;
          cols = width / blockSize;
        }
        blockSize = Math.round(blockSize);
        this.visualizers = [];
        this.visualizers.push({
          description: "Conway's game of life",
          rule: undefined,
          automaton: new ConwaysGameOfLife(rows, cols, [this.style.getCurrentPallet().background, this.style.getCurrentPallet().foreground],
                                           this.backgroundContext, blockSize, 2, getMooreNeighbours),
        });
        this.visualizers.push({
          description: "Cyclic cellular automaton",
          rule: "R1/T1/C16/NM",
          automaton: new CyclicCellularAutomata(rows, cols, getGradientStops(this.style.getCurrentPallet().background, this.style.getCurrentPallet().foreground, 14),
                                                this.backgroundContext, blockSize, 16, 1, 1, getMooreNeighbours),
        });
        this.visualizers.push({
          description: "Cyclic cellular automaton",
          rule: "R1/T1/C16/NN",
          automaton: new CyclicCellularAutomata(rows, cols, getGradientStops(this.style.getCurrentPallet().background, this.style.getCurrentPallet().foreground, 14),
                                                this.backgroundContext, blockSize, 16, 1, 1, getNuemannNeighbours),
        });
        this.visualizers.push({
          description: "Cyclic cellular automaton",
          rule: "R1/T1/C16/NC",
          automaton: new CyclicCellularAutomata(rows, cols, getGradientStops(this.style.getCurrentPallet().background, this.style.getCurrentPallet().foreground, 14),
                                                this.backgroundContext, blockSize, 16, 1, 1, getCrossNeighbours),
        });
        this.visualizers.push({
          description: "Cyclic cellular automaton",
          rule: "R1/T3/C4/NM",
          automaton: new CyclicCellularAutomata(rows, cols, getGradientStops(this.style.getCurrentPallet().background, this.style.getCurrentPallet().foreground, 2),
                                                this.backgroundContext, blockSize, 4, 1, 3, getMooreNeighbours ),
        });
        this.visualizers.push({
          description: "Cyclic cellular automaton",
          rule: "R1/T3/C3/NM",
          automaton: new CyclicCellularAutomata(rows, cols, getGradientStops(this.style.getCurrentPallet().background, this.style.getCurrentPallet().foreground, 1),
                                                this.backgroundContext, blockSize, 3, 1, 3, getMooreNeighbours),
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
          this.setState({ info : `${this.visualizers[this.automatonIndex].description}, Rule : ${this.visualizers[this.automatonIndex].rule}` });
        } else {
          this.setState({ info : `${this.visualizers[this.automatonIndex].description}` });
        }
        this.automaton.drawCurrentState();
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
            this.automaton.calculateAndDrawNextState();
          }

          /*
           * Display the frame per seconds count every second.
           */
          if (frameCounterT2 - frameCounterT1 >= 1000) {
            frameCounterT1 = performance.now() - ((frameCounterT2 - frameCounterT1) % 1000);
            this.setState({ fpsInfo : `${fpsCount} FPS`});
            fpsCount = 0;
          }
          this.animationRequest = window.requestAnimationFrame(live.bind(this));
        }
        this.animationRequest = window.requestAnimationFrame(live.bind(this));
    } 

    /*
     * Redraw and restart everything when the user re-sized the window.
     */
    handleResize() {
        this.initBackgroundAnimation();
    }

    onGreetingClicked() {
        this.style.calculateNextPallet();
        this.initBackgroundAnimation();
    }

    showWorks(event) {
        this.setState({ showWorks : true });
        event.stopPropagation();
    }

    closeWorks(event) {
        this.setState({ showWorks : false });
        event.stopPropagation();
    }      

    render()
        {   
            return(
                <div style = {{ width : "100%", height : "100%" }}>    
                    <canvas ref="backgroundCanvas"></canvas>
                    <div className="center-div unselectable pixel-div pixel-text-big" id="greeting" onClick={this.onGreetingClicked}>
                        <p>
                            Hi! I'm Snippy Valson. <br/> <br/> Welcome to my webpage!
                        </p>
                        <div className="center-h-container">
                            <button className="pixel-button" onClick={this.showWorks}>My Works!</button>
                        </div>
                    </div>
                    <div className= { `center-div unselectable pixel-div pixel-text-big ${this.state.showWorks ? 'fade-in' : 'fade-out' } pixel-dialog` }>
                        <button className="pixel-button top-right" onClick={this.closeWorks}>x</button>
                        <p className="pixel-text-medium">Click the buttons to navigate.</p>
                        <div style={{ marginTop: '90px' }}>
                            <Link className="pixel-button nav-button" to = "/time-based-animation" >Time based animation (3D)</Link>
                            <Link className="pixel-button nav-button" to = "/gpu-js-showcase">Gpu.js Showcase</Link>
                            <a className="pixel-button nav-button" href="./views/benchmarks/benchmarks.html">Benchmarks</a>
                            <a className="pixel-button nav-button" href="./views/code_bits/code_bits.html">Code Bits</a>
                            <a className="pixel-button nav-button" href="./views/neo_command/neo_command.html">Neo Command</a>
                        </div>
                    </div>
                    <div className="bottom-left unselectable pixel-div pixel-text-medium"> 
                    {this.state.info} 
                    </div>
                    <div className="bottom-right unselectable pixel-div pixel-text-medium">    
                    {this.state.fpsInfo} 
                    </div>
                </div>
        );
    }
}