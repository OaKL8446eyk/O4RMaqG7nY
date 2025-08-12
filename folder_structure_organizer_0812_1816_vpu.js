// 代码生成时间: 2025-08-12 18:16:22
const fs = require('fs');
const path = require('path');

/**
 * 函数用于检查并创建目录
 * @param {string} directoryPath - 要检查的目录路径
 * @param {boolean} createIfNotExists - 如果目录不存在，是否创建
 */
function checkAndCreateDirectory(directoryPath, createIfNotExists = true) {
  try {
    const dirExists = fs.existsSync(directoryPath);

    if (!dirExists && createIfNotExists) {
      fs.mkdirSync(directoryPath, { recursive: true });
      console.log(`Directory created at ${directoryPath}`);
    } else if (!dirExists) {
      throw new Error(`Directory does not exist and createIfNotExists is false: ${directoryPath}`);
    }
  } catch (error) {
    console.error('Error checking or creating directory:', error);
  }
}

/**
 * 函数用于读取目录中的所有文件
 * @param {string} directoryPath - 目录路径
 * @returns {string[]} - 文件列表
 */
function readDirectoryFiles(directoryPath) {
  try {
    const files = fs.readdirSync(directoryPath);
    return files;
  } catch (error) {
    console.error('Error reading directory files:', error);
    return [];
  }
}

/**
 * 函数用于组织目录结构
 * @param {string} sourceDirectory - 源目录路径
 * @param {string} targetDirectory - 目标目录路径
 * @param {string} structure - 目标目录结构的描述，例如：'files/:copy, images/:move'
 */
function organizeDirectoryStructure(sourceDirectory, targetDirectory, structure) {
  const directives = structure.split(',').map(dir => dir.split(':'));

  try {
    // 确保目标目录存在
    checkAndCreateDirectory(targetDirectory);

    for (const [dir, action] of directives) {
      const [sourceSubDir, targetSubDir] = [path.join(sourceDirectory, dir), path.join(targetDirectory, dir)];
      // 确保子目录存在
      checkAndCreateDirectory(targetSubDir);

      const files = readDirectoryFiles(sourceSubDir);

      for (const file of files) {
        const sourceFilePath = path.join(sourceSubDir, file);
        const targetFilePath = path.join(targetSubDir, file);

        switch (action) {
          case 'copy':
            fs.copyFileSync(sourceFilePath, targetFilePath);
            console.log(`Copied ${file} to ${targetSubDir}`);
            break;
          case 'move':
            fs.renameSync(sourceFilePath, targetFilePath);
            console.log(`Moved ${file} to ${targetSubDir}`);
            break;
          default:
            throw new Error(`Unknown action ${action}`);
        }
      }
    }
  } catch (error) {
    console.error('Error organizing directory structure:', error);
  }
}

// 示例用法
const sourceDir = './sourceFolder';
const targetDir = './targetFolder';
const structure = 'files/:copy, images/:move';

organizeDirectoryStructure(sourceDir, targetDir, structure);
