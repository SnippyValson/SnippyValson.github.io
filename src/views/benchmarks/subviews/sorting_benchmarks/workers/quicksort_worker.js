onmessage = function(e) {
    var array = e.data.array;
    quickSortFast(array, 0, array.length - 1);
    postMessage(array);
}

function quickSort(array, low, high) {
  if(low < high) {
    let pivot = partition(array, low, high);
    if(low < pivot - 1) {
      quickSort(array, low, pivot - 1);
    }
    if(high > pivot + 1) {
      quickSort(array, pivot + 1, high);
    }
  }
  return array;
}

function partition(array, low, high){
  let pivot = array[high];
  let i = low - 1;
  for(let j = low; j < high; j++) {
    if(array[j] < pivot) {
      i++;
      if(i!=j){
        let temp = array[j];
        array[j] = array[i];
        array[i] = temp;
      }
    }
  }
  let temp = array[i+1];
  array[i+1] = array[high];
  array[high] = temp;
  return i + 1;
}

function quickSortFast(array, left, right){
  var pivot;
  if(array.length > 1){
    pivot = partitionFast(array, left, right);
    if(left < pivot - 1) {
      quickSortFast(array, left, pivot-1);
    }
    if(pivot < right) {
      quickSortFast(array, pivot, right);
    }
  }
  return array;
}

function partitionFast(array, left, right) {
  let pivot = array[Math.floor((right + left) / 2)];
  let i = left;
  let j = right;
  while(i <= j) {
    while(array[i] < pivot) {
      i++;
    }
    while(array[j] > pivot) {
      j--;
    }
    if(i<=j){
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
      i++;
      j--;
    }
  }
  return i;
}

function insertionSort(array) {
  for(let i = 1; i < arr.length; i++){
    let key = arr[i];
    let j = i - 1;
    while(j >= 0 && arr[j] > key) {
      array[j + 1] = array[j]
      j = j - 1;
    }
    array[j+1] = key;
  }
}

function selectionSort(array) {
  for(let i = 0; i < array.length - 1; i++){
    let minIndex = i;
    for(let j = i+1; j < array.length; j++ ){
      if(array[j] < array[minIndex]){
        minIndex = j;
      }
    }
    if(minIndex != i){
      let temp = array[i];
      array[i] = array[minIndex];
      array[minIndex] = temp;
    }
  }
}

function merge(array, l, m, r) {
  let len1 = m - l + 1;
  let len2 = r - m;
  let L = [];
  let R = [];

  for(let i = 0; i < len1; i++ ) {
    L[i] = array[l+i];
  }

  for(let j = 0; j < len2; j++) {
    R[j] = array[m + l + j];
  }

  let i = 0;
  let j = 0;
  let k = l;
  
  while(i < len1 && j< len2) {
    if(L[i] <= R[j]){
      array[k] = L[i];
    }
    else{
      array[k] = R[j];
    }
    k++;
  }

  while(i < len1) {
    array[k] = L[i];
    i++;
    k++;
  }

  while(j < len2) {
    array[k] = R[j];
    j++;
    k++;
  }
}
 
function mergeSort(array, l, r) {
  if( l < r ) {
    let m = (l + (r - l)) / 2;
    mergeSort(array, l, m);
    mergeSort(array, m+1, r);
    merge(array, l, m, r);
  }
}

function radixSort(array) {
  let maxLength = largestNum(array);
  for(let i = 0; i < maxLength; i++) {
    let buckets = Array.from({ length : 10 }, () => []);
    for( let j = 0; j < array.length; j++) {
      let num = getNum(arr[j], i);
      if(num != undefined) buckets[num].push(array[j]);
    }
    array = buckets.flat();
  }
  return array;
}

function getNum(num, index) {
  const strNum = String(num);
  let end = strNum.length - 1;
  const foundNum = strNum[end - index];
  if(foundNum === undefined) {
    return 0;
  } else {
    return foundNum;
  }
}

function largestNum(array) {
  let largest = "0";
  array.forEach(num => {
    const strNum = String(num);
    if(strNum.length > largest.length)
    { 
      largest =  strNum;
    }
  });
  return largest.length;
}

function heapify(array, index, arrayLength) {
  var left = 2 * index + 1;
  var right = 2 * index + 2;
  var max = index;

  if(left < arrayLength && array[left] > array[max]) {
    max = left;
  }

  if(right < arrayLength && array[right] > array[max]) {
    max = right;
  }

  if(max != index) {
    swap(array, index, max);
    heapify(array, max);
  }
}

function swap(array, a, b) {
  let temp = array[a];
  array[a] = array[b];
  array[b] = temp;
}

function heapSort(array) {
  let arrayLength = array.length;
  for(let i = Math.floor(array.length / 2); i >=0; i--) {
    heapify(array, i, arrayLength);
  }
  for(let i = input.length - 1; i > 0; i--) {
    swap(array, 0, i);
    arrayLength--;
    heapify(array, 0, arrayLength);
  }
}

