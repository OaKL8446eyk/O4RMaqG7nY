// 代码生成时间: 2025-08-18 19:03:29
 * Features:
 *   - Calculates basic statistical metrics like mean, median, and mode.
 *   - Provides error handling for invalid data inputs.
 *   - Ensures maintainability and extensibility of the code.
 */

// Import necessary dependencies
const { calculateMean, calculateMedian, findMode } = require('./statistics_utils');

// Define the DataAnalysisPlugin class
class DataAnalysisPlugin {
  // Constructor to initialize data
  constructor(data) {
    if (!Array.isArray(data)) {
      throw new Error('Data must be an array.');
    }
    this.data = data;
  }

  // Calculate the mean of the dataset
  getMean() {
    try {
      return calculateMean(this.data);
    } catch (error) {
      throw new Error('Failed to calculate mean: ' + error.message);
    }
  }

  // Calculate the median of the dataset
  getMedian() {
    try {
      return calculateMedian(this.data);
    } catch (error) {
      throw new Error('Failed to calculate median: ' + error.message);
    }
  }

  // Find the mode of the dataset
  getMode() {
    try {
      return findMode(this.data);
    } catch (error) {
      throw new Error('Failed to find mode: ' + error.message);
    }
  }
}

// Export the DataAnalysisPlugin class
module.exports = DataAnalysisPlugin;

/*
 * statistics_utils.js - Utility functions for statistical calculations.
 */

// Function to calculate the mean of an array of numbers
function calculateMean(arr) {
  if (arr.length === 0) throw new Error('Array is empty.');
  const sum = arr.reduce((acc, val) => acc + val, 0);
  return sum / arr.length;
}

// Function to calculate the median of an array of numbers
function calculateMedian(arr) {
  if (arr.length === 0) throw new Error('Array is empty.');
  const sorted = arr.slice().sort((a, b) => a - b);
  const mid = Math.floor((sorted.length - 1) / 2);
  return (sorted.length % 2 !== 0) ? sorted[mid] : (sorted[mid] + sorted[mid + 1]) / 2;
}

// Function to find the mode of an array of numbers
function findMode(arr) {
  if (arr.length === 0) throw new Error('Array is empty.');
  const counts = {};
  arr.forEach((val) => {
    counts[val] = (counts[val] || 0) + 1;
  });
  let maxCount = 0;
  let modes = [];
  for (const key in counts) {
    if (counts[key] > maxCount) {
      maxCount = counts[key];
      modes = [key];
    } else if (counts[key] === maxCount) {
      modes.push(key);
    }
  }
  return modes.length > 1 ? modes : modes.pop();
}

// Export the statistical utility functions
module.exports = { calculateMean, calculateMedian, findMode };
