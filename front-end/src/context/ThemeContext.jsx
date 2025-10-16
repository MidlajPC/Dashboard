import { createContext, useContext, useState } from "react";

const themeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, settheme] = useState("light");
  const toggleTheme = () => {
    settheme((prev) => (prev === "light" ? "dark" : "light"));
  };
  return (
    <themeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </themeContext.Provider>
  );
};
//custom hook
export const useTheme = () => useContext(themeContext);
