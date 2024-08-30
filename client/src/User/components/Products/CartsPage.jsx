// import { useDispatch, useSelector } from "react-redux";
// import { Button, Pagination } from "@mui/material";
// import { MdDelete } from "react-icons/md";
// import { IoCartOutline } from "react-icons/io5";
// import { useEffect, useState } from "react";
// import {
//   userRemoveToWishlist,
//   UserValidation,
// } from "../../../redux/user/UserThunk";
// import { toast } from "react-toastify";

// export default function CartsPage() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const productsPerPage = 5;
//   const { allProducts, userData,addCart } = useSelector(
//     (state) => state.UserSliceProvider
//     );
    
//     console.log(addCart)
//   const [wishlist, setWishlist] = useState([]);
//   const dispatch = useDispatch();
//   useEffect(() => {
//     if (userData && userData.wishlist) {
//       setWishlist(userData.wishlist);
//     }
//   }, [userData]);

//   // Filter products that are in the wishlist
//   const wishlistProducts = allProducts.filter((product) =>
//     wishlist.includes(product._id)
//   );

//   // Pagination logic
//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = addCart.slice(
//     indexOfFirstProduct,
//     indexOfLastProduct
//   );

//   const handleChangePage = (e, value) => {
//     setCurrentPage(value);
//   };

//   const handleRemoveWishlist = async (productId) => {
//     await dispatch(
//       userRemoveToWishlist({
//         productId,
//         userId: userData._id,
//         toast,
//       })
//     );

//     dispatch(UserValidation());
//   };

//   return (
//     <div className="right-content w-100">
//       <div className="card border-0 p-3 mt-4">
//         <div className="flex justify-between">
//           <h3 className="hd">Carts</h3>
//         </div>

//         <div className="table_responsive mt-3">
//           <table className="table table-bordered v-aligns text-center">
//             <thead className="thead-dark">
//               <tr>
//                 <th>UID</th>
//                 <th>Product</th>
//                 <th>Price</th>
//                 <th>Quantity</th>
//                 <th>SubTotal</th>
//                 <th>Remove</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentProducts.length > 0 ? (
//                 currentProducts.map((product, index) => (
//                   <tr key={product._id}>
//                     <td>#{indexOfFirstProduct + index + 1}</td>
//                     <td>
//                       <div className="d-flex align-items-center productBox gap-[20px]">
//                         <div className="imageWrapper">
//                           <div className="img">
//                             <img
//                               src={product.img1}
//                               alt={product.title}
//                               style={{
//                                 width: "50px",
//                                 height: "50px",
//                                 borderRadius: "50%",
//                               }}
//                             />
//                           </div>
//                         </div>
//                         <div className="info">
//                           <h6>{product.title}</h6>
//                           <p>{product.description}</p>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="w-[170px]">
//                       <div style={{ width: "70px" }}>
//                         <span className="new text-green-700 text-[15px] flex justify-center">
//                           ₹{product.discount}
//                         </span>
                      
//                       </div>
//                     </td>
//                         <td className="">
                            
//                             <div className="flex justify-center">

//                       <div className="w-[25px] h-[25px] flex items-start justify-center ">
//                         <button className="btn btn-danger rounded-[100%]">-</button>
//                       </div>
//                       <input
//                         type="text"
//                         name=""
//                         id=""
//                         className="w-[36px] h-[36px] outline-none border-0 text-center bg-transparent text-[20px]"
//                         readOnly
//                         value={1}
//                       />
//                       <div className="w-[25px] h-[25px] flex items-start justify-center">
//                         <button className="btn btn-primary rounded-[100%] text-center">+</button>
//                       </div>
//                         </div>
//                     </td>
//                     <td className="w-[200px]">₹ 5,000,00</td>
//                     <td>
//                       <Button
//                         color="error"
//                         className="error text-[22px]"
//                         onClick={() => handleRemoveWishlist(product._id)}
//                       >
//                         <MdDelete />
//                       </Button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="8" className="text-center">
//                     Carts not available
//                   </td>
//                 </tr>
//               )}
//               {currentProducts.length > 0 && (
//                 <>
//                   <tr>
//                     <td colSpan="6" className="text-right">
//                       <Button
//                         color="secondary"
//                         variant="contained"
//                         startIcon={<MdDelete />}
//                       >
//                         Clear Cart
//                       </Button>
//                     </td>
//                   </tr>
//                   <tr>
//                     <td colSpan="6" className="text-right">
//                       <Button
//                         color="primary"
//                         variant="contained"
//                         startIcon={<IoCartOutline />}
//                         style={{ marginLeft: "10px" }}
//                       >
//                         Continue Shopping
//                       </Button>
//                     </td>
//                   </tr>
//                 </>
//               )}
//             </tbody>
//           </table>

//           {addCart.length > 0 && (
//             <div className="d-flex tableFooter">
//               <p>
//                 Showing <b>{currentProducts.length}</b> of{" "}
//                 <b>{addCart.length}</b> results
//               </p>
//               <Pagination
//                 count={Math.ceil(addCart.length / productsPerPage)}
//                 color="primary"
//                 className="pagination"
//                 showFirstButton
//                 showLastButton
//                 onChange={handleChangePage}
//               />
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="border-2 border-gray-300 w-[40%] h-auto p-[30px] relative float-right mt-4 mb-[50px]">
//         <div className="">
//           {/* <h4 className="text-lg font-semibold mb-4 text-center">Cart Totals</h4> */}
//           <div className="table_responsive mt-3">
//             <table className="table table-bordered v-aligns">
//               <thead className="thead-dark">
//                 <tr className="text-center">
//                   <th colSpan={2}>Cart Totals</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr className="border-b text-center">
//                   <td className="py-2 ">Cart Subtotal</td>
//                   <td className="text-center font-semibold text-green-600">
//                     {/* ₹{subtotal.toFixed(2)} */}
//                   </td>
//                 </tr>
//                 <tr className="border-b text-center">
//                   <td className="py-2">Shipping</td>
//                   <td className="text-center">Free Shipping</td>
//                 </tr>
//                 <tr className="border-b text-center">
//                   <td className="py-2 font-semibold">Total</td>
//                   <td className="text-center font-semibold text-green-600">
//                     {/* ₹{total.toFixed(2)} */}
//                   </td>
//                 </tr>

//                 <tr>
//                   <td colSpan="6" className="text-center">
//                     <Button
//                       color="primary"
//                       variant="contained"
//                       startIcon={<IoCartOutline />}
//                     >
//                       Proceed To CheckOut
//                     </Button>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




// import { useDispatch, useSelector } from "react-redux";
// import { Button, Pagination } from "@mui/material";
// import { MdDelete } from "react-icons/md";
// import { IoCartOutline } from "react-icons/io5";
// import { useEffect, useState } from "react";
// import {
//   userRemoveToWishlist,
//   UserValidation,
// } from "../../../redux/user/UserThunk";
// import { toast } from "react-toastify";

// export default function CartsPage() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const productsPerPage = 5;
//   const { allProducts, userData, addCart } = useSelector(
//     (state) => state.UserSliceProvider
//   );

//   console.log(addCart);
//   const [wishlist, setWishlist] = useState([]);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (userData && userData.wishlist) {
//       setWishlist(userData.wishlist);
//     }
//   }, [userData]);

//   // Filter products that are in the wishlist
//   const wishlistProducts = allProducts.filter((product) =>
//     wishlist.includes(product._id)
//   );

//   // Pagination logic
//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = Array.isArray(addCart)
//     ? addCart.slice(indexOfFirstProduct, indexOfLastProduct)
//     : [];

//   const handleChangePage = (e, value) => {
//     setCurrentPage(value);
//   };

//   const handleRemoveWishlist = async (productId) => {
//     await dispatch(
//       userRemoveToWishlist({
//         productId,
//         userId: userData._id,
//         toast,
//       })
//     );

//     dispatch(UserValidation());
//   };
//   console.log('addCart:', addCart);
//   console.log('Type of addCart:', typeof addCart);
//   console.log('Array.isArray(addCart):', Array.isArray(addCart));
  
//   return (
//     <div className="right-content w-100">
//       <div className="card border-0 p-3 mt-4">
//         <div className="flex justify-between">
//           <h3 className="hd">Carts</h3>
//         </div>

//         <div className="table_responsive mt-3">
//           <table className="table table-bordered v-aligns text-center">
//             <thead className="thead-dark">
//               <tr>
//                 <th>UID</th>
//                 <th>Product</th>
//                 <th>Price</th>
//                 <th>Quantity</th>
//                 <th>SubTotal</th>
//                 <th>Remove</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentProducts.length > 0 ? (
//                 currentProducts.map((product, index) => (
//                   <tr key={product._id}>
//                     <td>#{indexOfFirstProduct + index + 1}</td>
//                     <td>
//                       <div className="d-flex align-items-center productBox gap-[20px]">
//                         <div className="imageWrapper">
//                           <div className="img">
//                             <img
//                               src={product.img1}
//                               alt={product.title}
//                               style={{
//                                 width: "50px",
//                                 height: "50px",
//                                 borderRadius: "50%",
//                               }}
//                             />
//                           </div>
//                         </div>
//                         <div className="info">
//                           <h6>{product.title}</h6>
//                           <p>{product.description}</p>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="w-[170px]">
//                       <div style={{ width: "70px" }}>
//                         <span className="new text-green-700 text-[15px] flex justify-center">
//                           ₹{product.discount}
//                         </span>
//                       </div>
//                     </td>
//                     <td className="">
//                       <div className="flex justify-center">
//                         <div className="w-[25px] h-[25px] flex items-start justify-center ">
//                           <button className="btn btn-danger rounded-[100%]">-</button>
//                         </div>
//                         <input
//                           type="text"
//                           name=""
//                           id=""
//                           className="w-[36px] h-[36px] outline-none border-0 text-center bg-transparent text-[20px]"
//                           readOnly
//                           value={1}
//                         />
//                         <div className="w-[25px] h-[25px] flex items-start justify-center">
//                           <button className="btn btn-primary rounded-[100%] text-center">+</button>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="w-[200px]">₹ 5,000,00</td>
//                     <td>
//                       <Button
//                         color="error"
//                         className="error text-[22px]"
//                         onClick={() => handleRemoveWishlist(product._id)}
//                       >
//                         <MdDelete />
//                       </Button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="8" className="text-center">
//                     Carts not available
//                   </td>
//                 </tr>
//               )}
//               {currentProducts.length > 0 && (
//                 <>
//                   <tr>
//                     <td colSpan="6" className="text-right">
//                       <Button
//                         color="secondary"
//                         variant="contained"
//                         startIcon={<MdDelete />}
//                       >
//                         Clear Cart
//                       </Button>
//                     </td>
//                   </tr>
//                   <tr>
//                     <td colSpan="6" className="text-right">
//                       <Button
//                         color="primary"
//                         variant="contained"
//                         startIcon={<IoCartOutline />}
//                         style={{ marginLeft: "10px" }}
//                       >
//                         Continue Shopping
//                       </Button>
//                     </td>
//                   </tr>
//                 </>
//               )}
//             </tbody>
//           </table>

//           {addCart.length > 0 && (
//             <div className="d-flex tableFooter">
//               <p>
//                 Showing <b>{currentProducts.length}</b> of{" "}
//                 <b>{addCart.length}</b> results
//               </p>
//               <Pagination
//                 count={Math.ceil(addCart.length / productsPerPage)}
//                 color="primary"
//                 className="pagination"
//                 showFirstButton
//                 showLastButton
//                 onChange={handleChangePage}
//               />
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="border-2 border-gray-300 w-[40%] h-auto p-[30px] relative float-right mt-4 mb-[50px]">
//         <div className="">
//           <div className="table_responsive mt-3">
//             <table className="table table-bordered v-aligns">
//               <thead className="thead-dark">
//                 <tr className="text-center">
//                   <th colSpan={2}>Cart Totals</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr className="border-b text-center">
//                   <td className="py-2 ">Cart Subtotal</td>
//                   <td className="text-center font-semibold text-green-600">
//                     {/* ₹{subtotal.toFixed(2)} */}
//                   </td>
//                 </tr>
//                 <tr className="border-b text-center">
//                   <td className="py-2">Shipping</td>
//                   <td className="text-center">Free Shipping</td>
//                 </tr>
//                 <tr className="border-b text-center">
//                   <td className="py-2 font-semibold">Total</td>
//                   <td className="text-center font-semibold text-green-600">
//                     {/* ₹{total.toFixed(2)} */}
//                   </td>
//                 </tr>

//                 <tr>
//                   <td colSpan="6" className="text-center">
//                     <Button
//                       color="primary"
//                       variant="contained"
//                       startIcon={<IoCartOutline />}
//                     >
//                       Proceed To CheckOut
//                     </Button>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




// import { useDispatch, useSelector } from "react-redux";
// import { Button, Pagination } from "@mui/material";
// import { MdDelete } from "react-icons/md";
// import { IoCartOutline } from "react-icons/io5";
// import { useState } from "react";


// export default function CartsPage() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const productsPerPage = 5;
//   const { allProducts, userData, addCart } = useSelector((state) => state.UserSliceProvider);


//   const dispatch = useDispatch();


//   // Pagination logic
//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = Array.isArray(addCart)
//     ? addCart.slice(indexOfFirstProduct, indexOfLastProduct)
//     : [];

//   const handleChangePage = (e, value) => {
//     setCurrentPage(value);
//   };

  

//   // Calculate total amounts
//   const calculateTotalAmount = () => {
//     if (Array.isArray(addCart)) {
//       return addCart.reduce((acc, item) => acc + item.subTotal, 0);
//     }
//     return 0;
//     };
    
//     console.log(addCart.items)

//   const totalAmount = calculateTotalAmount();

//   return (
//     <div className="right-content w-100">
//       <div className="card border-0 p-3 mt-4">
//         <div className="flex justify-between">
//           <h3 className="hd">Carts</h3>
//         </div>

//         <div className="table_responsive mt-3">
//           <table className="table table-bordered v-aligns text-center">
//             <thead className="thead-dark">
//               <tr>
//                 <th>UID</th>
//                 <th>Product</th>
//                 <th>Price</th>
//                 <th>Quantity</th>
//                 <th>SubTotal</th>
//                 <th>Remove</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentProducts.length > 0 ? (
//                 currentProducts.map((item, index) => (
//                   <tr key={item._id}>
//                     <td>#{indexOfFirstProduct + index + 1}</td>
//                     <td>
//                       <div className="d-flex align-items-center productBox gap-[20px]">
//                         <div className="imageWrapper">
//                           <div className="img">
//                             <img
//                               src={item.img1}
//                               alt={item.title}
//                               style={{ width: "50px", height: "50px", borderRadius: "50%" }}
//                             />
//                           </div>
//                         </div>
//                         <div className="info">
//                           <h6>{item.title}</h6>
//                           <p>{item.description}</p>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="w-[170px]">
//                       <div style={{ width: "70px" }}>
//                         <span className="new text-green-700 text-[15px] flex justify-center">
//                           ₹{item.discount}
//                         </span>
//                       </div>
//                     </td>
//                     <td className="flex justify-center">
//                       <div className="w-[25px] h-[25px] flex items-start justify-center ">
//                         <button className="btn btn-danger rounded-[100%]">-</button>
//                       </div>
//                       <input
//                         type="text"
//                         className="w-[36px] h-[36px] outline-none border-0 text-center bg-transparent text-[20px]"
//                         readOnly
//                         value={item.quantity}
//                       />
//                       <div className="w-[25px] h-[25px] flex items-start justify-center">
//                         <button className="btn btn-primary rounded-[100%] text-center">+</button>
//                       </div>
//                     </td>
//                     <td className="w-[200px]">₹{item.subTotal}</td>
//                     <td>
//                       <Button
//                         color="error"
//                         className="error text-[22px]"
                        
//                       >
//                         <MdDelete />
//                       </Button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="6" className="text-center">
//                     Data not available
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>

//           {Array.isArray(addCart) && addCart.length > 0 && (
//             <div className="d-flex tableFooter">
//               <p>
//                 Showing <b>{currentProducts.length}</b> of <b>{addCart.length}</b> results
//               </p>
//               <Pagination
//                 count={Math.ceil(addCart.length / productsPerPage)}
//                 color="primary"
//                 className="pagination"
//                 showFirstButton
//                 showLastButton
//                 onChange={handleChangePage}
//               />
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="border-2 border-gray-300 w-[40%] h-auto p-[30px] relative float-right mt-4 mb-[50px]">
//         <div className="">
//           <div className="table_responsive mt-3">
//             <table className="table table-bordered v-aligns">
//               <thead className="thead-dark">
//                 <tr className="text-center">
//                   <th colSpan={2}>Cart Totals</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr className="border-b text-center">
//                   <td className="py-2">Cart Subtotal</td>
//                   <td className="text-center font-semibold text-green-600">₹{totalAmount}</td>
//                 </tr>
//                 <tr className="border-b text-center">
//                   <td className="py-2">Shipping</td>
//                   <td className="text-center">₹50</td>
//                 </tr>
//                 <tr className="border-b text-center">
//                   <td className="py-2 font-semibold">Total</td>
//                   <td className="text-center font-semibold text-green-600">₹{totalAmount + 50}</td>
//                 </tr>
//                 <tr>
//                   <td colSpan="2" className="text-center">
//                     <Button color="primary" variant="contained" startIcon={<IoCartOutline />}>
//                       Proceed To CheckOut
//                     </Button>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



// import { useDispatch, useSelector } from "react-redux";
// import { Button, Pagination } from "@mui/material";
// import { MdDelete } from "react-icons/md";
// import { IoCartOutline } from "react-icons/io5";
// import { useState, useEffect } from "react";

// export default function CartsPage() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const productsPerPage = 5;
//   const { allProducts, userData, addCart } = useSelector((state) => state.UserSliceProvider);

//   const dispatch = useDispatch();

//   // Extract items from addCart
//   const items = addCart && addCart.items ? addCart.items : [];

//   // Pagination logic
//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = items.slice(indexOfFirstProduct, indexOfLastProduct);

//   const handleChangePage = (e, value) => {
//     setCurrentPage(value);
//   };

//   // Calculate total amounts
//   const calculateTotalAmount = () => {
//     if (Array.isArray(items)) {
//       return items.reduce((acc, item) => acc + item.subTotal, 0);
//     }
//     return 0;
//   };

//   const totalAmount = calculateTotalAmount();
//   const shippingCost = addCart?.shippingCost || 0;
//   const grandTotal = totalAmount + shippingCost;

//   return (
//     <div className="right-content w-100">
//       <div className="card border-0 p-3 mt-4">
//         <div className="flex justify-between">
//           <h3 className="hd">Carts</h3>
//         </div>

//         <div className="table_responsive mt-3">
//           <table className="table table-bordered v-aligns text-center">
//             <thead className="thead-dark">
//               <tr>
//                 <th>UID</th>
//                 <th>Product</th>
//                 <th>Price</th>
//                 <th>Quantity</th>
//                 <th>SubTotal</th>
//                 <th>Remove</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentProducts.length > 0 ? (
//                 currentProducts.map((item, index) => (
//                   <tr key={item._id}>
//                     <td>#{indexOfFirstProduct + index + 1}</td>
//                     <td>
//                       <div className="d-flex align-items-center productBox gap-[20px]">
//                         <div className="imageWrapper">
//                           <div className="img">
//                             <img
//                               src={allProducts.find(product => product._id === item.productId)? .img1 || ""}
//                               alt={allProducts.find(product => product._id === item.productId)? .title || "Product"}
//                               style={{ width: "50px", height: "50px", borderRadius: "50%" }}
//                             />
//                           </div>
//                         </div>
//                         <div className="info">
//                           <h6>{allProducts.find(product => product._id === item.productId)? .title || "Product"}</h6>
//                           <p>{allProducts.find(product => product._id === item.productId)? .description || "No Description"}</p>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="w-[170px]">
//                       <div style={{ width: "70px" }}>
//                         <span className="new text-green-700 text-[15px] flex justify-center">
//                           ₹{allProducts.find(product => product._id === item.productId)? .discount || 0}
//                         </span>
//                       </div>
//                     </td>
//                     <td className="flex justify-center">
//                       <div className="w-[25px] h-[25px] flex items-start justify-center ">
//                         <button className="btn btn-danger rounded-[100%]">-</button>
//                       </div>
//                       <input
//                         type="text"
//                         className="w-[36px] h-[36px] outline-none border-0 text-center bg-transparent text-[20px]"
//                         readOnly
//                         value={item.quantity}
//                       />
//                       <div className="w-[25px] h-[25px] flex items-start justify-center">
//                         <button className="btn btn-primary rounded-[100%] text-center">+</button>
//                       </div>
//                     </td>
//                     <td className="w-[200px]">₹{item.subTotal}</td>
//                     <td>
//                       <Button
//                         color="error"
//                         className="error text-[22px]"
//                       >
//                         <MdDelete />
//                       </Button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="6" className="text-center">
//                     Data not available
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>

//           {items.length > 0 && (
//             <div className="d-flex tableFooter">
//               <p>
//                 Showing <b>{currentProducts.length}</b> of <b>{items.length}</b> results
//               </p>
//               <Pagination
//                 count={Math.ceil(items.length / productsPerPage)}
//                 color="primary"
//                 className="pagination"
//                 showFirstButton
//                 showLastButton
//                 onChange={handleChangePage}
//               />
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="border-2 border-gray-300 w-[40%] h-auto p-[30px] relative float-right mt-4 mb-[50px]">
//         <div className="">
//           <div className="table_responsive mt-3">
//             <table className="table table-bordered v-aligns">
//               <thead className="thead-dark">
//                 <tr className="text-center">
//                   <th colSpan={2}>Cart Totals</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr className="border-b text-center">
//                   <td className="py-2">Cart Subtotal</td>
//                   <td className="text-center font-semibold text-green-600">₹{totalAmount}</td>
//                 </tr>
//                 <tr className="border-b text-center">
//                   <td className="py-2">Shipping</td>
//                   <td className="text-center">₹{shippingCost}</td>
//                 </tr>
//                 <tr className="border-b text-center">
//                   <td className="py-2 font-semibold">Total</td>
//                   <td className="text-center font-semibold text-green-600">₹{grandTotal}</td>
//                 </tr>
//                 <tr>
//                   <td colSpan="2" className="text-center">
//                     <Button color="primary" variant="contained" startIcon={<IoCartOutline />}>
//                       Proceed To CheckOut
//                     </Button>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//   );
// }



import { useDispatch, useSelector } from "react-redux";
import { Button, Pagination } from "@mui/material";
import { MdDelete } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import { useState, useEffect } from "react";

export default function CartsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;
  const { allProducts, userData, addCart } = useSelector((state) => state.UserSliceProvider);

  const dispatch = useDispatch();

  // Extract items from addCart
  const items = addCart && addCart.items ? addCart.items : [];

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = items.slice(indexOfFirstProduct, indexOfLastProduct);

  const handleChangePage = (e, value) => {
    setCurrentPage(value);
  };

  // Calculate total amounts
  const calculateTotalAmount = () => {
    if (Array.isArray(items)) {
      return items.reduce((acc, item) => acc + item.subTotal, 0);
    }
    return 0;
  };

  const totalAmount = calculateTotalAmount();
  const shippingCost = addCart?.shippingCost || 0;
  const grandTotal = totalAmount + shippingCost;

  return (
    <div className="right-content w-100">
      <div className="card border-0 p-3 mt-4">
        <div className="flex justify-between">
          <h3 className="hd">Carts</h3>
        </div>

        <div className="table_responsive mt-3">
          <table className="table table-bordered v-aligns text-center">
            <thead className="thead-dark">
              <tr>
                <th>UID</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>SubTotal</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.length > 0 ? (
                currentProducts.map((item, index) => (
                  <tr key={item._id}>
                    <td>#{indexOfFirstProduct + index + 1}</td>
                    <td>
                      <div className="d-flex align-items-center productBox gap-[20px]">
                        <div className="imageWrapper">
                          <div className="img">
                            <img
                              src={allProducts.find(product => product._id === item.productId)?.img1 || ""}
                              alt={allProducts.find(product => product._id === item.productId)?.title || "Product"}
                              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                            />
                          </div>
                        </div>
                        <div className="info">
                          <h6>{allProducts.find(product => product._id === item.productId)?.title || "Product"}</h6>
                          <p>{allProducts.find(product => product._id === item.productId)?.description || "No Description"}</p>
                        </div>
                      </div>
                    </td>
                    <td className="w-[170px]">
                      <div style={{ width: "70px" }}>
                        <span className="new text-green-700 text-[15px] flex justify-center">
                          ₹{allProducts.find(product => product._id === item.productId)?.discount || 0}
                        </span>
                      </div>
                    </td>
                    <td className="flex justify-center">
                      <div className="w-[25px] h-[25px] flex items-start justify-center ">
                        <button className="btn btn-danger rounded-[100%]">-</button>
                      </div>
                      <input
                        type="text"
                        className="w-[36px] h-[36px] outline-none border-0 text-center bg-transparent text-[20px]"
                        readOnly
                        value={item.quantity}
                      />
                      <div className="w-[25px] h-[25px] flex items-start justify-center">
                        <button className="btn btn-primary rounded-[100%] text-center">+</button>
                      </div>
                    </td>
                    <td className="w-[200px]">₹{item.subTotal}</td>
                    <td>
                      <Button
                        color="error"
                        className="error text-[22px]"
                      >
                        <MdDelete />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    Data not available
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {items.length > 0 && (
            <div className="d-flex tableFooter">
              <p>
                Showing <b>{currentProducts.length}</b> of <b>{items.length}</b> results
              </p>
              <Pagination
                count={Math.ceil(items.length / productsPerPage)}
                color="primary"
                className="pagination"
                showFirstButton
                showLastButton
                onChange={handleChangePage}
              />
            </div>
          )}
        </div>
      </div>

      <div className="border-2 border-gray-300 w-[40%] h-auto p-[30px] relative float-right mt-4 mb-[50px]">
        <div className="">
          <div className="table_responsive mt-3">
            <table className="table table-bordered v-aligns">
              <thead className="thead-dark">
                <tr className="text-center">
                  <th colSpan={2}>Cart Totals</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b text-center">
                  <td className="py-2">Cart Subtotal</td>
                  <td className="text-center font-semibold text-green-600">₹{totalAmount}</td>
                </tr>
                <tr className="border-b text-center">
                  <td className="py-2">Shipping</td>
                  <td className="text-center">₹{shippingCost}</td>
                </tr>
                <tr className="border-b text-center">
                  <td className="py-2 font-semibold">Total</td>
                  <td className="text-center font-semibold text-green-600">₹{grandTotal}</td>
                </tr>
                <tr>
                  <td colSpan="2" className="text-center">
                    <Button color="primary" variant="contained" startIcon={<IoCartOutline />}>
                      Proceed To CheckOut
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
