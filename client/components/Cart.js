import React, { useEffect, useState } from "react";
import { fetchUserOrders } from "../features/slices/ordersSlice";
import { useSelector, useDispatch } from "react-redux";

const Cart = () => {
  const userId = useSelector((state) => state.auth.me.id);
  const dispatch = useDispatch();

  let userOrder = useSelector((state) => state.order.userOrders);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserOrders(userId));
    }
  }, [userId]);

  const currentOrder = userOrder.filter(
    (order) => order.status === "unfullfilled"
  );

  return (
    <div className="cart-wrapper">
      <div>
        <h2>My Cart:</h2>
      </div>
      <div>
        {currentOrder[0]?.products?.map((product) => {
          return (
            <div key={product.id}>
              <p>{product.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cart;
