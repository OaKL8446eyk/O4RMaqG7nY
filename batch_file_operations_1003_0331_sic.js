// 代码生成时间: 2025-10-03 03:31:21
const fs = require('fs');
const path = require('path');

/**
 * 执行文件批量操作的函数
 * @param {string} directoryPath - 目录路径
 * @param {Function} operation - 对每个文件执行的操作
 * @param {Function} callback - 操作完成后的回调函数
 */
function batchFileOperations(directoryPath, operation, callback) {
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return callback(err);
    }

    let fileCount = files.length;
    const errors = [];

    files.forEach(file => {
      const filePath = path.join(directoryPath, file);
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error(`Error getting file stats for ${file}:`, err);
          errors.push(err);
          checkCompletion();
          return;
        }

        if (stats.isFile()) {
          operation(filePath, (error) => {
            if (error) {
              console.error(`Error during operation on ${file}:`, error);
              errors.push(error);
            }
            checkCompletion();
          });
        } else {
          checkCompletion();
        }
      });
    });

    function checkCompletion() {
      fileCount--;
      if (fileCount === 0) {
        if (errors.length > 0) {
          callback(new Error('Some operations failed.'));
        } else {
          callback(null, 'All operations completed successfully.');
        }
      }
    }
  });
}

/**
 * 示例：复制文件操作
 * @param {string} filePath - 文件路径
 * @param {Function} callback - 操作完成后的回调函数
 */
function copyFileOperation(filePath, callback) {
  const destPath = filePath + '.copy';
  fs.copyFile(filePath, destPath, (err) => {
    if (err) {
      callback(err);
    } else {
      console.log(`File ${filePath} copied to ${destPath}`);
      callback(null);
    }
  });
}

// 使用示例
batchFileOperations('/path/to/directory', copyFileOperation, (err, result) => {
  if (err) {
    console.error('Batch operation failed:', err);
  } else {
    console.log(result);
  }
});