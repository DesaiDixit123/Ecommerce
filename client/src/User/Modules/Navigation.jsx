import {
  FaMobileAlt,
  FaAngleDown,
  FaRegUser,
  FaSearch,
  FaRegHeart,
  FaFacebookF,
  FaTwitter,
  FaInstagramSquare,
  FaYoutube,
} from "react-icons/fa";
import { IoLocationSharp, IoCartOutline } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import { IoLogIn } from "react-icons/io5";
import logo from "../../assets/logo.png";
import { useEffect, useState } from "react";
import { GiHamburgerMenu, GiCancel } from "react-icons/gi";
const texts = [
  "Great deals 50% off",
  "Unbeatable offers",
  "Save big on your favorites",
  "Special discounts available",
];

export default function Navigation(){
    return(
        <>
        <TopNav/>
        <SecondtopNav/>
        <NavlinkNavigation/>
        </>
    )
}

const TopNav = () => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
      }, 3000); // Change text every 3 seconds
      return () => clearInterval(interval); // Cleanup on component unmount
    }, []);
    return (
      <>
        <div className="bg-topnav-400 flex justify-between h-[40px] items-center px-[110px] topNavBorderBottom max-[940px]:hidden">
          <div className="flex gap-[15px]">
            <div className="flex items-center gap-[5px] border-r-2 border-black pr-[15px]">
              <span>
                <FaMobileAlt />
              </span>
              <span>+91 9737080195</span>
            </div>
            <div className="flex items-center gap-[5px]">
              <span>
                <IoLocationSharp />
              </span>
              <span>Our Location</span>
            </div>
          </div>
          <div>{texts[currentTextIndex]}</div>
          <div className="flex gap-[15px]">
            <div className="flex">
              <span className="flex gap-[5px]">
                <NavLink className="flex items-center gap-[5px]">
                  <span>
                    <IoLogIn />
                  </span>
                  Login
                </NavLink>
                <span className="text-[20px] relative -top-[2px] font-semibold">
                  /
                </span>
                <NavLink className="flex items-center gap-[5px]">
                  <span>
                    <FaRegUser />
                  </span>
                  Signup
                </NavLink>
              </span>
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export const SecondtopNav = () => {
    const [dropdown, setDropdown] = useState(false);
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [responsiveNavDrop, setResponsiveNavDrop] = useState(false);
    const [cancelDropdown, setCancelDropDown] = useState(false);
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
      }, 3000); // Change text every 3 seconds
      return () => clearInterval(interval); // Cleanup on component unmount
    }, []);
    const toggleDropdown = () => {
      setDropdown(!dropdown);
    };
  
    const toggleResponsiveNavDrop = () => {
      setResponsiveNavDrop(!responsiveNavDrop);
    };
    const cancelDropResponsive = () => {
      setCancelDropDown(false);
      setResponsiveNavDrop(false);
    };
    return (
      <>
        <div className="flex justify-between h-[70px] items-center px-[110px] max-[1050px]:px-[50px] max-[960px]:px-[30px] max-[930px]:border-b-2 border-gray-500 relative ">
          <div>
            <img
              src={logo}
              alt=""
              className="max-w-[170px] relative top-[15px] -left-3 max-[930px]:max-w-[200px] max-[930px]:top-0 max-[400px]:w-[150px] max-[400px]:-left-[20px]"
            />
          </div>
          <div className="max-[930px]:block hidden max-[610px]:hidden">
            {texts[currentTextIndex]}
          </div>
          <div>
            <div className="flex  border-b-2 w-[100%] border-black max-[1089px]:w-[90%]">
              <div className="flex gap-[25px] pb-[4px] max-[930px]:hidden">
                <div
                  className="flex items-center gap-[5px] cursor-pointer max-[1088px]:w-[120px]"
                  onClick={toggleDropdown}
                >
                  All Categories
                  <span>
                    <FaAngleDown />
                  </span>
                  {dropdown ? (
                    <div className="absolute bg-white  shadow-lg shadow-indigo-500/50 w-[200px] px-[15px]  top-[50px] z-50 duration-300">
                      <ul>
                        <li>
                          <NavLink>Women's</NavLink>
                        </li>
                        <li>
                          <NavLink>Men's</NavLink>
                        </li>
                        <li>
                          <NavLink>Electronics</NavLink>
                        </li>
                        <li>
                          <NavLink>Kids</NavLink>
                        </li>
                        <li>
                          <NavLink>Computers</NavLink>
                        </li>
                        <li>
                          <NavLink>Shoes</NavLink>
                        </li>
                      </ul>
                    </div>
                  ) : null}
                </div>
  
                <div className="flex gap-[10px]">
                  <span className="flex items-center text-[18px] pt-[2px]">
                    <FaSearch />
                  </span>
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Search For Items..."
                    className="secondTopNavInputChange w-[450px] outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
  
          <div className="flex gap-[15px] text-[25px] font-bold relative ">
            <div>
              <FaRegHeart className="font-bold" />
            </div>
            <div>
              <IoCartOutline className="font-bold text-[28px]" />
            </div>
            <div className="hidden max-[930px]:block cursor-pointer">
              <GiHamburgerMenu
                className="text-[28px]"
                onClick={toggleResponsiveNavDrop}
              />
            </div>
          </div>
        </div>
  
        {responsiveNavDrop ? (
          <div className="bg-white shadow-lg shadow-indigo-500/50 w-[400px] hidden  max-[930px]:block absolute right-0 top-0 h-[100vh] overflow-y-scroll max-[410px]:w-[350px] max-[370px]:w-[300px]">
            <div className="flex justify-between">
              <img src={logo} alt="" className="logo_img max-[370px]:w-[200px] max-[410px]:w-[220px]" />
              <div className="pt-[25px] absolute right-5">
                <GiCancel
                  className="text-[40px] cross_button cursor-pointer"
                  onClick={cancelDropResponsive}
                />
              </div>
            </div>
  
            <div className=" w-[100%]">
              <div className="flex navSearchBorder p-[5px] rounded-[10px] mx-8 relative px-3">
                <input
                  type="text"
                  placeholder="Search for items..."
                  className="secondTopNavInputChange outline-none"
                />
                <div className="flex items-center absolute right-6 top-2">
                  <FaSearch />
                </div>
              </div>
            </div>
  
            <div
                  className="flex items-center gap-[5px] cursor-pointer max-[1088px]:w-[120px] pt-[20px] px-8 max-[930px]:w-[200px] relative"
                  onClick={toggleDropdown}
                >
                  All Categories
                  <span>
                    <FaAngleDown />
                  </span>
                  {dropdown ? (
                    <div className="absolute bg-white  shadow-lg shadow-indigo-500/50 w-[200px] px-[15px]  top-[50px] z-50 duration-300 mr-[10px]">
                      <ul>
                        <li>
                          <NavLink>Women's</NavLink>
                        </li>
                        <li>
                          <NavLink>Men's</NavLink>
                        </li>
                        <li>
                          <NavLink>Electronics</NavLink>
                        </li>
                        <li>
                          <NavLink>Kids</NavLink>
                        </li>
                        <li>
                          <NavLink>Computers</NavLink>
                        </li>
                        <li>
                          <NavLink>Shoes</NavLink>
                        </li>
                      </ul>
                    </div>
                  ) : null}
                </div>
  
  
            <div className="flex pt-[30px]">
              <ul className="w-[100%] px-8">
                <li className=" border-b-2 navigationBorder pt-[10px] ">
                  <NavLink className="">Home</NavLink>
                </li>
                <li className="border-b-2 navigationBorder pt-[10px]">
                  <NavLink>Products</NavLink>
                </li>
                <li className="border-b-2 navigationBorder pt-[10px]">
                  <NavLink>Categories</NavLink>
                </li>
                <li className="border-b-2 navigationBorder pt-[10px]">
                  <NavLink>About Us</NavLink>
                </li>
                <li className="border-b-2 navigationBorder pt-[10px]">
                  <NavLink>Contact Us</NavLink>
                </li>
              </ul>
            </div>
  
            <div className=" pt-[30px] ">
              <ul className="px-8 textColor gap-[10px]">
                <li className="pt-[10px]">
                  <NavLink>Our Location</NavLink>
                </li>
                <li className="pt-[10px] flex">
                  <NavLink className="flex gap-[7px]">
                    <span className="flex items-center">
                      <IoLogIn />
                    </span>
                    <span>Login</span>
                  </NavLink>
                  <span>/</span>
                  <NavLink className="flex gap-[7px]">
                    <span className="flex items-center">
                      <FaRegUser />
                    </span>
                    <span>Signup</span>
                  </NavLink>
                </li>
                <li className="pt-[10px]">+91 9737080195</li>
              </ul>
            </div>
  
            <div className="px-8 pt-[30px]">
              <div>
                <div className="text-gray-500">Follow Us :</div>
  
                <div className="flex gap-5 pt-[10px] text-gray-500 text-[20px]">
                  <Link>
                    <FaFacebookF />
                  </Link>
                  <Link>
                    <FaTwitter />
                  </Link>
                  <Link>
                    <FaInstagramSquare />
                  </Link>
                  <Link>
                    <FaYoutube />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : null}
  
        {cancelDropdown ? (
          <div className="bg-white shadow-lg shadow-indigo-500/50 w-[400px]  max-[930px]:hidden absolute right-0 top-0 h-[100vh]">
            <div className="flex justify-between">
              <img src={logo} alt="" className="logo_img" />
              <div className="pt-[25px] absolute right-5">
                <GiCancel
                  className="text-[40px] cross_button"
                  onClick={cancelDropResponsive}
                />
              </div>
            </div>
  
            <div className="flex justify-center w-[100%]">
              <div className="flex justify-center border-2 border-black p-[5px] rounded-[10px]">
                <input
                  type="text"
                  placeholder="Search for items..."
                  className="secondTopNavInputChange outline-none"
                />
                <div className="flex items-center">
                  <FaSearch />
                </div>
              </div>
            </div>
  
            <div className="flex justify-center pt-[30px]">
              <ul className="text-center">
                <li>
                  <NavLink>Home</NavLink>
                </li>
                <li>
                  <NavLink>Products</NavLink>
                </li>
                <li>
                  <NavLink>Categories</NavLink>
                </li>
                <li>
                  <NavLink>About Us</NavLink>
                </li>
                <li>
                  <NavLink>Contact Us</NavLink>
                </li>
              </ul>
            </div>
  
            <div className="flex justify-center pt-[30px]">
              <ul className="text-center">
                <li>
                  <NavLink>Our Location</NavLink>
                </li>
                <li>
                  <NavLink>Login</NavLink>
                  <NavLink>Signup</NavLink>
                </li>
                <li>+91 9737080195</li>
              </ul>
            </div>
  
            <div className="flex justify-center pt-[30px]">
              <div>
                <div>Follow Us :</div>
  
                <div className="flex gap-5 pt-[10px]">
                  <Link>
                    <FaFacebookF />
                  </Link>
                  <Link>
                    <FaTwitter />
                  </Link>
                  <Link>
                    <FaInstagramSquare />
                  </Link>
                  <Link>
                    <FaYoutube />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </>
    );
  };
  
  export const NavlinkNavigation = () => {
    return (
      <>
        <div className="flex justify-center  h-[40px] items-center border-b-2 border-gray-500 max-[930px]:hidden">
          <div className="pb-[5px]">
            <ul className="flex gap-[50px]">
              <li>
                <NavLink>Home</NavLink>
              </li>
              <li>
                <NavLink>Products</NavLink>
              </li>
              <li>
                <NavLink>Categories</NavLink>
              </li>
              <li>
                <NavLink>About Us</NavLink>
              </li>
              <li>
                <NavLink>Contact Us</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  };
  