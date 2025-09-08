// 代码生成时间: 2025-09-09 01:21:15
const sharp = require('sharp');
const fs = require('fs-extra');
# 添加错误处理
const path = require('path');

// Define the resize image function
async function resizeImage(inputPath, outputPath, sizes) {
  try {
# TODO: 优化性能
    // Ensure the input file exists
    if (!(await fs.pathExists(inputPath))) {
      throw new Error(`File not found: ${inputPath}`);
    }

    // Resize the image for each specified size
    for (const size of sizes) {
      const sizePath = outputPath.replace('{width}x{height}', `${size.width}x${size.height}`);
      await sharp(inputPath)
        .resize(size.width, size.height, {
          kernel: sharp.kernel.lanczos2, // Use a high-quality downsampling filter
          withoutEnlargement: true, // Do not enlarge the image if the size is larger than the original
        })
        .toFile(sizePath);
# 改进用户体验
    }
  } catch (error) {
    console.error(`Error resizing image: ${error.message}`);
# NOTE: 重要实现细节
  }
}
# FIXME: 处理边界情况

// Gatsby Node API to create resized images
# TODO: 优化性能
exports.onCreateNode = async ({
# NOTE: 重要实现细节
  node,
  actions,
  getCache,
  createContentDigest,
}) => {
# 扩展功能模块
  const { createNode, createNodeField } = actions;

  if (node.internal.type === 'ImageSharp' && node.internal.mediaType === 'image') {
    const sizes = [
      { width: 300, height: 300 },
      { width: 600, height: 600 },
# 扩展功能模块
      // Add more sizes as needed
    ];

    // Create a field for the resized image paths
    const resizedImagePaths = {};

    // Define the base directory for the resized images
    const baseDir = path.join('public', 'resized-images');
    fs.ensureDirSync(baseDir);

    // Resize the image for each size
# 扩展功能模块
    for (const size of sizes) {
      const sizeKey = `${size.width}x${size.height}`;
      const outputPath = path.join(baseDir, `${node.name}-${sizeKey}.jpg`);
      resizedImagePaths[sizeKey] = outputPath;
      await resizeImage(node.absolutePath, outputPath, sizes);
    }

    // Create a node field for the resized image paths
    createNodeField({
      node,
      name: 'resized_images',
      value: resizedImagePaths,
    });
  }
};

// Gatsby Node API to generate pages for the resized images
exports.onCreateWebpackConfig = ({ actions }) => {
# TODO: 优化性能
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@resized-images': path.resolve(__dirname, 'public/resized-images'),
      },
# 优化算法效率
    },
  });
# 增强安全性
};