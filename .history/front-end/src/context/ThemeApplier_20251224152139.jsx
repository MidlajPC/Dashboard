import { useEffect } from "react";
import { useTheme } from "./context/ThemeProvider";

const ThemeApplier = () => {
  const { isDark } = useTheme();

  useEffect(() => {
    if (isDark) {
      document.body.setAttribute("data-theme", "dark");
    } else {
      document.body.setAttribute("data-theme", "light");
    }
  }, [isDark]);

  return null;
};

export default ThemeApplier;
