export function quickSort(array: number[], low: number, high: number) {
    if (low < high) {
        let pivot = partition(array, low, high);
        if (low < pivot - 1) {
            quickSort(array, low, pivot - 1);
        }
        if (high > pivot + 1) {
            quickSort(array, pivot + 1, high);
        }
    }
    return array;
}

function partition(array: number[], low: number, high: number) {
    let pivot = array[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
        if (array[j] < pivot) {
            i++;
            if (i != j) {
                let temp = array[j];
                array[j] = array[i];
                array[i] = temp;
            }
        }
    }
    let temp = array[i + 1];
    array[i + 1] = array[high];
    array[high] = temp;
    return i + 1;
}

export function quickSortFast(array: number[], left: number, right: number) {

    function partitionFast(array: number[], left: number, right: number) {
        let pivot = array[Math.floor((right + left) / 2)];
        let i = left;
        let j = right;
        while (i <= j) {
            while (array[i] < pivot) {
                i++;
            }
            while (array[j] > pivot) {
                j--;
            }
            if (i <= j) {
                let temp = array[i];
                array[i] = array[j];
                array[j] = temp;
                i++;
                j--;
            }
        }
        return i;
    }

    let pivot: number = 0;;
    if (array.length > 1) {
        pivot = partitionFast(array, left, right);
        if (left < pivot - 1) {
            quickSortFast(array, left, pivot - 1);
        }
        if (pivot < right) {
            quickSortFast(array, pivot, right);
        }
    }
    return array;
}


export function bubbleSort(array: number[]) {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
            }
        }
    }
}

export function insertionSort(array: number[]) {
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j]
            j = j - 1;
        }
        array[j + 1] = key;
    }
}

export function selectionSort(array: number[]) {
    for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex != i) {
            let temp = array[i];
            array[i] = array[minIndex];
            array[minIndex] = temp;
        }
    }
}

function merge(array1: number[], array2: number[]) {
    let sorted = [];
    while (array1.length && array2.length) {
        if (array1[0] < array2[0]) {
            sorted.push(array1.shift());
        } else {
            sorted.push(array2.shift());
        }
    }
    return sorted.concat(array1.slice().concat(array2.slice()));
}

export function mergeSort(array: number[], l: number, r: number) {
    if (array.length <= 1) {
        return array;
    }
    let middle = Math.floor(array.length / 2),
        left = mergeSort(array.slice(0, middle), l , middle),
        right = mergeSort(array.slice(middle), middle + 1, r);
    return merge(left, right);
}

export function radixSort(array: number[]) {
    console.log(`Radix sort`);
    let maxLength = largestNum(array);
    for (let i = 0; i < maxLength; i++) {
        let buckets = Array.from({
            length: 10
        }, () => []);
        for (let j = 0; j < array.length; j++) {
            let num = getNum(array[j], i);
            if (num != undefined) buckets[num].push(array[j]);
        }
        array = buckets.flat();
    }
    return array;
}

function getNum(num: number, index: number) {
    const strNum = String(num);
    let end = strNum.length - 1;
    const foundNum = strNum[end - index];
    if (foundNum === undefined) {
        return 0;
    } else {
        return foundNum;
    }
}

function largestNum(array: number[]) {
    let largest = "0";
    array.forEach(num => {
        const strNum = String(num);
        if (strNum.length > largest.length) {
            largest = strNum;
        }
    });
    return largest.length;
}

function heapify(array: number[], index: number, arrayLength: number) {
    var left = 2 * index + 1;
    var right = 2 * index + 2;
    var max = index;
    if (left < arrayLength && array[left] > array[max]) {
        max = left;
    }
    if (right < arrayLength && array[right] > array[max]) {
        max = right;
    }
    if (max != index) {
        swap(array, index, max);
        heapify(array, max, arrayLength);
    }
}

function swap(array: number[], a: number, b: number) {
    let temp = array[a];
    array[a] = array[b];
    array[b] = temp;
}

export function heapSort(array: number[]) {
    let arrayLength = array.length;
    for (let i = Math.floor(array.length / 2); i >= 0; i--) {
        heapify(array, i, arrayLength);
    }
    for (let i = array.length - 1; i > 0; i--) {
        swap(array, 0, i);
        arrayLength--;
        heapify(array, 0, arrayLength);
    }
}