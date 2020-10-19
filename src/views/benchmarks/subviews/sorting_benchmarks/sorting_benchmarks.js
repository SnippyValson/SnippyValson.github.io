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
        startTime;
        endTime;
        dialogOkAction;
        dialogClosedAction;
        dialogCanceledAction;
        sortWorker;
        sortWorkers = [];

        constructor(props) {
            super();
            this.dialogOkAction = undefined;
            this.dialogClosedAction = undefined;
            this.dialogCanceledAction = undefined;
            this.state = {
                arraySize: 10000,
                populated: false,
                bubbleSortResult: "",
                bubbleSortDone: false,
                insertionSortResult: "",
                insertionSortDone: false,
                selectionSortResult: "",
                selectionSortDone: false,
                showMessage: false,
                message: "",
                showDialog: false,
                quickSortDone: false,
                quickSortResult: "",
                mergeSortDone: false,
                mergeSortResult: "",
                radixSortDone: false,
                radixSortResult: "",
                heapSortDone: false,
                heapSortResult: "",
                multiBubbleSortDone: false,
                multiBubbleSortResult: "",
                multiQuickSortDone: false,
                multiQuickSortResult: ""
            };
            this.populationWorker = new Worker("workers/population_worker.js");
            this.populationWorker.onmessage = this.handlePopulationWorkerMessage.bind(this);
            this.sortWorker = new Worker("workers/sort_worker.js");
            this.sortWorker.onmessage = this.handleSortWorkerMessage.bind(this);
            for (let i = 0; i < navigator.hardwareConcurrency; i++) {
                var sortWorker = new Worker("workers/sort_worker.js");
                sortWorker.onmessage = (function (e) {
                    if (this.numFinised == 0) {
                        this.merged = e.data.array;
                    } else {
                        this.merged = this.mergeSortedArrays(this.merged, e.data.array);
                    }
                    this.numFinised++;
                    if (this.numFinised == navigator.hardwareConcurrency) {
                        this.endTime = performance.now();
                        this.setIdle();
                        switch (e.data.sortType) {
                            case 0: {
                                this.setState({
                                    multiQuickSortResult: `${this.endTime - this.startTime} ms`,
                                    multiQuickSortDone: true
                                });
                            }
                            break;
                        case 1: {
                            this.setState({
                                multiBubbleSortResult: `${this.endTime - this.startTime} ms`,
                                multiBubbleSortDone: true
                            });
                        }
                        break;
                        }

                    }
                }).bind(this);
                this.sortWorkers.push(sortWorker);
            }
            this.showMessage.bind(this);
        }

        handleArraySizeChange = (e) => {
            this.setState({
                arraySize: parseInt(e.target.value)
            });
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
            this.setState({
                populated: true
            });
        }

        handleSortWorkerMessage(e) {
            console.table(e.data.array);
            this.endTime = performance.now();
            this.setIdle();
            switch (e.data.sortType) {
                case 0: {
                    this.setState({
                        quickSortResult: `${this.endTime - this.startTime} ms`,
                        quickSortDone: true
                    });
                }
                break;
            case 1: {
                this.setState({
                    bubbleSortResult: `${this.endTime - this.startTime} ms`,
                    bubbleSortDone: true
                });
            }
            break;
            case 2: {
                this.setState({
                    insertionSortResult: `${this.endTime - this.startTime} ms`,
                    insertionSortDone: true
                });
            }
            break;
            case 3: {
                this.setState({
                    selectionSortResult: `${this.endTime - this.startTime} ms`,
                    selectionSortDone: true
                });
            }
            break;
            case 4: {
                this.setState({
                    mergeSortResult: `${this.endTime - this.startTime} ms`,
                    mergeSortDone: true
                });
            }
            break;
            case 5: {
                this.setState({
                    radixSortResult: `${this.endTime - this.startTime} ms`,
                    radixSortDone: true
                });
            }
            break;
            case 6: {
                this.setState({
                    heapSortResult: `${this.endTime - this.startTime} ms`,
                    heapSortDone: true
                });
            }
            break;
            }
        }

        populateArray() {
            this.setBusy();
            this.setState({
                populated: false
            });
            this.populationWorker.postMessage(this.state.arraySize);
        }

        sortArray(sortType) {
            if (this.array == undefined || this.array.length == 0) {
                this.showMessage(this.localStrings.localized.GenerateDataPrompt);
                return;
            } else if (this.array.length > Constants.value.LargeArraySize) {
                this.dialogOkAction = this.executeSort.bind(this, sortType);
                this.dialogClosedAction = () => {};
                this.dialogCanceledAction = () => {};
                this.setState({
                    message: this.localStrings.localized.LargeArrayWarning,
                    showDialog: true
                });
                return;
            }
            this.executeSort(sortType);
        }

        executeSort(sortType) {
            this.setBusy();
            this.setState({
                quickSortDone: false
            });
            this.startTime = performance.now();
            this.sortWorker.postMessage({
                array: this.array,
                sortType: sortType
            });
        }

        multiSortArray(sortType) {
            if (this.array == undefined || this.array.length == 0) {
                this.showMessage(this.localStrings.localized.GenerateDataPrompt);
                return;
            } else if (this.array.length > Constants.value.LargeArraySize) {
                this.dialogOkAction = this.executeMultiSort;
                this.dialogClosedAction = () => {};
                this.dialogCanceledAction = () => {};
                this.setState({
                    message: this.localStrings.localized.LargeArrayWarning,
                    showDialog: true
                })
                return;
            }
            this.executeMultiSort(sortType);
        }

        executeMultiSort(sortType) {
            this.startTime = performance.now();
            this.numFinised = 0;
            this.merged = [];
            this.setBusy();
            this.setState({
                multiQuickSortDone: false
            });
            let index = 0;
            let numSlices = navigator.hardwareConcurrency;
            let sliceLength = Math.floor(this.state.arraySize / navigator.hardwareConcurrency);
            let remaining = this.state.arraySize % navigator.hardwareConcurrency;
            if (remaining != 0) {
                numSlices--;
            }
            for (let i = 0; i < numSlices; i++) {
                this.sortWorkers[i].postMessage({
                    array: this.array.slice(index, index + sliceLength),
                    sortType: sortType
                });
                index += sliceLength;
            }
            if (remaining != 0) {
                this.sortWorkers[navigator.hardwareConcurrency - 1].postMessage({
                    array: this.array.slice(index, index + sliceLength + remaining),
                });
            }
        }

        showMessage(message) {
            this.setState({
                message: message,
                showMessage: true
            });
        }

        messageAcknowledged() {
            this.setState({
                showMessage: false
            })
        }

        dialogResult(result) {
            this.setState({
                showDialog: false
            })
            switch (result) {
                case "ok": {
                    if (this.dialogOkAction) {
                        this.dialogOkAction();
                    }
                }
                break;
            case "cancel": {
                if (this.dialogCanceledAction) {
                    this.dialogCanceledAction();
                }
            }
            break;
            case "closed": {
                if (this.dialogClosedAction) {
                    this.dialogClosedAction();
                }
            }
            break;
            default:
                break;
            }
        }

        mergeSortedArrays(leftArray, rightArray) {
            let leftIndex = 0;
            let rightIndex = 0;
            let resultIndex = 0;
            let result = [];
            while (leftIndex < leftArray.length && rightIndex < rightArray.length) {
                if (leftArray[leftIndex] <= rightArray[rightIndex]) {
                    result[resultIndex] = leftArray[leftIndex];
                    leftIndex++;
                } else {
                    result[resultIndex] = rightArray[rightIndex];
                    rightIndex++;
                }
                resultIndex++;
            }
            while (leftIndex < leftArray.length) {
                result[resultIndex] = leftArray[leftIndex];
                leftIndex++;
                resultIndex++;
            }
            while (rightIndex < length) {
                result[resultIndex] = rightArray[rightIndex];
                rightIndex++;
                resultIndex++;
            }
            return result;
        }

    render() {
       return (
        <div>
            <div className={`pixel-div center-div pixel-dialog unselectable ${this.state.showMessage ? 'fade-in' : 'fade-out'}`}>
                <button className="pixel-button top-right" onClick={this.messageAcknowledged.bind(this)}>x</button>
                <p className="pixel-text-medium">Message</p>
                <div id="content-div">
                    <p className="pixel-text-medium message">{`${this.state.message}`}</p>
                    <button className="pixel-button dialog-button" onClick={this.messageAcknowledged.bind(this)}>Ok</button>
                </div>
            </div>
            <div className={`pixel-div center-div pixel-dialog unselectable ${this.state.showDialog ? 'fade-in' : 'fade-out'}`} id="okcanceldialog">
                <button className="pixel-button top-right" onClick={this.dialogResult.bind(this, 'closes')}>x</button>
                <p className="pixel-text-medium">Message</p>
                <div id="content-div">
                    <p className="pixel-text-medium message" id="okcanceldialog-content">{this.state.message}</p>
                    <button className="pixel-button dialog-button" onClick={this.dialogResult.bind(this, 'cancel')}>Cancel</button>
                    <button className="pixel-button dialog-button" onClick={this.dialogResult.bind(this, 'ok')}>Ok</button>
                </div>
            </div>
            <div className="modal" id="modal-shadow"></div>
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
                <button className="pixel-button section-button" onClick={this.sortArray.bind(this, 1)}>Start</button>
            </div>
            <div className="pixel-div section">
                <p className="pixel-text-medium">Insertion sort.</p>
                <label className="pixel-text-medium">Sort the array using insertion sort alogrithm. Click start.</label>
                <label className={`pixel-text-big check-box ${this.state.insertionSortDone ? 'visible' : 'hidden' }`} id="quick-sort-done">☑</label>
                <p className="pixel-text-medium" id="quicksort-result">{`Result : ${this.state.insertionSortResult}`} </p>
                <button className="pixel-button section-button" onClick={this.sortArray.bind(this, 2)}>Start</button>
            </div>
            <div className="pixel-div section">
                <p className="pixel-text-medium">Selection sort.</p>
                <label className="pixel-text-medium">Sort the array using selection sort alogrithm. Click start.</label>
                <label className={`pixel-text-big check-box ${this.state.selectionSortDone ? 'visible' : 'hidden' }`} id="quick-sort-done">☑</label>
                <p className="pixel-text-medium" id="quicksort-result">{`Result : ${this.state.selectionSortResult}`} </p>
                <button className="pixel-button section-button" onClick={this.sortArray.bind(this, 3)}>Start</button>
            </div>
            <div className="pixel-div section">
                <p className="pixel-text-medium">Quick sort.</p>
                <label className="pixel-text-medium">Sort the array using quick sort alogrithm. Click start.</label>
                <label className={`pixel-text-big check-box ${this.state.quickSortDone ? 'visible' : 'hidden' }`} id="quick-sort-done">☑</label>
                <p className="pixel-text-medium" id="quicksort-result">{`Result : ${this.state.quickSortResult}`} </p>
                <button className="pixel-button section-button" onClick={this.sortArray.bind(this, 0)}>Start</button>
            </div>
            <div className="pixel-div section">
                <p className="pixel-text-medium">Merge sort.</p>
                <label className="pixel-text-medium">Sort the array using merge sort alogrithm. Click start.</label>
                <label className={`pixel-text-big check-box ${this.state.mergeSortDone ? 'visible' : 'hidden' }`} id="quick-sort-done">☑</label>
                <p className="pixel-text-medium" id="quicksort-result">{`Result : ${this.state.mergeSortResult}`} </p>
                <button className="pixel-button section-button" onClick={this.sortArray.bind(this, 4)}>Start</button>
            </div>
            <div className="pixel-div section">
                <p className="pixel-text-medium">Radix sort.</p>
                <label className="pixel-text-medium">Sort the array using radix sort alogrithm. Click start.</label>
                <label className={`pixel-text-big check-box ${this.state.radixSortDone ? 'visible' : 'hidden' }`} id="quick-sort-done">☑</label>
                <p className="pixel-text-medium" id="quicksort-result">{`Result : ${this.state.radixSortResult}`} </p>
                <button className="pixel-button section-button" onClick={this.sortArray.bind(this, 5)}>Start</button>
            </div>
            <div className="pixel-div section">
                <p className="pixel-text-medium">Heap sort.</p>
                <label className="pixel-text-medium">Sort the array using heap sort alogrithm. Click start.</label>
                <label className={`pixel-text-big check-box ${this.state.heapSortDone ? 'visible' : 'hidden' }`} id="quick-sort-done">☑</label>
                <p className="pixel-text-medium" id="quicksort-result">{`Result : ${this.state.heapSortResult}`} </p>
                <button className="pixel-button section-button" onClick={this.sortArray.bind(this, 6)}>Start</button>
            </div>
            <div className = "section">
                <p className="pixel-text-medium">Multithreaded Sorting.</p>
            </div>
            <div className="pixel-div section">
                <p className="pixel-text-medium">Bubble sort (||).</p>
                <label className="pixel-text-medium">Sort the array using bubble sort alogrithm (Multithreaded). Click start.</label>
                <label className={`pixel-text-big check-box ${this.state.multiBubbleSortDone ? 'visible' : 'hidden' }`} id="bubble-sort-multi-done">☑</label>
                <p className="pixel-text-medium" id="multi-bubblesort-result">{`Result : ${this.state.multiBubbleSortResult}`} </p>
                <button className="pixel-button section-button" onClick={this.multiSortArray.bind(this, 1)}>Start</button>
            </div>
            <div className="pixel-div section">
                <p className="pixel-text-medium">Quick sort (||).</p>
                <label className="pixel-text-medium">Sort the array using quick sort alogrithm (Multithreaded). Click start.</label>
                <label className={`pixel-text-big check-box ${this.state.multiQuickSortDone ? 'visible' : 'hidden' }`} id="quick-sort-multi-done">☑</label>
                <p className="pixel-text-medium" id="multi-quicksort-result">{`Result : ${this.state.multiQuickSortResult}`} </p>
                <button className="pixel-button section-button" onClick={this.multiSortArray.bind(this, 0)}>Start</button>
            </div>
        </div>
        );
    }
}