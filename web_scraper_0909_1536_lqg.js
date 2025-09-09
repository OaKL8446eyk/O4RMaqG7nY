// 代码生成时间: 2025-09-09 15:36:18
const puppeteer = require('puppeteer');
const axios = require('axios');

// 函数：抓取网页内容
async function scrapeWebsite(url) {
  // 使用puppeteer创建浏览器实例
  const browser = await puppeteer.launch({ headless: true });
  // 创建页面实例
  const page = await browser.newPage();
  // 访问网页
  await page.goto(url, { waitUntil: 'networkidle0' });
  // 获取网页的HTML内容
  const content = await page.content();
  // 关闭浏览器实例
  await browser.close();
  // 返回网页内容
  return content;
}

// 函数：保存网页内容到文件
async function saveContentToFile(content, filePath) {
  try {
    // 将网页内容写入文件
    await axios.put(filePath, content);
    console.log('网页内容已保存到文件。');
  } catch (error) {
    // 错误处理
    console.error('保存网页内容到文件时发生错误：', error);
  }
}

// 主函数：抓取并保存网页内容
async function scrapeAndSave(url, filePath) {
  try {
    // 抓取网页内容
    const content = await scrapeWebsite(url);
    // 保存网页内容到文件
    await saveContentToFile(content, filePath);
  } catch (error) {
    // 错误处理
    console.error('抓取网页内容时发生错误：', error);
  }
}

// 示例用法
const url = 'https://example.com';
const filePath = './website_content.html';
scrapeAndSave(url, filePath);
