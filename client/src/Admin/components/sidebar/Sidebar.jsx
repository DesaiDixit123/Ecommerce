import Button from "@mui/material/Button";
import { FaAngleRight, FaProductHunt, FaUser, FaBell } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { MdDashboard, MdCategory } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { IoMdLogOut } from "react-icons/io";
export default function Sidebat() {
  const [activeTab, setActiveTab] = useState(0);
  const [isToggleSubmenu, setIsToggleSubmenu] = useState(false);
  const isOpenSubMenu = (index) => {
    setActiveTab(index);
    setIsToggleSubmenu(activeTab === index ? !isToggleSubmenu : true);
  };

  return (
    <>
      <div className="sidebar">
        <ul>
          <li>
            <Link>
              <Button className="w-100">
                <span className="icon">
                  <MdDashboard />
                </span>
                Dashboard
              </Button>
            </Link>
          </li>
          <li>
            <Button>
              <span className="icon">
                <FaUser />
              </span>
              Users
            </Button>
          </li>
          <li>
            <Button>
              <span className="icon">
                <MdCategory />
              </span>
              Categories
            </Button>
          </li>
          <li>
            <Button
              className={`w-100 ${  activeTab === 3 && isToggleSubmenu ===true ? "active" : ""}`}
              onClick={() => isOpenSubMenu(3)}
            >
              <span className="icon">
                <FaProductHunt />
              </span>
              Products
              <span className="arrow">
                <FaAngleRight />
              </span>
            </Button>

            <div
              className={`submenuWrapper ${
                activeTab === 3 && isToggleSubmenu ? "colapse" : "colapsed"
              }`}
            >
              <ul className="submenu">
                <li>
                  <NavLink>Product List</NavLink>
                </li>
                <li>
                  <NavLink>Product View</NavLink>
                </li>
                <li>
                  <NavLink>Product Add</NavLink>
                </li>
                <li>
                  <NavLink>Product Updated</NavLink>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <Link>
              <Button className="w-100">
                <span className="icon">
                  <FaShoppingCart />
                </span>
                Orders
              </Button>
            </Link>
          </li>
          <li>
            <Link>
              <Button className="w-100">
                <span className="icon">
                  <FaBell />
                </span>
                Notifications
              </Button>
            </Link>
          </li>
          <li>
            <Link>
              <Button className="w-100">
                <span className="icon">
                  <IoSettings />
                </span>
                Settings
              </Button>
            </Link>
          </li>
        </ul>

        <br />
        <div className="logoutWrapper">
          <div className="logoutBox">
            <Button variant="contained"><IoMdLogOut/>Logout</Button>
          </div>
        </div>
      </div>
    </>
  );
}
