// 代码生成时间: 2025-09-20 14:36:11
const express = require('express');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

// 创建一个 Express 应用
const app = express();
const PORT = process.env.PORT || 3000;

// 定义搜索结果缓存
const searchCache = {};

// 定义一个简单的搜索算法
async function search(query) {
  // 检查缓存中是否有结果
  if (searchCache[query]) {
    console.log('Returning cached result for:', query);
    return searchCache[query];
  }

  try {
    // 构造搜索URL
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;

    // 发起请求获取搜索结果
    const response = await fetch(searchUrl);
    const html = await response.text();

    // 使用cheerio解析HTML
    const $ = cheerio.load(html);

    // 提取搜索结果
    const results = [];
    $('div#rso div.g').each((i, element) => {
      const title = $(element).find('h3').text().trim();
      const link = $(element).find('a').attr('href');
      results.push({ title, link });
    });

    // 缓存结果并返回
    searchCache[query] = results;
    return results;
  } catch (error) {
    console.error('Search error:', error);
    throw new Error('Failed to retrieve search results');
  }
}

// 定义路由处理搜索请求
app.get('/search', async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    const results = await search(q);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});