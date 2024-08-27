import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagramSquare,
  FaYoutube,
  FaApple,
} from "react-icons/fa";
import { BiLogoPlayStore } from "react-icons/bi";
import payment_method from "../../assets/payment-method.png";
export default function Footer() {
  return (
    <>
      <div className="">
        <div className="bg-topnav-400 border-b-2 border-black grid grid-cols-4 px-[40px] py-[20px] shadow-lg shadow-indigo-500/50 ">
          <div className="w-[90%]">
            <div className="w-[250px] flex justify-center">
              <img src={logo} alt="" className="w-[200px] " />
            </div>
            <div>
              <p className="">Contact :</p>
              <p className="pt-[15px]">
                Address : 562 Wellington Road, Street 32, San Francisco
              </p>

              <p className="pt-[15px]">
                Phone : +01 2222 365 /(+91) 01 2345 6789
              </p>
              <p className="pt-[15px]">Hours : 10:00 - 18:00, Mon - Sat</p>
            </div>
            <div>
              <div className="pt-[15px]">
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
          </div>
          <div className="pt-[30px]">
            <h1 className="text-[25px] font-bold">About</h1>

            <div>
              <ul className="pt-[30px]">
                <li>
                  <NavLink>About Us</NavLink>
                </li>
                <li className="pt-[10px]">
                  <NavLink>Delivery Information</NavLink>
                </li>
                <li className="pt-[10px]">
                  <NavLink>Privacy Policy</NavLink>
                </li>
                <li className="pt-[10px]">
                  <NavLink>Terms & Conditions</NavLink>
                </li>
                <li className="pt-[10px]">
                  <NavLink>Contact Us</NavLink>
                </li>
                <li className="pt-[10px]">
                  <NavLink>Support Center</NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-[30px]">
            <h1 className="text-[25px] font-bold">My Account</h1>

            <div>
              <ul className="pt-[30px]">
                <li>
                  <NavLink>Sign In</NavLink>
                </li>
                <li className="pt-[10px]">
                  <NavLink>View Cart</NavLink>
                </li>
                <li className="pt-[10px]">
                  <NavLink>My Wishlist</NavLink>
                </li>
                <li className="pt-[10px]">
                  <NavLink>Track My Order</NavLink>
                </li>
                <li className="pt-[10px]">
                  <NavLink>Help</NavLink>
                </li>
                <li className="pt-[10px]">
                  <NavLink>Order</NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-[30px]">
            <h1 className="text-[25px] font-bold">Install App</h1>
            <p className="pt-[20px] text-[20px]">
              From App Store or Google Play
            </p>
            <div className="mt-[20px] border-2 border-black w-[165px] rounded-[10px] flex p-[5px]">
              <span className="flex items-center text-[30px]">
                <FaApple />
              </span>
              <span className="pl-[10px]">Download on the app store</span>
            </div>
            <div className="mt-[20px] border-2 border-black w-[165px] rounded-[10px] flex p-[5px]">
              <span className="flex items-center text-[30px]">
                <BiLogoPlayStore />
              </span>
              <span className="pl-[10px]">Download on the playstore</span>
            </div>

            <div className="pt-[15px]">
              <p className="text-[20px] font-semibold">
                Secured Payment Gateways
              </p>
              <img src={payment_method} alt="" className="pt-[10px]" />
            </div>
          </div>
        </div>

        <div>
          <p className="text-center p-[20px] bg-topnavBorderBottom-400">
            2024© E-shopping. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
}
