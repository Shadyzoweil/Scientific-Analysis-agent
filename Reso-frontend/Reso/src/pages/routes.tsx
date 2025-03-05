import { createBrowserRouter } from "react-router-dom";
import HomePage from "./HomePage/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    // errorElement: <ErrorPage />,
  },
]);

export default router;
