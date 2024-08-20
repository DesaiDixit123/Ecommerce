import DashboardBox from "./Dashboards/DashboardBox";
import { FaCircleUser, FaPencil } from "react-icons/fa6";
import { FaShoppingCart, FaEye } from "react-icons/fa";
import { RiShoppingBagFill } from "react-icons/ri";
import { TbStarsFilled } from "react-icons/tb";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { IoIosTimer } from "react-icons/io";
import { HiDotsVertical } from "react-icons/hi";
import Button from "@mui/material/Button";
import { Chart } from "react-google-charts";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { MdDelete } from "react-icons/md";
import Pagination from "@mui/material/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { deleteProduct, getAllProductsFecthApi } from "../../redux/user/UserThunk";

export const data = [
  ["Task", "Hours per Day"],
  ["Work", 11],
  ["Eat", 2],
  ["Commute", 2],
  ["Watch TV", 2],
  ["Sleep", 7],
];

export const options = {
  title: "Daily Company Profit",
  backgroundColor: "transparent",
  chartArea: {
    left: 5,
    top: 60,
    width: "100%",
    height: "350",
  },
};

export default function AdminDashbord() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showBy, setShowBy] = useState("");
  const [categoryBy, setCategoryBy] = useState("");
  const open = Boolean(anchorEl);
  const navigate = useNavigate()
  
  const dispatch=useDispatch()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { allProducts ,allUsers} = useSelector((state) => state.UserSliceProvider);
  // console.log(allProducts);
  console.log(allUsers)

  const handeleProductClick = (id) => {
    navigate(`/admin/productsdetails/products/${id}`)
  }
  

  const handeleDeleteProduct = (productId) => {
    dispatch(deleteProduct(productId)).unwrap()
    .then(() => {
      dispatch(getAllProductsFecthApi());
    }).catch((err) => {
      console.error("Failed to delete product: ", err);
    });
  }

  return (
    <>
      <div className="right-content w-100">
        <div className="row dashboardWrapperRow">
          <div className="col-md-8">
            <div className="dashboardBoxWrapper d-flex">
              <DashboardBox
                color={["#1da256", "#48d483"]}
                icon={<FaCircleUser />}
                grow={<TrendingUpIcon />}
                name={"Total Users"}
                total={252}
              />
              <DashboardBox
                color={["#c012e2", "#eb64fe"]}
                icon={<FaShoppingCart />}
                grow={<TrendingDownIcon />}
                name={"Total Orders"}
                total={23}
              />
              <DashboardBox
                color={["#2c78e5", "#60aff5"]}
                icon={<RiShoppingBagFill />}
                grow={<TrendingDownIcon />}
                name={"Total Products"}
                total={allProducts.length}
              />
              <DashboardBox
                color={["#e1950e", "#f3cd29"]}
                icon={<TbStarsFilled />}
                grow={<TrendingUpIcon />}
                name={"Total Reviews"}
                total={52}
              />
            </div>
          </div>

          <div className="col-md-4 pl-0">
            <div className="box graphBox">
              <div className="d-flex align-items-center w-100 bottomEle">
                <h5 className="text-white mt-0 mb-0">Total Sales</h5>
                <Button className="ml-auto toggleIcon" onClick={handleClick}>
                  <HiDotsVertical />
                </Button>

                <Menu
                  className="dropdown_menu"
                  MenuListProps={{
                    "aria-labelledby": "long-button",
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  PaperProps={{
                    style: {
                      maxHeight: " ITEM_HEIGHT * 4.5",
                      width: "20ch",
                    },
                  }}
                >
                  <MenuItem onClick={handleClose}>
                    <IoIosTimer /> Last Day
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <IoIosTimer /> Last Week
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <IoIosTimer /> Last Month
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <IoIosTimer /> Last Year
                  </MenuItem>
                </Menu>
              </div>

              <h3 className="text-white font-bold text-[35px]">₹ 30,000,00</h3>

              <p>₹ 150,00,00 In The Last Month</p>

              <Chart
                chartType="PieChart"
                data={data}
                options={options}
                width={"100%"}
                height={"200px"}
                top={"500px"}
              />
            </div>
          </div>
        </div>

        <div className="card shadow border-0 p-3 mt-4">
          <h3 className="hd">Best Selling Products</h3>
          <div className="row cardFilters mt-3 ">
            <div className="col-md-3">
              <h4>Show By</h4>
              <FormControl
                sx={{ m: 1, minWidth: 120 }}
                size="small"
                className="w-100"
              >
                <Select
                  value={showBy}
                  onChange={(e) => setShowBy(e.target.value)}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  className="w-100 mt-2"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="col-md-3">
              <h4>Category By</h4>
              <FormControl
                sx={{ m: 1, minWidth: 120 }}
                size="small"
                className="w-100"
              >
                <Select
                  value={categoryBy}
                  onChange={(e) => setCategoryBy(e.target.value)}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  className="w-100 mt-2"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>

          <div className="table_responsive mt-3">
            <table className="table table-bordered v-aligns">
              <thead className="thead-dark ">
                <tr>
                  <th>UID</th>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Field</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Rating</th>

                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {allProducts.map((product, index) => (
                  <tr key={product._id}>
                    <td> #{index + 1} </td>
                    <td>
                      <div className="d-flex align-items-center productBox gap-[20px]">
                        <div className="imageWrapper">
                          <div className="img">
                            <img src={product.img1} alt="" className="w-100" />
                          </div>
                        </div>
                        <div className="info">
                          <h6>{product.title}</h6>
                          <p>{product.discription}</p>
                        </div>
                      </div>
                    </td>
                    <td>{product.category}</td>
                    <td>{product.fields}</td>
                    <td className="">
                      <div style={{ width: "70px" }}>
                        <del className="old">{product.price}</del>
                        <span className="new text-danger">
                          {" "}
                          {product.discount}{" "}
                        </span>
                      </div>
                    </td>
                    <td> {product.qnt} </td>
                    <td> {product.ratings} </td>

                    <td>
                      <div className="actions d-flex align-items-center gap-3">
                   
                          <Button color="secondary" className="secondary" onClick={()=>handeleProductClick(product._id)}>
                            <FaEye />
                          </Button>
                      
                        <Button color="success" className="success">
                          <FaPencil />
                        </Button>
                        <Button color="error" className="error" onClick={()=>handeleDeleteProduct(product._id)}>
                          <MdDelete />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="d-flex tableFooter">
              <p>
                Showing <b>12</b> of <b>60</b> results
              </p>
              <Pagination
                count={10}
                color="primary"
                className="pagination"
                showFirstButton
                showLastButton
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
