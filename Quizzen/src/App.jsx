import { useRoutes } from "react-router-dom";
import Home from "./pages/Home";
import Sluttet from "./pages/Slutte";

function App() {
  const routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/sluttet", element: <Sluttet /> },
  ]);
  return (
    <>
      <div className="content">{routes}</div>
    </>
  );
}

export default App;
