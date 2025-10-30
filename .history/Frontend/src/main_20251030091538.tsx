import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Toaster } from "sonner";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./contexts/ThemeContext";

const root = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <HelmetProvider>
      <ThemeProvider>
        <App />
        <Toaster />
      </ThemeProvider>
    </HelmetProvider>
  </BrowserRouter>
);
