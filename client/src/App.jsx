import {createBrowserRouter,RouterProvider} from "react-router-dom"
import './App.css'
import Index from "./Index"
import IndexUser from "./Index"
import Register from "./User/components/Register"


const Router=createBrowserRouter([
{
  path:"/",
  element:<Index/>,
  children:[
    {
      path:"/",
      element:<IndexUser/>,
      children:[
        {path:"/",element:<Register/>}
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
