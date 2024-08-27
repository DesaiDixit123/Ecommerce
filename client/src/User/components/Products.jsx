// /* eslint-disable react-hooks/exhaustive-deps */
// import { useDispatch, useSelector } from "react-redux";
// import {
//   FaRegStar,
//   FaShoppingCart,
//   FaHeart,
//   FaEye,
//   FaCodeBranch,
// } from "react-icons/fa";
// import { useEffect } from "react";
// import { getAllProductsFecthApi } from "../../redux/user/UserThunk";
// import { useNavigate } from "react-router-dom";

// export default function Products() {
//     const dispatch=useDispatch()
//     const {allProducts}=useSelector((state)=>state.UserSliceProvider)
//     console.log(allProducts)
// const navigate=useNavigate()
//     useEffect(()=>{
//         dispatch(getAllProductsFecthApi())

//     }, [])
  
  
//     const handleProductClick = (id) => {
//       navigate(`/viewProduct/${id}`);
//   };
  




//   const formatPriceWithCommas = (price) => {
//     const priceString=price.toString()
//     const LastThreeDigit=priceString.slice(-3)
//     const otherDigits = priceString.slice(0, -3);
//     const formattedOtherDigits = otherDigits.replace(
//       /\B(?=(\d{2})+(?!\d))/g,
//       ","
//     );
//     return otherDigits
//       ? `${formattedOtherDigits},${LastThreeDigit}`
//       : LastThreeDigit;
//   }
  
//   return (
//     <>
//       <div className="px-[20px] py-[90px] box_parentCard gap-3 ">
//         {allProducts.map((product) => {
         
//           const titleWords=product.title.split(" ")
//           const truncatedTitle = titleWords.length > 5 ? `${titleWords.slice(0, 5).join(" ")}...` : product.title
          


//           const regularPrice = Number(product?.price);
//           const discountPrice = Number(product?.discount);
//           const discountPercentage = Math.round(
//             ((regularPrice - discountPrice) / regularPrice) * 100
//           );
//           return(
//         <>
//          <div key={product._id} className="box_card border-2 border-topnavBorderBottom-400  px-[20px] py-[20px] rounded-[10px] relative group overflow-hidden hover:shadow-lg shadow-gray-500/50">
//           <div className="overflow-hidden rounded-2.5 relative cursor-pointer ">
//             <img
//               src={product.img1}
//               alt=""
//                     className="imagesds rounded-2.5 transform transition-all duration-300 group-hover:scale-110 rounded-[10px] ease-in-out"
//                     onClick={() => handleProductClick(product._id)}
//                   />
                  
//                 </div>
//                 <div className="z-30 flex justify-center items-center border2 border-topnavBorderBottom-400 bg-topnavBorderBottom-400  w-[80px] h-[40px] text-[50px] absolute top-8 right-5 rounded-[20px] text-gray-800">

//                   <p className="text-[25px]">  -{discountPercentage}%</p>
//                 </div>
//              <div className="pt-[10px] relative">
//                <div className="flex justify-between">
                 
//             <div>{product.category}</div>
//             <div>{product.fields}</div>
//                </div>

//             <div className="pt-[10px] text-[20px] font-bold">
//              {truncatedTitle}
//             </div>
//             <div className="flex gap-[10px] pt-[10px]">
//               <div className="flex items-center gap-2.5 text-lg">
//                 {[...Array(5)].map((index) => (
//                   <FaRegStar key={index} />
//                 ))}
//               </div>

//               <p className="text-[20px]">50%</p>
//             </div>

//             <div className="flex gap-[20px] text-[20px]">
//               <div className="text-[25px] text-topnavBorderBottom-400">
//               ₹ {formatPriceWithCommas(discountPrice)}
//               </div>
//               <div className="line-through pt-[6px] text-gray-500">
//               ₹ {formatPriceWithCommas(regularPrice)}
//               </div>
//               <button
//                 type="button"
//                 className="border-2 border-black w-[50px] h-[50px] flex justify-center items-center rounded-[100%] absolute right-0 bottom-1 z-50"
//                 data-toggle="tooltip"
//                 data-placement="top"
//                 title="Add To Cart"
//               >
//                 <span className="text-[23px] ">
//                   <FaShoppingCart className="" />
//                 </span>
//               </button>
//             </div>
            
//           </div>
//           <div className=" gap-12.5 absolute top-28 pl-12.5 right-[-8rem] group-hover:right-1/2 group-hover:translate-x-1/2 transition-all duration-30 gap-[20px]">
//             <div className="flex gap-[20px]">
//               <div>
//                 <button
//                   type="button"
//                   className="border-2 border-gray-500 text-black w-[50px] h-[50px] flex justify-center items-center rounded-[100%] bg-topnav-400"
//                   data-toggle="tooltip"
//                   data-placement="top"
//                   title="Quick View"
//                 >
//                   <span className="text-[23px] ">
//                     <FaEye className="" />
//                   </span>
//                 </button>
//               </div>
//               <div>
//                 <button
//                   type="button"
//                   className="border-2 border-gray-500 text-black w-[50px] h-[50px] flex justify-center items-center rounded-[100%] bg-topnav-400"
//                   data-toggle="tooltip"
//                   data-placement="top"
//                   title="Add To Wishlist"
//                 >
//                   <span className="text-[23px] ">
//                     <FaHeart className="" />
//                   </span>
//                 </button>
//               </div>
//             </div>
//             <div className="pt-[15px]">
//               <button
//                 type="button"
//                 className="border-2 border-gray-500 text-black w-[50px] h-[50px] flex justify-center items-center rounded-[100%] bg-topnav-400"
//                 data-toggle="tooltip"
//                 data-placement="top"
//                 title="Compare"
//               >
//                 <span className="text-[23px] ">
//                   <FaCodeBranch className="" />
//                 </span>
//               </button>
//             </div>
//           </div>
//         </div>
//         </>
//       ) })}
     
        
//       </div>
//     </>
//   );
// }
















import { useDispatch, useSelector } from "react-redux";
import {
  FaRegStar,
  FaShoppingCart,
  FaHeart,
  FaEye,
  FaCodeBranch,
} from "react-icons/fa";
import { useEffect } from "react";
import { getAllProductsFecthApi } from "../../redux/user/UserThunk";
import { useNavigate } from "react-router-dom";

export default function Products() {
    const dispatch = useDispatch();
    const { filteredProducts = [] , allProducts } = useSelector((state) => state.UserSliceProvider);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllProductsFecthApi());
    }, [dispatch]);

    const handleProductClick = (id) => {
      navigate(`/viewProduct/${id}`);
    };

    const formatPriceWithCommas = (price) => {
        const priceString = price.toString();
        const lastThreeDigit = priceString.slice(-3);
        const otherDigits = priceString.slice(0, -3);
        const formattedOtherDigits = otherDigits.replace(
            /\B(?=(\d{2})+(?!\d))/g,
            ","
        );
        return otherDigits ? `${formattedOtherDigits},${lastThreeDigit}` : lastThreeDigit;
    };

    const productsToDisplay = filteredProducts.length > 0 ? filteredProducts : allProducts;

    return (
        <>
            <div className="px-[20px] py-[90px] box_parentCard gap-3 ">
                {productsToDisplay.map((product) => {
                    const titleWords = product.title.split(" ");
                    const truncatedTitle = titleWords.length > 5 ? `${titleWords.slice(0, 5).join(" ")}...` : product.title;

                    const regularPrice = Number(product?.price);
                    const discountPrice = Number(product?.discount);
                    const discountPercentage = Math.round(
                        ((regularPrice - discountPrice) / regularPrice) * 100
                    );

                    return (
                        <div key={product._id} className="box_card border-2 border-topnavBorderBottom-400  px-[20px] py-[20px] rounded-[10px] relative group overflow-hidden hover:shadow-lg shadow-gray-500/50">
                            <div className="overflow-hidden rounded-2.5 relative cursor-pointer ">
                                <img
                                    src={product.img1}
                                    alt=""
                                    className="imagesds rounded-2.5 transform transition-all duration-300 group-hover:scale-110 rounded-[10px] ease-in-out"
                                    onClick={() => handleProductClick(product._id)}
                                />
                            </div>
                            <div className="z-30 flex justify-center items-center border2 border-topnavBorderBottom-400 bg-topnavBorderBottom-400  w-[80px] h-[40px] text-[50px] absolute top-8 right-5 rounded-[20px] text-gray-800">
                                <p className="text-[25px]">  -{discountPercentage}%</p>
                            </div>
                            <div className="pt-[10px] relative">
                                <div className="flex justify-between">
                                    <div>{product.category}</div>
                                    <div>{product.fields}</div>
                                </div>
                                <div className="pt-[10px] text-[20px] font-bold">
                                    {truncatedTitle}
                                </div>
                                <div className="flex gap-[10px] pt-[10px]">
                                    <div className="flex items-center gap-2.5 text-lg">
                                        {[...Array(5)].map((_, index) => (
                                            <FaRegStar key={index} />
                                        ))}
                                    </div>
                                    <p className="text-[20px]">50%</p>
                                </div>
                                <div className="flex gap-[20px] text-[20px]">
                                    <div className="text-[25px] text-topnavBorderBottom-400">
                                        ₹ {formatPriceWithCommas(discountPrice)}
                                    </div>
                                    <div className="line-through pt-[6px] text-gray-500">
                                        ₹ {formatPriceWithCommas(regularPrice)}
                                    </div>
                                    <button
                                        type="button"
                                        className="border-2 border-black w-[50px] h-[50px] flex justify-center items-center rounded-[100%] absolute right-0 bottom-1 z-50"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Add To Cart"
                                    >
                                        <span className="text-[23px] ">
                                            <FaShoppingCart className="" />
                                        </span>
                                    </button>
                                </div>
                            </div>
                            <div className=" gap-12.5 absolute top-28 pl-12.5 right-[-8rem] group-hover:right-1/2 group-hover:translate-x-1/2 transition-all duration-30 gap-[20px]">
                                <div className="flex gap-[20px]">
                                    <div>
                                        <button
                                            type="button"
                                            className="border-2 border-gray-500 text-black w-[50px] h-[50px] flex justify-center items-center rounded-[100%] bg-topnav-400"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Quick View"
                                        >
                                            <span className="text-[23px] ">
                                                <FaEye className="" />
                                            </span>
                                        </button>
                                    </div>
                                    <div>
                                        <button
                                            type="button"
                                            className="border-2 border-gray-500 text-black w-[50px] h-[50px] flex justify-center items-center rounded-[100%] bg-topnav-400"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Add To Wishlist"
                                        >
                                            <span className="text-[23px] ">
                                                <FaHeart className="" />
                                            </span>
                                        </button>
                                    </div>
                                </div>
                                <div className="pt-[15px]">
                                    <button
                                        type="button"
                                        className="border-2 border-gray-500 text-black w-[50px] h-[50px] flex justify-center items-center rounded-[100%] bg-topnav-400"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Compare"
                                    >
                                        <span className="text-[23px] ">
                                            <FaCodeBranch className="" />
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
