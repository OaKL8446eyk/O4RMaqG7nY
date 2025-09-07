// 代码生成时间: 2025-09-07 10:07:37
const os = require('os');
const { performance } = require('perf_hooks');
const { exec } = require('child_process');

// Gatsby Node.js API for creating pages dynamically
exports.onCreateNode = ({ node, actions, getNode }) => {
  // Your logic to create nodes
}

// Gatsby Node.js API for creating pages dynamically
exports.createPages = async ({ graphql, actions }) => {
  // Your logic to create pages
}

// Function to get system uptime
const getSystemUptime = () => {
  const uptime = os.uptime();
  return uptime;
}

// Function to get CPU information
const getCPUInfo = () => {
  return os.cpus();
}

// Function to get memory information
const getMemoryInfo = () => {
  const memory = os.totalmem();
  const freeMemory = os.freemem();
  return { memory, freeMemory };
}

// Function to execute a system command and return the output
const executeSystemCommand = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else if (stderr) {
        reject(stderr);
      } else {
        resolve(stdout);
      }
    });
  });
}

// Function to get system load average
const getSystemLoadAverage = async () => {
  try {
    const loadAverage = await executeSystemCommand('uptime');
    const loadAverageParts = loadAverage.split(', ');
    const loadAverages = loadAverageParts.map(part => parseFloat(part));
    return loadAverages;
  } catch (error) {
    console.error('Error getting system load average:', error);
  }
}

// Main function to monitor system performance
const monitorSystemPerformance = async () => {
  try {
    const uptime = getSystemUptime();
    const cpuInfo = getCPUInfo();
    const memoryInfo = getMemoryInfo();
    const loadAverages = await getSystemLoadAverage();

    console.log('System Performance Monitor Tool');
    console.log('System Uptime:', uptime, 'seconds');
    console.log('CPU Information:', cpuInfo);
    console.log('Memory Information:', memoryInfo);
    console.log('System Load Average:', loadAverages);

    // You can add more system performance monitoring logic here

  } catch (error) {
    console.error('Error monitoring system performance:', error);
  }
}

// Example usage of the system performance monitor tool
monitorSystemPerformance();