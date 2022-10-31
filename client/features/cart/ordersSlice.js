import {
  createAsyncThunk,
  createSlice,
  current,
  original,
} from "@reduxjs/toolkit";
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

export const fetchAllUserOrders = createAsyncThunk(
  "orderHistory",
  async (userId) => {
    try {
      const { data } = await axios.get(`/api/orders/user2/${userId}`);
      return data;
    } catch (e) {
      console.log("oops");
    }
  }
);

export const addOrder = createAsyncThunk(
  "addOrder",
  async (userId, orderId, productId) => {
    try {
      const { data } = await axios.post(
        `/api/orders/user/${userId}/${orderId}}`,
        {
          productId,
          quantity,
        }
      );
      return data;
    } catch (e) {
      console.log("oops");
    }
  }
);

export const removeProduct = createAsyncThunk(
  "removeItem",
  async (productId) => {
    try {
      const { data } = await axios.delete(`/api/orders/users/${productId}`);
      console.log("iamdata", data);
      return data;
    } catch (e) {
      console.log("oops");
    }
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState: { orders: [], order: {}, userOrders: [], allUserOrders: [] },
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.userOrders.find(
        (item) => item.id === action.payload.id
      );
      if (itemInCart) {
        itemInCart.quantity--;
        itemInCart.GameOrder.quantity++;
      } else {
        state.userOrders.push({
          ...action.payload,
          GameOrder: { quantity: 1 },
        });
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.userOrders.find((item) => item.id === action.payload);
      if (item.quantity === 1) {
        item.GameOrder.quantity = 1;
      } else {
        item.GameOrder.quantity++;
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.userOrders.find((item) => item.id === action.payload);
      if (item.quantity === 1) {
        item.GameOrder.quantity = 1;
      } else {
        item.GameOrder.quantity--;
        if (item.GameOrder.quantity <= 0) {
          const removeItem = state.userOrders.filter(
            (item) => item.id !== action.payload
          );

          state.userOrders = removeItem;
        }
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
    builder.addCase(fetchAllUserOrders.fulfilled, (state, action) => {
      state.allUserOrders = action.payload
    })
    builder
      .addCase(addOrder.fulfilled, (state, action) => {
        state.userOrders.push(action.payload);
      })
      .addCase(removeProduct.fulfilled, async (state, action) => {
        const removeItem = state.userOrders.filter(
          (item) => item.id !== action.payload
        );
        state.userOrders = removeItem;
      });
  },
});

export const selectOrder = (state) => state.order;
export const selectOrders = (state) => state.orders;
export default orderSlice.reducer;
export const { addToCart, incrementQuantity, decrementQuantity, removeItem } =
  orderSlice.actions;
