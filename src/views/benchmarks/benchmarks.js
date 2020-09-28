import "./../../main.css";
import "./benchmarks.css";
import { Style } from "../../libs/style";
import { Strings } from "./strings"

var style = new Style();
style.applyStyle();
var array = [];
var merged = [];
var numFinised = 0;
var arraySize = 80000;
var numPhysicalThreads = navigator.hardwareConcurrency;
var startTime = performance.now();
var endTime = performance.now();
var bubbleSortWorkers = [];
var quickSortWorkers = [];
var okAction;
var cancelAction;

for (let i = 0; i < numPhysicalThreads; i++) {
  var bubbleWorker = new Worker(Strings.bubbleSortWorkerFile);
  bubbleWorker.onmessage = function (e) {
    if (numFinised == 0) {
      merged = e.data;
    } else {
      merged = mergeSortedArrays(merged, e.data);
    }
    numFinised++;
    if (numFinised == numPhysicalThreads) {
      endTime = performance.now();
      document.getElementById("multi-bubblesort-result").innerHTML = `${
        endTime - startTime
      } ms`;
      document.getElementById("info-label").innerHTML = "Idle";
      showCheckBox("bubble-sort-multi-done");
    }
  };
  bubbleSortWorkers.push(bubbleWorker);
  var quickWorker = new Worker("quicksort_worker.js");
  quickWorker.onmessage = function (e) {
    if (numFinised == 0) {
      merged = e.data;
    } else {
      merged = mergeSortedArrays(merged, e.data);
    }
    numFinised++;
    if (numFinised == numPhysicalThreads) {
      endTime = performance.now();
      document.getElementById("multi-quicksort-result").innerHTML = `${
        endTime - startTime
      } ms`;
      document.getElementById("info-label").innerHTML = "Idle";
      showCheckBox("quick-sort-multi-done");
    }
  };
  quickSortWorkers.push(quickWorker);
}

var populationWorker = new Worker("population_worker.js");
populationWorker.onmessage = function (e) {
  array = e.data;
  document.getElementById("info-label").innerHTML = "Idle";
  showCheckBox("populate-array-done");
};

var bubbleSortWorker = new Worker("bubblesort_worker.js");
bubbleSortWorker.onmessage = function (e) {
  endTime = performance.now();
  document.getElementById("bubblesort-result").innerHTML = `${
    endTime - startTime
  } ms`;
  document.getElementById("info-label").innerHTML = "Idle";
  showCheckBox("bubble-sort-done");
};

var quickSortWorker = new Worker("quicksort_worker.js");
quickSortWorker.onmessage = function (e) {
  endTime = performance.now();
  document.getElementById("quicksort-result").innerHTML = `${
    endTime - startTime
  } ms`;
  document.getElementById("info-label").innerHTML = "Idle";
  showCheckBox("quick-sort-done");
};

window.onItemCliked = onItemCliked;
function onItemCliked(item) {
  switch (item) {
    case "sorting-benchmarks":
      {
      }
      break;
  }
}

window.populateArray = populateArray;
function populateArray() {
  arraySize = parseInt(document.getElementById("count").value);
  document.getElementById("info-label").innerHTML = "Loading...";
  hideCheckBox("populate-array-done");
  populationWorker.postMessage(arraySize);
}

window.bubbleSortArray = bubbleSortArray;
function bubbleSortArray() {
  if (array == undefined || array.length == 0) {
    showMessage("Please generate data.");
    return;
  } else if(array.length > 100000) {
    showDialog("You are going to process a large array, this may cause your browswer to hang.", executeBubbleSort, ()=>{});
    return;
  }
  executeBubbleSort();
}

function executeBubbleSort(){
    document.getElementById("info-label").innerHTML = "Loading...";
    hideCheckBox("bubble-sort-done");
    startTime = performance.now();
    bubbleSortWorker.postMessage({
      array: array,
    });
}

window.quickSortArray = quickSortArray;
function quickSortArray() {
  if (array == undefined || array.length == 0) {
    showMessage("Please generate data.");
    return;
  } else if(array.length > 100000) {
    showDialog("You are going to process a large array, this may cause your browswer to hang.", executeQuickSort, ()=>{});
    return;
  }
  executeQuickSort();
}

function executeQuickSort() {
    document.getElementById("info-label").innerHTML = "Loading...";
    hideCheckBox("quick-sort-done");
    startTime = performance.now();
    quickSortWorker.postMessage({
      array: array,
    });
}

window.multiBubbleSortArray = multiBubbleSortArray;
function multiBubbleSortArray() {
  if (array == undefined || array.length == 0) {
    showMessage("Please generate data.");
    return;
  } else if(array.length > 100000) {
    showDialog("You are going to process a large array, this may cause your browswer to hang.", executeMultiBubbleSort, ()=>{});
    return;
  }
  executeMultiBubbleSort();
}

function executeMultiBubbleSort() {
    document.getElementById("info-label").innerHTML = "Loading...";
    hideCheckBox("bubble-sort-multi-done");
    startTime = performance.now();
    let index = 0;
    numFinised = 0;
    merged = [];
    var numSlices = numPhysicalThreads;
    let sliceLength = Math.floor(arraySize / numPhysicalThreads);
    let remaining = arraySize % numPhysicalThreads;
    if (remaining != 0) {
      numSlices--;
    }
    for (let i = 0; i < numSlices; i++) {
      bubbleSortWorkers[i].postMessage({
        array: array.slice(index, index + sliceLength),
      });
      index += sliceLength;
    }
    if (remaining != 0) {
      bubbleSortWorkers[numPhysicalThreads - 1].postMessage({
        array: array.slice(index, index + sliceLength + remaining),
      });
    }
}

window.multiQuickSortArray = multiQuickSortArray;
function multiQuickSortArray() {
  if (array == undefined || array.length == 0) {
    showMessage("Please generate data.");
    return;
  } else if(array.length > 100000) {
    showDialog("You are going to process a large array, this may cause your browswer to hang.", executeMultiQuickSort, ()=>{});
    return;
  }
  executeMultiQuickSort();
}

function executeMultiQuickSort() {
    document.getElementById("info-label").innerHTML = "Loading...";
    hideCheckBox("quick-sort-multi-done");
    startTime = performance.now();
    let index = 0;
    numFinised = 0;
    merged = [];
    var numSlices = numPhysicalThreads;
    let sliceLength = Math.floor(arraySize / numPhysicalThreads);
    let remaining = arraySize % numPhysicalThreads;
    if (remaining != 0) {
      numSlices--;
    }
    for (let i = 0; i < numSlices; i++) {
      quickSortWorkers[i].postMessage({
        array: array.slice(index, index + sliceLength),
      });
      index += sliceLength;
    }
    if (remaining != 0) {
      quickSortWorkers[numPhysicalThreads - 1].postMessage({
        array: array.slice(index, index + sliceLength + remaining),
      });
    }
}

window.closeMessage = closeMessage;
function closeMessage() {
    hideMessage();
}

window.closeDialog = closeDialog;
function closeDialog() {
    hideDialog();
    if(cancelAction) {
        cancelAction();
    }
    okAction = undefined;
    cancelAction = undefined;
}

window.closeDialogOK = closeDialogOK;
function closeDialogOK() {
    hideDialog();
    if(okAction) {
        okAction();
    }
    okAction = undefined;
    cancelAction = undefined;
}

function showDialog(message, okaction, cancelaction) {
    okAction = okaction;
    cancelAction = cancelaction;
    showModal();
    document.getElementById("okcanceldialog").classList.remove("fade-out");
    document.getElementById("okcanceldialog").classList.add("fade-in");
    document.getElementById("okcanceldialog-content").innerHTML = message;
}

function hideDialog(){
    document.getElementById("okcanceldialog").classList.add("fade-out");
    document.getElementById("okcanceldialog").classList.remove("fade-in");
    hideModal();
}

function showMessage(message) {
    showModal();
    document.getElementById("message").classList.remove("fade-out");
    document.getElementById("message").classList.add("fade-in");
    document.getElementById("message-content").innerHTML = message;
}

function hideMessage() {
    document.getElementById("message").classList.add("fade-out");
    document.getElementById("message").classList.remove("fade-in");
    hideModal();
}

function showModal() {
  document.getElementById("modal-shadow").style.display = "block";
}

function hideModal() {
  document.getElementById("modal-shadow").style.display = "none";
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

function showCheckBox(checkBoxId) {
  document.getElementById(checkBoxId).classList.remove("hidden");
  document.getElementById(checkBoxId).classList.add("visible");
}

function hideCheckBox(checkBoxId) {
  document.getElementById(checkBoxId).classList.remove("visible");
  document.getElementById(checkBoxId).classList.add("hidden");
}
