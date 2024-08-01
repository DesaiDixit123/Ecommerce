import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const RegisterUser = createAsyncThunk(
  "RegisterUser",
  async (form) => {
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
  }
);

export const getAllCountriesWithPhoneCodes = createAsyncThunk(
    "AllCountriesWithPhoneCodes",
    async () => {
      try {
        const response = await axios.get("/api/countrieswithphonecodes");
        console.log("Thunk Response Data:", response.data); // Check the data here
        return response.data;
      } catch (error) {
        console.error("Error fetching countries:", error.response.data);
        return [];
      }
    }
  );
  