import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home/index.jsx";
import SignIn from "./pages/SignIn/SignIn.jsx";
import SignUp from "./pages/SignUp/SignUp.jsx";
import CartPage from "./pages/Shop/CartPage.jsx";
import ProductAdminPage from "./pages/Admin/Admin.jsx";

// bootstrap css
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

// fonts and icons
import "./assets/css/icofont.min.css";
import "./assets/css/animate.css";
import "./assets/css/style.min.css";
import ResetPassword from "./pages/SignIn/ResetPassword.jsx";
import Profile from "./pages/Profile/Profile.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/cart-page",
        element: <CartPage />,
      },
      {
        path: "/admin",
        element: <ProductAdminPage />
      },
      {
        path: "/profile",
        element: <Profile />
      }
    ],
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  { path: "forgetpass", element: <ResetPassword /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
