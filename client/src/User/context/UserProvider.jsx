/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const UserProvider = createContext();

export default function UserContext({ children }) {
  const [showPassword, setShowPassword] = useState(false);
  const togglePass = () => {
    setShowPassword(!showPassword);
  };

  return (
    <UserProvider.Provider
      value={{
        showPassword,
        togglePass,
      }}
    >
      {children}
    </UserProvider.Provider>
  );
}
