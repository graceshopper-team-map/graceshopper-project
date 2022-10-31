import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar } from "../features";
import { fetchUserOrder } from "../features/cart/ordersSlice";

import AppRoutes from "./AppRoutes";

const App = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.me.id);
  const userOrder = useSelector((state) => state.order.userOrders);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserOrder(userId));
    }
  }, [userId, dispatch]);
  return (
    <div>
      <Navbar userOrder={userOrder} />
      <AppRoutes userOrder={userOrder} userId={userId} />
    </div>
  );
};

export default App;
