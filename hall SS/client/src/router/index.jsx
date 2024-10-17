import { createBrowserRouter } from "react-router-dom";
import { routes, publicRoute } from "./routes";
import React from "react";
import { isUserData } from "../service/utils";
// import RootLayout from "../components/layouts/RootLayout";
// import ErrorBoundary from "../pages/Error/error";
// import { isAuthData } from '../utils/utils';

const finalRoutes = !isUserData()
  ? routes.map((route) => {
      return {
        ...route,
        element:
          route.layout === "blank" ? (
            <div>{route.element}</div>
          ) : (
            <div>{route.element}</div>
          ),
      };
    })
  : publicRoute.map((route) => {
      return {
        ...route,
        element:
          route.layout === "blank" ? (
            <div>{route.element}</div>
          ) : (
            <div>{route.element}</div>
          ),
      };
    });

const router = createBrowserRouter(finalRoutes);

export default router;
