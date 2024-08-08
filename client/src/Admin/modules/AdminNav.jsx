import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function AdminNavigation() {
  const [adminDrop, setAdminDrop] = useState(false);

  const adminDropdown = () => {
    setAdminDrop(!adminDrop);
  };
  return (
    <>
      <div className="bg-Adminnav-400 w-[200px]  text-white">
        <div className="text-[22px]  border-b-2 border-gray-800 font-bold bg-Adminnav2-400 px-[10px] py-[20px]">
          <h1>Admin Dashbord</h1>
        </div>

        <div>
          <ul className="nav-item admin_nav">
            <NavLink className="nav-item text-decoration-none admin_nav_link">
              Dashbord
            </NavLink>
            <NavLink className="nav-item text-decoration-none admin_nav_link">
              Profile
            </NavLink>
            <NavLink className="nav-item text-decoration-none admin_nav_link">
              Users
            </NavLink>
            <div className="relative">
              <NavLink
                to={""}
                className="nav-item text-decoration-none admin_nav_link"
                onClick={adminDropdown}
              >
                Products
              </NavLink>

              {adminDrop && (
                <ul className=" text-[20px] nav-item2  absolute ">
                  <NavLink className="nav-item text-decoration-none admin_nav_link">
                    Product List
                  </NavLink>

                  <NavLink to={"/admin/products"} className="nav-item text-decoration-none admin_nav_link">
                    Product Add
                  </NavLink>

                  <NavLink to={"/admin/updated/products"} className="nav-item text-decoration-none admin_nav_link">
                    Product Update
                  </NavLink>
                </ul>
              )}
            </div>

            <NavLink
              to="/admin/category"
              className="nav-item text-decoration-none admin_nav_link"
            >
              Categories
            </NavLink>
            <NavLink className="nav-item text-decoration-none admin_nav_link">
              Billing
            </NavLink>
            <NavLink className="nav-item text-decoration-none admin_nav_link">
              Logout
            </NavLink>
            {/* <li className="mt-[10px] hover:bg-red-400 px-[30px] cursor-pointer">
              <NavLink>Users</NavLink>
            </li>
            <li className="mt-[10px] hover:bg-red-400 px-[30px] cursor-pointer">
              <NavLink>Products</NavLink>
            </li>
            <li className="mt-[10px] hover:bg-red-400 px-[30px] cursor-pointer">
              <NavLink>Categories</NavLink>
            </li>
            <li className="mt-[10px] hover:bg-red-400 px-[30px] cursor-pointer">
              <NavLink>Billing</NavLink>
            </li>
            <li className="mt-[10px] hover:bg-red-400 px-[30px] cursor-pointer">
              <NavLink>Logout</NavLink>
            </li> */}
          </ul>
        </div>
      </div>
    </>
  );
}
