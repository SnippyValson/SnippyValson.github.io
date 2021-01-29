import { quickSortFast, bubbleSort, insertionSort, selectionSort, mergeSort, radixSort, heapSort } from "./sort_methods"

onmessage = function (e) {
  var array = e.data.array;
  var sortType = e.data.sortType;
  switch (sortType) {
    case 0: {
      quickSortFast(array, 0, array.length - 1);
    }
    break;
  case 1: {
    bubbleSort(array);
  }
  break;
  case 2: {
    insertionSort(array);
  }
  break;
  case 3: {
    selectionSort(array);
  }
  break;
  case 4: {
    mergeSort(array, 0, array.length - 1);
  }
  break;
  case 5: {
    radixSort(array);
  }
  break;
  case 6: {
    heapSort(array);
  }
  break;
  }
  postMessage({
    array: array,
    sortType: sortType
  });
}