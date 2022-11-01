import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchGameOrder = createAsyncThunk(
  "/orderProducts/:id",
  async (userId) => {
    try {
      const { data } = await axios.get(`/api/orderProducts/${userId}`);
      return data;
    } catch (e) {
      console.log("oops");
    }
  }
);

export const deleteGameFromCart = createAsyncThunk(
  "/orderProducts/:userId/:productId",
  async ({ userId, productId }) => {
    try {
      const { data } = await axios.delete(
        `/api/orderProducts/${userId}/${productId}`
      );

      return data;
    } catch (e) {
      console.log("oops");
    }
  }
);

export const addGameOrder = createAsyncThunk(
  "addGameOrder",
  async ({ orderId, productId }) => {
    try {
      const { data } = await axios.post(
        `/api/orderProducts/${orderId}/${productId}`
      );
      return data;
    } catch (e) {
      console.log("oops");
    }
  }
);

export const editGameOrder = createAsyncThunk(
  "editGameOrder",
  async ({ orderId, productId }) => {
    try {
      // const response = await axios.get(`/api/orderProducts/${orderId}/${productId}`)
      // console.log(response)
      const {data} = await axios.put(
        `/api/orderProducts/${orderId}/${productId}`
      );
      console.log("axios", data)
      return data;
    } catch (e) {
      console.log("oops");
    }
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
    builder.addCase(addGameOrder.fulfilled, (state, action) => {
      state.push(action.payload);
    });
  },
});

export const selectOrder = (state) => state.orderProducts;
export default orderProductsSlice.reducer;
