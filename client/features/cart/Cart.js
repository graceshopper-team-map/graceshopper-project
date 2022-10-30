import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  fetchSingleOrder,
  fetchUserOrder,
  decrementQuantity,
  incrementQuantity,
  removeItem,
} from "./ordersSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  Grid,
  Button,
  Container,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  CardActionArea,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { fetchGameOrder } from "./orderProductsSlice";
import { fetchProducts } from "../products/productSlice";

const Cart = ({ isLoggedIn }) => {
  const userId = useSelector((state) => state.auth.me.id);
  const dispatch = useDispatch();
  const userOrder = useSelector((state) => state.order.userOrders);

  console.log("cart info", userOrder[0]?.products[0]);
  console.log("userOrder: ", userOrder);

  // console.log(localStorage.getItem("token"));

  //help me
  // const handlers = {
  //   addToBag
  // }

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserOrder(userId));
    }
  }, [userId]);

  let subTotal = 0;
  let totalItems = 0;
  userOrder.forEach((item) => {
    item.products.forEach((product) => {
      subTotal += +product.price * product.GameOrder.quantity;
      totalItems += product.GameOrder.quantity;
    });
  });

  return (
    <div className="cart-wrapper">
      <div>
        <h2>My Cart:</h2>
      </div>
      <Container id="custom-cart">
        <Grid container justify="center" spacing={4}>
          {userOrder[0]?.products?.map((product, i) => {
            return (
              <Grid key={product.id} item xs={12} sm={6} md={4}>
                <Card className="custom-card">
                  <CardActionArea>
                    <Link to={`/products/${product.id}`}>
                      <CardMedia
                        component="img"
                        src={product.imageUrl}
                        alt={`${product.name}`}
                        title={`${product.name}`}
                        className="card-image"
                        height="260"
                      />
                    </Link>

                    <CardContent className="content">
                      <Typography
                        className="title"
                        gutterBottom
                        variant="h5"
                        component="h2"
                      >
                        {product.name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions className="actions-content">
                    <Typography
                      className="price"
                      gutterBottom
                      variant="h5"
                      component="h2"
                    >
                      {"$" + product.price * product.GameOrder.quantity}
                    </Typography>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => dispatch(removeItem(product.GameOrder.id))}
                    >
                      <DeleteIcon />
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      className="decrease-product-btn"
                      onClick={() => product.GameOrder.quantity--}
                    >
                      -
                    </Button>
                    <Typography>
                      &nbsp;{product.GameOrder.quantity}&nbsp;
                    </Typography>
                    <Button
                      size="small"
                      variant="outlined"
                      className="increase-product-btn"
                      onClick={() =>
                        dispatch(incrementQuantity(product.GameOrder.id))
                      }
                    >
                      +
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
        <div style={{ margin: "25px" }}>
          <h1>TOTAL ITEMS: {totalItems}</h1>
          <h1>SUBTOTAL: {`$ ${subTotal}`}</h1>
        </div>
      </Container>
    </div>
  );
};

export default Cart;
