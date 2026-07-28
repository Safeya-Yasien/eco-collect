import { lazy } from "react";
import { withSuspense } from "./withSuspense";

const SettingsLayout = lazy(() => import("@/layouts/SettingsLayout"));
const Settings = lazy(() => import("@/pages/settings/Settings"));
const Faq = lazy(() => import("@/pages/settings/Faq"));
const Terms = lazy(() => import("@/pages/settings/Terms"));

export const settingsRoutes = {
  path: "settings",
  element: withSuspense(SettingsLayout),
  children: [
    { index: true, element: withSuspense(Settings) },
    { path: "faq", element: withSuspense(Faq) },
    { path: "terms", element: withSuspense(Terms) },
  ],
};
