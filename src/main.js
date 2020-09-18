import './main.css'
import  { fillBackground, getGradientStops, getMooreNeighbours, getNuemannNeighbours, getCrossNeighbours } from './libs/uitils.js'
import { ColorPalletes } from './libs/colors.js'
import { ConwaysGameOfLife } from './automata/conwaysGameOfLife.js'
import { CyclicCellularAutomata } from './automata/cyclicCellularAutomata';

var background = document.getElementById('background-canvas');
var backgroundContext = background.getContext("2d");
var info = document.getElementById('info');
var fpsInfo = document.getElementById('fps');
var animationRequest  = undefined;
var numDivs = 150;
var prevColorIndex = 0;
var ColorIndex = Math.floor(Math.random() * ColorPalletes.length) + 0;
var prevAutomatonIndex =0;
var automatonIndex = 0;
console.log(ColorIndex);
var automaton;
var automata = [];


function initBackgroundAnimation() {
    applyStyle();
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
    while(ColorIndex == prevColorIndex) {
         ColorIndex = Math.floor(Math.random() * ColorPalletes.length) + 0;
    }
    prevColorIndex = ColorIndex;
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

function applyStyle() {

    var pixelDivs = document.getElementsByClassName("pixel-div");
    for(let pd of pixelDivs) {
        pd.style.background = ColorPalletes[ColorIndex].background;
        pd.style.color = ColorPalletes[ColorIndex].foreground;
        pd.style.borderColor = ColorPalletes[ColorIndex].foreground;
    }

    var pixelButtons = document.getElementsByClassName("pixel-button");
    for(let pb of pixelButtons) {
        
        pb.style.background = ColorPalletes[ColorIndex].background;
        pb.style.color = ColorPalletes[ColorIndex].foreground;
        pb.style.borderColor = ColorPalletes[ColorIndex].foreground;
        
        pb.onmouseover = undefined;
        pb.onmouseover = function () {
            pb.style.background = ColorPalletes[ColorIndex].foreground;
            pb.style.color = ColorPalletes[ColorIndex].background;
        };
        
        pb.onmouseout = undefined;
        pb.onmouseout = function () {
            pb.style.background = ColorPalletes[ColorIndex].background;
            pb.style.color = ColorPalletes[ColorIndex].foreground;
        };
        
        pb.onmousedown = undefined;
        pb.onmousedown = function () {
            pb.style.background = ColorPalletes[ColorIndex].background;
            pb.style.color = ColorPalletes[ColorIndex].foreground;
        };
        
        pb.onmouseup = undefined;
        pb.onmouseup = function () {
            pb.style.background = ColorPalletes[ColorIndex].foreground;
            pb.style.color = ColorPalletes[ColorIndex].background;
        };
    }
}