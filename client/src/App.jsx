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
import AdminDashbord from "./Admin/components/AdminDashbord";
import AdminProductsDetails from "./Admin/components/products/AdminProductsDetails";
import AdminCategoryList from "./Admin/components/products/AdminCategoryList";
import AdminUpdateCategory from "./Admin/components/products/AdminUpdateCategory";
import AdminProductManage from "./Admin/components/products/AdminProductManage";
import AdminAllUsers from "./Admin/components/AdminAllUsers";
import AdminProductsUpdateds from "./Admin/components/products/AdminProductsUpdate";
import UserProductsAdd from "./User/UserProducts/UserProductsAdd";
import { Herosec } from "./User/components/LightBox";
import ProductFilter from "./User/components/ProductFilter";
import Productspage from "./User/components/ProductsPage";
// import Herosec from "./User/components/Herosec";

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
          { path: "/products", element: <Productspage /> },
          { path: "/add/products", element: <UserProductsAdd /> },
          { path: "/viewProduct/:id", element: <Herosec /> },
          { path: "/productFilter", element: <ProductFilter /> },
        ],
      },
      {
        path: "/admin",
        element: <AdminIndex />,
        children: [
          { path: "/admin", element: <AdminDashbord /> },
          { path: "/admin/login", element: <AdminLogin /> },
          { path: "/admin/addproducts", element: <AdminAddProduct /> },
          { path: "/admin/category", element: <AdminAddCategory /> },
          {path:"/admin/category/list",element:<AdminCategoryList/>},
          {path:"/admin/category/Update/:id",element:<AdminUpdateCategory/>},
        
          { path: "/admin/productsdetails/products/:id", element: <AdminProductsDetails /> },
          {path:"/admin/productManage",element:<AdminProductManage/>},
          {path:"/admin/allUsers",element:<AdminAllUsers/>},
          {path:"/admin/products/update/:id",element:<AdminProductsUpdateds/>},
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
