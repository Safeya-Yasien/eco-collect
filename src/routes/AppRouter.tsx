import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ProtectedRoute from "@/components/auth/ProtectedRoute";

const MainLayout = lazy(() => import("@/layouts/MainLayout/MainLayout"));

import Error from "@/pages/error/Error";
import { Spinner } from "@/components/feedback";
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
      element: <ProtectedRoute />,
      children: [
        {
          element: <MainLayout />,
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
    future: {},
  }
);

const AppRouter = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};
export default AppRouter;
