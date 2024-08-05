/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { LoginUser } from "../../redux/user/UserThunk";
import { useDispatch } from "react-redux";
import { FaEye, FaEyeSlash } from "react-icons/fa";
export default function Login() {
  const [formData, setFormData] = useState({
    identifiers: "",
    password: "",
  });
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const formHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(LoginUser(formData));
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
                Login Form
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
                  type={showPassword ? "text": "password"}
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
                  {showPassword ? <FaEye /> :<FaEyeSlash/>}
                </span>
              </div>

              <div className="flex justify-between text-black pt-[15px]">
                <div className="flex gap-[10px] text-[18px]">
                  <input type="checkbox" name="" id="" />
                  <p>Remember Me</p>
                </div>
                <div>
                  <NavLink
                    to={"/forget-password"}
                    className="border-b-2 text-[18px] text-black border-black"
                  >
                    Forget Password
                  </NavLink>
                </div>
              </div>
              <div className="pt-[15px] flex justify-center">
                <button className="w-[50%] flex justify-center p-[10px] bg-yellow-400 text-[20px] text-black font-bold rounded-[20px] shadow-sm shadow-slate-600">
                  Login
                </button>
              </div>

              <div className="flex justify-center text-black pt-[15px] text-[22px]">
                <NavLink to={"/register"} className="border-b-2 border-black">
                  Don't have an account
                </NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
