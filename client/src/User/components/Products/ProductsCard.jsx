/* eslint-disable react/prop-types */
import {
    FaCodeBranch,
    FaEye,
    FaHeart,
    FaRegStar,
    FaShoppingCart,
  } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userAddToWishlist, UserValidation } from "../../../redux/user/UserThunk";
import { toast } from 'react-toastify';
  
export default function ProductCard({ product }) {
  const navigate = useNavigate()
  
  const dispatch=useDispatch()

  const handleImageClick = () => {
    navigate(`/viewProduct/${product._id}`);
  };

  const { userData } = useSelector((state) => state.UserSliceProvider)
  
  // console.log(userData)
    const truncatedTitle = product.title.split(" ").length > 5
      ? `${product.title.split(" ").slice(0, 4).join(" ")}...`
      : product.title;
  
    const regularPrice = Number(product.price);
    const discountPrice = Number(product.discount);
    const discountPercentage = Math.round(
      ((regularPrice - discountPrice) / regularPrice) * 100
    );
  
    const formatPriceWithCommas = (price) => {
      const priceString = price.toString();
      const lastThreeDigit = priceString.slice(-3);
      const otherDigits = priceString.slice(0, -3);
      const formattedOtherDigits = otherDigits.replace(
        /\B(?=(\d{2})+(?!\d))/g,
        ","
      );
      return otherDigits
        ? `${formattedOtherDigits},${lastThreeDigit}`
        : lastThreeDigit;
    };
  
  
  const handleAddToWishlist = async (productId) => {
    if (!userData) {
      toast.success("Please log in to add items to your wishlist.");
      return;
    }
      await dispatch(userAddToWishlist({
        productId,
        userId: userData._id,
        toast
      }));
    
      // UserValidation call karo update mate
      const validationResult = await dispatch(UserValidation());
    
      if (validationResult) {
        // Here, navigate function is not being called to avoid any redirection
        console.log('User validated successfully, staying on the same product page.');
      }
    };
    
    
    return (
      <div
        key={product._id}
        className="box_card border-2 border-topnavBorderBottom-400 px-[20px] py-[20px] rounded-[10px] relative group overflow-hidden hover:shadow-lg shadow-gray-500/50 "
      >
        <div className="overflow-hidden rounded-2.5 relative cursor-pointer"  onClick={handleImageClick}>
          <img
            src={product.img1}
            alt=""
            className="imagesds rounded-2.5 transform transition-all duration-300 group-hover:scale-110 rounded-[10px] ease-in-out"
          />
        </div>
        <div className="z-30 flex justify-center items-center border2 border-topnavBorderBottom-400 bg-topnavBorderBottom-400 w-[80px] h-[40px] text-[50px] absolute top-8 right-5 rounded-[20px] text-gray-800">
          <p className="text-[25px]">-{discountPercentage}%</p>
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
              className="border-2 border-black w-[50px] h-[50px] flex justify-center items-center rounded-[100%] absolute -right-2 bottom-7 z-50"
              data-toggle="tooltip"
              data-placement="top"
              title="Add To Cart"
            >
              <span className="text-[23px]">
                <FaShoppingCart className="" />
              </span>
            </button>
          </div>
        </div>
        <div className="gap-12.5 absolute top-28 pl-12.5 right-[-8rem] group-hover:right-1/2 group-hover:translate-x-1/2 transition-all duration-30 gap-[20px]">
          <div className="flex gap-[20px]">
            <div>
              <button
                type="button"
                className="border-2 border-gray-500 text-black w-[50px] h-[50px] flex justify-center items-center rounded-[100%] bg-topnav-400"
                data-toggle="tooltip"
                data-placement="top"
                title="Quick View"
                onClick={handleImageClick}
              >
                <span className="text-[23px]">
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
                onClick={() => handleAddToWishlist(product._id)}
              >
                <span className="text-[23px]">
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
              <span className="text-[23px]">
                <FaCodeBranch className="" />
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }
  