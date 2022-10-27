import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllOrders = createAsyncThunk("/orders", async () => {
  try {
    const { data } = await axios.get(`/api/orders`);
    return data;
  } catch (e) {
    console.log("oops");
  }
});

export const fetchUserOrders = createAsyncThunk(
  "/orders/:userId",
  async (userId) => {
    try {
      const { data } = await axios.get(`/api/orders/${userId}`);
      return data;
    } catch (e) {
      console.log("oops");
    }
  }
);

export const fetchSingleOrder = createAsyncThunk(
  "/orders/:userId/:orderId",
  async (userId, orderId) => {
    try {
      const { data } = await axios.get(`/api/${userId}/${orderId}`);
      return data;
    } catch (e) {
      console.log("oops");
    }
  }
);

export const addOrder = createAsyncThunk("addOrder", async () => {
  try {
    const { data } = await axios.post(`/api/orders}`);
    return data;
  } catch (e) {
    console.log("oops");
  }
});

export const orderSlice = createSlice({
  name: "order",
  initialState: { orders: [], order: {}, userOrders: []},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
    builder.addCase(fetchSingleOrder.fulfilled, (state, action) => {
      state.order = action.payload;
    });
    builder.addCase(fetchUserOrders.fulfilled, (state, action) => {
      state.userOrders = action.payload;
    });
    builder.addCase(addOrder.fulfilled, (state, action) => {
      state.order = action.payload;
    });
  },
});

export const selectOrder = (state) => state.order;
export const selectOrders = (state) => state.orders;
export default orderSlice.reducer;
