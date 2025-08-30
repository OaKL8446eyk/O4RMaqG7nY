// 代码生成时间: 2025-08-31 00:37:14
const processData = (data) => {
  // 数据处理函数，用于分析数据
  if (!data) {
    throw new Error('No data provided');
  }
  // 假设data是一个包含数值的数组
  const sum = data.reduce((acc, current) => acc + current, 0);
  const mean = sum / data.length;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const standardDeviation = Math.sqrt(data.map(x => (x - mean) ** 2).reduce((acc, current) => acc + current, 0) / data.length);
  return {
    sum,
    mean,
    max,
    min,
    standardDeviation
  };
};

// 示例数据
const sampleData = [2, 4, 6, 8, 10];

// 调用数据处理函数并输出结果
try {
  const analysisResult = processData(sampleData);
  console.log('数据分析结果：', analysisResult);
} catch (error) {
  console.error('错误：', error.message);
}

// Gatsby Node API 用于在Gatsby页面构建时运行数据处理
exports.onCreateNode = ({
  node,
  actions,
  loadNodeContent,
}) => {
  // 检查节点类型，假设我们有一个特定的节点类型用于数据分析
  if (node.internal.type === 'DataAnalysis') {
    const content = loadNodeContent(node);
    const data = JSON.parse(content);
    const analysisResult = processData(data);
    // 创建一个新的节点，包含分析结果
    actions.createNodeField({
      node,
      name: 'analysisResults',
      value: analysisResult,
    });
  }
};

// Gatsby GraphQL查询，用于在页面组件中访问分析结果
exports.createResolvers = ({
  actions,
  createResolvers,
}) => {
  const { createResolver } = actions;

  createResolver({
    name: 'DataAnalysis',
    kind: 'OBJECT',
    field: 'analysisResults',
    type: 'AnalysisResultsType', // 需要在schema自定义类型中定义
    resolve: (source, args, context, info) => {
      return source.analysisResults;
    },
  });
};