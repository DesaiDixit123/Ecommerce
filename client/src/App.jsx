import {createBrowserRouter,RouterProvider} from "react-router-dom"
import './App.css'
import Index from "./Index"
// import IndexUser from "./Index"
import Register from "./User/components/Register"
import Login from "./User/components/Login"
import ForgetPassword from "./User/components/ForgetPassword"
import VerifyOtp from "./User/components/VerifyOtp"
import ResetPassword from "./User/components/ResetPassword"
import UpdatePassword from "./User/components/UpdatePassword"
import Home from "./User/components/Home"
import UserIndex from "./User/Index"


const Router=createBrowserRouter([
{
  path:"/",
  element:<Index/>,
  children:[
    {
      path:"/",
      element:<UserIndex/>,
      children:[
        {path:"/",element:<Home/>},
        {path:"/register",element:<Register/>},
        {path:"/login",element:<Login/>},
        {path:"/forget-password",element:<ForgetPassword/>},
        {path:"/verifyOtp",element:<VerifyOtp/>},
        {path:"/resetPassword",element:<ResetPassword/>},
        {path:"/updatePassword",element:<UpdatePassword/>},
      ]
    }
  ]

}
])
function App() {
  return (
    <>
   <RouterProvider router={Router}></RouterProvider>
    </>
  )
  
}

export default App
