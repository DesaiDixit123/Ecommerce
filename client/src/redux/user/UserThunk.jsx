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


export const LoginUser=createAsyncThunk(
  "LoginUser",
  async(formData)=>{
    try {
      const response=await axios.post("/api/login",formData)

      return response.data
    } catch (error) {
      return error.response.data
    }
  }
)

export const ForgetPasswords=createAsyncThunk(
  "ForgetPassword",
  async(formData)=>{
    try {
      const response=axios.post("/api/forget-password",formData)
      return response.data
    } catch (error) {

      return error.response.data
      
    }
  }
)

export const verifyOtpApi = createAsyncThunk(
  "user/verifyOtp",
  async (formData) => {
    try {
      const response = await axios.post("/api/verifyOtp", formData);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const resetPasswordApi=createAsyncThunk(
  "resetPassword",
  async(formData)=>{
    try {
      const response=await axios.post("/api/reset-password",formData)
      return response.data
    } catch (error) {
      return error.response.data
    }
  }
)

export const updatePasswordApi=createAsyncThunk(
  "oldpasswordApi",
  async(formData)=>{
    try {
      const response=await axios.post("/api/update-password",formData)
      return response.data
    } catch (error) {
      return error.response.data
    }
  }
)