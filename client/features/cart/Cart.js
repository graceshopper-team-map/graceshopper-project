import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { fetchUserOrders } from "./ordersSlice";
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

const Cart = ({ isLoggedIn }) => {
  const userId = useSelector((state) => state.auth.me.id);
  const dispatch = useDispatch();
  const userOrder = useSelector((state) => state.order.userOrders);
  console.log(isLoggedIn);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserOrders(userId));
    }
  }, [userId]);

  const currentOrder = userOrder.filter(
    (order) => order.status === "unfullfilled"
  );

  console.log("this is the current: ", currentOrder);

  return (
    <div className="cart-wrapper">
      <div>
        <h2>My Cart:</h2>
      </div>
      <Container id="custom-cart">
        <Grid container justify="center" spacing={4}>
          {currentOrder[0]?.products?.map((product) => {
            return (
              // <div key={product.id}>
              //   <p>{product.name}</p>
              // </div>
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
                      {"$" + product.price}
                    </Typography>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => console.log("trash")}
                    >
                      <DeleteIcon />
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      className="decrease-product-btn"
                      onClick={() => console.log("+")}
                    >
                      -
                    </Button>
                    <Typography>{product.quantity}</Typography>
                    <Button
                      size="small"
                      variant="outlined"
                      className="increase-product-btn"
                      onClick={() => console.log("-")}
                    >
                      +
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
};

export default Cart;
