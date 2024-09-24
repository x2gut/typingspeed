import { createBrowserRouter } from "react-router-dom";
import TypeTest from "../pages/TypeTest";

export const typeTestRouter = createBrowserRouter([
  {
    path: "/",
    element: <TypeTest />,
  },
]);
