import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllOrders = createAsyncThunk(
  '/orders/:userId',
  async (id) => {
    try {
      console.log(id);
      const { data } = await axios.get(`/api/orders/${id}`);
      console.log(data);
      return data;
    } catch (e) {
      console.log('oops');
    }
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState: { orders: [], order: {}, test: null },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
  },
});

export const selectOrder = (state) => state.order;
export const selectOrders = (state) => state.orders;
export default orderSlice.reducer;
