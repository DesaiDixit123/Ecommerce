

import { createContext, useEffect, useState } from 'react';

export const AdminProviderss = createContext();

export default function AdminContextss({ children }) {

  const [isToggleSidebar, setisToggleSidebar] = useState(false);


  
  useEffect(() => {
   alert(isToggleSidebar)
  }, [isToggleSidebar]);

 

  return (
    <AdminProviderss.Provider
      value={{
        isToggleSidebar,
        setisToggleSidebar,
      }}
    >
      {children}
    </AdminProviderss.Provider>
  );
}
