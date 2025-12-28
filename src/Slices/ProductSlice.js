import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { backendUrl } from "../config";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "/fetch/products",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(backendUrl + "/api/product/list");
      return res.data.products;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.response || error.message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
