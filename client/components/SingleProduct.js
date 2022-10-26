import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct } from "../features/slices/productSlice";
import Loading from "./Loading.js";

const SingleProduct = () => {
  const product = useSelector((state) => state.product.products);
  const { id } = useParams();
  const dispatch = useDispatch();
  console.log(product);

  //   useEffect(() => {
  //     dispatch(fetchSingleProduct(id));
  //   }, []);

  return <div>Hi</div>;
};

export default SingleProduct;
