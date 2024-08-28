import { useState } from "react";
import { resetPasswordApi } from "../../../redux/user/UserThunk";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
export default function ResetPassword() {
  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    confirmPassworrrd: "",
  });
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const formHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(resetPasswordApi({ formData, toast, navigate, setFormData }));
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
    <div className="linear-color">
      <div className="form_css">
        <div className=" w-[50%] flex p-[30px] rounded-[50px] backImage">
          <form className="pl-[25px] w-[100%]" onSubmit={formHandler}>
            <div className="flex justify-center text-black text-[20px]">
              Reset Password
            </div>
            <div className="w-[100%] ">
              <input
                type="email"
                name="email"
                value={formData.email}
                placeholder="Email :"
                className="registerInputSet form_color"
                onChange={inputHandler}
              />
            </div>
            <div className="w-[100%]">
              <input
                type={showPassword ? "text" : "password"}
                name="newPassword"
                value={formData.newPassword}
                placeholder="New Password :"
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
            <div className="w-[100%]">
              <input
                type="text"
                name="confirmPassword"
                value={formData.confirmPassword}
                placeholder="Confirm Password :"
                className="registerInputSet form_color"
                onChange={inputHandler}
              />
            </div>
            <div className="pt-[15px] flex justify-center">
              <button className="w-[50%] flex justify-center p-[10px] bg-yellow-400 text-[20px] text-black font-bold rounded-[20px] shadow-sm shadow-slate-600">
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
