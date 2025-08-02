// 代码生成时间: 2025-08-02 19:45:21
const React = require('react');
const DOMPurify = require('dompurify');

// 一个利用Gatsby框架和DOMPurify库实现XSS攻击防护的组件
class XssProtection extends React.Component {
  // 构造函数
  constructor(props) {
    super(props);
    // 保存处理后的数据
    this.state = {
      cleanedData: ''
    };
  }

  // 处理传入的数据
  componentDidUpdate(prevProps) {
    // 如果传入的数据发生变化，进行XSS清理
    if (this.props.data !== prevProps.data) {
      this.cleanData(this.props.data);
    }
  }

  // 清理数据以防护XSS攻击
  cleanData = (data) => {
    try {
      // 使用DOMPurify清理数据
      const cleanedData = DOMPurify.sanitize(data);
      // 更新状态
      this.setState({ cleanedData });
    } catch (error) {
      // 错误处理
      console.error('Error sanitizing data: ', error);
      // 可以选择设置一个默认安全值或抛出异常
      this.setState({ cleanedData: '' });
    }
  }

  // 渲染组件
  render() {
    return (
      <div>
        {/* 将清理后的数据渲染到页面上 */}
        <div dangerouslySetInnerHTML={{ __html: this.state.cleanedData }} />
      </div>
    );
  }
}

// 导出组件
module.exports = XssProtection;