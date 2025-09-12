// 代码生成时间: 2025-09-13 04:07:41
// Importing necessary modules and dependencies
const util = require('util');

// Bubble Sort Algorithm
function bubbleSort(arr) {
  // Check if the input is an array
  if (!Array.isArray(arr)) {
    throw new Error('Input must be an array');
  }

  // Edge case: empty array or single element array is already sorted
  if (arr.length <= 1) return arr;

  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < arr.length - 1; i++) {
      // Compare adjacent elements and swap if they are in the wrong order
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
      }
    }
  } while (swapped);
  return arr;
}

// Selection Sort Algorithm
function selectionSort(arr) {
  // Check if the input is an array
  if (!Array.isArray(arr)) {
    throw new Error('Input must be an array');
  }

  // Edge case: empty array or single element array is already sorted
  if (arr.length <= 1) return arr;

  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;
    // Find the index of the smallest element in the unsorted portion of the array
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    // Swap the found minimum element with the first element of the unsorted portion
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
  }
  return arr;
}

// Insertion Sort Algorithm
function insertionSort(arr) {
  // Check if the input is an array
  if (!Array.isArray(arr)) {
    throw new Error('Input must be an array');
  }

  // Edge case: empty array or single element array is already sorted
  if (arr.length <= 1) return arr;

  for (let i = 1; i < arr.length; i++) {
    let current = arr[i];
    let j = i - 1;
    // Shift elements of arr[0..i-1], that are greater than current, to one position ahead of their current position
    while (j >= 0 && arr[j] > current) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = current;
  }
  return arr;
}

// Exporting the functions for use in other parts of the application
module.exports = { bubbleSort, selectionSort, insertionSort };