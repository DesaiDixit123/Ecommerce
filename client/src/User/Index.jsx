import { Outlet } from "react-router-dom";
import Navigation from "./Modules/Navigation";

export default function UserIndex() {
  return (
    <>
  
        <Navigation/>
        <Outlet />
     
    </>
  );
}
