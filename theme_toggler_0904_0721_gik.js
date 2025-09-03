// 代码生成时间: 2025-09-04 07:21:03
const React = require('react');
const { useDarkMode, useTheme } = require('../../gatsby-plugin-theme-ui');

// 主题切换组件
const ThemeToggler = () => {
  // 使用Gatsby的Theme UI提供的useDarkMode和useTheme hook
  const [theme, setTheme] = useTheme();
  const [isDarkMode, toggleDarkMode] = useDarkMode();

  // 切换主题函数
  const toggleTheme = () => {
    try {
      // 检查当前主题是dark还是light
      if (isDarkMode) {
        setTheme('light');
      } else {
        setTheme('dark');
      }
      toggleDarkMode();
    } catch (error) {
      console.error('Error toggling theme:', error);
    }
  };

  return (
    // 按钮元素，点击时调用toggleTheme函数
    <button
      onClick={toggleTheme}
      style={{
        cursor: 'pointer',
        background: theme?.colors?.accent,
        color: theme?.colors?.background,
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        marginLeft: '15px',
      }}
    >
      {isDarkMode ? 'Switch to Light' : 'Switch to Dark'}
    </button>
  );
};

module.exports = ThemeToggler;