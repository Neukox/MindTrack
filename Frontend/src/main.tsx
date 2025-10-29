import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Toaster } from "sonner";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./contexts/ThemeContext";
import AppInitializer from "./AppInitializer";

const root = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <ThemeProvider>
      <HelmetProvider>
        <AppInitializer>
          <App />
          <Toaster />
        </AppInitializer>
      </HelmetProvider>
      <Toaster />
    </ThemeProvider>
  </BrowserRouter>
);
