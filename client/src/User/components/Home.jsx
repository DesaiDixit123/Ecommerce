import slider_1 from "../../assets/slider-1.png";
import slider_2 from "../../assets/slider-2.png";
import slider_3 from "../../assets/slider-3.png";
import { useState, useEffect } from "react";
import Products from "./Products";

export default function Home() {
  return (
    <>
      <Slider />
      <Products />
    </>
  );
}

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="relative w-full mx-auto h-[100vh]">
      <div
        className={`absolute w-full transition-opacity duration-1000 ${
          slideIndex === 0 ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex justify-between items-center px-[100px] py-[30px]">
          <div className="w-1/2">
            <p className="text-xl">Trade In Offer</p>
            <h1 className="text-[40px] pt-4">
              <span>Super Value Deals</span>
              <br />
              <span className="text-[60px] text-blue-700">On All Products</span>
            </h1>
            <p className="pt-4 text-[19px]">
              Save More With Coupons & Up To 70% Off
            </p>
            <div className="pt-4">
              <button className="px-6 py-2 rounded-lg text-white bg-blue-600">
                Shop Now
              </button>
            </div>
          </div>
          <div className="w-1/2">
            <img src={slider_1} alt="Slide" className="w-full" />
          </div>
        </div>
      </div>

      <div
        className={`absolute w-full transition-opacity duration-1000 ${
          slideIndex === 1 ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex justify-between items-center px-[100px] py-[30px]">
          <div className="w-1/2">
            <p className="text-xl">Hot Promotion</p>
            <h1 className="text-[40px] pt-4">
              <span>Fashion Trending</span>
              <br />
              <span className="text-[60px] text-red-600">Great Collection</span>
            </h1>
            <p className="pt-4 text-[19px]">
              Save More With Coupons & Up To 20% Off
            </p>
            <div className="pt-4">
              <button className="px-6 py-2 rounded-lg text-white bg-red-600">
                Shop Now
              </button>
            </div>
          </div>
          <div className="w-1/2">
            <img src={slider_2} alt="Slide" className="w-full" />
          </div>
        </div>
      </div>

      <div
        className={`absolute w-full transition-opacity duration-1000 ${
          slideIndex === 2 ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex justify-between items-center px-[100px] py-[30px]">
          <div className="w-1/2">
            <p className="text-xl">Upcoming Offer</p>
            <h1 className="text-[40px] pt-4">
              <span>Big Deals From</span>
              <br />
              <span className="text-[60px] text-blue-300">Manufacturer</span>
            </h1>
            <p className="pt-4 text-[19px]">
              Clothing, Shoes, Bags, Wallets...
            </p>
            <div className="pt-4">
              <button className="px-6 py-2 rounded-lg text-white bg-blue-300">
                Shop Now
              </button>
            </div>
          </div>
          <div className="w-1/2">
            <img src={slider_3} alt="Slide" className="w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
