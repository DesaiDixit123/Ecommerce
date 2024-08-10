import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import {
  MdMenuOpen,
  MdOutlineMenu,
  MdEmail,
  MdOutlineLightMode,
  MdDarkMode,
} from "react-icons/md";
import SearchBox from "../components/Search/SearchBox";
import img from "../../assets/34878108.jpg";
import { CiLight } from "react-icons/ci";
import { IoIosCart, IoIosNotifications } from "react-icons/io";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Logout from "@mui/icons-material/Logout";
import { useContext, useState } from "react";
import { IoShieldHalfSharp } from "react-icons/io5";
import { Divider } from "@mui/material";
import logo from "../../assets/logo.png";
import { useSelector } from "react-redux";
import { AdminProviderss } from "../../context/AllContext";
// import { AdminProvider } from "../context/AdminContext";

export default function AdminNavigation() {
  const { isToggleSidebar, setisToggleSidebar } = useContext(AdminProviderss);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpenNotificationDrop, setIsOpenNotificationDrop] = useState(false);
  const openMyAcc = Boolean(anchorEl);
  const openNotifications = Boolean(isOpenNotificationDrop);
  const handeleOpenAccDrop = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handeleCloseMyDrop = () => {
    setAnchorEl(null);
  };
  const handeleOpenNotificationDrop = () => {
    setIsOpenNotificationDrop(true);
  };

  const handeleCloseNotificationDrop = () => {
    setIsOpenNotificationDrop(false);
  };

  const { adminData } = useSelector((state) => state.AdminSliceProvider);
  console.log("adminData:", adminData.data.username);
  return (
    <>
      <header className="row d-flex align-items-center">
        <div className="container-fluid">
          <div className="row d-flex align-items-center w-100">
            <div className="col-sm-2 part-1">
              <Link className="d-flex align-items-center text-[22px] pl-4">
                <img src={logo} alt="" />
              </Link>
            </div>
            <div className="col-sm-3 d-flex align-items-center part-2 pl-4">
              <Button className="rounded-circle mr-3">
                <MdMenuOpen className="text-[22px]" />
              </Button>
              <SearchBox />
            </div>
            <div className="col-sm-7 d-flex align-items-center part-3 pl-4 justify-content-end">
              <Button
                className="rounded-circle mr-3"
                onClick={() => setisToggleSidebar(!isToggleSidebar)}
              >
                <MdOutlineLightMode className="text-[22px]" />
              </Button>

              <Button className="rounded-circle mr-3">
                <IoIosCart className="text-[22px]" />
              </Button>
              <Button className="rounded-circle mr-3">
                <MdEmail className="text-[22px]" />
              </Button>
              <div className="dropdownWrapper">
                <Button
                  className="rounded-circle mr-3"
                  onClick={handeleOpenNotificationDrop}
                >
                  <IoIosNotifications className="text-[22px]" />
                </Button>

                <Menu
                  anchorEl={isOpenNotificationDrop}
                  id="notifications"
                  className="notifications dropdown_list"
                  open={openNotifications}
                  onClose={handeleCloseNotificationDrop}
                  onClick={handeleCloseNotificationDrop}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <div className="head pl-3 pb-2">
                    <h4>Orders (12)</h4>
                  </div>
                  <Divider className="mb-1" />
                  <div className="scroll">
                    <MenuItem onClick={handeleCloseNotificationDrop}>
                      <div className="d-flex align-items-center">
                        <div className="myAcc adminImg">
                          <span className="rounded-circle">
                            <img src={img} alt="" className="w-[50px]" />
                          </span>
                        </div>

                        <div className="dropdownInfo">
                          <h4>
                            <span>
                              <b className="font-bold">Mahmudul </b>added to his
                              favorite list
                              <b> Leather belt steve madden</b>
                            </span>
                          </h4>

                          <p className="text-sky mb-0">Few seconds ago</p>
                        </div>
                      </div>
                    </MenuItem>

                    <MenuItem onClick={handeleCloseNotificationDrop}>
                      <div className="d-flex align-items-center">
                        <div className="myAcc adminImg">
                          <span className="rounded-circle">
                            <img src={img} alt="" className="w-[50px]" />
                          </span>
                        </div>

                        <div className="dropdownInfo">
                          <h4>
                            <span>
                              <b className="font-bold">Mahmudul </b>added to his
                              favorite list
                              <b> Leather belt steve madden</b>
                            </span>
                          </h4>

                          <p className="text-sky mb-0">Few seconds ago</p>
                        </div>
                      </div>
                    </MenuItem>

                    <MenuItem onClick={handeleCloseNotificationDrop}>
                      <div className="d-flex align-items-center">
                        <div className="myAcc adminImg">
                          <span className="rounded-circle">
                            <img src={img} alt="" className="w-[50px]" />
                          </span>
                        </div>

                        <div className="dropdownInfo">
                          <h4>
                            <span>
                              <b className="font-bold">Mahmudul </b>added to his
                              favorite list
                              <b> Leather belt steve madden</b>
                            </span>
                          </h4>

                          <p className="text-sky mb-0">Few seconds ago</p>
                        </div>
                      </div>
                    </MenuItem>

                    <MenuItem onClick={handeleCloseNotificationDrop}>
                      <div className="d-flex align-items-center">
                        <div className="myAcc adminImg">
                          <span className="rounded-circle">
                            <img src={img} alt="" className="w-[50px]" />
                          </span>
                        </div>

                        <div className="dropdownInfo">
                          <h4>
                            <span>
                              <b className="font-bold">Mahmudul </b>added to his
                              favorite list
                              <b> Leather belt steve madden</b>
                            </span>
                          </h4>

                          <p className="text-sky mb-0">Few seconds ago</p>
                        </div>
                      </div>
                    </MenuItem>

                    <MenuItem onClick={handeleCloseNotificationDrop}>
                      <div className="d-flex align-items-center">
                        <div className="myAcc adminImg">
                          <span className="rounded-circle">
                            <img src={img} alt="" className="w-[50px]" />
                          </span>
                        </div>

                        <div className="dropdownInfo">
                          <h4>
                            <span>
                              <b className="font-bold">Mahmudul </b>added to his
                              favorite list
                              <b> Leather belt steve madden</b>
                            </span>
                          </h4>

                          <p className="text-sky mb-0">Few seconds ago</p>
                        </div>
                      </div>
                    </MenuItem>

                    <MenuItem onClick={handeleCloseNotificationDrop}>
                      <div className="d-flex align-items-center">
                        <div className="myAcc adminImg">
                          <span className="rounded-circle">
                            <img src={img} alt="" className="w-[50px]" />
                          </span>
                        </div>

                        <div className="dropdownInfo">
                          <h4>
                            <span>
                              <b className="font-bold">Mahmudul </b>added to his
                              favorite list
                              <b> Leather belt steve madden</b>
                            </span>
                          </h4>

                          <p className="text-sky mb-0">Few seconds ago</p>
                        </div>
                      </div>
                    </MenuItem>

                    <MenuItem onClick={handeleCloseNotificationDrop}>
                      <div className="d-flex align-items-center">
                        <div className="myAcc adminImg">
                          <span className="rounded-circle">
                            <img src={img} alt="" className="w-[50px]" />
                          </span>
                        </div>

                        <div className="dropdownInfo">
                          <h4>
                            <span>
                              <b className="font-bold">Mahmudul </b>added to his
                              favorite list
                              <b> Leather belt steve madden</b>
                            </span>
                          </h4>

                          <p className="text-sky mb-0">Few seconds ago</p>
                        </div>
                      </div>
                    </MenuItem>

                    <MenuItem onClick={handeleCloseNotificationDrop}>
                      <div className="d-flex align-items-center">
                        <div className="myAcc adminImg">
                          <span className="rounded-circle">
                            <img src={img} alt="" className="w-[50px]" />
                          </span>
                        </div>

                        <div className="dropdownInfo">
                          <h4>
                            <span>
                              <b className="font-bold">Mahmudul </b>added to his
                              favorite list
                              <b> Leather belt steve madden</b>
                            </span>
                          </h4>

                          <p className="text-sky mb-0">Few seconds ago</p>
                        </div>
                      </div>
                    </MenuItem>

                    <MenuItem onClick={handeleCloseNotificationDrop}>
                      <div className="d-flex align-items-center">
                        <div className="myAcc adminImg">
                          <span className="rounded-circle">
                            <img src={img} alt="" className="w-[50px]" />
                          </span>
                        </div>

                        <div className="dropdownInfo">
                          <h4>
                            <span>
                              <b className="font-bold">Mahmudul </b>added to his
                              favorite list
                              <b> Leather belt steve madden</b>
                            </span>
                          </h4>

                          <p className="text-sky mb-0">Few seconds ago</p>
                        </div>
                      </div>
                    </MenuItem>

                    <MenuItem onClick={handeleCloseNotificationDrop}>
                      <div className="d-flex align-items-center">
                        <div className="myAcc adminImg">
                          <span className="rounded-circle">
                            <img src={img} alt="" className="w-[50px]" />
                          </span>
                        </div>

                        <div className="dropdownInfo">
                          <h4>
                            <span>
                              <b className="font-bold">Mahmudul </b>added to his
                              favorite list
                              <b> Leather belt steve madden</b>
                            </span>
                          </h4>

                          <p className="text-sky mb-0">Few seconds ago</p>
                        </div>
                      </div>
                    </MenuItem>

                    <div className="pl-3 pr-3 w-100 pt-2 pb-2">
                      <Button className="btn-blue w-100">
                        View all notification
                      </Button>
                    </div>
                  </div>
                </Menu>
              </div>
              <div className="myAccWrapper">
                <Button
                  className="myAcc d-flex align-items-center"
                  onClick={handeleOpenAccDrop}
                >
                  <div className="adminImg">
                    <span className="rounded-circle">
                      <img
                        src={adminData.data.profileImg}
                        alt=""
                        className="w-[50px]"
                      />
                    </span>
                  </div>

                  <div className="adminInfo">
                    <h4>
                      {adminData.data.fname} {adminData.data.lname}
                    </h4>
                    <p>{adminData.data.username}</p>
                  </div>
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={openMyAcc}
                  onClose={handeleCloseMyDrop}
                  onClick={handeleCloseMyDrop}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  {/* <MenuItem onClick={handeleCloseMyDrop}>
                    <Avatar /> My Account
                  </MenuItem>
                
                  <Divider /> */}
                  <MenuItem onClick={handeleCloseMyDrop}>
                    <ListItemIcon>
                      <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    My Account
                  </MenuItem>
                  <MenuItem onClick={handeleCloseMyDrop}>
                    <ListItemIcon>
                      <IoShieldHalfSharp />
                    </ListItemIcon>
                    Reset Password
                  </MenuItem>

                  <MenuItem onClick={handeleCloseMyDrop}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

// import { useState } from "react";
// import { NavLink } from "react-router-dom";

// export default function AdminNavigation() {
//   const [adminDrop, setAdminDrop] = useState(false);

//   const adminDropdown = () => {
//     setAdminDrop(!adminDrop);
//   };
//   return (
//     <>
//       <div className="bg-Adminnav-400 w-[200px]  text-white">
//         <div className="text-[22px]  border-b-2 border-gray-800 font-bold bg-Adminnav2-400 px-[10px] py-[20px]">
//           <h1>Admin Dashbord</h1>
//         </div>

//         <div>
//           <ul className="nav-item admin_nav">
//             <NavLink className="nav-item text-decoration-none admin_nav_link">
//               Dashbord
//             </NavLink>
//             <NavLink className="nav-item text-decoration-none admin_nav_link">
//               Profile
//             </NavLink>
//             <NavLink className="nav-item text-decoration-none admin_nav_link">
//               Users
//             </NavLink>
//             <div className="relative">
//               <NavLink
//                 to={""}
//                 className="nav-item text-decoration-none admin_nav_link"
//                 onClick={adminDropdown}
//               >
//                 Products
//               </NavLink>

//               {adminDrop && (
//                 <ul className=" text-[20px] nav-item2  absolute ">
//                   <NavLink className="nav-item text-decoration-none admin_nav_link">
//                     Product List
//                   </NavLink>

//                   <NavLink to={"/admin/products"} className="nav-item text-decoration-none admin_nav_link">
//                     Product Add
//                   </NavLink>

//                   <NavLink to={"/admin/updated/products"} className="nav-item text-decoration-none admin_nav_link">
//                     Product Update
//                   </NavLink>
//                 </ul>
//               )}
//             </div>

//             <NavLink
//               to="/admin/category"
//               className="nav-item text-decoration-none admin_nav_link"
//             >
//               Categories
//             </NavLink>
//             <NavLink className="nav-item text-decoration-none admin_nav_link">
//               Billing
//             </NavLink>
//             <NavLink className="nav-item text-decoration-none admin_nav_link">
//               Logout
//             </NavLink>
//             {/* <li className="mt-[10px] hover:bg-red-400 px-[30px] cursor-pointer">
//               <NavLink>Users</NavLink>
//             </li>
//             <li className="mt-[10px] hover:bg-red-400 px-[30px] cursor-pointer">
//               <NavLink>Products</NavLink>
//             </li>
//             <li className="mt-[10px] hover:bg-red-400 px-[30px] cursor-pointer">
//               <NavLink>Categories</NavLink>
//             </li>
//             <li className="mt-[10px] hover:bg-red-400 px-[30px] cursor-pointer">
//               <NavLink>Billing</NavLink>
//             </li>
//             <li className="mt-[10px] hover:bg-red-400 px-[30px] cursor-pointer">
//               <NavLink>Logout</NavLink>
//             </li> */}
//           </ul>
//         </div>
//       </div>
//     </>
//   );
// }
