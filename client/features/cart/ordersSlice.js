import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Action types
// fetch, add, remove, empty

export const fetchAllOrders = createAsyncThunk("/orders", async () => {
  try {
    const { data } = await axios.get(`/api/orders`);
    return data;
  } catch (e) {
    console.log("oops");
  }
});

export const fetchSingleOrder = createAsyncThunk(
  "/orders/:orderId",
  async (orderId) => {
    try {
      const { data } = await axios.get(`/api/orders/${orderId}`);
      return data;
    } catch (e) {
      console.log("oops");
    }
  }
);

export const fetchUserOrder = createAsyncThunk(
  "/orders/user/:userId",
  async (userId) => {
    try {
      const { data } = await axios.get(`/api/orders/user/${userId}`);
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
  initialState: { orders: [], order: {}, userOrders: [] },
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.userOrders.find(
        (item) => item.id === action.payload.id
      );
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.userOrders.push({ ...action.payload, quantity: 1 });
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.userOrders.find(
        (item) => item.id === action.payload.id
      );
      console.log("I am the item: ", action.payload);
      item.quantity++;
    },
    decrementQuantity: (state, action) => {
      const item = state.userOrders.find((item) => item.id === action.payload);
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },
    removeItem: (state, action) => {
      const removeItem = state.userOrders.filter(
        (item) => item.id !== action.payload
      );
      state.userOrders = removeItem;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
    builder.addCase(fetchSingleOrder.fulfilled, (state, action) => {
      state.order = action.payload;
    });
    builder.addCase(fetchUserOrder.fulfilled, (state, action) => {
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
export const { addToCart, incrementQuantity, decrementQuantity, removeItem } =
  orderSlice.actions;
