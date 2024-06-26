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
import Blog from "./pages/Blog/Blog.jsx";
import SingleBlog from "./pages/Blog/SingleBlog.jsx";
import Shop from "./pages/Shop/Shop.jsx";
import SingleProduct from "./pages/Shop/SingleProduct.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import Contact from "./pages/Contact/Contact.jsx";
import OrderDetails from "./pages/Shop/OrderDetails.jsx";
import About from "./pages/About/About.jsx";
import ForgetPassword from "./pages/SignIn/FogetPassword.jsx";
import Orders from "./pages/Shop/Orders.jsx";
import SignInGoogle from "./pages/SignIn/SignInGoogle.jsx";
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
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/blog/:id",
        element: <SingleBlog />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/cart-page",
        element: (
          <PrivateRoute roles={["user", "admin"]}>
            <CartPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/admin",
        element: (
          <PrivateRoute roles={["admin"]}>
            <ProductAdminPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute roles={["user", "admin"]}>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "shop/:id",
        element: <SingleProduct />,
      },
      {
        path: "/order-details/:orderId", // Add the route for OrderDetails
        element: <OrderDetails />,
      },
      {
        path: "/orders",
        element: <Orders />
      }
    ],
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/get-infor",
    element: <SignInGoogle />
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  { path: "/forgetpass", element: <ForgetPassword /> },
  { path: "/reset-password", element: <ResetPassword /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
