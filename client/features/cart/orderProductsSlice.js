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
      const { data } = await axios.delete("/api/orderProducts/${orderId}");
      console.log("bitch deleted");
      return data;
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
    builder
      .addCase(addProduct.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        const removeItem = state.filter((item) => item.id !== action.payload);
        console.log("removed", removeItem);
        state = removeItem;
      });
  },
});

export const selectOrder = (state) => state.orderProducts;
export default orderProductsSlice.reducer;
