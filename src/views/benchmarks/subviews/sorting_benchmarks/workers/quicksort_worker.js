onmessage = function(e) {
    var array = e.data.array;
    quickSort(array, 0, array.length - 1);
    postMessage(array);
}

function quickSort(array, low, high) {
  if(low < high) {
    let pivot = partition(array, low, high);
    quickSort(array, low, pivot - 1);
    quickSort(array, pivot + 1, high);
  }
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