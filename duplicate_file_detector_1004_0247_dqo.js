// 代码生成时间: 2025-10-04 02:47:19
const fs = require('fs');
const path = require('path');

// Helper function to read file contents
function readFileContent(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    throw new Error(`Error reading file ${filePath}: ${error.message}`);
  }
}

// Helper function to hash the content of a file
function hashContent(content) {
  // This function uses a simple hash function for demonstration purposes.
  // In a real-world scenario, consider using a more robust hash function.
  return content.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
}

// Function to check for duplicate files in a directory
function findDuplicateFiles(directoryPath) {
  const filesMap = new Map();

  const walkDirectory = (dirPath) => {
    fs.readdirSync(dirPath).forEach(file => {
      const fullPath = path.join(dirPath, file);
      if (fs.statSync(fullPath).isDirectory()) {
        walkDirectory(fullPath);
      } else {
        const content = readFileContent(fullPath);
        const hash = hashContent(content);

        if (filesMap.has(hash)) {
          console.log(`Duplicate file found: ${fullPath} and ${filesMap.get(hash)}`);
        } else {
          filesMap.set(hash, fullPath);
        }
      }
    });
  };

  walkDirectory(directoryPath);
}

// Export the function for use in Gatsby
module.exports = {
  findDuplicateFiles
};

// Usage example (to be placed in a Gatsby script or component)
// findDuplicateFiles('./path/to/your/directory');