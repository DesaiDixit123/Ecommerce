/* eslint-disable react/prop-types */
// // /* eslint-disable react/prop-types */
// // import { createContext, useEffect, useState } from "react";
// // import { useDispatch } from "react-redux";
// // import { VerifyAdminFetchApi } from "../../redux/admin/AdminThunk";
// // import { getAllCategories2 } from "../../redux/user/UserThunk";

// // export const AdminProvider = createContext();

// // export default function AdminContext({ children }) {
// //   const dispatch = useDispatch();

// //   const [isToggleSidebar, setisToggleSidebar] = useState(false);
// //   useEffect(() => {
// //     console.log('Sidebar toggle state:', isToggleSidebar);
// //   }, [isToggleSidebar]);
  
// //   useEffect(() => {
// //     dispatch(VerifyAdminFetchApi());
// //     dispatch(getAllCategories2());
// //   }, [dispatch]);
// //   return (
// //     <>
// //       <AdminProvider.Provider
// //         value={{
// //           isToggleSidebar,
// //           setisToggleSidebar,
// //         }}
// //       >
// //         {children}
// //       </AdminProvider.Provider>
// //     </>
// //   );
// // }



// import  { createContext, useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { VerifyAdminFetchApi } from '../../redux/admin/AdminThunk';
// import { getAllCategories2 } from '../../redux/user/UserThunk';

// export const AdminProvider = createContext();

// export default function AdminContext({ children }) {
//   const dispatch = useDispatch();
//   const [isToggleSidebar, setisToggleSidebar] = useState(false);

//   useEffect(() => {
//     dispatch(VerifyAdminFetchApi());
//     dispatch(getAllCategories2());
//   }, [dispatch]);

//   return (
//     <AdminProvider.Provider
//       value={{
//         isToggleSidebar,
//         setisToggleSidebar,
//       }}
//     >
//       {children}
//     </AdminProvider.Provider>
//   );
// }




import { createContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { VerifyAdminFetchApi } from '../../redux/admin/AdminThunk';
import { getAllCategories2 } from '../../redux/user/UserThunk';

export const AdminProvider = createContext();

export default function AdminContext({ children }) {
  const dispatch = useDispatch();
  const [isToggleSidebar, setisToggleSidebar] = useState(false);


  
  useEffect(() => {
    console.log('Sidebar toggle state:', isToggleSidebar);
  }, [isToggleSidebar]);

  useEffect(() => {
    dispatch(VerifyAdminFetchApi());
    dispatch(getAllCategories2());
  }, [dispatch]);

  return (
    <AdminProvider.Provider
      value={{
        isToggleSidebar,
        setisToggleSidebar,
      }}
    >
      {children}
    </AdminProvider.Provider>
  );
}
