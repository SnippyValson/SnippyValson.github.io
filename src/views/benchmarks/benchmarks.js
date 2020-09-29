import "./../../main.css";
import "./benchmarks.css";
import {
    Style
} from "../../global/style";
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
                Constants.id.MultiBubblesortResult,
                `${endTime - startTime} ${globalStrings.localized.MilliSecondsUnit}`
            );
            setIdle();
            showCheckBox(Constants.id.MultiBubblesortCheckBox);
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
                Constants.id.MultiQuicksortResult,
                `${endTime - startTime} ${globalStrings.localized.MilliSecondsUnit}`
            );
            setIdle();
            showCheckBox(Constants.id.MultiQuicksortCheckBox);
        }
    };
    quickSortWorkers.push(quickWorker);
}

var populationWorker = new Worker("workers/population_worker.js");
populationWorker.onmessage = function (e) {
    array = e.data;
    setIdle();
    showCheckBox(Constants.id.PopulateCheckBox);
};

var bubbleSortWorker = new Worker("workers/bubblesort_worker.js");
bubbleSortWorker.onmessage = function (e) {
    endTime = performance.now();
    setText(
        Constants.id.BubblesortResult,
        `${endTime - startTime} ${globalStrings.localized.MilliSecondsUnit}`
    );
    setIdle();
    showCheckBox(Constants.id.BubblesortCheckBox);
};

var quickSortWorker = new Worker("workers/quicksort_worker.js");
quickSortWorker.onmessage = function (e) {
    endTime = performance.now();
    setText(
        Constants.id.QuicksortResult,
        `${endTime - startTime} ${globalStrings.localized.MilliSecondsUnit}`
    );
    setIdle();
    showCheckBox(Constants.id.QuicksortCheckBox);
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
    arraySize = parseInt(document.getElementById(Constants.id.Count).value);
    setBusy();
    hideCheckBox(Constants.id.PopulateCheckBox);
    populationWorker.postMessage(arraySize);
}

window.bubbleSortArray = bubbleSortArray;
function bubbleSortArray() {
    if (array == undefined || array.length == 0) {
        showMessage(localStrings.localized.GenerateDataPrompt);
        return;
    } else if (array.length > Constants.value.LargeArraySize) {
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
    hideCheckBox(Constants.id.BubblesortCheckBox);
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
    } else if (array.length > Constants.value.LargeArraySize) {
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
    hideCheckBox(Constants.id.QuicksortCheckBox);
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
    } else if (array.length > Constants.value.LargeArraySize) {
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
    startTime = performance.now();
    merged = [];
    numFinised = 0;
    let index = 0;
    let numSlices = numPhysicalThreads;
    let sliceLength = Math.floor(arraySize / numPhysicalThreads);
    let remaining = arraySize % numPhysicalThreads;
    setBusy();
    hideCheckBox(Constants.id.MultiBubblesortCheckBox);
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
    } else if (array.length > Constants.value.LargeArraySize) {
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
    startTime = performance.now();
    numFinised = 0;
    merged = [];
    let index = 0;
    let numSlices = numPhysicalThreads;
    let sliceLength = Math.floor(arraySize / numPhysicalThreads);
    let remaining = arraySize % numPhysicalThreads;
    setBusy();
    hideCheckBox(Constants.id.MultiQuicksortCheckBox);
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
        .getElementById(Constants.id.OkCancelDialog)
        .classList.remove(GlobalConstants.class.FadeOut);
    document
        .getElementById(Constants.id.OkCancelDialog)
        .classList.add(GlobalConstants.class.FadeIn);
    document.getElementById(
        Constants.id.OkCancelDialogContent
    ).innerHTML = message;
}

function hideDialog() {
    document
        .getElementById(Constants.id.OkCancelDialog)
        .classList.add(GlobalConstants.class.FadeOut);
    document
        .getElementById(Constants.id.OkCancelDialog)
        .classList.remove(GlobalConstants.class.FadeIn);
    hideModal();
}

function showMessage(message) {
    showModal();
    document
        .getElementById(Constants.id.Message)
        .classList.remove(GlobalConstants.class.FadeOut);
    document
        .getElementById(Constants.id.Message)
        .classList.add(GlobalConstants.class.FadeIn);
    document.getElementById(Constants.id.MessageContent).innerHTML = message;
}

function hideMessage() {
    document
        .getElementById(Constants.id.Message)
        .classList.add(GlobalConstants.class.FadeOut);
    document
        .getElementById(Constants.id.Message)
        .classList.remove(GlobalConstants.class.FadeIn);
    hideModal();
}

function showModal() {
    document.getElementById(Constants.id.ModalShadow).style.display = GlobalConstants.value.Block;
}

function hideModal() {
    document.getElementById(Constants.id.ModalShadow).style.display = GlobalConstants.value.None;
}

function setText(textContainerId, text) {
    document.getElementById(textContainerId).innerHTML = text;
}

function setIdle() {
    document.getElementById(Constants.id.InfoLabel).innerHTML =
        localStrings.localized.Idle;
}

function setBusy() {
    document.getElementById(Constants.id.InfoLabel).innerHTML =
        localStrings.localized.BusyIndicator;
}

function showCheckBox(checkBoxId) {
    document.getElementById(checkBoxId).classList.remove(Constants.class.Hidden);
    document.getElementById(checkBoxId).classList.add(Constants.class.Visible);
}

function hideCheckBox(checkBoxId) {
    document.getElementById(checkBoxId).classList.remove(Constants.class.Visible);
    document.getElementById(checkBoxId).classList.add(Constants.class.Hidden);
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
