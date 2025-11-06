import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "leaflet/dist/leaflet.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserContext.jsx";
import { BotProvider } from "./context/BotContext.jsx";
import ThemeProvider from "./context/ThemeProvider.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserProvider>
      
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </UserProvider>
  </BrowserRouter>
);
