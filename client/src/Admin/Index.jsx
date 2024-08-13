import { Outlet } from "react-router-dom";
import AdminNavigation from "./modules/AdminNav";
import "./AdminApp.css";
import Sidebat from "./components/sidebar/Sidebar";
// import AdminContext, { AdminProvider } from "./context/AdminContext";
import AdminLogin from "./components/AdminLogin";
import { useSelector } from "react-redux";
import { useContext } from "react";
import { GlobelProvider } from "../context/globelContext";
import AdminContext from "./context/AdminContext";

export default function AdminIndex() {
  const { loading, isAdmin } = useSelector((state) => state.AdminSliceProvider);
  const { isToggleSidebar } = useContext(GlobelProvider);
  return (
    <>
      <div className="bg_Color">
        <AdminContext>
          {loading ? (
            <div className="main_spinner">
              <div className="spinner-border text-primary spinner_grow"></div>
            </div>
          ) : isAdmin ? (
            <>
              <AdminNavigation />

              <div className="main d-flex">
                <div
                  className={`sidebarWrapper ${
                    isToggleSidebar ? "toggle" : ""
                  } `}
                >
                  <Sidebat />
                </div>
                <div className={`content ${isToggleSidebar ? "toggle" : ""}`}>
                  <Outlet />
                </div>
              </div>
            </>
          ) : (
            <AdminLogin />
          )}
        </AdminContext>
      </div>
    </>
  );
}
