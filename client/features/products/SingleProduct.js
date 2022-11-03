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
import { Box } from "@mui/system";

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
    <div className="single-product-wrapper" style={{ margin: "50px" }}>
      {user.isAdmin ? <EditProduct /> : null}
      <Grid container spacing={1}>
        <Grid item={5}>
          <img
            className="product-image"
            src={imageUrl}
            width="500px"
            height="500px"
          />
        </Grid>
        <Grid container direction="column" style={{ height: "100%" }}>
          <Box mt={2}>
            <Typography variant="h4">{name + "    " + `$${price}`}</Typography>
          </Box>
        </Grid>
      </Grid>
      <div className="product-image-container"></div>
      <div className="product-info">
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
