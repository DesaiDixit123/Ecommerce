import { Outlet } from "react-router-dom";
import AdminContext from "./context/AdminContext";
import { useSelector } from "react-redux";
import AdminLogin from "./components/AdminLogin";
// import AdminNavigation from "./modules/AdminNav";

export default function AdminIndex() {
  const { loading, isAdmin } = useSelector((state) => state.AdminSliceProvider);

  return (
    <>
      <AdminContext>
        {loading ? (
          "Loading..."
        ) : isAdmin ? (
          <div className="flex">
            {/* <AdminNavigation /> */}
            <div className="flex-grow  p-1 overflow-auto h-screen">
              <Outlet />
            </div>
          </div>
        ) : (
          <AdminLogin />
        )}
      </AdminContext>
    </>
  );
}
