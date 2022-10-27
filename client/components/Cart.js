import React, { useEffect, useState } from "react";
import { fetchAllOrders } from "../features/slices/ordersSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Cart = (prop) => {
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.order.orders);
  console.log(orders);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, []);

  return (
    <div className="cart-wrapper">
      <div>
        <h2>My Cart:</h2>
      </div>

      {orders &&
        orders.map((order) => (
          <div key={order.id}>
            <p>{order.status + " " + order.userId}</p>
            <p>{order.products.name}</p>
          </div>
        ))}
    </div>
  );
};

export default Cart;
