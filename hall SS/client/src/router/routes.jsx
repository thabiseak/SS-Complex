import React, { lazy } from "react";
import { allRoutesPath } from "./routesPath";

import Home from "../pages/Home";
import About from "../pages/About";
import BOOKING from "../pages/BookingPage";
import Contact from "../pages/Contact";
import LevelPage from "../pages/courseLevel";
import LevelMatrial from "../pages/levelMatrial";
import Upcoming from "../pages/Upcoming";
import RegisterPage from "../pages/auth/register";
import LoginPage from "../pages/auth/login";
import ProfilePage from "../pages/profile";
import ContactPage from "../pages/Contact";
import BookingPage from "../pages/profile/booking";
import ServicePage from "../pages/Service";
import PhotographyPage from "../pages/profile/photography";
import BeauticianPage from "../pages/profile/beautician";
import TransportPage from "../pages/profile/transport";
import CardPage from "../pages/profile/cards";
import TransferPage from "../pages/profile/Transfer";
import EmplooyeeSetup from "../pages/EmplooyeeSetup";
import BookingAfterService from "../Components/profile/booking/bookingAfterService";
import EventPlainingPage from "../pages/EventPlaning";
import CreateUpdatePhotographyForm from "../Components/profile/photography/createUpdateForm";
// import HOME from '../pages/HOME';

// add all routes to publicRoute array before login

const publicRoute = [
  {
    path: allRoutesPath.HOME,
    element: <Home />,
  },
  {
    path: allRoutesPath.ABOUT,
    element: <About />,
  },
  {
    path: allRoutesPath.BOOKING,
    element: <BOOKING />,
  },
  {
    path: allRoutesPath.SERVICE,
    element: <ServicePage />,
  },

  {
    path: allRoutesPath.CONTACT,
    element: <ContactPage />,
  },
  {
    path: allRoutesPath.COURSE,
    element: <LevelPage />,
  },
  {
    path: allRoutesPath.COURSE_LEVEL,
    element: <LevelMatrial />,
  },
  {
    path: allRoutesPath.PROFILE,
    element: <ProfilePage />,
  },
  {
    path: allRoutesPath.BOOKINGPAGE,
    element: <BookingPage />,
  },
  {
    path: allRoutesPath.PHOTOGRAPHY,
    element: <PhotographyPage />,
  },
  {
    path: allRoutesPath.PHOTOGRAPHY + "/:id",
    element: <CreateUpdatePhotographyForm />,
  },
  {
    path: allRoutesPath.TRANSPORT,
    element: <TransportPage />,
  },
  {
    path: allRoutesPath.BEAUTICIAN,
    element: <BeauticianPage />,
  },
  {
    path: allRoutesPath.CARD,
    element: <CardPage />,
  },
  {
    path: allRoutesPath.TRANSFER,
    element: <TransferPage />,
  },
  {
    path: allRoutesPath.EMPLOYEE_SETUP + "/:id",
    element: <EmplooyeeSetup />,
  },
  {
    path: allRoutesPath.EVENT_PLAN + "/:id",
    element: <EventPlainingPage />,
  },
  {
    path: allRoutesPath.BookingAfterService + "/:id",
    element: <BookingAfterService />,
  },

  // {
  //   path: allRoutesPath.ERROR,
  //   element: <ErrorPages />,
  //   layout: "blank",
  // },
  // customers/active
  {
    path: "*",
    element: <Upcoming />,
  },
];
const routes = [
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "*",
    element: <RegisterPage />,
  },
];

export { routes, publicRoute };
