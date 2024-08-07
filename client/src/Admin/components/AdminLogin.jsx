/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
import {  useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  AdminLoginFetchApi,
  VerifyAdminFetchApi,
} from "../../redux/admin/AdminThunk";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function AdminLogin() {
  const [formData, setFormData] = useState({
    identifiers: "",
    password: "",
  });
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { adminData ,process} = useSelector(
    (state) => state.AdminSliceProvider
  );
  console.log("adminData:", adminData);
  useEffect(() => {
    if (adminData !== undefined) {
      if (process) {
        dispatch(VerifyAdminFetchApi());
      }
    }
  }, [adminData, process, dispatch]);

  const formHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(AdminLoginFetchApi({ formData, navigate, dispatch,toast }));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const inputHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePass = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="linear-color">
        <div className="form_css">
          <div className=" w-[50%] flex p-[30px] rounded-[50px] backImage">
            <form className="pl-[25px] w-[100%]" onSubmit={formHandler}>
              <div className="flex justify-center text-black text-[20px] font-bold">
                Admin Login Form
              </div>

              <div className="w-[100%] ">
                <input
                  type="text"
                  name="identifiers"
                  // value={formData.identifiers}
                  placeholder="Email Or Username :"
                  className="registerInputSet form_color"
                  onChange={inputHandler}
                />
              </div>
              <div className="w-[100%] relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  placeholder="Password :"
                  className="registerInputSet form_color"
                  onChange={inputHandler}
                />

                <span
                  className="absolute bottom-[10px] right-4 text-[20px]"
                  onClick={togglePass}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>

              <div className="pt-[15px] flex justify-center">
                <button className="w-[50%] flex justify-center p-[10px] bg-yellow-400 text-[20px] text-black font-bold rounded-[20px] shadow-sm shadow-slate-600">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
