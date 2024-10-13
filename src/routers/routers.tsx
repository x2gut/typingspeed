import { createBrowserRouter } from "react-router-dom";
import TypeTest from "../pages/TypeTest";
import Settings from "../pages/Settings";
import Layout from "../layouts/Layout";
import NotFound404 from "../pages/404";
import Profile from "../pages/Profile";

export const mainRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
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
        element: <Settings />,
      },
      {
        path: "*",
        element: <NotFound404 />,
      },
      {
        path: "/profile",
        element: <Profile />
      }
    ],
  },
]);
