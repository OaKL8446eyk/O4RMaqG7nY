// 代码生成时间: 2025-08-09 09:23:21
const { Pool } = require('pg'); // 使用pg库来创建PostgreSQL的连接池

// 配置数据库连接池
const poolConfig = {
  max: 20, // 池中最多20个连接
  min: 0, // 池中最少0个连接
  idleTimeoutMillis: 30000, // 空闲连接超时时间，30秒后回收
  // 其他PG连接配置...
};

// 创建数据库连接池实例
const pool = new Pool(poolConfig);

// 用于获取连接的函数
async function getConnection() {
  try {
    const client = await pool.connect();
    console.log('数据库连接已建立');
    return client;
  } catch (error) {
    console.error('获取数据库连接失败', error);
    throw error; // 向上抛出错误
  }
}

// 使用连接执行查询的函数
async function queryDatabase(client, query) {
  try {
    const res = await client.query(query);
    return res;
  } catch (error) {
    console.error('查询数据库失败', error);
    throw error; // 向上抛出错误
  } finally {
    // 无论成功还是失败，都释放连接回连接池
    client.release();
    console.log('数据库连接已释放');
  }
}

// 用于关闭连接池的函数
async function closePool() {
  try {
    await pool.end();
    console.log('数据库连接池已关闭');
  } catch (error) {
    console.error('关闭数据库连接池失败', error);
    throw error; // 向上抛出错误
  }
}

// 示例：使用数据库连接池执行查询
async function run() {
  try {
    const client = await getConnection();
    const result = await queryDatabase(client, 'SELECT * FROM some_table');
    console.log(result.rows); // 打印查询结果
  } catch (error) {
    console.error('数据库操作失败', error);
  } finally {
    await closePool(); // 确保连接池被关闭
  }
}

// 运行示例函数
run();
