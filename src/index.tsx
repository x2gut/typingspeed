import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { TypeSettingsProvider } from "./contexts/TypeSettingsContext";
import { ThemeProvider } from "./contexts/ThemeProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <TypeSettingsProvider>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </TypeSettingsProvider>
);
