import { useRoutes } from "react-router-dom";
import Home from "./pages/Home";
import Sluttet from "./pages/Slutte";
import Quiz from "./pages/Quiz";

function App() {
  const routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/sluttet", element: <Sluttet /> },
    { path: "/quiz", element: <Quiz /> },
  ]);
  return (
    <>
      <div className="content">{routes}</div>
    </>
  );
}

export default App;
