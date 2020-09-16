import './main.css'
import  { fillBackground } from './libs/uitils.js'
import { ColorPalletes } from './libs/colors.js'
import { ConwaysGameOfLife } from './automata/conwaysGameOfLife.js'

var background = document.getElementById('background-canvas');
var backgroundContext = background.getContext("2d");
var greeting = document.getElementById('greeting');
var animationRequest  = undefined;
var numDivs = 100;
var ColorIndex = Math.floor(Math.random() * ColorPalletes.length) + 0;
console.log(ColorIndex);
var automaton;

function initBackgroundAnimation() {
    greeting.style.background = ColorPalletes[ColorIndex].background;
    greeting.style.color = ColorPalletes[ColorIndex].foreground;
    greeting.style.borderColor = ColorPalletes[ColorIndex].foreground;
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
    automaton = new ConwaysGameOfLife(rows, cols, [ColorPalletes[ColorIndex].foreground, ColorPalletes[ColorIndex].background], backgroundContext, blockSize);
    automaton.drawCurrentState();
    function live(){
        automaton.calculateAndDrawNextState();
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