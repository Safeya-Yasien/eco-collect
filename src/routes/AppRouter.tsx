import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ProtectedRoute from "@/components/auth/ProtectedRoute";

const MainLayout = lazy(() => import("@/layouts/MainLayout/MainLayout"));
const SettingsLayout = lazy(() => import("@/layouts/SettingsLayout"));

import Error from "@/pages/error/Error";
const Settings = lazy(() => import("@/pages/settings/Settings"));
const Login = lazy(() => import("@/pages/login/Login"));
const Logout = lazy(() => import("@/pages/logout/Logout"));

const Overview = lazy(() => import("@/pages/overview/Overview"));
const Analytics = lazy(() => import("@/pages/analytics/Analytics"));
const Collectors = lazy(() => import("@/pages/collectors/Collectors"));
const Customers = lazy(() => import("@/pages/customers/Customers"));
const WasteTransactions = lazy(
  () => import("../pages/wasteTransactions/WasteTransactions")
);
const PointTransactions = lazy(
  () => import("../pages/pointTransactions/PointTransactions")
);
const Faq = lazy(() => import("@/pages/settings/Faq"));
const Terms = lazy(() => import("@/pages/settings/Terms"));

import { Spinner } from "@/components/feedback";

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
              path: "point-transactions",
              element: <PointTransactions />,
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
              path: "settings",
              element: <SettingsLayout />,
              children: [
                {
                  index: true,
                  element: <Settings />,
                },
                {
                  path: "faq",
                  element: <Faq />,
                },
                {
                  path: "terms",
                  element: <Terms />,
                },
              ],
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
