import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const AdminLoginFetchApi = createAsyncThunk(
  "AdminLoginFetchApi",
  async ({ formData, navigate, toast }, { dispatch }) => {
    try {
      const response = await axios.post("/api/admin/login", formData);

      // Correct the dispatch call here
      dispatch(VerifyAdminFetchApi());
      const { process, message, data } = response.data;

      if (process) {
        toast.success(message, {
          position: "top-right",
          style: { marginTop: "50px", marginRight: "10px" },
        });
        navigate("/admin");
      } else {
        toast.error(message, {
          position: "top-right",
          style: { marginTop: "50px", marginRight: "10px" },
        });
      }

      return { process, message, data }; // Important to return data here
    } catch (error) {
      toast.error(error.response?.data?.message || error.message, {
        position: "top-right",
        style: { marginTop: "50px", marginRight: "10px" },
      });
      return { process: false, message: error.message }; // Handle error state
    }
  }
);

export const VerifyAdminFetchApi = createAsyncThunk(
  "VerifyAdminFetchApi",
  async () => {
    const response = await axios.get("/api/admin");
    console.log("API Response:", response.data); // Add this line to inspect the API response
    return response.data;
  }
);

export const categoryFetchApi = createAsyncThunk(
  "categoryFetchApi",
  async ({ formdata, setFormdata, toast }, { rejectWithValue }) => {
    try {
      // Make sure formdata includes both categoryname and fields
      const { categoryname, fields } = formdata;

      if (!categoryname || !Array.isArray(fields)) {
        throw new Error("Invalid data format");
      }

      // Send the POST request to the backend
      const response = await axios.post("/api/admin/category", formdata);

      const { success, message, data } = response.data;

      if (success) {
        toast.success(message, {
          position: "top-right",
          style: { marginTop: "50px", marginRight: "10px" },
        });

        // Reset formdata
        setFormdata({
          categoryname: "",
          fields: [""],
        });
      } else {
        toast.error(message, {
          position: "top-right",
          style: { marginTop: "50px", marginRight: "10px" },
        });
      }

      return { success, message, data };
    } catch (error) {
      // Handle errors
      toast.error(error.response?.data?.message || error.message, {
        position: "top-right",
        style: { marginTop: "50px", marginRight: "10px" },
      });

      // Return a rejected value
      return rejectWithValue(error.message);
    }
  }
);

export const productAddFetchApi = createAsyncThunk(
  "productAddFetchApi",
  async (formData) => {
    try {
      const response = await axios.post("/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const adminLogoutFetchApi = createAsyncThunk(
  "admin/logout",
  async ({ navigate, toast }, { dispatch }) => {
    try {
      const response = await axios.post("/api/admin/logout");

      const { data, message, process } = response.data;
      if (process) {
        toast.success(message, {
          position: "top-right",
          style: { marginTop: "50px", marginRight: "10px" },
        });

        dispatch(VerifyAdminFetchApi());
        navigate("/");
      } else {
        toast.error(message, {
          position: "top-right",
          style: { marginTop: "50px", marginRight: "10px" },
        });
      }
      return { process, message, data };
    } catch (error) {
      toast.error(error.response?.data?.message || error.message, {
        position: "top-right",
        style: { marginTop: "50px", marginRight: "10px" },
      });
    }
  }
);
