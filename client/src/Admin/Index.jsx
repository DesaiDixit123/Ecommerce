import { Outlet } from "react-router-dom";
import AdminContext from "./context/AdminContext";
import { useSelector } from "react-redux";
import AdminLogin from "./components/AdminLogin";

export default function AdminIndex() {
  const { loading, isAdmin } = useSelector((state) => state.AdminSliceProvider);

 
  return (
    <>
      <AdminContext>
        {loading ? "Loading..." : isAdmin ? <Outlet /> : <AdminLogin />}
      </AdminContext>
    </>
  );
}
