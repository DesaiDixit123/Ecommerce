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
  async ({ productId, userId, toast }, { dispatch }) => {
    try {
      const response = await axios.post("/api/RemoveWishlsit", {
        productId,
        userId,
      });
      const { success, message } = response.data;

      dispatch(UserValidation());
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

export const userAddToCart = createAsyncThunk(
  "userAddToCart",
  async ({ productId, userId, quantity, subTotal, toast }) => {
    try {
      const response = await axios.post("/api/addToCart", {
        productId,
        userId,
        quantity,
        subTotal,
      });

      console.log("Response from addToCart:", response.data);
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
      return error.message;
    }
  }
);

export const getCartByUserId = createAsyncThunk(
  "getCartByuserId",
  async (userId) => {
    try {
      const response = await axios.get(`/api/cart/${userId}`);

      return response.data.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const updateCart = createAsyncThunk(
  "updateCart",
  async ({ userId, items }) => {
    try {
      // Make a POST request with the payload
      const response = await axios.put("/api/updateCart", { userId, items });
      return response.data; // Return the data from the response
    } catch (error) {
      // Return the error message if the request fails
      return error.response ? error.response.data : error.message;
    }
  }
);

export const clearCart = createAsyncThunk("clearCart", async (userId) => {
  try {
    const response = await axios.delete(`/api/clearCart/${userId}`);

    return response.data;
  } catch (error) {
    return error.message;
  }
});

export const removeProductFromCart = createAsyncThunk(
  "removeProductFromCart",
  async ({ userId, productId }) => {
    try {
      const response = await axios.delete(
        `/api/cart/${userId}/product/${productId}`
      );

      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const fetchRelatedProducts = createAsyncThunk(
  "relatedProducts/fetch",
  async (productId) => {
    try {
      const response = await axios.get(`/api/related/${productId}`);
      console.log("related products:", response.data.data);
      return response.data.data;
    } catch (error) {
      console.error("API Error:", error.message); // Better error logging
      throw new Error(error.message);
    }
  }
);

export const fetchAllCountries = createAsyncThunk("AllCountries", async () => {
  try {
    const response = await axios.get("/api/countries");
    return response.data.data;
  } catch (error) {
    return error.message;
  }
});
export const fetchAllStatesByCountry = createAsyncThunk(
  "fetchAllStatesByCountry",
  async (countryCode) => {
    try {
      const response = await axios.get(`/api/states/${countryCode}`);
      return response.data.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const fetchAllCitiesByStateAndCountry = createAsyncThunk(
  "fetchAllCitiesByStateAndCountry",
  async ({ stateCode, countryCode }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/api/cities/${stateCode}/${countryCode}`
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// export const fetchPlaceOrderApi = createAsyncThunk(
//   "fetchPlaceOrderApi",
//   async ({orderData,userData,dispatch,toast,navigate,setShowPopup}) => {
//     try {
//       const response = await axios.post("/api/placeOrder",orderData);
//       console.log(response.data);

//       const { success, message } = response.data;
//       if (success) {

//         await dispatch(clearCart(userData._id));
//         dispatch(getCartByUserId(userData._id))
//         // toast.success("Order Placed successfully!");
//         setShowPopup(true)

//         setTimeout(() => {

//           // setShowPopup(false)
//           navigate("/");
//         }, 3000);
//       } else {
//         toast.success(message)
//       }
//       return response.data;
//     } catch (error) {
//       toast.error(error.message)
//     }
//   }
// );

export const fetchPlaceOrderApi = createAsyncThunk(
  "fetchPlaceOrderApi",
  async ({ orderData, userData, dispatch, toast, navigate, setShowPopup }) => {
    try {
      const response = await axios.post("/api/placeOrder", orderData);
      console.log(response.data);

      const { process, message, data } = response.data;
      if (process) {
        toast.success(message);
        await dispatch(clearCart(userData._id));
        await dispatch(getCartByUserId(userData._id));
        dispatch(getAllOrdersShowByAdmin())

        setShowPopup(true);

        setTimeout(() => {
          setShowPopup(false);
          navigate("/");
        }, 3000);
      } else {
        toast.error(message || "An error occurred while placing the order.");
      }
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(errorMessage);
    }
  }
);

// export const getAllOrdersByUserId = createAsyncThunk(
//   "getAllOrdersByUserId",
//   async (userId) => {
//     try {
//       const response = await axios.get(`/order/${userId}`);

//       console.log(response.data);
//       return response.data.data;
//     } catch (error) {
//       return error.message;
//     }
//   }
// );




export const getAllOrdersByUserId = createAsyncThunk(
  'user/getAllOrdersByUserId',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/order/${userId}`);
      console.log("Usrrorders data response:",response.data.data)
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const userOrderCancellation = createAsyncThunk(
  "userorderCancellation",
  async ({userId, orderId, orderNumber, reason, comment}, thunkAPI) => {
    try {
      const response = await axios.patch(`/api/order/cancel/${userId}/${orderId}/${orderNumber}`, {
        reason,
        comment
      });
      return response.data;
    } catch (error) {
      console.error("Error cancelling order:", error.response ? error.response.data : error.message);
      return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);


export const getAllOrdersShowByAdmin = createAsyncThunk(
  "getAllOrdersShowByAdmin",
  async () => {
    try {
      const response = await axios.get("/api/orders")
      console.log(response.data)
      return response.data
    } catch (error) {
      return error.message
    }
  }
)



// usersProducst



export const usersGetAllProductsFecthApi = createAsyncThunk("usersGetAllProductsFecthApi", async () => {
  const response = await axios.get("/api/users/products");
  return response.data;
});

export const usersGetAllCategories2 = createAsyncThunk("usersGetAllCategories2", async () => {
  const response = await axios.get("/api/users/get/category");
  console.log(response.data)
  return response.data;
});

export const usersCategoryByFieldsFetchApi = createAsyncThunk(
  "usersCategoryByFieldsFetchApi",
  async (categoryname) => {
    const response = await axios.get(
      `/api/users/get/category/fields/${categoryname}`
    );

    console.log("categopriesData:",response.data)
    return response.data;
  }
);

export const usersDeleteProduct = createAsyncThunk(
  "usersDeleteProduct",
  async ({ productId, toast }) => {
    try {
      const response = await axios.delete(`/api/users/products/${productId}`);
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
export const usersDeleteCategory = createAsyncThunk(
  "usersDeleteCategory",
  async ({ categoryId, toast }) => {
    try {
      const response = await axios.delete(`/api/users/category/${categoryId}`);
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
export const usersUpdateCategory = createAsyncThunk(
  "usersUpdateCategory",
  async ({ categoryId, categoryData, toast }) => {
    try {
      const response = await axios.put(
        `/api/users/category/${categoryId}`,
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

export const usersDeleteFieldFromCategory =
  (categoryId, fieldToRemove, toast) => async () => {
    try {
      const response = await axios.delete(
        `/api/users/category/deleteField/${categoryId}`,
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


  export const usersCategoryFetchApi = createAsyncThunk(
    "usersCategoryFetchApi",
    async ({ formdata, setFormdata, toast }) => {
      try {
        // Make sure formdata includes both categoryname and fields
  
        const response = await axios.post("/api/users/category", formdata);
  
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
  
  export const usersProductAddFetchApi = createAsyncThunk(
    "usersProductAddFetchApi",
    async ({ formdata, setFormdata, toast }) => {
      try {
        const response = await axios.post("/api/users/pending/products", formdata, {
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
  
  export const usersProductUpdatedFetchApi = createAsyncThunk(
    "usersProductUpdatedFetchApi",
    async ({ formdata, productId ,toast}) => {
      try {
        const response = await axios.put(`/api/users/products/${productId}`, formdata, {
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
  

export const usersFilterProductsByCategory = createAsyncThunk(
  "usersFilterProductsByCategory",
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

export const getNotification = createAsyncThunk(
  "getNotification",
  async () => {
    try {
      const response = await axios.get("/api/adminNotification")
      console.log(response.data.data)
      return response.data.data
    } catch (error) {
      return error.message
    }
  }
)


export const getUsersCategoryAdded = createAsyncThunk(
  "getUsersCategoryAdded",
  async () => {
    try {
      const response = await axios.get("/api/pendingCategoryUsers")
      console.log(response.data.data)
      return response.data.data
    } catch (error) {
      return error.message
    }
  }
)