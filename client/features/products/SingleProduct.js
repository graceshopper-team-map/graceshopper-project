import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct } from "./productSlice.js";
import EditProduct from "./EditProduct.js";
import Loading from "../loading/Loading.js";
import { addOrder } from "../cart/ordersSlice.js";

import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  CardActionArea,
  Button,
  Grid,
  Container,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const SingleProduct = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.product);
  const user = useSelector((state) => state.user.user);

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
        <p>Quantity: {quantity > 0 ?? "OUT OF STOCK"}</p>
        <p>Description: {description}</p>
        <p>Genre: {genre}</p>
        {quantity > 0 ? (
          <Button
            size="large"
            className="custom-button"
            onClick={() => dispatch(addOrder({ productId: productId }))}
          >
            <AddShoppingCartIcon /> Add to Cart
          </Button>
        ) : (
          "OUT OF STOCK, COME BACK LATER"
        )}
      </div>
    </div>
  );
};

export default SingleProduct;
