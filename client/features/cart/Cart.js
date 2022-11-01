import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  fetchUserOrder,
  decrementQuantity,
  incrementQuantity,
  removeItem,
  removeProduct,
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
import Loading from "../loading/Loading";
import { deleteGameFromCart, removeGameOrder } from "./orderProductsSlice";

const Cart = ({ isLoggedIn }) => {
  const dispatch = useDispatch();
  const userOrder = useSelector((state) => state.order.userOrders);
  const userId = useSelector((state) => state.auth.me.id);
  console.log("I am user: ", userId);
  console.log("IAMUSERORDER: ", userOrder);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserOrder(userId));
    }
  }, []);

  /*Calculate Sub-total */
  // let subTotal = 0;
  // let totalItems = 0;
  // userOrder.forEach((product) => {
  //   subTotal += product.price * (product.GameOrder.quantity ?? 0);
  //   totalItems += product.GameOrder.quantity ?? 0;
  // });

  if (!userOrder) return <Loading message="BRB Loading Order..." />;
  return (
    <div className="cart-wrapper">
      <div>
        <h2>My Cart:</h2>
      </div>
      <Container id="custom-cart">
        <Grid container justify="center" spacing={4}>
          {userOrder?.map((product) => {
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
                      {"$" +
                        (product.price * product.GameOrder.quantity).toFixed(2)}
                    </Typography>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={async () => {
                        console.log({
                          orderId: product.GameOrder.orderId,
                          productId: product.id,
                        });
                        await dispatch(
                          removeGameOrder({
                            orderId: product.GameOrder.orderId,
                            productId: product.id,
                          })
                        );
                        await dispatch(fetchUserOrder(userId));
                      }}
                    >
                      <DeleteIcon />
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      className="decrease-product-btn"
                      onClick={() => dispatch(decrementQuantity(product.id))}
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
                      onClick={() => dispatch(incrementQuantity(product.id))}
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
          <h1>TOTAL ITEMS: {0}</h1>
          <h1>SUBTOTAL: {`$ ${(0.0).toFixed(2)}`}</h1>
        </div>
      </Container>
    </div>
  );
};

export default Cart;
