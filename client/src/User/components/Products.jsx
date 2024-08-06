import { useDispatch, useSelector } from "react-redux";
import img1 from "../../assets/product-1-1.jpg";
import {
  FaRegStar,
  FaShoppingCart,
  FaHeart,
  FaEye,
  FaCodeBranch,
} from "react-icons/fa";
import { useEffect } from "react";
import { getAllProductsFecthApi } from "../../redux/user/UserThunk";

export default function Products() {
    const dispatch=useDispatch()
    const {allProducts}=useSelector((state)=>state.UserSliceProvider)
    console.log(allProducts)

    useEffect(()=>{
        dispatch(getAllProductsFecthApi())

    },[])
  return (
    <>
      <div className="px-[20px] py-[20px] grid grid-cols-4 justify-center gap-[40px]">
       {allProducts.map((product)=>(
        <>
         <div key={product._id} className="border-2 border-topnavBorderBottom-400 w-[300px] px-[20px] py-[20px] rounded-[10px] relative group overflow-hidden hover:shadow-lg shadow-gray-500/50">
          <div className="overflow-hidden rounded-2.5 relative cursor-pointer">
            <img
              src={product.img1}
              alt=""
              className="w-full rounded-2.5 transform transition-transform duration-300 group-hover:scale-110 rounded-[10px]"
            />
          </div>
          <div className="pt-[10px] relative">
            <div>{product.category}</div>

            <div className="pt-[10px] text-[20px] font-bold">
             {product.title}
            </div>
            <div className="flex gap-[10px] pt-[10px]">
              <div className="flex items-center gap-2.5 text-lg">
                {[...Array(5)].map((index) => (
                  <FaRegStar key={index} />
                ))}
              </div>

              <p className="text-[20px]">50%</p>
            </div>

            <div className="flex gap-[20px] text-[20px]">
              <div className="text-[25px] text-topnavBorderBottom-400">
              ₹ {product.price}
              </div>
              <div className="line-through pt-[6px] text-gray-500">
               ₹ {product.discount}
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
        </>
       ))}
     
        
      </div>
    </>
  );
}
