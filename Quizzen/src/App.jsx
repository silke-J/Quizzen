import { useRoutes } from "react-router-dom";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Sluttet from "./pages/Slutte";

function App() {
  const routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/Quiz", element: <Quiz /> },
    { path: "/sluttet", element: <Sluttet /> },
  ]);
  return (
    <>
      <div className="content">{routes}</div>
    </>
  );
}

export default App;
