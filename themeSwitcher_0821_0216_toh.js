// 代码生成时间: 2025-08-21 02:16:38
const React = require('react');

// Context API to manage theme state across the application
const ThemeContext = React.createContext({
  theme: 'light',
  toggleTheme: () => {},
});

// Theme provider component to wrap the application
class ThemeProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: 'light',
    };
  }

  // Method to toggle the theme between 'light' and 'dark'
  toggleTheme = () => {
    this.setState(prevState => ({ theme: prevState.theme === 'light' ? 'dark' : 'light' }));
  };

  // Render the context and pass the current theme and toggle function to children
  render() {
    return (
      <ThemeContext.Provider value={{
        theme: this.state.theme,
        toggleTheme: this.toggleTheme,
      }}
      >
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}

// Custom hook to use theme in any component
function useTheme() {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

// Export the ThemeProvider, useTheme hook, and the toggleTheme function
module.exports = {
  ThemeProvider,
  useTheme,
};

// Usage example component
const ThemeToggler = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
    </button>
  );
};

// Usage in Gatsby
// Wrap your application in ThemeProvider in gatsby-browser.js
// export {
//   shouldUpdateScroll,
//   wrapPageElement,
//   wrapRootElement,
// };

// export function wrapRootElement({ element }) {
//   return (
//     <ThemeProvider>{element}</ThemeProvider>
//   );
// }