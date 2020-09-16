import './main.css'
import  { fillBackground, getGradientStops, getMooreNeighbours, getNuemannNeighbours, getCrossNeighbours } from './libs/uitils.js'
import { ColorPalletes } from './libs/colors.js'
import { ConwaysGameOfLife } from './automata/conwaysGameOfLife.js'
import { CyclicCellularAutomata } from './automata/cyclicCellularAutomata';

var background = document.getElementById('background-canvas');
var backgroundContext = background.getContext("2d");
var greeting = document.getElementById('greeting');
var info = document.getElementById('info');
var animationRequest  = undefined;
var numDivs = 200;
var ColorIndex = Math.floor(Math.random() * ColorPalletes.length) + 0;
console.log(ColorIndex);
var automaton;
var automata = [];


function initBackgroundAnimation() {
    greeting.style.background = ColorPalletes[ColorIndex].background;
    greeting.style.color = ColorPalletes[ColorIndex].foreground;
    greeting.style.borderColor = ColorPalletes[ColorIndex].foreground;
    info.style.background = ColorPalletes[ColorIndex].background;
    info.style.color = ColorPalletes[ColorIndex].foreground;
    info.style.borderColor = ColorPalletes[ColorIndex].foreground;
    if(animationRequest != undefined) {
        window.cancelAnimationFrame(animationRequest);
    }   
    var width = document.body.clientWidth;
    var height = document.body.clientHeight;
    background.width = width;
    background.height = height;
    fillBackground(backgroundContext, ColorPalletes[ColorIndex].background, width, height);
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
    automata.push( { description : "Conway's game of life", rule : undefined, automaton : new ConwaysGameOfLife(rows, cols, [ColorPalletes[ColorIndex].background, ColorPalletes[ColorIndex].foreground], backgroundContext, blockSize, 2, getMooreNeighbours) });
    automata.push( { description : "Cyclic cellular automaton", rule : "R1/T1/C16/NM", automaton : new CyclicCellularAutomata(rows, cols, getGradientStops(ColorPalletes[ColorIndex].background, ColorPalletes[ColorIndex].foreground, 14), backgroundContext, blockSize, 16, 1, 1, getMooreNeighbours) });
    automata.push( { description : "Cyclic cellular automaton", rule : "R1/T1/C16/NN", automaton : new CyclicCellularAutomata(rows, cols, getGradientStops(ColorPalletes[ColorIndex].background, ColorPalletes[ColorIndex].foreground, 14), backgroundContext, blockSize, 16, 1, 1, getNuemannNeighbours) });
    automata.push( { description : "Cyclic cellular automaton", rule : "R1/T1/C16/NC", automaton : new CyclicCellularAutomata(rows, cols, getGradientStops(ColorPalletes[ColorIndex].background, ColorPalletes[ColorIndex].foreground, 14), backgroundContext, blockSize, 16, 1, 1, getCrossNeighbours) });
    automata.push( { description : "Cyclic cellular automaton", rule : "R1/T3/C4/NM", automaton : new CyclicCellularAutomata(rows, cols, getGradientStops(ColorPalletes[ColorIndex].background, ColorPalletes[ColorIndex].foreground, 2), backgroundContext, blockSize, 4, 1, 3, getMooreNeighbours) });
    automata.push( { description : "Cyclic cellular automaton", rule : "R1/T3/C3/NM", automaton : new CyclicCellularAutomata(rows, cols, getGradientStops(ColorPalletes[ColorIndex].background, ColorPalletes[ColorIndex].foreground, 1), backgroundContext, blockSize, 3, 1, 3, getMooreNeighbours) });

    var index = Math.floor( Math.random() * automata.length);
    automaton = automata[index].automaton;
    if(automata[index].rule != undefined) {
        info.innerHTML = `${automata[index].description}, Rule : ${automata[index].rule}`;
    } else {
        info.innerHTML = `${automata[index].description}`;
    }
    automaton.drawCurrentState();
    var t1 = Date.now();
    var t2 = Date.now();
    function live(){
        t2 = Date.now();
        if(t2 - t1 >= 50) {
            automaton.calculateAndDrawNextState();
            t1 = Date.now();
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
    ColorIndex = Math.floor(Math.random() * ColorPalletes.length) + 0;
    initBackgroundAnimation();
}