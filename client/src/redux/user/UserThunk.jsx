/* eslint-disable react-refresh/only-export-components */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const RegisterUser = createAsyncThunk(
  "RegisterUser",
  async ({ form, toast }) => {
    try {
      const response = await axios.post("/api/register", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { process, message } = response.data;

      if (process) {
        toast.success(message, {
          position: "top-right",
          style: { marginTop: "50px", marginRight: "10px" },
        });
      } else {
        toast.error(message, {
          position: "top-right",
          style: { marginTop: "50px", marginRight: "10px" },
        });
      }
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || error.message, {
        position: "top-right",
        style: { marginTop: "50px", marginRight: "10px" },
      });
    }
  }
);
export const UserValidation = createAsyncThunk("UserValidation", async () => {
  const response = await axios.get("/api");
  return response.data;
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

export const LoginUser = createAsyncThunk(
  "LoginUser",
  async ({ formData, dispatch, toast, navigate }) => {
    try {
      const response = await axios.post("/api/login", formData);

      dispatch(UserValidation());
      const { process, message } = response.data;
      if (process) {
        toast.success(message, {
          position: "top-right",
          style: { marginTop: "50px", marginRight: "10px" },
        });
        navigate("/");
      } else {
        toast.error(message, {
          position: "top-right",
          style: { marginTop: "50px", marginRight: "10px" },
        });
      }

      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || error.message, {
        position: "top-right",
        style: { marginTop: "50px", marginRight: "10px" },
      });
    }
  }
);

export const ForgetPasswords = createAsyncThunk(
  "ForgetPassword",
  async ({ formData, toast, navigate, setFormData }) => {
    try {
      const response = await axios.post("/api/forget-password", formData);
      const { process, message } = response.data;
      if (process) {
        setFormData({
          email: "",
        });
        toast.success(message, {
          position: "top-right",
          style: { marginTop: "50px", marginRight: "10px" },
        });
        setTimeout(() => {
          navigate("/verifyOtp");
        }, 2000);
      } else {
        toast.error(message, {
          position: "top-right",
          style: { marginTop: "50px", marginRight: "10px" },
        });
      }
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || error.message, {
        position: "top-right",
        style: { marginTop: "50px", marginRight: "10px" },
      });
      throw error; // Ensure error is rethrown for further handling
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

        toast.success(response.data.message, {
          style: { marginTop: "50px", marginRight: "10px" },
        });
        setTimeout(() => {
          navigate("/resetPassword");
        }, 2000);
      } else {
        toast.error(response.data.message, {
          position: "top-right",
          style: { marginTop: "50px", marginRight: "10px" },
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message, {
        position: "top-right",
        style: { marginTop: "50px", marginRight: "10px" },
      });
      throw error; // Ensure error is rethrown for further handling
    }
  }
);

export const resetPasswordApi = createAsyncThunk(
  "resetPassword",
  async ({ formData, toast, navigate, setFormData }) => {
    try {
      const response = await axios.post("/api/reset-password", formData);
      if (response.data.process) {
        setFormData({
          email: "",
          newPassword: "",
          confirmPassword: "",
        });

        toast.success(response.data.message, {
          style: { marginTop: "50px", marginRight: "10px" },
        });
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.error(response.data.message, {
          position: "top-right",
          style: { marginTop: "50px", marginRight: "10px" },
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message, {
        position: "top-right",
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

export const userLogoutFecthApi = createAsyncThunk(
  "logoutUser",
  async ({ dispatch, toast }) => {
    const response = await axios.post("/api/logout");
    dispatch(UserValidation());

    const { process, message } = response.data;
    if (process) {
      toast.success(message, {
        position: "top-right",
        style: { marginTop: "50px", marginRight: "10px" },
      });
    } else {
      toast.error(message, {
        position: "top-right",
        style: { marginTop: "50px", marginRight: "10px" },
      });
    }
    return response.data;
  }
);

export const getAllProductsFecthApi = createAsyncThunk("products", async () => {
  const response = await axios.get("/api/products");
  return response.data;
});

export const getAllCategories2 = createAsyncThunk("categories", async () => {
  const response = await axios.get("/api/admin/get/category");
  return response.data;
});

export const categoryByFieldsFetchApi = createAsyncThunk(
  "categoryByFields",
  async (categoryname) => {
    const response = await axios.get(
      `/api/admin/get/category/fields/${categoryname}`
    );
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "deleteProduct",
  async ({ productId, toast }) => {
    try {
      const response = await axios.delete(`/api/products/${productId}`);
      const { success, message } = response.data;

      if (success) {
        toast.success(message, {
          position: "top-right",
          style: { marginTop: "50px", marginRight: "10px" },
        });
      } else {
        toast.success(message, {
          position: "top-right",
          style: { marginTop: "50px", marginRight: "10px" },
        });
      }

      return { success, message };
    } catch (error) {
      toast.error(error.response?.data?.message || error.message, {
        position: "top-right",
        style: { marginTop: "50px", marginRight: "10px" },
      });
      return error.message;
    }
  }
);
export const deleteCategory = createAsyncThunk(
  "deleteCategory",
  async ({ categoryId, toast }) => {
    try {
      const response = await axios.delete(`/api/admin/category/${categoryId}`);
      const { success, message } = response.data;

      if (success) {
        toast.success(message, {
          position: "top-right",
          style: { marginTop: "50px", marginRight: "10px" },
        });
      } else {
        toast.success(message, {
          position: "top-right",
          style: { marginTop: "50px", marginRight: "10px" },
        });
      }

      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || error.message, {
        position: "top-right",
        style: { marginTop: "50px", marginRight: "10px" },
      });
      return error.message;
    }
  }
);
export const updateCategory = createAsyncThunk(
  "updateCategory",
  async ({ categoryId, categoryData, toast }) => {
    try {
      const response = await axios.put(
        `/api/admin/category/${categoryId}`,
        categoryData
      );

      const { success, message } = response.data;

      if (success) {
        toast.success(message, {
          position: "top-right",
          style: { marginTop: "50px", marginRight: "10px" },
        });
      } else {
        toast.success(message, {
          position: "top-right",
          style: { marginTop: "50px", marginRight: "10px" },
        });
      }

      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || error.message, {
        position: "top-right",
        style: { marginTop: "50px", marginRight: "10px" },
      });

      return error.message;
    }
  }
);

export const deleteFieldFromCategory =
  (categoryId, fieldToRemove, toast) => async () => {
    try {
      const response = await axios.delete(
        `/api/admin/category/deleteField/${categoryId}`,
        {
          data: { fieldToRemove },
        }
      );
      const { success, message } = response.data;

      if (success) {
        toast.success(message, {
          position: "top-right",
          style: { marginTop: "50px", marginRight: "10px" },
        });
      } else {
        toast.success(message, {
          position: "top-right",
          style: { marginTop: "50px", marginRight: "10px" },
        });
      }
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || error.message, {
        position: "top-right",
        style: { marginTop: "50px", marginRight: "10px" },
      });

      // Return a rejected value
      return error.message;
    }
  };

export const deleteUser = createAsyncThunk(
  "deleteUser",
  async ({ userId, toast }) => {
    try {
      const response = await axios.delete(`/api/user/delete/${userId}`);

      const { success, message } = response.data;

      if (success) {
        toast.success(message, {
          position: "top-right",
          style: { marginTop: "50px", marginRight: "10px" },
        });
      } else {
        toast.success(message, {
          position: "top-right",
          style: { marginTop: "50px", marginRight: "10px" },
        });
      }
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || error.message, {
        position: "top-right",
        style: { marginTop: "50px", marginRight: "10px" },
      });
    }
  }
);

export const filterProductsByCategory = createAsyncThunk(
  "filterProductsByCategory",
  async (category) => {
    try {
      const response = await axios.get(`/api/products/category/${category}`);
      console.log("API Response:", response.data); // Log the response
      return response.data.data;
    } catch (error) {
      console.error("API Error:", error.message); // Log the error
      throw new Error(error.message);
    }
  }
);

export const filterProductsByRange = createAsyncThunk(
  "user/filterProductsByRange",
  async ({ min, max }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/products/filterProductsByRange`, {
        params: { min, max },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const searchProducts = createAsyncThunk(
  "searchProducts",
  async (searchQuery) => {
    try {
      const response = await axios.get(
        `/api/products/search?query=${searchQuery}`
      );
      return response.data.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const userAddToWishlist = createAsyncThunk(
  "userAddToWishlist",
  async ({ productId, userId, toast }) => {
    try {
      const response = await axios.post("/api/AddToWishlist", {
        productId,
        userId,
      });
      const { success, message } = response.data;

      // Check if the product is already in the wishlist
      if (!success) {
        toast.success(message, {
          position: "top-right",
          style: { marginTop: "50px", marginRight: "10px" },
        });
      }

      return response.data.data;
    } catch (error) {
      toast.error(error.response?.data?.message || error.message, {
        position: "top-right",
        style: { marginTop: "50px", marginRight: "10px" },
      });
    }
  }
);

export const userRemoveToWishlist = createAsyncThunk(
  "userRemoveToWishlist",
  async ({ productId, userId, toast },{dispatch}) => {
    try {
      const response = await axios.post("/api/RemoveWishlsit", {
        productId,
        userId,
      });
      const { success, message } = response.data;

      dispatch(UserValidation())
      if (!success) {
        toast.success(message, {
          position: "top-right",
          style: { marginTop: "50px", marginRight: "10px" },
        });
      }
      return response.data.data;
    } catch (error) {
      toast.error(error.response?.data?.message || error.message, {
        position: "top-right",
        style: { marginTop: "50px", marginRight: "10px" },
      });
    }
  }
);




// export const userAddToCart = createAsyncThunk(
//   "userAddToCart",
//   async ({ productId, userId, quantity = 1, toast }, { rejectWithValue }) => {
//     try {
//       // Ensure quantity is a valid number
//       const validQuantity = Number(quantity);
//       if (isNaN(validQuantity) || validQuantity <= 0) {
//         throw new Error("Invalid quantity value");
//       }

//       // Fetch product details
//       const productResponse = await axios.get(`/api/products/${productId}`);
//       console.log("Product Response:", productResponse.data); // Debugging line

//       // Ensure product price is a valid number
//       const productPrice = Number(productResponse.data.price);

//       console.log("productsPrice:",productPrice)
//       if (isNaN(productPrice) || productPrice <= 0) {
//         throw new Error("Invalid product price");
//       }

//       // Calculate subtotal
//       const subTotal = productPrice * validQuantity;
//       console.log("Subtotal Calculation:", subTotal); // Debugging line

//       // Ensure subTotal is a valid number
//       if (isNaN(subTotal) || subTotal <= 0) {
//         throw new Error("Invalid subtotal value");
//       }

//       // Send request to add item to cart
//       const response = await axios.post("/api/addToCart", {
//         productId,
//         userId,
//         quantity: validQuantity,
//         subTotal
//       });

//       const { success, message } = response.data;

//       if (!success) {
//         toast.success(message, {
//           position: "top-right",
//           style: { marginTop: "50px", marginRight: "10px" },
//         });
//       }

//       return response.data.data;
//     } catch (error) {
//       toast.error(error.response?.data?.message || error.message, {
//         position: "top-right",
//         style: { marginTop: "50px", marginRight: "10px" },
//       });
//       return rejectWithValue(error.message);
//     }
//   }
// );




export const userAddToCart = createAsyncThunk(
  "userAddToCart",
  async ({ productId, userId, toast }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/addToCart", {
        productId,
        userId,
      });

      console.log(response.data)
      const { success, message } = response.data;

      if (!success) {
        toast.success(message, {
          position: "top-right",
          style: { marginTop: "50px", marginRight: "10px" },
        });
      }

      return response.data.data;
    } catch (error) {
      toast.error(error.response?.data?.message || error.message, {
        position: "top-right",
        style: { marginTop: "50px", marginRight: "10px" },
      });
      return rejectWithValue(error.message);
    }
  }
);
