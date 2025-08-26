// 代码生成时间: 2025-08-26 09:52:15
// document_converter.js
// A Document Converter utility program using JavaScript and Gatsby framework.

// Import necessary libraries and modules
const fs = require('fs');
const path = require('path');
const sharp = require('sharp'); // For image processing
const remark = require('remark'); // For Markdown processing
const remarkHtml = require('remark-html'); // Convert Markdown to HTML
const yaml = require('js-yaml'); // For YAML parsing

// Define a class for the Document Converter
class DocumentConverter {

  // Constructor to initialize the converter with file paths
  constructor(inputPath, outputPath) {
    this.inputPath = inputPath;
    this.outputPath = outputPath;
  }

  // Method to convert Markdown to HTML
  async convertMarkdownToHtml() {
    try {
      const markdownContent = fs.readFileSync(this.inputPath, 'utf8');
      const processedContent = await remark()
        .use(remarkHtml)
        .process(markdownContent)
        .then(result => result.toString());

      fs.writeFileSync(this.outputPath, processedContent);
      console.log('Markdown file converted to HTML successfully.');
    } catch (error) {
      console.error('Error converting Markdown to HTML:', error.message);
    }
  }

  // Method to convert images in Markdown to WebP format
  async convertImagesToWebP() {
    try {
      const markdownContent = fs.readFileSync(this.inputPath, 'utf8');
      const imagePaths = this.extractImagePaths(markdownContent);

      await Promise.all(imagePaths.map(async (imagePath) => {
        const inputImagePath = path.resolve(path.dirname(this.inputPath), imagePath);
        const outputImagePath = path.resolve(path.dirname(this.outputPath), imagePath.replace('.jpg', '.webp').replace('.png', '.webp'));
        await sharp(inputImagePath).toFormat('webp').toFile(outputImagePath);
      }));

      console.log('Images converted to WebP format successfully.');
    } catch (error) {
      console.error('Error converting images to WebP:', error.message);
    }
  }

  // Helper method to extract image paths from Markdown content
  extractImagePaths(markdownContent) {
    const regex = /!\[.*?\]\((.*?)\)/g;
    const imagePaths = [];
    let match;
    while ((match = regex.exec(markdownContent)) !== null) {
      imagePaths.push(match[1]);
    }
    return imagePaths;
  }

  // Method to convert YAML to JSON
  async convertYamlToJson() {
    try {
      const yamlContent = fs.readFileSync(this.inputPath, 'utf8');
      const jsonContent = yaml.dump(yaml.load(yamlContent));
      fs.writeFileSync(this.outputPath, jsonContent);
      console.log('YAML file converted to JSON successfully.');
    } catch (error) {
      console.error('Error converting YAML to JSON:', error.message);
    }
  }
}

// Example usage:
// Initialize the DocumentConverter with input and output file paths
const converter = new DocumentConverter('input.md', 'output.html');

// Convert Markdown to HTML
converter.convertMarkdownToHtml();

// Convert images in Markdown to WebP format
converter.convertImagesToWebP();

// Convert YAML to JSON
converter.convertYamlToJson();