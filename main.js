import './main.css'
import  { getMooreNeighbours, getMooreNeighboursWrap } from './uitils.js'

var background = document.getElementById('background-canvas');
var backgroundContext = background.getContext("2d");
var greeting = document.getElementById('greeting');
var animationRequest  = undefined;
var numDivs = 100;
var conwayColorPalletes = [];

conwayColorPalletes.push( { background : '#263862' , foreground : '#96b0fc' });
conwayColorPalletes.push( { background : '#030f2d' , foreground : '#00bcf9' });
conwayColorPalletes.push( { background : '#131314' , foreground : '#91b5a4' });
conwayColorPalletes.push( { background : '#140e36' , foreground : '#b82941' });
conwayColorPalletes.push( { background : '#2f4650' , foreground : '#91eddf' });

var conwayColorIndex = Math.floor(Math.random() * conwayColorPalletes.length) + 0;
console.log(conwayColorIndex);

function initBackground() {

    greeting.style.background = conwayColorPalletes[conwayColorIndex].background;
    greeting.style.color = conwayColorPalletes[conwayColorIndex].foreground;
    greeting.style.borderColor = conwayColorPalletes[conwayColorIndex].foreground;

    if(animationRequest != undefined) {
        window.cancelAnimationFrame(animationRequest);
    }
    
    var width = document.body.clientWidth;
    var height = document.body.clientHeight;
    background.width = width;
    background.height = height;
    backgroundContext.beginPath();
    backgroundContext.fillStyle = conwayColorPalletes[conwayColorIndex].background;
    backgroundContext.rect(0,0, width, height);
    backgroundContext.fill();

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

    var state = [];
    var tempState = [];
    for(var i = 0 ; i < rows; i ++) {
        state[i] = [];
        tempState[i] = [];
    }

    for(var i = 0 ; i < rows; i ++) {
        for(var j = 0; j < cols; j ++) {
            state[i][j] = Math.random() >= 0.5;
        }
    }
    
    for(var i = 0; i < rows; i++) {
        for(var j = 0; j < cols; j ++) {
            if(state[i][j] == true) {
                backgroundContext.beginPath();
                backgroundContext.fillStyle = conwayColorPalletes[conwayColorIndex].foreground;
                backgroundContext.rect(blockSize * j , blockSize * i , blockSize, blockSize);
                backgroundContext.fill();
            } else {
                backgroundContext.beginPath();
                backgroundContext.fillStyle = conwayColorPalletes[conwayColorIndex].background;
                backgroundContext.rect(blockSize * j , blockSize * i , blockSize , blockSize );
                backgroundContext.fill();
            }
        }
    }

    function live(){
        for(var i = 0; i < rows; i++) {
            for(var j = 0; j < cols; j ++) {
                var neighbours = getMooreNeighbours(i, j, state, rows, cols);
                var liveCount = 0;
                neighbours.forEach(neighbour => {
                    if(neighbour) {
                        liveCount ++;
                    }
                });
                if(liveCount < 2 || liveCount > 3){
                    tempState[i][j] = false;
                } else if( liveCount == 2 || liveCount == 3) {
                    tempState[i][j] = state[i][j];
                    if(liveCount == 3){
                        tempState[i][j] = true;
                    }
                }
            }
        }
        for(var i = 0; i < rows; i++)
        {
            for(var j = 0; j < cols; j ++) {
                state[i][j] = tempState[i][j];
            }
        }
        backgroundContext.beginPath();
        backgroundContext.fillStyle = conwayColorPalletes[conwayColorIndex].background;
        backgroundContext.rect(0,0, width, height);
        backgroundContext.fill();
        for(var i = 0; i < rows; i++)
        {
            for(var j = 0; j < cols; j ++) {
                if(state[i][j] == true) {
                    backgroundContext.beginPath();
                    backgroundContext.fillStyle = conwayColorPalletes[conwayColorIndex].foreground;
                    backgroundContext.rect(blockSize * j , blockSize * i , blockSize , blockSize );
                    backgroundContext.fill();
                } else {
                    backgroundContext.beginPath();
                    backgroundContext.fillStyle = conwayColorPalletes[conwayColorIndex].background;
                    backgroundContext.rect(blockSize * j, blockSize * i , blockSize , blockSize );
                    backgroundContext.fill();
                }
            }
        }
        animationRequest = window.requestAnimationFrame(live);
    }
    animationRequest = window.requestAnimationFrame(live);
}

initBackground();

window.onresize = handleResize;
function handleResize() {
    initBackground();
}