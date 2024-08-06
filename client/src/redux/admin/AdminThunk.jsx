import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const AdminLoginFetchApi = createAsyncThunk(
  "AdminLoginFetchApi",
  async ({ formData, navigate }, { dispatch }) => {
    try {
      const response = await axios.post("/api/admin/login", formData);
      dispatch(VerifyAdminFetchApi);
      const { process, message, data } = response.data;
      if (process) {
        navigate("/admin");
      }
      return { process, message, data };
    } catch (error) {
      return error.response.data;
    }
  }
);

export const VerifyAdminFetchApi = createAsyncThunk(
  "VerifyAdminFetchApi",
  async () => {
    const response = await axios.get("/api/admin");
    return response.data;
  }
);
