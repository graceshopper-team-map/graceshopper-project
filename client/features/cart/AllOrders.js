import React, { useEffect, useState } from "react";
import { fetchAllUserOrders } from "./ordersSlice";
import { useSelector, useDispatch } from "react-redux";

const AllOrders = () => {
  const userId = useSelector((state) => state.auth.me.id);
  const dispatch = useDispatch();
  const userOrders = useSelector((state) => state.order.allUserOrders);

  useEffect(() => {
    if (userId) {
      dispatch(fetchAllUserOrders(userId));
    }
  }, []);

  const fullfilledOrders = userOrders.filter(
    (order) => order.status === "fullfilled"
  ).reverse();

  console.log(fullfilledOrders);
  return (
    <div>
      <h2>Order History:</h2>
      {fullfilledOrders[0] ? fullfilledOrders.map((orders) => (
        <div key={orders.id}>
          <hr/>
          <h3>Order Number: {orders.id}</h3>
          <div>
            {orders?.products.map((product) => (
              <div key = {product.id} >
                <div>Item Purchased: {product.name}</div>
                <div>Item Price: {product.price}</div>
                <div>Amount Purchased: {product.GameOrder.quantity}</div>
              </div>
            ))}
          </div>
        </div>
      )) : <h3>No orders found.</h3>}
    </div>
  );
};

export default AllOrders;
