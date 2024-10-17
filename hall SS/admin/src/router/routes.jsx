import React, { lazy } from "react";

import { allRoutesPath } from "./routesPath";
import CoursePage from "../pages/hall";
import LevelPage from "../pages/level";
import InventoryPage from "../pages/inventory";
import EventPage from "../pages/event";
import FinancePage from "../pages/Finance";

// import Dashboard from '../pages/Dashboard';
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Upcoming = lazy(() => import("../pages/Upcoming"));

// add all routes to publicRoute array before login

const publicRoute = [
  {
    path: allRoutesPath.DASHBOARD,
    element: <Dashboard />,
  },
  {
    path: allRoutesPath.COURSE,
    element: <CoursePage />,
  },
  {
    path: allRoutesPath.LEVEL,
    element: <LevelPage />,
  },
  {
    path: allRoutesPath.INVENTORY,
    element: <InventoryPage />,
  },
  {
    path: allRoutesPath.EVENT,
    element: <EventPage />,
  },
  {
    path: allRoutesPath.Transactions,
    element: <FinancePage />,
  },
  {
    path: allRoutesPath.DASHBOARD,
    element: <CoursePage />,
  },

  // customers/active
  {
    path: "*",
    element: <Upcoming />,
  },
];
const routes = [
  // dashboard
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "*",
    element: <Upcoming />,
  },
];

export { routes, publicRoute };
