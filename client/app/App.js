import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar } from "../features";
import { fetchUserOrder } from "../features/cart/ordersSlice";

import AppRoutes from "./AppRoutes";

const App = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.me.id);
  const userOrder = useSelector((state) => state.order.userOrders);
  console.log("APP USER ORDER:", userOrder);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserOrder(userId));
    }
  }, []);

  return (
    <div>
      <Navbar />
      <AppRoutes />
    </div>
  );
};

export default App;
