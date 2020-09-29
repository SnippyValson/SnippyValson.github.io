import "./../../main.css";
import "./benchmarks.css";
import {
    Style
} from "../../libs/style";
import {
    Strings
} from "./localization/strings";
import {
    Strings as GlobalStrings
} from "../../global/localization/strings";
import {
    Constants
} from "./constants/contants";
import {
    Constants as GlobalConstants
} from "../../global/constants";

var style = new Style();
var localStrings = new Strings();
var globalStrings = new GlobalStrings();
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

style.applyStyle();

for (let i = 0; i < numPhysicalThreads; i++) {
    var bubbleWorker = new Worker("workers/bubblesort_worker.js");
    bubbleWorker.onmessage = function (e) {
        if (numFinised == 0) {
            merged = e.data;
        } else {
            merged = mergeSortedArrays(merged, e.data);
        }
        numFinised++;
        if (numFinised == numPhysicalThreads) {
            endTime = performance.now();
            setText(
                "multi-bubblesort-result",
                `${endTime - startTime} ${globalStrings.localized.MilliSecondsUnit}`
            );
            setIdle();
            showCheckBox("bubble-sort-multi-done");
        }
    };
    bubbleSortWorkers.push(bubbleWorker);
    var quickWorker = new Worker("workers/quicksort_worker.js");
    quickWorker.onmessage = function (e) {
        if (numFinised == 0) {
            merged = e.data;
        } else {
            merged = mergeSortedArrays(merged, e.data);
        }
        numFinised++;
        if (numFinised == numPhysicalThreads) {
            endTime = performance.now();
            setText(
                "multi-quicksort-result",
                `${endTime - startTime} ${globalStrings.localized.MilliSecondsUnit}`
            );
            setIdle();
            showCheckBox("quick-sort-multi-done");
        }
    };
    quickSortWorkers.push(quickWorker);
}

var populationWorker = new Worker("workers/population_worker.js");
populationWorker.onmessage = function (e) {
    array = e.data;
    setIdle();
    showCheckBox("populate-array-done");
};

var bubbleSortWorker = new Worker("workers/bubblesort_worker.js");
bubbleSortWorker.onmessage = function (e) {
    endTime = performance.now();
    setText(
        "bubblesort-result",
        `${endTime - startTime} ${globalStrings.localized.MilliSecondsUnit}`
    );
    setIdle();
    showCheckBox("bubble-sort-done");
};

var quickSortWorker = new Worker("workers/quicksort_worker.js");
quickSortWorker.onmessage = function (e) {
    endTime = performance.now();
    setText(
        "quicksort-result",
        `${endTime - startTime} ${globalStrings.localized.MilliSecondsUnit}`
    );
    setIdle();
    showCheckBox("quick-sort-done");
};

window.onItemCliked = onItemCliked;
function onItemCliked(item) {
    switch (item) {
        case "sorting-benchmarks": {}
        break;
    }
}

window.populateArray = populateArray;
function populateArray() {
    arraySize = parseInt(document.getElementById("count").value);
    setBusy();
    hideCheckBox("populate-array-done");
    populationWorker.postMessage(arraySize);
}

window.bubbleSortArray = bubbleSortArray;
function bubbleSortArray() {
    if (array == undefined || array.length == 0) {
        showMessage(localStrings.localized.GenerateDataPrompt);
        return;
    } else if (array.length > Constants.LargeArraySize) {
        showDialog(
            localStrings.localized.LargeArrayWarning,
            executeBubbleSort,
            () => {}
        );
        return;
    }
    executeBubbleSort();
}

function executeBubbleSort() {
    setBusy();
    hideCheckBox("bubble-sort-done");
    startTime = performance.now();
    bubbleSortWorker.postMessage({
        array: array,
    });
}

window.quickSortArray = quickSortArray;
function quickSortArray() {
    if (array == undefined || array.length == 0) {
        showMessage(localStrings.localized.GenerateDataPrompt);
        return;
    } else if (array.length > Constants.LargeArraySize) {
        showDialog(
            localStrings.localized.LargeArrayWarning,
            executeQuickSort,
            () => {}
        );
        return;
    }
    executeQuickSort();
}

function executeQuickSort() {
    setBusy();
    hideCheckBox("quick-sort-done");
    startTime = performance.now();
    quickSortWorker.postMessage({
        array: array,
    });
}

window.multiBubbleSortArray = multiBubbleSortArray;
function multiBubbleSortArray() {
    if (array == undefined || array.length == 0) {
        showMessage(localStrings.localized.GenerateDataPrompt);
        return;
    } else if (array.length > Constants.LargeArraySize) {
        showDialog(
            localStrings.localized.LargeArrayWarning,
            executeMultiBubbleSort,
            () => {}
        );
        return;
    }
    executeMultiBubbleSort();
}

function executeMultiBubbleSort() {
    setBusy();
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
        showMessage(localStrings.localized.GenerateDataPrompt);
        return;
    } else if (array.length > Constants.LargeArraySize) {
        showDialog(
            localStrings.localized.LargeArrayWarning,
            executeMultiQuickSort,
            () => {}
        );
        return;
    }
    executeMultiQuickSort();
}

function executeMultiQuickSort() {
    setBusy();
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
    if (cancelAction) {
        cancelAction();
    }
    okAction = undefined;
    cancelAction = undefined;
}

window.closeDialogOK = closeDialogOK;
function closeDialogOK() {
    hideDialog();
    if (okAction) {
        okAction();
    }
    okAction = undefined;
    cancelAction = undefined;
}

function showDialog(message, okaction, cancelaction) {
    okAction = okaction;
    cancelAction = cancelaction;
    showModal();
    document
        .getElementById(Constants.OkCancelDialogId)
        .classList.remove(GlobalConstants.fadeOutClass);
    document
        .getElementById(Constants.OkCancelDialogId)
        .classList.add(GlobalConstants.fadeInClass);
    document.getElementById(
        Constants.OkCancelDialogContentId
    ).innerHTML = message;
}

function hideDialog() {
    document
        .getElementById(Constants.OkCancelDialogId)
        .classList.add(GlobalConstants.fadeOutClass);
    document
        .getElementById(Constants.OkCancelDialogId)
        .classList.remove(GlobalConstants.fadeInClass);
    hideModal();
}

function showMessage(message) {
    showModal();
    document
        .getElementById(Constants.MessageId)
        .classList.remove(GlobalConstants.fadeOutClass);
    document
        .getElementById(Constants.MessageId)
        .classList.add(GlobalConstants.fadeInClass);
    document.getElementById(Constants.MessageContentId).innerHTML = message;
}

function hideMessage() {
    document
        .getElementById(Constants.MessageId)
        .classList.add(GlobalConstants.fadeOutClass);
    document
        .getElementById(Constants.MessageId)
        .classList.remove(GlobalConstants.fadeInClass);
    hideModal();
}

function showModal() {
    document.getElementById("modal-shadow").style.display = "block";
}

function hideModal() {
    document.getElementById("modal-shadow").style.display = "none";
}

function setText(textContainerId, text) {
    document.getElementById(textContainerId).innerHTML = text;
}

function setIdle() {
    document.getElementById(Constants.infoLabel).innerHTML =
        localStrings.localized.Idle;
}

function setBusy() {
    document.getElementById(Constants.infoLabel).innerHTML =
        localStrings.localized.BusyIndicator;
}

function showCheckBox(checkBoxId) {
    document.getElementById(checkBoxId).classList.remove(Constants.HiddenClass);
    document.getElementById(checkBoxId).classList.add(Constants.VisibleClass);
}

function hideCheckBox(checkBoxId) {
    document.getElementById(checkBoxId).classList.remove(Constants.VisibleClass);
    document.getElementById(checkBoxId).classList.add(Constants.HiddenClass);
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
