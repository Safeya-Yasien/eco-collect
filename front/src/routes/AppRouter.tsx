import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { authRoutes } from "./authRoutes";
import { mainRoutes } from "./mainRoutes";

const router = createBrowserRouter([...authRoutes, mainRoutes]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};
export default AppRouter;
