import React from "react";
import { Link } from "react-router-dom";

const Checkout = () => {
  return (
    <div>
      <h1>Order Confirmed! Thanks for shopping with us!</h1>
      <Link to={`/`}>Back to Home page</Link>
    </div>
  );
};

export default Checkout;
