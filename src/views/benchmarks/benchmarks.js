import "./../../main.css";
import "./benchmarks.css";
import {
    Style
} from "../../libs/style";

var style = new Style();
style.applyStyle();
var array = [];
var merged = [];
var numFinised = 0;
var arraySize = 80000000;
var numPhysicalThreads = navigator.hardwareConcurrency;
var startTime = performance.now();
var endTime = performance.now();
var bubbleSortWorkers = [];
var quickSortWorkers = [];

for (let i = 0; i < numPhysicalThreads; i++) {
    var bubbleWorker = new Worker("bubblesort_worker.js");
    bubbleWorker.onmessage = function (e) {
        if (numFinised == 0) {
            merged = e.data;
        } else {
            merged = mergeSortedArrays(merged, e.data)
        }
        numFinised++;
        if (numFinised == numPhysicalThreads) {
            endTime = performance.now();
            document.getElementById("multi-bubblesort-result").innerHTML = `${endTime - startTime} ms`;
            document.getElementById("info-label").innerHTML = "Idle";
        }
    }
    bubbleSortWorkers.push(bubbleWorker);
    var quickWorker = new Worker("quicksort_worker.js");
    quickWorker.onmessage = function (e) {
        if (numFinised == 0) {
            merged = e.data;
        } else {
            merged = mergeSortedArrays(merged, e.data)
        }
        numFinised++;
        if (numFinised == numPhysicalThreads) {
            endTime = performance.now();
            document.getElementById("multi-quicksort-result").innerHTML = `${endTime - startTime} ms`;
            document.getElementById("info-label").innerHTML = "Idle";
        }
    }
    quickSortWorkers.push(quickWorker);
}

var populationWorker = new Worker("population_worker.js");
populationWorker.onmessage = function (e) {
    array = e.data;
    document.getElementById("info-label").innerHTML = "Idle";
}

var bubbleSortWorker = new Worker("bubblesort_worker.js");
bubbleSortWorker.onmessage = function (e) {
    endTime = performance.now();
    document.getElementById("bubblesort-result").innerHTML = `${endTime - startTime} ms`;
    document.getElementById("info-label").innerHTML = "Idle";
}

var quickSortWorker = new Worker("quicksort_worker.js");
quickSortWorker.onmessage = function (e) {
    endTime = performance.now();
    document.getElementById("quicksort-result").innerHTML = `${endTime - startTime} ms`;
    document.getElementById("info-label").innerHTML = "Idle";
}

window.onItemCliked = onItemCliked;
function onItemCliked(item) {
    switch (item) {
        case "sorting-benchmarks": {

        }
        break;
    }
}

window.populateArray = populateArray;
function populateArray() {
    document.getElementById("info-label").innerHTML = "Loading...";
    populationWorker.postMessage(arraySize);
}

window.bubbleSortArray = bubbleSortArray;
function bubbleSortArray() {
    document.getElementById("info-label").innerHTML = "Loading...";
    startTime = performance.now();
    bubbleSortWorker.postMessage({
        array: array
    });
}

window.quickSortArray = quickSortArray;
function quickSortArray() {
    document.getElementById("info-label").innerHTML = "Loading...";
    startTime = performance.now();
    quickSortWorker.postMessage({
        array: array
    });
}

window.multiBubbleSortArray = multiBubbleSortArray;
function multiBubbleSortArray() {
    document.getElementById("info-label").innerHTML = "Loading...";
    startTime = performance.now();
    let index = 0;
    numFinised = 0;
    merged = [];
    let sliceLength = arraySize / numPhysicalThreads;
    for (let i = 0; i < numPhysicalThreads; i++) {
        bubbleSortWorkers[i].postMessage({
            array: array.slice(index, index + sliceLength)
        });
        index += sliceLength;
    }
}

window.multiQuickSortArray = multiQuickSortArray;
function multiQuickSortArray() {
    document.getElementById("info-label").innerHTML = "Loading...";
    startTime = performance.now();
    let index = 0;
    numFinised = 0;
    merged = [];
    let sliceLength = arraySize / numPhysicalThreads;
    for (let i = 0; i < numPhysicalThreads; i++) {
        quickSortWorkers[i].postMessage({
            array: array.slice(index, index + sliceLength)
        });
        index += sliceLength;
    }
}

function mergeSortedArrays(a, b) {
    let count = a.length + b.length;
    let index = 0;
    let aIndex = 0;
    let bIndex = 0;
    var result = [];
    while (index < count) {
        if (a[aIndex] <= b[bIndex]) {
            result[index++] = a[aIndex];
            aIndex++;
        } else {
            result[index++] = b[bIndex];
            bIndex++;
        }
        if (aIndex == a.length - 1 || bIndex == b.length - 1) {
            break;
        }
    }
    if (aIndex == a.length - 1) {
        for (let i = bIndex; i < b.length; i++) {
            result[index++] = b[i];
        }
    } else if (bIndex == b.length - 1) {
        for (let i = aIndex; i < a.length; i++) {
            result[index++] = a[i];
        }
    }
    return result;
}