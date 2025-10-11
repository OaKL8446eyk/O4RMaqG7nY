// 代码生成时间: 2025-10-12 02:40:21
const fs = require('fs');
const path = require('path');

/**
 * Utility class for binary file operations.
 */
class BinaryFileUtils {

  constructor() {
    // Initialization can be done here if necessary.
  }

  /**
   * Reads a binary file and returns its content as a Buffer.
   *
   * @param {string} filePath - The path to the binary file.
   * @returns {Promise<Buffer>} - The content of the file as a Buffer.
   */
  static async readBinaryFile(filePath) {
    try {
      const buffer = await fs.promises.readFile(filePath);
      return buffer;
    } catch (error) {
      console.error(`Error reading binary file: ${error.message}`);
      throw error;
    }
  }

  /**
   * Writes data to a binary file.
   *
   * @param {string} filePath - The path to the binary file.
   * @param {Buffer} data - The data to write.
   * @returns {Promise<void>} - Resolves when the write operation is complete.
   */
  static async writeBinaryFile(filePath, data) {
    try {
      await fs.promises.writeFile(filePath, data);
    } catch (error) {
      console.error(`Error writing binary file: ${error.message}`);
      throw error;
    }
  }
}

// Example usage:
/*
(async () => {
  const filePath = 'path/to/your/file.bin';
  try {
    const buffer = await BinaryFileUtils.readBinaryFile(filePath);
    console.log('File read successfully:', buffer);

    // Modify the buffer as needed
    // ...

    // Write the modified buffer back to the file
    await BinaryFileUtils.writeBinaryFile(filePath, buffer);
    console.log('File written successfully');
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
*/