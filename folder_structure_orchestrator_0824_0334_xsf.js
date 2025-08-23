// 代码生成时间: 2025-08-24 03:34:49
const fs = require('fs');
const path = require('path');

/**
 * Function to log errors and exit the program.
 *
 * @param {Error} error - The error object to be logged.
 */
function handleError(error) {
  console.error('Error:', error);
  process.exit(1);
}

/**
 * Function to ensure a directory exists and create it if not.
 *
 * @param {string} dirPath - The path to the directory.
 */
function ensureDir(dirPath) {
  try {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  } catch (error) {
    handleError(error);
  }
}

/**
 * Moves a file to a specific directory if it matches a certain pattern.
 *
 * @param {string} source - The source file path.
 * @param {string} destDir - The destination directory path.
 * @param {RegExp} pattern - The pattern to match the file name.
 */
function moveFileIfMatches(source, destDir, pattern) {
  const fileName = path.basename(source);
  if (pattern.test(fileName)) {
    const destPath = path.join(destDir, fileName);
    try {
      fs.renameSync(source, destPath);
      console.log(`Moved file ${fileName} to ${destPath}`);
    } catch (error) {
      handleError(error);
    }
  }
}

/**
 * Orchestrator function to organize the directory structure.
 * It scans the directory and moves files based on the rules.
 *
 * @param {string} dirPath - The path to the directory to be organized.
 * @param {Object} rules - An object containing the rules for moving files.
 */
function organizeDirectory(dirPath, rules) {
  try {
    fs.readdirSync(dirPath).forEach(file => {
      const filePath = path.join(dirPath, file);
      if (fs.statSync(filePath).isDirectory()) {
        organizeDirectory(filePath, rules); // Recursively organize subdirectories
      } else {
        rules.forEach(rule => {
          moveFileIfMatches(filePath, rule.dest, rule.pattern);
        });
      }
    });
  } catch (error) {
    handleError(error);
  }
}

// Example usage:
const directoryPath = './path/to/your/directory';
const organizationRules = [
  {
    dest: './path/to/dest/folder1',
    pattern: /\.docx$/ // Matches all .docx files
  },
  {
    dest: './path/to/dest/folder2',
    pattern: /\.pdf$/ // Matches all .pdf files
  }
];

organizeDirectory(directoryPath, organizationRules);
