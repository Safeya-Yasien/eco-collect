import { lazy } from "react";

import { withSuspense } from "./withSuspense";
import Error from "@/pages/error/Error";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { settingsRoutes } from "./settingsRoutes";

const MainLayout = lazy(() => import("@/layouts/MainLayout/MainLayout"));

const Logout = lazy(() => import("@/pages/logout/Logout"));

const Overview = lazy(() => import("@/pages/overview/Overview"));
const Analytics = lazy(() => import("@/pages/analytics/Analytics"));
const Collectors = lazy(() => import("@/pages/collectors/Collectors"));
const Customers = lazy(() => import("@/pages/customers/Customers"));
const WasteTransactions = lazy(
  () => import("../pages/wasteTransactions/WasteTransactions"),
);
const PointTransactions = lazy(
  () => import("../pages/pointTransactions/PointTransactions"),
);
const WastePrices = lazy(() => import("@/pages/wastePrices/WastePrices"));

export const mainRoutes = {
  path: "/",
  element: <ProtectedRoute />,
  children: [
    {
      element: withSuspense(MainLayout),
      errorElement: <Error />,
      children: [
        { index: true, element: withSuspense(Overview) },
        { path: "waste-prices", element: withSuspense(WastePrices) },
        {
          path: "waste-transactions",
          element: withSuspense(WasteTransactions),
        },
        {
          path: "point-transactions",
          element: withSuspense(PointTransactions),
        },
        { path: "collectors", element: withSuspense(Collectors) },
        { path: "customers", element: withSuspense(Customers) },
        { path: "analytics", element: withSuspense(Analytics) },
        { path: "logout", element: withSuspense(Logout) },
        settingsRoutes,
      ],
    },
  ],
};
