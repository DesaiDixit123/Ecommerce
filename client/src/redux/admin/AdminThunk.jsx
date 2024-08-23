/* eslint-disable react-refresh/only-export-components */
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
    // console.log("API Response:", response.data); // Add this line to inspect the API response
    return response.data;
  }
);

export const categoryFetchApi = createAsyncThunk(
  "categoryFetchApi",
  async ({ formdata, setFormdata, toast }) => {
    try {
      // Make sure formdata includes both categoryname and fields

      const response = await axios.post("/api/admin/category", formdata);

      const { success, message, data } = response.data;

      if (success) {
        toast.success(message, {
          position: "top-right",
          style: { marginTop: "50px", marginRight: "10px" },
        });

        // Reset formdata
      } else {
        toast.success(message, {
          position: "top-right",
          style: { marginTop: "50px", marginRight: "10px" },
        });

        setFormdata({
          categoryname: "",
          fields: [""],
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
      return error.message;
    }
  }
);

export const productAddFetchApi = createAsyncThunk(
  "productAddFetchApi",
  async ({ formdata, setFormdata, toast }) => {
    try {
      const response = await axios.post("/api/products", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { success, message, data } = response.data;

      if (success) {
        toast.success(message, {
          position: "top-right",
          style: { marginTop: "50px", marginRight: "10px" },
        });

        // Reset formdata
      } else {
        toast.success(message, {
          position: "top-right",
          style: { marginTop: "50px", marginRight: "10px" },
        });

        setFormdata({
          category: "",
          fields: "",
          img1: null,
          img1Preview: null,
          img2: null,
          img2Preview: null,
          img3: null,
          img3Preview: null,
          img4: null,
          img4Preview: null,
          img5: null,
          img5Preview: null,
          title: "",
          price: "",
          discount: "",
          qnt: "",
          discription: "",
        });
      }

      return { success, message, data };
    } catch (error) {
      toast.error(error.response?.data?.message || error.message, {
        position: "top-right",
        style: { marginTop: "50px", marginRight: "10px" },
      });

      // Return a rejected value
      return error.message;
    }
  }
);

export const productUpdatedFetchApi = createAsyncThunk(
  "productUpdated",
  async ({ formdata, productId ,toast}) => {
    try {
      const response = await axios.put(`/api/products/${productId}`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { success, message, data } = response.data;

      if (success) {
        toast.success(message, {
          position: "top-right",
          style: { marginTop: "50px", marginRight: "10px" },
        });

        // Reset formdata
      } else {
        toast.success(message, {
          position: "top-right",
          style: { marginTop: "50px", marginRight: "10px" },
        });

            }

      return { success, message, data };
    } catch (error) {
      toast.error(error.response?.data?.message || error.message, {
        position: "top-right",
        style: { marginTop: "50px", marginRight: "10px" },
      });

      // Return a rejected value
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

export const getAllUsersFetchApi = createAsyncThunk("allUsers", async () => {
  try {
    const response = await axios.get("/api/users");
    console.log("API Response Data:", response.data); // Check API Response
    return response.data.data;
  } catch (error) {
    console.log("API Error:", error.message); // Error Logging
    throw error;
  }
});
