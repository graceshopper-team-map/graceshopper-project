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

export const orderProductsSlice = createSlice({
  name: "orderProducts",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGameOrder.fulfilled, (state, action) => {
      return action.payload;
    });

    builder.addCase(deleteGameFromCart.fulfilled, (state, action) => {
      console.log("PAYLOAD: ", action.payload);
      return state.filter((item) => item.id !== action.payload);
    });
  },
});

export const selectOrder = (state) => state.orderProducts;
export default orderProductsSlice.reducer;
