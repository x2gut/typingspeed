import { RouterProvider } from "react-router-dom";
import { mainRouter } from "./routers/routers";

function App() {

  return <RouterProvider router={mainRouter} />;
}

export default App;
