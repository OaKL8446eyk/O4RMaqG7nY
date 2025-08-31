// 代码生成时间: 2025-08-31 11:34:09
 * It also handles errors gracefully and is structured for maintainability
 * and extensibility.
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

class ImageResizer {
  // Constructor for ImageResizer
  constructor(srcFolder, destFolder, newSize) {
    this.srcFolder = srcFolder;
    this.destFolder = destFolder;
    this.newSize = newSize;  // Width x Height
  }

  // Method to resize all images in the source folder
  async resizeImages() {
    try {
      // Read all files in the source folder
      const files = fs.readdirSync(this.srcFolder);

      // Loop through each file
      for (const file of files) {
        // Check if the file is an image
        if (this.isImage(file)) {
          // Construct the full file path
          const filePath = path.join(this.srcFolder, file);
          await this.resizeImage(filePath);
        }
      }
    } catch (error) {
      console.error('Error resizing images:', error);
    }
  }

  // Method to check if the file is an image
  isImage(file) {
    // Define image extensions
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    // Check if the file extension is in the list of image extensions
    return imageExtensions.includes(path.extname(file).toLowerCase());
  }

  // Method to resize a single image
  async resizeImage(filePath) {
    try {
      // Use sharp to resize the image
      const buffer = await sharp(filePath)
        .resize(this.newSize[0], this.newSize[1])
        .toBuffer();

      // Construct the destination file path
      const destPath = path.join(this.destFolder, path.basename(filePath));

      // Write the resized image to the destination folder
      fs.writeFileSync(destPath, buffer);
      console.log(`Resized image saved to ${destPath}`);
    } catch (error) {
      console.error(`Error resizing image ${filePath}:`, error);
    }
  }
}

// Usage example
const srcFolder = './src/images';
const destFolder = './dest/images';
const newSize = [800, 600];

const imageResizer = new ImageResizer(srcFolder, destFolder, newSize);
imageResizer.resizeImages();