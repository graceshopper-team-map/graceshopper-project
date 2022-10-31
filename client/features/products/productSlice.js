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

export const deleteProduct = createAsyncThunk(
  "deleteProduct",
  async (id) => {
    try {
      const { data } = await axios.delete(`/api/products/${id}`);
      return data;
    } catch (e) {
      console.log(e);
    }
  }
);

export const addProduct = createAsyncThunk(
  "addProduct",
  async ({ name, price, quantity, description, genre }) => {
    try {
      const { data } = await axios.post("/api/products", {
        name,
        price,
        quantity,
        description,
        genre
      });
      return data;
    } catch (e) {
      console.log(e);
    }
  }
);

export const editProduct = createAsyncThunk(
  "editProduct",
  async ({ productId, name, price, quantity, description }) => {
    try {
      const { data } = await axios.put(`/api/products/${productId}`, {
        name,
        price,
        quantity,
        description,
      });
      return data;
    } catch (e) {
      console.log(e);
    }
  }
);

//*createSlice for products and all products
export const productSlice = createSlice({
  name: "product",
  initialState: { products: [], product: {} },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.product = action.payload;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.product = action.payload;
      })
  },
});

export const selectProduct = (state) => state.product;
export const selectProducts = (state) => state.products;
export default productSlice.reducer;
