import { useState } from "react";
import { verifyOtpApi } from "../../redux/user/UserThunk";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

export default function VerifyOtp() {
  const [formData, setFormData] = useState({
    email: "",
    otp: ""
  });
  const dispatch = useDispatch();

  const formHandler = async (e) => {
    e.preventDefault();

    console.log("Form Data:", formData); // Add this line to debug the form data

    try {
      dispatch(verifyOtpApi(formData));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const inputHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="justify-center flex items-center mt-[80px]">
      <div className="bg-registerBg-400 w-[50%] flex p-[30px] rounded-[50px]">
        <form className="pl-[25px] w-[100%]" onSubmit={formHandler}>
          <div className="flex justify-center text-white text-[20px]">
            Verify OTP
          </div>
          <div className="w-[100%] ">
            <input
              type="email"
              name="email"
              placeholder="Email :"
              className="registerInputSet form_color"
              onChange={inputHandler}
            />
          </div>
          <div className="w-[100%]">
            <input
              type="text"
              name="otp"
              placeholder="OTP :"
              className="registerInputSet form_color"
              onChange={inputHandler}
            />
          </div>
          <div className="pt-[15px] flex justify-center">
            <button className="w-[50%] flex justify-center p-[10px] bg-slate-800 text-[20px] text-white font-bold rounded-[20px] shadow-sm shadow-slate-600">
              Verify OTP
            </button>
          </div>

          <div className="pt-[15px] flex justify-center text-white">
    <NavLink to={"/resetPassword"}>
       Reset-Password
    </NavLink>
</div>
        
        </form>
      </div>
    </div>
  );
}
