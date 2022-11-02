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

export const addGameOrder = createAsyncThunk(
  "addGameOrder",
  async ({ productId }) => {
    try {
      const token = window.localStorage.getItem("token");
      if (token) {
        const { data } = await axios.post(`/api/orderProducts/${productId}`, {
          headers: { authorization: token },
        });
        return data;
      }
    } catch (e) {
      console.log("oops");
    }
  }
);

// corresponding thunk to incrementing of item in cart
export const editGameOrder = createAsyncThunk(
  "editGameOrder",
  async ({ productId }) => {
    try {
      const token = window.localStorage.getItem("token");
      if (token) {
        const { data } = await axios.put(`/api/orderProducts/${productId}`, {
          headers: { authorization: token },
        });
        return data;
      }
    } catch (e) {
      console.log(e);
    }
  }
);

export const removeGameOrder = createAsyncThunk(
  "removeGameOrder",
  async ({ productId }) => {
    try {
      const token = window.localStorage.getItem("token");

      if (token) {
        const { data } = await axios.delete(`/api/orderProducts/${productId}`, {
          headers: { authorization: token },
        });
        return data;
      }
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
    builder.addCase(editGameOrder.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(addGameOrder.fulfilled, (state, action) => {
      state.push(action.payload);
    });
    builder.addCase(removeGameOrder.fulfilled, (state, action) => {
      state = state.filter((product) => product.id !== product);
    });
  },
});

export const selectOrder = (state) => state.orderProducts;
export default orderProductsSlice.reducer;
