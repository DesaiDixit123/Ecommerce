/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
import {  useState } from "react";
import { NavLink } from "react-router-dom";
import { LoginUser } from "../../redux/user/UserThunk";
import { useDispatch } from "react-redux";
// import { useDispatch } from "react-redux";


export default function Login() {
 
  const [formData, setFormData] = useState({
   identifiers:"",
   password:""
  });
  const dispatch = useDispatch();
 

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

  return (
    <>
      <div className="justify-center flex items-center mt-[80px]">
        <div className="bg-registerBg-400 w-[50%] flex p-[30px] rounded-[50px]">
          <form className="pl-[25px] w-[100%]" onSubmit={formHandler}>
            
            <div className="flex justify-center text-white text-[20px]">
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
            <div className="w-[100%]">
            
              <input
                type="password"
                name="password"
                // value={formData.password}
                placeholder="Password :"
                className="registerInputSet form_color"
                onChange={inputHandler}
              />
            </div>

            <div className="flex justify-between text-white pt-[15px]">
                <div className="flex gap-[10px] text-[18px]">
                    <input type="checkbox" name="" id="" />
                    <p>Remember Me</p>
                </div>
                <div>

                <NavLink to={"/forget-password"} className="border-b-2 text-[18px]">
                    Forget Password
                </NavLink>
                <NavLink to={"/updatePassword"} className="border-b-2 text-[18px]">
                    Update Password
                </NavLink>
                </div>
            </div>
            <div className="pt-[15px] flex justify-center">
              <button className="w-[50%] flex justify-center p-[10px] bg-slate-800 text-[20px] text-white font-bold rounded-[20px] shadow-sm shadow-slate-600">
                Login
              </button>
            </div>

            <div className="flex justify-center text-white pt-[15px] text-[22px]">
                <NavLink to={"/register"} className="border-b-2">Don't have an account</NavLink>
            </div>

          </form>
        </div>
      </div>
    </>
  );
}
