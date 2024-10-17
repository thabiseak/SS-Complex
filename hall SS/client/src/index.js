import React from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer, toast } from "react-toastify";
// import  { Toaster } from 'react-hot-toast';

import App from "./App";
// import "./index.css";
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <div>
    <App />
    <ToastContainer />
  </div>
);
