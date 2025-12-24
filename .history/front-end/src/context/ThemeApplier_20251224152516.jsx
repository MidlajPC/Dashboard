import { useEffect } from "react";
import { useTheme } from "front-end\src\context\Them";

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
