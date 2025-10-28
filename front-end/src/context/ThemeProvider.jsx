import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();
const ThemeProvider = ({ children }) => {
  const [isDark, setisDark] = useState(() => {
    const saved = localStorage.getItem("isDark");
    return saved ? JSON.parse(saved) : false;
  });
  useEffect(() => {
    localStorage.setItem("isDark", JSON.stringify(isDark));
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, setisDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
export default ThemeProvider;
