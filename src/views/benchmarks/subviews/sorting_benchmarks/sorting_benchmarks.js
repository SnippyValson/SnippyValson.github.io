import "./sorting_benchmarks.css";
import React from 'react';
import {
    Strings
} from "./../../localization/strings";
import {
    Constants
} from "./constants/constants";

export class SortingBenchmark extends React.Component {
    localStrings = new Strings();
    array = [];
    merged = [];
    numFinised = 0;
    populationWorker;
    bubbleSortWorker;
    startTime;
    endTime;
    dialogOkAction;
    dialogClosedAction;
    dialogCanceledAction;
    quickSortWorker;
    bubbleSortWorkers = [];
    quickSortWorkers = [];

    constructor(props) {
        super();
        this.dialogOkAction = undefined;
        this.dialogClosedAction = undefined;
        this.dialogCanceledAction = undefined;
        this.state = { arraySize : 10000, populated : false, bubbleSortResult : "", bubbleSortDone : false, showMessage : false, message : "", showDialog : false, quickSortDone : false, quickSortResult : "", multiBubbleSortDone : false, multiBubbleSortResult : "", multiQuickSortDone : false, multiQuickSortResult : ""  };
        this.populationWorker = new Worker("workers/population_worker.js");
        this.populationWorker.onmessage = this.handlePopulationWorkerMessage.bind(this);
        this.bubbleSortWorker = new Worker("workers/bubblesort_worker.js");
        this.bubbleSortWorker.onmessage = this.handleBubbleSortWorkerMessage.bind(this);
        this.quickSortWorker= new Worker("workers/quicksort_worker.js");
        this.quickSortWorker.onmessage = this.handleQuickSortWorkerMessage.bind(this);
        for (let i = 0; i < navigator.hardwareConcurrency; i++) {
                var bubbleWorker = new Worker("workers/bubblesort_worker.js");
                bubbleWorker.onmessage = (function (e) {
                    if (this.numFinised == 0) {
                        this.merged = e.data;
                    } else {
                        this.merged = this.mergeSortedArrays(this.merged, e.data);
                    }
                    this.numFinised++;
                    if (this.numFinised == navigator.hardwareConcurrency) {
                        this.endTime = performance.now();
                        this.setIdle();
                        this.setState({ multiBubbleSortResult : `${this.endTime - this.startTime} ms`, multiBubbleSortDone : true });
                    }
                }).bind(this);
                this.bubbleSortWorkers.push(bubbleWorker);
                var quickWorker = new Worker("workers/quicksort_worker.js");
                quickWorker.onmessage = (function (e) {
                    if (this.numFinised == 0) {
                        this.merged = e.data;
                    } else {
                        this.merged = this.mergeSortedArrays(this.merged, e.data);
                    }
                    this.numFinised++;
                    if (this.numFinised == navigator.hardwareConcurrency) {
                        this.endTime = performance.now();
                        this.setIdle();
                        this.setState({ multiQuickSortResult : `${this.endTime - this.startTime} ms`, multiQuickSortDone : true });
                        }
                    }).bind(this);
                this.quickSortWorkers.push(quickWorker);
            }
        this.showMessage.bind(this);
    }

    handleArraySizeChange = (e) => {
        this.setState({ arraySize : parseInt(e.target.value) });
    };

    setIdle() {
       this.props.onStateChanged("idle");
    }
    
    setBusy() {
        this.props.onStateChanged("busy");
    }

    handlePopulationWorkerMessage(e) {
        this.array = e.data;
        this.setIdle();
        this.setState({populated : true});
    }

    handleBubbleSortWorkerMessage(e) {
        this.endTime = performance.now();
        this.setIdle();
        this.setState({ bubbleSortResult : `${this.endTime - this.startTime} ms`, bubbleSortDone : true });
    }

    handleQuickSortWorkerMessage(e) {
        this.endTime = performance.now();
        this.setIdle();
        this.setState({ quickSortResult : `${this.endTime - this.startTime} ms`, quickSortDone : true });
    }

    populateArray() {
        this.setBusy();
        this.setState({populated : false});
        this.populationWorker.postMessage(this.state.arraySize);
    }

    bubbleSortArray() {
        if (this.array == undefined || this.array.length == 0) {
            this.showMessage(this.localStrings.localized.GenerateDataPrompt);
            return;
        } else if (this.array.length > Constants.value.LargeArraySize) {
            this.dialogOkAction = this.executeBubbleSort;
            this.dialogClosedAction = () => {};
            this.dialogCanceledAction = () => {};
            this.setState({ message : this.localStrings.localized.LargeArrayWarning, showDialog : true })
            return;
        } else {
            this.executeBubbleSort();
        }
    }

    executeBubbleSort() {
        this.setBusy();
        this.setState({ bubbleSortDone : false });
        this.startTime = performance.now();
        this.bubbleSortWorker.postMessage({
            array: this.array,
        });
    }

    quickSortArray() {
        if (this.array == undefined || this.array.length == 0) {
            this.showMessage(this.localStrings.localized.GenerateDataPrompt);
            return;
        } else if (this.array.length > Constants.value.LargeArraySize) {
            this.dialogOkAction = this.executeQuickSort;
            this.dialogClosedAction = () => {};
            this.dialogCanceledAction = () => {};
            this.setState({ message : this.localStrings.localized.LargeArrayWarning, showDialog : true });
            return;
        }
        this.executeQuickSort();
    }
    
    executeQuickSort() {
        this.setBusy();
        this.setState({ quickSortDone : false });
        this.startTime = performance.now();
        this.quickSortWorker.postMessage({
            array: this.array,
        });
    }

    multiBubbleSortArray() {
        if (this.array == undefined || this.array.length == 0) {
            this.showMessage(localStrings.localized.GenerateDataPrompt);
            return;
        } else if (this.array.length > Constants.value.LargeArraySize) {
            this.dialogOkAction = this.executeMultiBubbleSort;
            this.dialogClosedAction = () => {};
            this.dialogCanceledAction = () => {};
            this.setState({ message : this.localStrings.localized.LargeArrayWarning, showDialog : true })
            return;
        }
        this.executeMultiBubbleSort();
    }
    
    executeMultiBubbleSort() {
        this.startTime = performance.now();
        this.merged = [];
        this.numFinised = 0;
        this.setBusy();
        this.setState({ multiBubbleSortDone : false });
        let index = 0;
        let numSlices = navigator.hardwareConcurrency;
        let sliceLength = Math.floor(this.state.arraySize / navigator.hardwareConcurrency);
        let remaining = this.state.arraySize % navigator.hardwareConcurrency;
        if (remaining != 0) {
            numSlices--;
        }
        for (let i = 0; i < numSlices; i++) {
            this.bubbleSortWorkers[i].postMessage({
                array: this.array.slice(index, index + sliceLength),
            });
            index += sliceLength;
        }
        if (remaining != 0) {
            this.bubbleSortWorkers[navigator.hardwareConcurrency - 1].postMessage({
                array: this.array.slice(index, index + sliceLength + remaining),
            });
        }
    }

    multiQuickSortArray() {
        if (this.array == undefined || this.array.length == 0) {
            this.showMessage(this.localStrings.localized.GenerateDataPrompt);
            return;
        } else if (this.array.length > Constants.value.LargeArraySize) {
            this.dialogOkAction = this.executeMultiQuickSort;
            this.dialogClosedAction = () => {};
            this.dialogCanceledAction = () => {};
            this.setState({ message : this.localStrings.localized.LargeArrayWarning, showDialog : true })
            return;
        }
        this.executeMultiQuickSort();
    }
    
    executeMultiQuickSort() {
        this.startTime = performance.now();
        this.numFinised = 0;
        this.merged = [];
        this.setBusy();
        this.setState({ multiQuickSortDone : false });
        let index = 0;
        let numSlices = navigator.hardwareConcurrency;
        let sliceLength = Math.floor(this.state.arraySize / navigator.hardwareConcurrency);
        let remaining = this.state.arraySize % navigator.hardwareConcurrency;
        if (remaining != 0) {
            numSlices--;
        }
        for (let i = 0; i < numSlices; i++) {
            this.quickSortWorkers[i].postMessage({
                array: this.array.slice(index, index + sliceLength),
            });
            index += sliceLength;
        }
        if (remaining != 0) {
            this.quickSortWorkers[navigator.hardwareConcurrency - 1].postMessage({
                array: this.array.slice(index, index + sliceLength + remaining),
            });
        }
    }
    
    showMessage(message) {
        this.setState( { message : message, showMessage : true } );
    }
    
    messageAcknowledged() {
        this.setState( { showMessage : false } )
    }

    dialogResult(result) {
        this.setState( { showDialog : false } )
        switch(result) {
            case "ok": {
                if(this.dialogOkAction) {
                    this.dialogOkAction();
                }
            }break;
            case "cancel":{
                if(this.dialogCanceledAction) {
                    this.dialogCanceledAction();
                }
            }break;
            case "closed": {
                if(this.dialogClosedAction) {
                    this.dialogClosedAction();
                }
            }break;
            default: break;
        }
    }

    mergeSortedArrays(a, b) {
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

    render() {
       return (
        <div>
            <div class={`pixel-div center-div pixel-dialog unselectable ${this.state.showMessage ? 'fade-in' : 'fade-out'}`}>
                <button class="pixel-button top-right" onClick={this.messageAcknowledged.bind(this)}>x</button>
                <p class="pixel-text-medium">Message</p>
                <div id="content-div">
                    <p class="pixel-text-medium message">{`${this.state.message}`}</p>
                    <button class="pixel-button dialog-button" onClick={this.messageAcknowledged.bind(this)}>Ok</button>
                </div>
            </div>
            <div class={`pixel-div center-div pixel-dialog unselectable ${this.state.showDialog ? 'fade-in' : 'fade-out'}`} id="okcanceldialog">
                <button class="pixel-button top-right" onClick={this.dialogResult.bind(this, 'closes')}>x</button>
                <p class="pixel-text-medium">Message</p>
                <div id="content-div">
                    <p class="pixel-text-medium message" id="okcanceldialog-content">{this.state.message}</p>
                    <button class="pixel-button dialog-button" onClick={this.dialogResult.bind(this, 'cancel')}>Cancel</button>
                    <button class="pixel-button dialog-button" onClick={this.dialogResult.bind(this, 'ok')}>Ok</button>
                </div>
            </div>
            <div class="modal" id="modal-shadow"></div>
            <div className="pixel-div section">
                <label className="pixel-text-medium">Populate the array. Click start to populate the array with random values.</label>
                <div className="top-offset">
                    <label className="pixel-text-medium unselectable">Count : </label>
                    <input className="pixel-text-medium pixel-input" id="count" value = {this.state.value} onChange={this.handleArraySizeChange.bind(this)} placeholder= {this.state.arraySize}/>
                </div>
                <label className={`pixel-text-big check-box ${this.state.populated ? 'visible' : 'hidden' }`} id="populate-array-done">☑</label>
                <button className="pixel-button section-button" onClick={this.populateArray.bind(this)}>Generate</button>
            </div>
            <div className="pixel-div section">
                <p className="pixel-text-medium">Bubble sort.</p>
                <label className="pixel-text-medium">Sort the array using bubble sort alogrithm. Click start.</label>
                <label className={`pixel-text-big check-box ${this.state.bubbleSortDone ? 'visible' : 'hidden' }`} id="bubble-sort-done">☑</label>
                <p className="pixel-text-medium" id="bubblesort-result">{`Result : ${this.state.bubbleSortResult}`} </p>
                <button className="pixel-button section-button" onClick={this.bubbleSortArray.bind(this)}>Start</button>
            </div>
            <div className="pixel-div section">
                <p className="pixel-text-medium">Quick sort.</p>
                <label className="pixel-text-medium">Sort the array using quick sort alogrithm. Click start.</label>
                <label className={`pixel-text-big check-box ${this.state.quickSortDone ? 'visible' : 'hidden' }`} id="quick-sort-done">☑</label>
                <p className="pixel-text-medium" id="quicksort-result">{`Result : ${this.state.quickSortResult}`} </p>
                <button className="pixel-button section-button" onClick={this.quickSortArray.bind(this)}>Start</button>
            </div>
            <div className="pixel-div section">
                <p className="pixel-text-medium">Bubble sort (Multithreaded).</p>
                <label className="pixel-text-medium">Sort the array using bubble sort alogrithm (Multithreaded). Click start.</label>
                <label className={`pixel-text-big check-box ${this.state.multiBubbleSortDone ? 'visible' : 'hidden' }`} id="bubble-sort-multi-done">☑</label>
                <p className="pixel-text-medium" id="multi-bubblesort-result">{`Result : ${this.state.multiBubbleSortResult}`} </p>
                <button className="pixel-button section-button" onClick={this.multiBubbleSortArray.bind(this)}>Start</button>
            </div>
            <div className="pixel-div section">
                <p className="pixel-text-medium">Quick sort (Multithreaded).</p>
                <label className="pixel-text-medium">Sort the array using quick sort alogrithm (Multithreaded). Click start.</label>
                <label className={`pixel-text-big check-box ${this.state.multiQuickSortDone ? 'visible' : 'hidden' }`} id="quick-sort-multi-done">☑</label>
                <p className="pixel-text-medium" id="multi-quicksort-result">{`Result : ${this.state.multiQuickSortResult}`} </p>
                <button className="pixel-button section-button" onClick={this.multiQuickSortArray.bind(this)}>Start</button>
            </div>
        </div>
        );
    }
}