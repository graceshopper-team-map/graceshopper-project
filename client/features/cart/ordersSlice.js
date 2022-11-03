import {
  createAsyncThunk,
  createSlice,
  current,
  original,
} from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";
import { removeGameOrder } from "./orderProductsSlice";

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

export const fetchUserOrder = createAsyncThunk("orders/:userId", async () => {
  try {
    const token = window.localStorage.getItem("token");
    if (token) {
      const { data } = await axios.get(`/api/orders/cart`, {
        headers: { authorization: token },
      });
      return data;
    }
  } catch (e) {
    console.log("oops");
  }
});

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
  async ({ productId, quantity }) => {
    try {
      const token = window.localStorage.getItem("token");
      if (token) {
        const { data } = await axios.post(
          `/api/orders/cart`,
          { productId, quantity },
          {
            headers: { authorization: token },
          }
        );
        return data;
      }
    } catch (e) {
      console.log("oops");
    }
  }
);

//increment order
export const incrementGame = createAsyncThunk(
  "incrementGame",
  async ({ productId, quantity }) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const { data } = await axios.put(
        `/api/orders/${productId}/add`,
        { quantity },
        { headers: { authorization: token } }
      );
      return data;
    }
  }
);

export const decrementGame = createAsyncThunk(
  "decrementGame",
  async ({ productId, quantity }) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      if (quantity > 1) {
        const { data } = await axios.put(
          `/api/orders/${productId}/sub`,
          { quantity },
          { headers: { authorization: token } }
        );
        return data;
      }
    }
  }
);

export const removeProduct = createAsyncThunk(
  "removeItem",
  async ({ productId }) => {
    try {
      const { data } = await axios.delete(`/api/orders/${productId}`);
      return data;
    } catch (e) {
      console.log("oops");
    }
  }
);

export const checkoutCart = createAsyncThunk(
  "checkoutCart",
  async (orderId) => {
    try {
      const { data } = await axios.put(`/api/orders/${orderId}`);
      return data;
    } catch (e) {
      console.log("oops");
    }
  }
);

export const createNewCart = createAsyncThunk(
  "createNewCart",
  async (userId) => {
    try {
      const { data } = await axios.post(`/api/orders/${userId}`);
      return data;
    } catch (e) {
      console.log("oops");
    }
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    order: {},
    userOrders: [],
    allUserOrders: [],
  },
  reducers: {},
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
      state.allUserOrders = action.payload;
    });
    builder.addCase(checkoutCart.fulfilled, (state, action) => {
      state.userOrders = [];
    });
    builder.addCase(createNewCart.fulfilled, (state, action) => {
      state.userOrders = action.payload;
    });
    builder
      .addCase(addOrder.fulfilled, (state, action) => {
        state.userOrders.push(action.payload);
      })
      .addCase(decrementGame.fulfilled, (state, action) => {
        state.userOrders = state.userOrders.filter((product) =>
          product.id === action.payload ? product : product
        );
      })
      .addCase(incrementGame.fulfilled, (state, action) => {
        state.userOrders = state.userOrders.filter((product) =>
          product.id === action.payload ? product : product
        );
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
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
