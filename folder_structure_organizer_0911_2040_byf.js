// 代码生成时间: 2025-09-11 20:40:51
// Import necessary Node.js modules
const fs = require('fs');
const path = require('path');

// Define a function to organize the folder structure
function organizeFolderStructure(directoryPath) {
  // Check if the directory exists
  if (!fs.existsSync(directoryPath)) {
    console.error(`The directory ${directoryPath} does not exist.`);
    return;
  }

  // Read the contents of the directory
  fs.readdir(directoryPath, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error(`An error occurred while reading the directory: ${err.message}`);
      return;
    }

    // Organize files and directories
    files.forEach(file => {
      if (file.isDirectory()) {
        // Recursively organize subdirectories
        organizeFolderStructure(path.join(directoryPath, file.name));
      } else if (file.isFile()) {
        // Organize files based on their extensions or other criteria
        const fileName = file.name;
        const fileExtension = path.extname(fileName).toLowerCase();
        const targetFolder = `./organized/${fileExtension}`;
        // Create the target folder if it doesn't exist
        if (!fs.existsSync(targetFolder)) {
          fs.mkdirSync(targetFolder, { recursive: true });
        }
        // Move the file to the target folder
        const targetPath = path.join(targetFolder, fileName);
        fs.rename(path.join(directoryPath, fileName), targetPath, err => {
          if (err) {
            console.error(`Failed to move the file: ${err.message}`);
          } else {
            console.log(`File moved: ${fileName} to ${targetPath}`);
          }
        });
      }
    });
  });
}

// Define the path to the directory you want to organize
const directoryToOrganize = './path/to/your/directory';

// Call the function to start organizing the folder structure
organizeFolderStructure(directoryToOrganize);