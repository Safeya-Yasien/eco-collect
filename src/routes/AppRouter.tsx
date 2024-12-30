import MainLayout from "@/layouts/MainLayout/MainLayout";
import Analytics from "@/pages/analytics/Analytics";
import Collectors from "@/pages/collectors/Collectors";
import Customers from "@/pages/customers/Customers";
import Error from "@/pages/error/Error";
import Logout from "@/pages/logout/Logout";
import Overview from "@/pages/overview/Overview";
import Settings from "@/pages/settings/Settings";
import WasteTransactions from "@/pages/wasteTransactions/WasteTransactions";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter(
  [
    {
      path: "/",
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
          path: "settings",
          element: <Settings />,
        },
        {
          path: "logout",
          element: <Logout />,
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
