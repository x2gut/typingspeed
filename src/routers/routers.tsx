import { createBrowserRouter } from "react-router-dom";
import TypeTest from "../pages/TypeTest";
import Settings from "../pages/Settings";

export const mainRouter = createBrowserRouter([
  {
    path: "/",
    element: <TypeTest />,
  },
  {
    path: "/typingspeed",
    element: <TypeTest />,
  },
  {
    path: "/settings",
    element: <Settings />
  }
]);

