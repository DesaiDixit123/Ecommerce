/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
import {  useState } from "react";
// import { NavLink } from "react-router-dom";
import { ForgetPasswords } from "../../redux/user/UserThunk";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
// import { useDispatch } from "react-redux";


export default function ForgetPassword() {
 
  const [formData, setFormData] = useState({
  email:""
  });
  const dispatch = useDispatch();
 

  const formHandler = async (e) => {
    e.preventDefault();


    try {
      dispatch(ForgetPasswords(formData));
   
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const inputHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="justify-center flex items-center mt-[80px]">
        <div className="bg-registerBg-400 w-[50%] flex p-[30px] rounded-[50px]">
          <form className="pl-[25px] w-[100%]" onSubmit={formHandler}>
            
            <div className="flex justify-center text-white text-[20px]">
              Forget-Password
            </div>
            
            <div className="w-[100%] ">
              <input
                type="email"
                name="email"
                // value={formData.identifiers}
                placeholder="Email :"
                className="registerInputSet form_color"
                onChange={inputHandler}
              />
           
            </div>
          
           
            <div className="pt-[15px] flex justify-center">
              <button className="w-[50%] flex justify-center p-[10px] bg-slate-800 text-[20px] text-white font-bold rounded-[20px] shadow-sm shadow-slate-600">
              Forget-Password
              </button>
            </div>

<div className="pt-[15px] flex justify-center text-white">
    <NavLink to={"/verifyOtp"}>
        Verify OTP
    </NavLink>
</div>
        

          </form>
        </div>
      </div>
    </>
  );
}
