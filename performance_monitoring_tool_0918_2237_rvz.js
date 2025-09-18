// 代码生成时间: 2025-09-18 22:37:48
// 导入必要的依赖
const React = require('react');
const { graphql, useStaticQuery } = require('gatsby');

// 定义性能监控组件
const PerformanceMonitoringTool = () => {
  // 使用GraphQL查询获取性能数据
  const data = useStaticQuery(graphql`
    query PerformanceQuery {
      site {
        siteMetadata {
          performanceMetrics {
            pageLoadTime
            cpuUsage
            memoryUsage
          }
        }
      }
    }
  `);

  // 获取性能指标数据
  const { pageLoadTime, cpuUsage, memoryUsage } = data.site.siteMetadata.performanceMetrics;

  // 渲染性能监控结果
  return (
    <div>
      <h2>系统性能监控</h2>
      <p>页面加载时间：{pageLoadTime} ms</p>
      <p>CPU使用率：{cpuUsage}%</p>
      <p>内存使用量：{memoryUsage} MB</p>
    </div>
  );
};

// 导出性能监控组件
module.exports = PerformanceMonitoringTool;