import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import './Theme.css'; // Giữ file CSS cho việc quản lý theme

const ToggleTheme = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Load theme từ localStorage khi component được mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkTheme(savedTheme === 'dark');
      document.body.classList.toggle('dark-theme', savedTheme === 'dark');
    }
  }, []);

  // Hàm chuyển đổi theme
  const toggleTheme = () => {
    const newTheme = isDarkTheme ? 'light' : 'dark';
    setIsDarkTheme(!isDarkTheme);
    localStorage.setItem('theme', newTheme);
    document.body.classList.toggle('dark-theme', newTheme === 'dark');
  };

  return (
    <IconButton onClick={toggleTheme} color="inherit">
      {isDarkTheme ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
};

export default ToggleTheme;
