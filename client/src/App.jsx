import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Index from "./Index";
// import IndexUser from "./Index"
import Register from "./User/components/Register";
import Login from "./User/components/Login";
import ForgetPassword from "./User/components/ForgetPassword";
import VerifyOtp from "./User/components/VerifyOtp";
import ResetPassword from "./User/components/ResetPassword";
import UpdatePassword from "./User/components/UpdatePassword";
import Home from "./User/components/Home";
import UserIndex from "./User/Index";
import Products from "./User/components/Products";
import AdminIndex from "./Admin/Index";
// import AdminLogin from "./Admin/components/AdminLogin";
import AdminHome from "./Admin/components/AdminHome";
import AdminLogin from "./Admin/components/AdminLogin";
import AdminAddProduct from "./Admin/components/products/AdminAddProduct";
import AdminAddCategory from "./Admin/components/products/AdminAddCategory";
import AdminProductUpadted from "./Admin/components/products/AdminProductUpdated";
import AdminDashbord from "./Admin/components/AdminDashbord";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    children: [
      {
        path: "/",
        element: <UserIndex />,
        children: [
          { path: "/", element: <Home /> },
          { path: "/register", element: <Register /> },
          { path: "/login", element: <Login /> },
          { path: "/forget-password", element: <ForgetPassword /> },
          { path: "/verifyOtp", element: <VerifyOtp /> },
          { path: "/resetPassword", element: <ResetPassword /> },
          { path: "/updatePassword", element: <UpdatePassword /> },
          { path: "/products", element: <Products /> },
        ],
      },
      {
        path: "/admin",
        element: <AdminIndex />,
        children: [
          { path: "/admin", element: <AdminDashbord /> },
          { path: "/admin/login", element: <AdminLogin /> },
          { path: "/admin/products", element: <AdminAddProduct /> },
          { path: "/admin/category", element: <AdminAddCategory /> },
          { path: "/admin/updated/products", element: <AdminProductUpadted /> },
        ],
      },
    ],
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={Router}></RouterProvider>
    </>
  );
}

export default App;
