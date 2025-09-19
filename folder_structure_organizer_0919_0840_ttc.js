// 代码生成时间: 2025-09-19 08:40:14
const fs = require('fs');
const path = require('path');

// Function to create a directory if it does not exist
const ensureDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

// Function to recursively organize the folder structure
const organizeFolderStructure = (dirPath, rules) => {
  try {
    // Ensure the directory exists
    ensureDir(dirPath);
  
    // Loop through rules and apply them
    Object.keys(rules).forEach((folderName) => {
      const rule = rules[folderName];
      const targetPath = path.join(dirPath, folderName);
      
      // Apply rule to create or remove subdirectories
      if (rule.create) {
        ensureDir(targetPath);
      } else if (rule.remove) {
        const files = fs.readdirSync(targetPath);
        if (files.length === 0) {
          fs.rmdirSync(targetPath);
        }
      }
    });
  } catch (error) {
    console.error("Error organizing folder structure: ", error);
    throw error;
  }
};

// Example usage of the organizer function
// Define the folder structure rules
const folderRules = {
  'images': { create: true },
  'documents': { create: true },
  'temp': { remove: true },
};

// Define the root directory to organize
const rootDir = './content';

// Organize the folder structure
organizeFolderStructure(rootDir, folderRules);
