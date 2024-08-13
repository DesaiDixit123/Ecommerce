

import { createContext, useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { VerifyAdminFetchApi } from '../../redux/admin/AdminThunk';
// import { getAllCategories2 } from '../../redux/user/UserThunk';

export const GlobelProvider = createContext();

export default function GlobelContext({ children }) {
//   const dispatch = useDispatch();
  const [isToggleSidebar, setisToggleSidebar] = useState(false);


  
  useEffect(() => {
    // alert(isToggleSidebar)
  }, [isToggleSidebar]);

//   useEffect(() => {
//     dispatch(VerifyAdminFetchApi());
//     dispatch(getAllCategories2());
//   }, [dispatch]);

  return (
    <GlobelProvider.Provider
      value={{
        isToggleSidebar,
        setisToggleSidebar,
      }}
    >
      {children}
    </GlobelProvider.Provider>
  );
}
