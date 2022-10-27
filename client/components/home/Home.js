import React from "react";
import { useSelector } from "react-redux";

/**
 * COMPONENT
 */
import Cart from "../Cart.js";
import AllProducts from "../products/AllProducts.js";

const Home = (props) => {
  const username = useSelector((state) => state.auth.me.username);
  const id = useSelector((state) => state.auth.me.id);
  console.log("I am the id: ", id);

  return (
    <div>
      <h3>Welcome, {username ?? " to GameMAP"}</h3>
      {/* <Cart id={id} /> */}
      <AllProducts />
    </div>
  );
};

export default Home;
