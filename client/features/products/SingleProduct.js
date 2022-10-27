import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct } from "./productSlice.js";
import Loading from "../loading/Loading.js";

const SingleProduct = () => {
  const product = useSelector((state) => state.product.product);
  const { productId } = useParams();
  const dispatch = useDispatch();

  const { name, imageUrl, description, price } = product;

  useEffect(() => {
    dispatch(fetchSingleProduct(productId));
  }, []);

  return (
    <div className="single-product-wrapper">
      <div className="product-image-container">
        <img className="product-image" src={imageUrl} />
      </div>
      <div className="product-info">
        <h3>{name + "    " + `$${price}`}</h3>
        <p>{description}</p>
        <button>Add to Cart</button>
      </div>
    </div>
  );
};

export default SingleProduct;
