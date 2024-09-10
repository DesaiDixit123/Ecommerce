// import {
//   Breadcrumbs,
//   Button,
//   Chip,
//   emphasize,
//   Pagination,
//   styled,
// } from "@mui/material";
// import HomeIcon from "@mui/icons-material/Home";
// import { useEffect, useState } from "react";
// import { getAllProductsFecthApi, getNotification } from "../../../redux/user/UserThunk";
// import { useDispatch, useSelector } from "react-redux";
// import { TiTick } from "react-icons/ti";
// import { FaPencil } from "react-icons/fa6";
// import { approvedProduct } from "../../../redux/admin/AdminThunk";
// import { useNavigate } from "react-router-dom";
// const StyledBreadcrumb = styled(Chip)(({ theme }) => {
//   const backgroundColor =
//     theme.palette.mode === "light"
//       ? theme.palette.grey[100]
//       : theme.palette.grey[800];
//   return {
//     backgroundColor,
//     height: theme.spacing(3),
//     color: theme.palette.text.primary,
//     fontWeight: theme.typography.fontWeightRegular,
//     "&:hover, &:focus": {
//       backgroundColor: emphasize(backgroundColor, 0.06),
//     },
//     "&:active": {
//       boxShadow: theme.shadows[1],
//       backgroundColor: emphasize(backgroundColor, 0.12),
//     },
//   };
// });

// export default function AdminNotification() {
//   const dispatch = useDispatch();
//   const [currentPage, setCurrentPage] = useState(1);
//   const notificationsPerPage = 5;

//   const { notifications = [] } = useSelector(
//     (state) => state.UserSliceProvider
//   );

//   console.log(notifications);
// const navigate=useNavigate()
//   const indexOfLastNotification = currentPage * notificationsPerPage;
//   const indexOfFirstNotification =
//     indexOfLastNotification - notificationsPerPage;
//   const currentNotifications = notifications.slice(
//     indexOfFirstNotification,
//     indexOfLastNotification
//   );
//   useEffect(() => {
//     dispatch(getNotification());
//   }, [dispatch]);

//   // const formatPriceWithCommas = (price) => {
//   //   if (price == null || isNaN(price)) return "0";

//   //   const priceString = price.toString();
//   //   const lastThreeDigit = priceString.slice(-3);
//   //   const otherDigits = priceString.slice(0, -3);
//   //   const formattedOtherDigits = otherDigits.replace(
//   //     /\B(?=(\d{2})+(?!\d))/g,
//   //     ","
//   //   );
//   //   return otherDigits
//   //     ? `${formattedOtherDigits},${lastThreeDigit}`
//   //     : lastThreeDigit;
//   // };

//   // const getStatusClass = (status) => {
//   //   switch (status) {
//   //     case "Pending":
//   //       return "text-blue-400 ";
//   //     case "Canceled":
//   //       return "text-red-700 ";
//   //     case "Deliverd":
//   //       return "text-green-700 ";
//   //     case "Shipped":
//   //       return "text-blue-700 ";
//   //     default:
//   //       return " text-gray-500";
//   //   }
//   // };
//   // const handleOrderCancellation = async () => {
//   //   if (!selectedOrder || !orderStatus) {
//   //     toast.error("Please select a reason for cancellation");
//   //     return;
//   //   }

//   //   try {
//   //     await dispatch(
//   //       userOrderStatusUpdated({
//   //         orderId: selectedOrder._id,
//   //         orderStatus:orderStatus,
//   //       })
//   //     );

//   //     console.log("orderStatus:",orderStatus)
//   //     toast.success("Order Status Updated successfully");
//   //     dispatch(getAllOrdersByUserId(userData._id));
//   //   } catch (error) {
//   //     toast.error(error.message);
//   //   }
//   // };
//   const handleApprove = async (productId,notificationId) => {
 
//     await dispatch(approvedProduct({productId,notificationId}))
//   await  dispatch(getAllProductsFecthApi())
//   dispatch(getNotification())
    
//   };
//   const handeleProductClick = (id) => {
//     console.log(`Navigating to product details with ID: ${id}`);
//     navigate(`/admin/productsdetails/products/${id}`);
//   };
  
//   return (
//     <div className="right-content w-100">
//       <div className="card  border-0 w-100 flex-row p-4 justify-between">
//         <h5 className="mb-3">Notifications</h5>
//         <Breadcrumbs aria-label="breadcrumb">
//           <StyledBreadcrumb
//             component="a"
//             href="/admin"
//             label="Dashboard"
//             icon={<HomeIcon fontSize="small" />}
//           />
//           <StyledBreadcrumb component="a" href="#" label="Notification" />
//         </Breadcrumbs>
//       </div>

//       <div className="card border-0 p-3 mt-4">
//         <div className="flex justify-between">
//           <h3 className="hd">Notifications</h3>
//         </div>

//         <div
//           className="table-responsive-scrollable mt-3 tableAdmin"
//           style={{ overflowX: "auto" }}
//         >
//           <table className="table table-bordered v-aligns text-center">
//             <thead className="thead-dark">
//               <tr>
//                 <th>UID</th>
//                 {/* <th className="w-[250px]" >
//                   User Id
//                 </th> */}
//                 <th style={{ whiteSpace: "nowrap" }}>User Name</th>
//                 <th>User Email Id</th>
//                 <th>Product</th>
//                 <th>Price</th>

//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentNotifications.length > 0 ? (
//                 currentNotifications.map((notification, index) => {
//                   return (
//                     <tr key={notification._id}>
//                       <td>#{indexOfFirstNotification + index + 1}</td>
//                       <td>
                  
//                         {`${notification.recipient.fname}
//                         ${notification.recipient.lname}`}
//                       </td>
//                       <td>
//                       {notification.recipient.email}
//                       </td>
//                       <td>
//                         <div className="d-flex align-items-center productBox gap-[20px]">
//                           <div className="imageWrapper">
//                             <div className="img">
//                               <img
//                                 src={notification.products.img1}
//                                 alt="Profile"
//                                 style={{
//                                   width: "50px",
//                                   height: "50px",
//                                   borderRadius: "50%",
//                                 }}
//                               />
//                             </div>
//                           </div>
//                           <div className="info">
//                             <h6>{notification.products.title}</h6>
//                           </div>
//                         </div>
//                       </td>

//                       <td className="w-[170px]">
//                         <div>
//                           <span className="new text-green-700 text-[15px] flex justify-center ">
//                             ₹ {notification.products.discount}
//                           </span>
//                         </div>
//                       </td>
//                       <td>
//                         <div className="flex">
//                           <div>
//                             <Button      onClick={() => handeleProductClick(notification.products.productId)}>View</Button>
//                           </div>
//                           <div>
//                             <Button  onClick={() => handleApprove(notification.products.productId,notification._id)}>Approved</Button>
//                           </div>
//                           <div>
//                             <Button>Decline</Button>
//                           </div>
//                         </div>
//                       </td>
//                       {/* <td>
//                           {order.shippingAddress.fname}{" "}
//                           {order.shippingAddress.lname}
//                         </td>
//                         <td>{order.shippingAddress.mobileNo} </td>
//                         <td>{order.shippingAddress.email} </td>  */}
//                     </tr>
//                   );
//                 })
//               ) : (
//                 <tr>
//                   <td colSpan="8" className="text-center">
//                     Notification not available
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>

//           {notifications.length > 0 && (
//             <div className="d-flex tableFooter">
//               <p>
//                 Showing <b>{notifications.length}</b> of{" "}
//                 <b>{notifications.length}</b> results
//               </p>
//               <Pagination
//                 count={Math.ceil(notifications.length / notificationsPerPage)}
//                 page={currentPage}
//                 onChange={(event, value) => setCurrentPage(value)}
//                 color="primary"
//                 className="pagination"
//                 showFirstButton
//                 showLastButton
//               />
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }



import {
  Breadcrumbs,
  Button,
  Chip,
  emphasize,
  Pagination,
  styled,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useEffect, useState } from "react";
import { getAllProductsFecthApi, getNotification } from "../../../redux/user/UserThunk";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { approvedProduct, deleteNotification } from "../../../redux/admin/AdminThunk";

// Styled Breadcrumb component using Material-UI's styled API
const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

// AdminNotification Component
export default function AdminNotification() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const notificationsPerPage = 5;

  const { notifications = [] } = useSelector(
    (state) => state.UserSliceProvider
  );
  const navigate = useNavigate();

  const indexOfLastNotification = currentPage * notificationsPerPage;
  const indexOfFirstNotification =
    indexOfLastNotification - notificationsPerPage;
  const currentNotifications = notifications.slice(
    indexOfFirstNotification,
    indexOfLastNotification
  );

  useEffect(() => {
    dispatch(getNotification());
  }, [dispatch]);

  const handleApprove = async (productId, notificationId) => {
    await dispatch(approvedProduct({ productId, notificationId }));
    await dispatch(getAllProductsFecthApi());
    dispatch(getNotification());
  };

  const handleProductClick = (id) => {
    navigate(`/admin/productsdetails/products/${id}`);
  };
  const handeleDeleteNotification = async (notificationId) => {
  await dispatch(deleteNotification(notificationId))
 await dispatch(getNotification())
 dispatch(getAllProductsFecthApi())
}
  return (
    <div className="right-content w-100">
      <div className="card border-0 w-100 flex-row p-4 justify-between">
        <h5 className="mb-3">Notifications</h5>
        <Breadcrumbs aria-label="breadcrumb">
          <StyledBreadcrumb
            component="a"
            href="/admin"
            label="Dashboard"
            icon={<HomeIcon fontSize="small" />}
          />
          <StyledBreadcrumb component="a" href="#" label="Notification" />
        </Breadcrumbs>
      </div>

      <div className="card border-0 p-3 mt-4">
        <div className="flex justify-between">
          <h3 className="hd">Notifications</h3>
        </div>

        <div
          className="table-responsive-scrollable mt-3 tableAdmin"
          style={{ overflowX: "auto" }}
        >
          <table className="table table-bordered v-aligns text-center">
            <thead className="thead-dark">
              <tr>
                <th>UID</th>
                <th style={{ whiteSpace: "nowrap" }}>User Name</th>
                <th>User Email Id</th>
                <th>Product</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentNotifications.length > 0 ? (
                currentNotifications.map((notification, index) => {
                  return (
                    <tr key={notification._id}>
                      <td>#{indexOfFirstNotification + index + 1}</td>
                      <td>{`${notification.recipient.fname} ${notification.recipient.lname}`}</td>
                      <td>{notification.recipient.email}</td>
                      <td>
                        <div className="d-flex align-items-center productBox gap-[20px]">
                          <div className="imageWrapper">
                            <div className="img">
                              <img
                                src={notification.products.img1}
                                alt="Profile"
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  borderRadius: "50%",
                                }}
                              />
                            </div>
                          </div>
                          <div className="info">
                            <h6>{notification.products.title}</h6>
                          </div>
                        </div>
                      </td>
                      <td className="w-[170px]">
                        <div>
                          <span className="new text-green-700 text-[15px] flex justify-center ">
                            ₹ {notification.products.discount}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="flex">
                          <Button
                            onClick={() =>
                              handleProductClick(notification.products.productId)
                            }
                          >
                            View
                          </Button>
                          <Button
                            onClick={() =>
                              handleApprove(
                                notification.products.productId,
                                notification._id
                              )
                            }
                          >
                            Approve
                          </Button>
                          <Button onClick={()=>handeleDeleteNotification(notification._id)}>Decline</Button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">
                    No notifications available
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {notifications.length > 0 && (
            <div className="d-flex tableFooter">
              <p>
                Showing <b>{notifications.length}</b> of{" "}
                <b>{notifications.length}</b> results
              </p>
              <Pagination
                count={Math.ceil(notifications.length / notificationsPerPage)}
                page={currentPage}
                onChange={(event, value) => setCurrentPage(value)}
                color="primary"
                className="pagination"
                showFirstButton
                showLastButton
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
