import React, { useEffect, useState } from 'react';
import { fetchAllOrders } from '../features/slices/ordersSlice';
import { useSelector, useDispatch } from 'react-redux';

const Cart = (props) => {
  const dispatch = useDispatch();
  const { id } = props;
  const orders = useSelector((state) => state.order.orders);

  useEffect(() => {
    dispatch(fetchAllOrders(id));
  }, [id]);
  return (
    <div>
      {orders &&
        orders.map((order) => {
          return <p>{order.status}</p>;
        })}
    </div>
  );
};

export default Cart;
