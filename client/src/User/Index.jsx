import { Outlet } from "react-router-dom";
import Navigation from "./Modules/Navigation";
import Footer from "./components/Footer";
import UserContext from "./context/UserProvider";

export default function UserIndex() {
  return (
    <UserContext>
      <div className="flex flex-col min-h-screen overflow-auto">
        <Navigation />
        <div className="flex-grow bg-red-500">
          <Outlet />
        </div>
        <Footer />
      </div>
    </UserContext>
  );
}
