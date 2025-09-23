// 代码生成时间: 2025-09-23 16:48:28
const fs = require('fs');
const path = require('path');

// 引入数据库查询优化器
const { optimizeQuery } = require('./query_optimizer_utils');

// 读取SQL文件并进行优化
async function optimizeSqlQueries(sqlFilePath) {
  try {
    // 检查文件是否存在
    if (!fs.existsSync(sqlFilePath)) {
      throw new Error('SQL file does not exist');
    }

    const sqlContent = fs.readFileSync(sqlFilePath, 'utf8');
    const optimizedQueries = optimizeQuery(sqlContent);
    return optimizedQueries;
  } catch (error) {
    console.error('Failed to optimize SQL queries:', error.message);
    throw error;
  }
}

// 导出函数
module.exports = { optimizeSqlQueries };

/**
 * query_optimizer_utils.js
 *
 * Utility functions for optimizing SQL queries
 */

const { parse, transform, generate } = require('sql-formatter');

// 优化SQL查询
function optimizeQuery(sqlQueries) {
  // 将SQL语句分割成单独的查询
  const queries = sqlQueries.split(';');
  const optimizedQueries = queries.map(query => {
    // 去除空行和注释
    query = query.trim();
    if (query.startsWith('--') || query.startsWith('/*') || query === '') return '';

    // 格式化SQL查询
    const formattedQuery = parse(query);
    const optimizedQuery = transform(formattedQuery, {
      indent: '  ',
      uppercase: true,
      linesBetweenQueries: 1
    });
    return generate(optimizedQuery, {
      indent: '  ',
      linesBetweenQueries: 1
    });
  }).filter(query => query !== '');

  return optimizedQueries;
}

module.exports = { optimizeQuery };

/**
 * SQL查询优化器
 *
 * 该模块定义了一个函数，用于读取SQL文件并优化其中的查询语句。
 * 优化步骤包括去除空行和注释，以及格式化SQL查询。
 *
 * @param {string} sqlFilePath - SQL文件的路径
 * @returns {Promise<string[]>} - 优化后的SQL查询语句数组
 *
 * @example
 * const sqlFilePath = path.join(__dirname, 'example.sql');
 * optimizeSqlQueries(sqlFilePath)
 *   .then(optimizedQueries => console.log(optimizedQueries))
 *   .catch(error => console.error('Error:', error.message));
 */