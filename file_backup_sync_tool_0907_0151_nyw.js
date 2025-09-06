// 代码生成时间: 2025-09-07 01:51:07
const fs = require('fs-extra');
const path = require('path');
const { createGzip } = require('zlib');
const readline = require('readline');

/**
 * 文件备份和同步工具
 * @param {string} sourcePath - 源文件路径
 * @param {string} targetPath - 目标文件路径
 */
async function backupAndSyncFiles(sourcePath, targetPath) {
  // 确保源路径和目标路径存在
  if (!fs.existsSync(sourcePath)) {
    throw new Error(`源路径 ${sourcePath} 不存在`);
  }

  // 确保目标路径存在，不存在则创建
  await fs.ensureDir(targetPath);

  // 获取源路径下的所有文件和目录
  const files = await fs.readdir(sourcePath, { withFileTypes: true });

  // 遍历所有文件和目录
  for (const file of files) {
    const sourceFilePath = path.join(sourcePath, file.name);
    const targetFilePath = path.join(targetPath, file.name);

    // 如果是目录，则递归同步
    if (file.isDirectory()) {
      await backupAndSyncFiles(sourceFilePath, targetFilePath);
    } else {
      // 如果是文件，则备份并同步
      try {
        await backupFile(sourceFilePath, targetFilePath);
      } catch (error) {
        console.error(`备份文件 ${sourceFilePath} 失败: ${error.message}`);
      }
    }
  }
}

/**
 * 备份单个文件
 * @param {string} sourceFilePath - 源文件路径
 * @param {string} targetFilePath - 目标文件路径
 */
async function backupFile(sourceFilePath, targetFilePath) {
  // 读取源文件内容
  const content = await fs.readFile(sourceFilePath);

  // 压缩文件内容
  const gzip = createGzip();
  const compressedContent = Buffer.from(await new Promise((resolve, reject) => {
    gzip.end(content, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  }));

  // 写入目标文件
  await fs.writeFile(targetFilePath, compressedContent);

  console.log(`文件 ${sourceFilePath} 已备份到 ${targetFilePath}`);
}

/**
 * 程序入口
 */
async function main() {
  // 定义源路径和目标路径
  const sourcePath = './source';
  const targetPath = './backup';

  try {
    await backupAndSyncFiles(sourcePath, targetPath);
    console.log('文件备份和同步完成');
  } catch (error) {
    console.error(`文件备份和同步失败: ${error.message}`);
  }
}

main();