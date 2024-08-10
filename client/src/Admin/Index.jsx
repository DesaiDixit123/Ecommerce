import { Outlet } from "react-router-dom";
import AdminNavigation from "./modules/AdminNav";
import "./AdminApp.css";
import Sidebat from "./components/sidebar/Sidebar";
import AdminContext from "./context/AdminContext";
import AdminLogin from "./components/AdminLogin";
import { useSelector } from "react-redux";

export default function AdminIndex() {
  const { loading, isAdmin } = useSelector((state) => state.AdminSliceProvider);
  
  return (
    <>
        {/* <AdminContext> */}
      {loading ? (
        "Loading..."
      ) : isAdmin ? (
        <>
            <AdminNavigation />

            <div className="main d-flex">
              <div className="sidebarWrapper">
                <Sidebat />
              </div>
              <div className="content">
                <Outlet />
              </div>
            </div>
        </>
      ) : (
        <AdminLogin />
      )}
      {/* </AdminContext> */}
    </>
  );
}
