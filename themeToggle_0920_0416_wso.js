// 代码生成时间: 2025-09-20 04:16:43
import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from './ThemeContext'; // Assuming ThemeContext is defined elsewhere

// Component to toggle theme
const ThemeToggle = () => {
  // Get the current theme from context
  const { theme, setTheme } = useContext(ThemeContext);

  // Function to toggle the theme
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  // Use effect to update local storage based on theme changes
  useEffect(() => {
    const currentTheme = theme;
    localStorage.setItem('theme', currentTheme);
  }, [theme]); // Dependency array includes theme to re-run when theme changes

  // Render the theme toggle button
  return (
    <button
      aria-label="Toggle theme"
      onClick={toggleTheme}
      className={theme}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
};

export default ThemeToggle;
