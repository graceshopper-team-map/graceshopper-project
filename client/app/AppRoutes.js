import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AuthForm from "../features/auth/AuthForm";
import { me } from "./store";

/**
 * COMPONENTS
 */
import {
  AllProducts,
  Cart,
  Home,
  SingleProduct,
  AllUsers,
  SingleUser,
  AllOrders,
  Checkout,
} from "../features";
import { fetchProducts } from "../features/products/productSlice";

const AppRoutes = ({ userId, userOrder }) => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    dispatch(me());
    dispatch(fetchProducts());
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route to="/home" element={<Home />} />
          <Route path="/cart" element={<Cart isLoggedIn={isLoggedIn} />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:productId" element={<SingleProduct />} />
          <Route path="/profile" element={<SingleUser />} />
          <Route path="/orders" element={<AllOrders />} />
          {user.isAdmin ? <Route path="/users" element={<AllUsers />} /> : null}
        </Routes>
      ) : (
        <Routes>
          <Route
            path="/*"
            element={<AuthForm name="login" displayName="Login" />}
          />
          <Route
            path="/login"
            element={<AuthForm name="login" displayName="Login" />}
          />
          <Route
            path="/signup"
            element={<AuthForm name="signup" displayName="Sign Up" />}
          />
          <Route path="/home" element={<Home />} />
          <Route path="/cart" element={<Cart isLoggedIn={isLoggedIn} />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:productId" element={<SingleProduct />} />
        </Routes>
      )}
    </div>
  );
};

export default AppRoutes;
