import { RouterProvider } from "react-router-dom";
import { typeTestRouter } from "./routers/routers";

function App() {
  return (
      <RouterProvider router={typeTestRouter} />
  );
}

export default App;
