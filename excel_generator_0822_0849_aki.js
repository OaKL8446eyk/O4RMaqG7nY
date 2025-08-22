// 代码生成时间: 2025-08-22 08:49:10
const fs = require('fs');
const ExcelJS = require('exceljs');

class ExcelGenerator {
  // Constructor for ExcelGenerator
  constructor() {
    this.workbook = new ExcelJS.Workbook();
  }

  // Method to add a worksheet
  addWorksheet(title) {
    this.worksheet = this.workbook.addWorksheet(title);
    return this;
  }

  // Method to add a row to the worksheet
  addRow(row) {
    if (!this.worksheet) {
      throw new Error('Worksheet not initialized. Please add a worksheet first.');
    }
    this.worksheet.addRow(row);
    return this;
  }

  // Method to add multiple rows to the worksheet
  addRows(rows) {
    if (!this.worksheet) {
      throw new Error('Worksheet not initialized. Please add a worksheet first.');
    }
    rows.forEach(row => this.worksheet.addRow(row));
    return this;
  }

  // Method to save the workbook to a file
  save(filename) {
    if (!this.worksheet) {
      throw new Error('No data to save. Please add at least one worksheet and row.');
    }
    return this.workbook.xlsx.writeFile(filename)
      .then(() => console.log(`Excel file saved as ${filename}`))
      .catch(error => console.error('Error saving Excel file:', error));
  }
}

module.exports = ExcelGenerator;

/*
 * Example usage:
 *
 * const excelGenerator = new ExcelGenerator();
 * excelGenerator
 *   .addWorksheet('Example Sheet')
 *   .addRow(['Column 1', 'Column 2', 'Column 3'])
 *   .addRows([['Data 1', 'Data 2', 'Data 3'], ['Data 4', 'Data 5', 'Data 6']])
 *   .save('example.xlsx');
 */