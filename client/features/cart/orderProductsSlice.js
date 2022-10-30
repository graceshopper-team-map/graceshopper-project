import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchGameOrder = createAsyncThunk(
  "/orderProducts/:id",
  async (id) => {
    try {
      const { data } = await axios.get(`/api/orderProducts/${id}`);
      console.log("axios", data);
      return data;
    } catch (e) {
      console.log("oops");
    }
  }
);

export const addProduct = createAsyncThunk(
  "/orderProducts/:orderId",
  async (orderId, productId) => {
    try {
      const { data } = await axios.post(`/api/orderProducts/${orderId}`, {
        orderId,
        productId,
      });
      return data;
    } catch (e) {
      console.log("oops");
    }
  }
);

export const removeProduct = createAsyncThunk(
  "/orderProducts/:cartProductId",
  async (id) => {
    try {
      const {data} = await axios.delete('/api/order')
    } catch (e) {}
  }
);

export const orderProductsSlice = createSlice({
  name: "orderProducts",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGameOrder.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.push(action.payload);
    });
  },
});

export const selectOrder = (state) => state.orderProducts;
export default orderProductsSlice.reducer;
