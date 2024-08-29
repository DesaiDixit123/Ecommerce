/* eslint-disable react/prop-types */
import { createContext } from "react";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UserValidation } from "../../redux/user/UserThunk";
import { getAllUsersFetchApi } from "../../redux/admin/AdminThunk";

export const UserProvider = createContext();

export default function UserContext({ children }) {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.UserSliceProvider);
  useEffect(() => {
    dispatch(getAllUsersFetchApi());
  }, []);

  useEffect(() => {
    dispatch(UserValidation());
  }, [dispatch]);

  console.log(userData);

  return (
    <UserProvider.Provider value={userData}>{children}</UserProvider.Provider>
  );
}
