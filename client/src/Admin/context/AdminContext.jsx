/* eslint-disable react/prop-types */
import { createContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { VerifyAdminFetchApi } from "../../redux/admin/AdminThunk";

export const AdminProvider = createContext();

export default function AdminContext({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(VerifyAdminFetchApi());
  }, []);
  return (
    <>
      <AdminProvider.Provider value={{}}>{children}</AdminProvider.Provider>
    </>
  );
}
