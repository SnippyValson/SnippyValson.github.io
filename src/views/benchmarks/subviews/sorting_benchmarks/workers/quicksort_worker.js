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
 