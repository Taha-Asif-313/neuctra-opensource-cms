import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  // Initialize theme on mount
  useEffect(() => {
    // Check localStorage first
    const saved = localStorage.getItem("theme");

    if (saved) {
      const dark = saved === "dark";
      setIsDark(dark);
      applyTheme(dark);
    } else {
      // Check system preference
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDark(systemDark);
      applyTheme(systemDark);
    }
  }, []);

  const applyTheme = (dark) => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    applyTheme(newDark);
    localStorage.setItem("theme", newDark ? "dark" : "light");
  };

  const setTheme = (theme) => {
    const dark = theme === "dark";
    setIsDark(dark);
    applyTheme(dark);
    localStorage.setItem("theme", theme);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
