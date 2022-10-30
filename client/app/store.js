import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../features/auth/authSlice";
import productReducer from "../features/products/productSlice";
import orderReducer from "../features/cart/ordersSlice";
import orderProductsReducer from "../features/cart/orderProductsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    order: orderReducer,
    orderProducts: orderProductsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../features/auth/authSlice";
