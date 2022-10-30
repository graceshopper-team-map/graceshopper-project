import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
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

export const removeProduct = createAsyncThunk(
  "removeItem",
  async (userId, orderId, productId) => {
    try {
      const { data } = await axios.delete(
        `/api/orders/user/${userId}/${orderId},${productId}`
      );
      console.log("iamdata", data);
      return data;
    } catch (e) {
      console.log("oops");
    }
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState: { orders: [], order: {}, userOrders: [] },
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.userOrders[0].products.find(
        (item) => item.id === action.payload.id
      );
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.userOrders[0].products.push({ ...action.payload, quantity: 1 });
      }
      console.log("clicked");
    },
    incrementQuantity: (state, action) => {
      const item = state.userOrders.find((item) => item.id === action.payload);
      console.log("I AM AN ITEM???", current(item));
      if (item.quantity === 1) {
        item.GameOrder.quantity = 1;
      } else {
        item.GameOrder.quantity++;
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.userOrders.find((item) => item.id === action.payload);
      console.log("I AM AN ITEM???", current(item));
      if (item.quantity === 1) {
        item.GameOrder.quantity = 1;
      } else {
        item.GameOrder.quantity--;
      }
    },
    removeItem: (state, action) => {
      console.log("REMOVE_REDUCER", action.payload, current(state.userOrders));
      // const removeItem = state.userOrders.filter(
      //   (item) => item.id !== action.payload
      // );
      const removeItem = state.userOrders.splice(action.payload, 1);
      state.cart = removeItem;
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
    builder
      .addCase(addOrder.fulfilled, (state, action) => {
        state.order = action.payload;
      })
      .addCase(removeProduct.fulfilled, async (state, action) => {
        console.log("I tried my best");
        console.log(
          "REMOVE_REDUCER",
          action.payload,
          current(state.userOrders)
        );
        // const removeItem = state.userOrders.filter(
        //   (item) => item.id !== action.payload
        // );
        const removeItem = state.userOrders.splice(action.payload, 1);
        state.cart = removeItem;
      });
  },
});

export const selectOrder = (state) => state.order;
export const selectOrders = (state) => state.orders;
export default orderSlice.reducer;
export const { addToCart, incrementQuantity, decrementQuantity, removeItem } =
  orderSlice.actions;
