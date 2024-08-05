/* eslint-disable react-refresh/only-export-components */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const RegisterUser = createAsyncThunk("RegisterUser", async (form) => {
  try {
    const response = await axios.post("/api/register", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    return error.response.data;
  }
});
export const UserValidation=createAsyncThunk(
  "UserValidation",
  async()=>{
    const response=await axios.get("/api")
    return response.data
  }
)
export const getAllCountriesWithPhoneCodes = createAsyncThunk(
  "AllCountriesWithPhoneCodes",
  async () => {
    try {
      const response = await axios.get("/api/countrieswithphonecodes");
      return response.data.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const LoginUser = createAsyncThunk("LoginUser", async (formData) => {
  try {
    const response = await axios.post("/api/login", formData);

    return response.data;
  } catch (error) {
    return error.response.data;
  }
});

export const ForgetPasswords = createAsyncThunk(
  "ForgetPassword",
  async ({ formData, toast, navigate, setFormData }) => {
    try {
      const response = await axios.post("/api/forget-password", formData);
      if (response.data.process) {
        setFormData({
          email: "",
        });
        toast.success(response.data.message, {
          style: { marginTop: "50px", marginRight: "10px" },
        });
        setTimeout(() => {
          navigate("/verifyOtp");
        }, 2000);
      }
      return response.data;
    } catch (error) {
      toast.error(error.message, {
        style: { marginTop: "50px", marginRight: "10px" },
      });

    }
  }
);

export const verifyOtpApi = createAsyncThunk(
  "user/verifyOtp",
  async ({ formData, setFormData, toast, navigate }) => {
    try {
      const response = await axios.post("/api/verifyOtp", formData);
      if (response.data.process) {
        setFormData({
          email: "",
          otp: "",
        });

        toast.success(response.data.message,{
          style: { marginTop: "50px", marginRight: "10px" },
        })
        setTimeout(()=>{
navigate("/resetPassword")
        },2000)
      }
    } catch (error) {
      toast.error(error.message, {
        style: { marginTop: "50px", marginRight: "10px" },
      });
    }
  }
);

export const resetPasswordApi = createAsyncThunk(
  "resetPassword",
  async ({formData,toast,navigate,setFormData}) => {
    try {
      const response = await axios.post("/api/reset-password", formData);
      if(response.data.process){
        setFormData({
          email: "",
          newPassword: "",
          confirmPassword: "",
        })


        toast.success(response.data.message,{
          style: { marginTop: "50px", marginRight: "10px" },
        })
        setTimeout(()=>{
navigate("/login")
        },2000)
      }
    } catch (error) {
      toast.error(error.message, {
        style: { marginTop: "50px", marginRight: "10px" },
      });
    }
  }
);

export const updatePasswordApi = createAsyncThunk(
  "oldpasswordApi",
  async (formData) => {
    try {
      const response = await axios.post("/api/update-password", formData);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);
