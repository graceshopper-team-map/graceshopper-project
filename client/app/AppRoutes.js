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
          <Route path="/*" element={<Home products={products} />} />
          <Route to="/home" element={<Home products={products} />} />
          <Route
            path="/cart"
            element={
              <Cart
                isLoggedIn={isLoggedIn}
                products={products}
                userOrder={userOrder}
              />
            }
          />
          <Route
            path="/products"
            element={
              <AllProducts
                products={products}
                userId={userId}
                userOrder={userOrder}
              />
            }
          />
          <Route path="/products/:productId" element={<SingleProduct />} />
          <Route path="/profile" element={<SingleUser />} />
          {user && user.isAdmin ? (
            <Route path="/users" element={<AllUsers />} />
          ) : null}
        </Routes>
      ) : (
        <Routes>
          {/* <Route
            path="/*"
            element={<AuthForm name="login" displayName="Login" />}
          /> */}
          <Route
            path="/login"
            element={<AuthForm name="login" displayName="Login" />}
          />
          <Route
            path="/signup"
            element={<AuthForm name="signup" displayName="Sign Up" />}
          />
          <Route path="/home" element={<Home products={products} />} />
          <Route path="/cart" element={<Cart isLoggedIn={isLoggedIn} />} />
          <Route
            path="/products"
            element={
              <AllProducts
                products={products}
                userId={userId}
                userOrder={userOrder}
              />
            }
          />
          <Route path="/products/:productId" element={<SingleProduct />} />
        </Routes>
      )}
    </div>
  );
};

export default AppRoutes;
