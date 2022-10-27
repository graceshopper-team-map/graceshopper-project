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

//*GET thunk for single product
export const fetchSingleProduct = createAsyncThunk(
  "/products/:productId",
  async (id) => {
    try {
      const { data } = await axios.get(`/api/products/${id}`);
      return data;
    } catch (e) {
      console.log("oops");
    }
  }
);

//*createSlice for products and all products
export const productSlice = createSlice({
  name: "product",
  // o: test? 🤔
  initialState: { products: [], product: {}, test: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.product = action.payload;
      });
  },
});

export const selectProduct = (state) => state.product;
export const selectProducts = (state) => state.products;
export default productSlice.reducer;
