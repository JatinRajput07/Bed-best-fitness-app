/**
=========================================================
* Material Tailwind Dashboard React - v2.1.0
=========================================================
* Product Page: https://www.creative-tim.com/product/material-tailwind-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-tailwind-dashboard-react/blob/main/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { MaterialTailwindControllerProvider } from "@/context";
import "../public/css/tailwind.css";
import store from "./redux/store";
import { Toaster } from "react-hot-toast";
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Toaster
      position="top-right"
      toastOptions={{}}
      containerStyle={{
        zIndex: 99999,
        position: "fixed",
        top: "6rem",
        right: "1rem",
      }}
    />
    <React.StrictMode>
      <BrowserRouter>
        <ThemeProvider>
          <MaterialTailwindControllerProvider>
            <App />
          </MaterialTailwindControllerProvider>
        </ThemeProvider>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);
