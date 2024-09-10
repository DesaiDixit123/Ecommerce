import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Index from "./Index";
// import IndexUser from "./Index"
import Register from "./User/components/Login_Register/Register";
import Login from "./User/components/Login_Register/Login";
import ForgetPassword from "./User/components/PasswordChanges/ForgetPassword";
import VerifyOtp from "./User/components/PasswordChanges/VerifyOtp";
import ResetPassword from "./User/components/PasswordChanges/ResetPassword";
import UpdatePassword from "./User/components/PasswordChanges/UpdatePassword";
import Home from "./User/components/Home";
import UserIndex from "./User/Index";

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
import { Herosec } from "./User/components/Products/ProductsDetails";
import ProductFilter from "./User/components/Products/ProductFilter";
import Productspage from "./User/components/Products/ProductsPage";
import FilteredProductsPage from "./User/components/Products/FilterProductsRange";
import FilteredProducts from "./User/components/Products/FilteredProducts";
import SearchResults from "./User/components/Products/SearchResult";
import WishlsitPage from "./User/components/Products/WishlsitPage";
import CartsPage from "./User/components/Products/CartsPage";
import ProcessToCheckoutPage from "./User/components/Products/ProcessToCheckoutPage";
import RelatedProducts from "./User/components/Products/ReletedProducts";
import OrderConfirmPopupBox from "./User/components/Products/OrderConfirmPopupBox";
import UserOrders from "./User/components/orders/UserOrders";
import AdminAllOrders from "./Admin/components/products/AdminAllOrders";
import AdminNotification from "./Admin/components/products/AdminNotification";
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
          { path: "/filtered-products", element: <FilteredProductsPage /> },
          { path: "/filtered-products/:category", element: <FilteredProducts /> },
          { path: "/search-results", element: <SearchResults /> },
          { path: "/wishlsit", element: <WishlsitPage /> },
          { path: "/carts", element: <CartsPage /> },
          { path: "/processToCheckout", element: <ProcessToCheckoutPage /> },
          { path: "/related/:productId", element: <RelatedProducts /> },
          { path: "/oderConfirmMsg", element: <OrderConfirmPopupBox /> },
          { path: "/orders", element: <UserOrders /> },
          // { path: "/orders", element: <OrdersT /> },
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
          
          {path:"/admin/notification",element:<AdminNotification/>},
          { path: "/admin/productsdetails/products/:id", element: <AdminProductsDetails /> },
          {path:"/admin/productManage",element:<AdminProductManage/>},
          {path:"/admin/allUsers",element:<AdminAllUsers/>},
          {path:"/admin/products/update/:id",element:<AdminProductsUpdateds/>},
          {path:"/admin/allOrders",element:<AdminAllOrders/>},
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
