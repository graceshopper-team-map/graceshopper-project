import React from "react";
import { useSelector } from "react-redux";

// o: you shouldn't be creating a new components folder and working off of that
//  you should be creating folders that represent an entity and then placing your
//  component in that folder along with its slice (if it has one)

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
      {/* o: please remove unused code */}
      {/* <Cart id={id} /> */}
      <AllProducts />
    </div>
  );
};

export default Home;
