import Home from "./pages/home";
import HowUse from "./pages/how-use";
import Login from "./pages/login";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

export default function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/como-usar",
      element: <HowUse />
    }
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}