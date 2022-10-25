import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//*GET thunk for all products
export const fetchProducts = createAsyncThunk("/products", async () => {
  try {
    const { data } = await axios.get("/api/products");
    return data;
  } catch (e) {
    console.log(e.message);
  }
});

export const productSlice = createSlice({
  name: "product",
  initialState: { products: [], product: {} },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
  },
});

export const selectProduct = (state) => state.product;
export const selectProducts = (state) => state.products;
export default productSlice.reducer;
