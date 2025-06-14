import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import ProtectedRoute from "@/components/auth/ProtectedRoute";

const MainLayout = lazy(() => import("@/layouts/MainLayout/MainLayout"));

import Error from "@/pages/error/Error";
const Login = lazy(() => import("@/pages/login/Login"));
const Logout = lazy(() => import("@/pages/logout/Logout"));

const Overview = lazy(() => import("@/pages/overview/Overview"));
const Analytics = lazy(() => import("@/pages/analytics/Analytics"));
const Collectors = lazy(() => import("@/pages/collectors/Collectors"));
const Customers = lazy(() => import("@/pages/customers/Customers"));
const WasteTransactions = lazy(
  () => import("../pages/wasteTransactions/WasteTransactions")
);

const router = createBrowserRouter(
  [
    {
      path: "/login",
      element: <Login />,
    },

    {
      path: "/",
      // element: <ProtectedRoute />,
      element: <MainLayout />,
      children: [
        {
          // element: <MainLayout />,
          errorElement: <Error />,
          children: [
            {
              index: true,
              element: <Overview />,
            },
            {
              path: "waste-transactions",
              element: <WasteTransactions />,
            },
            {
              path: "collectors",
              element: <Collectors />,
            },
            {
              path: "customers",
              element: <Customers />,
            },
            {
              path: "analytics",
              element: <Analytics />,
            },

            {
              path: "logout",
              element: <Logout />,
            },
          ],
        },
      ],
    },
  ],
  {
    future: {
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};
export default AppRouter;
