import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct } from "./productSlice.js";
import EditProduct from "./EditProduct.js";
import Loading from "../loading/Loading.js";
import { addOrder } from "../cart/ordersSlice.js";

const SingleProduct = () => {
  const product = useSelector((state) => state.product.product);
  const user = useSelector((state) => state.user.user);
  const { productId } = useParams();
  const dispatch = useDispatch();

  const { name, imageUrl, description, price, quantity, genre } = product;

  useEffect(() => {
    dispatch(fetchSingleProduct(productId));
  }, []);

  return (
    <div className="single-product-wrapper">
      {user.isAdmin ? <EditProduct /> : null}
      <div className="product-image-container">
        <img className="product-image" src={imageUrl} />
      </div>
      <div className="product-info">
        <h3>{name + "    " + `$${price}`}</h3>
        <p>Quantity: {quantity}</p>
        <p>Description: {description}</p>
        <p>Genre: {genre}</p>
        <button onClick={() => dispatch(addOrder({ productId: productId }))}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default SingleProduct;
