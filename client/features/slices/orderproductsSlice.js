import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProductsId = createAsyncThunk(
  "/orderproducts/:id",
  async (id) => {
    try {
      const { data } = await axios.get(`/api/orderproducts/${id}`);
      return data;
    } catch (e) {
      console.log("oops");
    }
  }
);

export const orderproductsSlice = createSlice({
  name: "orderproducts",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductsId.fulfilled, (state, action) => {
        return action.payload;
    });
  },
});

export const selectOrder = (state) => state.orderproducts;
export default orderproductsSlice.reducer;