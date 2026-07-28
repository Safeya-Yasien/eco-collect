import { lazy } from "react";
import { withSuspense } from "./withSuspense";

const Login = lazy(() => import("@/pages/login/Login"));

export const authRoutes = [{ path: "/login", element: withSuspense(Login) }];
