import './main.css'
import  { fillBackground, getGradientStops, getMooreNeighbours, getNuemannNeighbours, getCrossNeighbours } from './libs/uitils.js'
import { Style } from './libs/style'
import { ConwaysGameOfLife } from './automata/conwaysGameOfLife.js'
import { CyclicCellularAutomata } from './automata/cyclicCellularAutomata';

var background = document.getElementById('background-canvas');
var backgroundContext = background.getContext("2d");
var info = document.getElementById('info');
var fpsInfo = document.getElementById('fps');
var animationRequest  = undefined;
var numDivs = 150;
var prevAutomatonIndex =0;
var automatonIndex = 0;
var automaton;
var automata = [];
var style = new Style();

function initBackgroundAnimation() {
    style.applyStyle();
    if(animationRequest != undefined) {
        window.cancelAnimationFrame(animationRequest);
    }   
    var width = document.body.clientWidth;
    var height = document.body.clientHeight;
    background.width = width;
    background.height = height;
    fillBackground(backgroundContext, style.getCurrentPallet().background, width, height);
    var blockSize = 0;
    var rows = 0;
    var cols = 0;
    if(width >= height) {
        if(width < 1000) {
            numDivs = 100;
        }
        cols = numDivs;
        blockSize = width / cols;
        rows =  height / blockSize;
    } else {
        if(height < 1000) {
            numDivs = 100;
        }
        rows = numDivs;
        blockSize = height / rows;
        cols =  width / blockSize;
    }
    blockSize = Math.round(blockSize);

    automata = [];
    automata.push( { description : "Conway's game of life", rule : undefined, automaton : new ConwaysGameOfLife(rows, cols, [style.getCurrentPallet().background, style.getCurrentPallet().foreground], backgroundContext, blockSize, 2, getMooreNeighbours) });
    automata.push( { description : "Cyclic cellular automaton", rule : "R1/T1/C16/NM", automaton : new CyclicCellularAutomata(rows, cols, getGradientStops(style.getCurrentPallet().background, style.getCurrentPallet().foreground, 14), backgroundContext, blockSize, 16, 1, 1, getMooreNeighbours) });
    automata.push( { description : "Cyclic cellular automaton", rule : "R1/T1/C16/NN", automaton : new CyclicCellularAutomata(rows, cols, getGradientStops(style.getCurrentPallet().background, style.getCurrentPallet().foreground, 14), backgroundContext, blockSize, 16, 1, 1, getNuemannNeighbours) });
    automata.push( { description : "Cyclic cellular automaton", rule : "R1/T1/C16/NC", automaton : new CyclicCellularAutomata(rows, cols, getGradientStops(style.getCurrentPallet().background, style.getCurrentPallet().foreground, 14), backgroundContext, blockSize, 16, 1, 1, getCrossNeighbours) });
    automata.push( { description : "Cyclic cellular automaton", rule : "R1/T3/C4/NM", automaton : new CyclicCellularAutomata(rows, cols, getGradientStops(style.getCurrentPallet().background, style.getCurrentPallet().foreground, 2), backgroundContext, blockSize, 4, 1, 3, getMooreNeighbours) });
    automata.push( { description : "Cyclic cellular automaton", rule : "R1/T3/C3/NM", automaton : new CyclicCellularAutomata(rows, cols, getGradientStops(style.getCurrentPallet().background, style.getCurrentPallet().foreground, 1), backgroundContext, blockSize, 3, 1, 3, getMooreNeighbours) });

    while(automatonIndex == prevAutomatonIndex) {
         automatonIndex = Math.floor( Math.random() * automata.length);
    }
    prevAutomatonIndex = automatonIndex;
    automaton = automata[automatonIndex].automaton;
    if(automata[automatonIndex].rule != undefined) {
        info.innerHTML = `${automata[automatonIndex].description}, Rule : ${automata[automatonIndex].rule}`;
    } else {
        info.innerHTML = `${automata[automatonIndex].description}`;
    }
    automaton.drawCurrentState();
    var t1 = Date.now();
    var t2 = Date.now();
    var ft1 = Date.now();
    var ft2 = Date.now();
    var fps = 0;
    function live(){
        t2 = Date.now();
        ft2 = Date.now();
        if(t2 - t1 >= 1000 / 30) {
            t1 = Date.now() - ((t2 - t1) % (1000 / 30));
            fps++;
            automaton.calculateAndDrawNextState();
        }
        if(ft2 - ft1 >= 1000)
        {
            ft1 = Date.now() - ((ft2- ft1) % 1000);
            fpsInfo.innerHTML = `${fps} fps`;
            fps = 0;
        }
        animationRequest = window.requestAnimationFrame(live);
    }
    animationRequest = window.requestAnimationFrame(live);
}

initBackgroundAnimation();

window.onresize = handleResize;
function handleResize() {
    initBackgroundAnimation();
}

window.onGreetingClicked = onGreetingClicked;
function onGreetingClicked(){
    style.calculateNextPallet();
    initBackgroundAnimation();
}

window.showWorks = showWorks;
function showWorks(event) {
    var works = document.getElementById("works");
    if(works.classList.contains("fade-out"))
    {
        works.classList.remove("fade-out");
        works.classList.add("fade-in");
    }
    event.stopPropagation();
}

window.closeWorks = closeWorks;
function closeWorks(event) {
    console.log(event);
    var works = document.getElementById("works");
    if(works.classList.contains("fade-in"))
    {
        works.classList.remove("fade-in");
        works.classList.add("fade-out");
    }
    event.stopPropagation();
}

