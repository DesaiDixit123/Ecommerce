
import { useState } from "react";
import { toast } from "react-toastify";
import { ForgetPasswords } from "../../../redux/user/UserThunk";
import { useDispatch } from "react-redux";
import {  useNavigate } from "react-router-dom";

export default function ForgetPassword() {
  const [formData, setFormData] = useState({
    email: "",
  });
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const formHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(ForgetPasswords({ formData, toast, navigate, setFormData }));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const inputHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
     <div className="linear-color">
            <div className="form_css">
        <div className="w-[50%] flex p-[30px] rounded-[50px] backImage">
          <form className="pl-[25px] w-[100%]" onSubmit={formHandler}>
            <div className="flex justify-center text-black font-bold text-[20px]">
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
              <button className="w-[50%] flex justify-center p-[10px] bg-yellow-400 text-[20px] text-black font-bold rounded-[20px] shadow-sm shadow-slate-600">
                Forget-Password
              </button>
            </div>

        
          </form>
        </div>
      </div>
      </div>

    </>
  );
}
