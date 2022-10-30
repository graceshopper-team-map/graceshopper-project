import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  fetchSingleOrder,
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

const Cart = ({ isLoggedIn }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.me.id);
  const userOrder = useSelector((state) => state.order.userOrders);
  console.log("id", userId);

  // const [cart, setCart] = useState([]);

  console.log("cart info id", userOrder[0]?.GameOrder.orderId);
  console.log("product id", userOrder[0]?.id);
  // console.log("cart info", userOrder[1]?.products[0]);
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
    dispatch(removeItem());
  }, [userId, dispatch]);

  /*Calculate Sub-total */
  let subTotal = 0;
  let totalItems = 0;
  userOrder.forEach((product) => {
    subTotal += product.price * product.GameOrder.quantity;
    totalItems += product.GameOrder.quantity;
  });

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
                      onClick={() => dispatch(removeItem(product.id))}
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
          <h1>TOTAL ITEMS: {totalItems}</h1>
          <h1>SUBTOTAL: {`$ ${subTotal.toFixed(2)}`}</h1>
        </div>
      </Container>
    </div>
  );
};

export default Cart;
