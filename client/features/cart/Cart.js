import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  fetchUserOrder,
  incrementGame,
  decrementGame,
  checkoutCart,
  createNewCart,
  calcSub,
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
import {
  removeGameOrder,
  addGameOrder,
  editGameOrder,
} from "./orderProductsSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userOrder = useSelector((state) => state.order.userOrders);

  const userId = useSelector((state) => state.auth.me.id);

  const cartOrderId = userOrder[0]?.GameOrder?.orderId;

  const handleDelete = (productId) => {
    dispatch(
      removeGameOrder({
        productId,
      })
    );
  };

  const handleCheckout = () => {
    dispatch(checkoutCart(cartOrderId));
    dispatch(createNewCart(userId));
    dispatch(fetchUserOrder());
    navigate("/checkout");
  };

  useEffect(() => {
    dispatch(fetchUserOrder());
  }, [userOrder]);

  /*Calculate Sub-total */
  // let subTotal = 0;
  // let totalItems = 0;
  // userOrder?.forEach((product) => {
  //   subTotal += product.price * product?.GameOrder?.quantity;
  //   totalItems += product?.GameOrder?.quantity;
  // });

  const totalCount = (items) => {
    return items.reduce((acc, item) => {
      acc += item?.GameOrder?.quantity;
      return acc;
    }, 0);
  };

  const subTotal = (items) => {
    return items.reduce((acc, item) => {
      acc += item?.price * item?.GameOrder?.quantity;
      return acc;
    }, 0);
  };

  if (!userOrder) return <Loading message="BRB Loading Order..." />;
  return (
    <div className="cart-wrapper">
      <div>
        <h2>My Cart:</h2>
      </div>
      <Container id="custom-cart">
        <Grid container justify="center" spacing={4}>
          {userOrder && userOrder.length ? (
            userOrder?.map((product) => {
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
                          (product.price * product.GameOrder?.quantity).toFixed(
                            2
                          )}
                      </Typography>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleDelete(product.id)}
                      >
                        <DeleteIcon />
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        className="decrease-product-btn"
                        onClick={() => {
                          dispatch(
                            decrementGame({
                              productId: product.id,
                              quantity: product.GameOrder.quantity,
                            })
                          );
                        }}
                      >
                        -
                      </Button>
                      <Typography>
                        &nbsp;
                        {product.GameOrder?.quantity}
                        &nbsp;
                      </Typography>
                      <Button
                        size="small"
                        variant="outlined"
                        className="increase-product-btn"
                        onClick={() => {
                          dispatch(
                            incrementGame({
                              productId: product.id,
                            })
                          );
                        }}
                      >
                        +
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })
          ) : (
            <h1 style={{ margin: "50px" }}>Your Cart Is Empty!</h1>
          )}
        </Grid>
        <div style={{ margin: "25px" }}>
          <h1>TOTAL ITEMS: {totalCount(userOrder)}</h1>
          <h1>SUBTOTAL: {`$ ${subTotal(userOrder).toFixed(2)}`}</h1>
        </div>
        <div>
          <h1>
            <Button onClick={() => handleCheckout()}>Checkout</Button>
          </h1>
        </div>
      </Container>
    </div>
  );
};

export default Cart;
