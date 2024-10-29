import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "./contexts/ThemeProvider";
import { AuthProvider } from "./contexts/authContext";
import { NoticeProvider } from "./contexts/NoticeContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { TypeSettingsProvider } from "./contexts/TypeSettingsContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

export const queryClient = new QueryClient();

root.render(
  <NoticeProvider>
    <AuthProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <TypeSettingsProvider>
            <App />
          </TypeSettingsProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </AuthProvider>
  </NoticeProvider>
);
