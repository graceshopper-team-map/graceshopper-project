import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, deleteProduct } from "./productSlice";
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
import AddProduct from "./AddProduct";

/*COMPS */
import Loading from "../loading/Loading.js";
import { addOrder } from "../cart/ordersSlice";
import { addGameOrder, editGameOrder } from "../cart/orderProductsSlice";

const AllProducts = () => {
  const user = useSelector((state) => state.user.user);
  const userOrder = useSelector((state) => state.order.userOrders);
  const products = useSelector((state) => state.product.products);
  const dispatch = useDispatch();

  if (!products) return <Loading message="BRB Loading Games..." />;
  return (
    <Container className="product-wrapper">
      {user.isAdmin ? <AddProduct /> : null}
      <Grid container spacing={4}>
        {products && products.length
          ? products?.map((product) => (
              <Grid
                className="product-card"
                key={product.id}
                item
                xs={12}
                sm={6}
                md={4}
              >
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
                    {product.quantity > 0 ? (
                      <Button
                        size="large"
                        className="custom-button"
                        onClick={() =>
                          dispatch(addOrder({ productId: product.id }))
                        }
                      >
                        <AddShoppingCartIcon /> Add to Cart
                      </Button>
                    ) : (
                      "OUT OF STOCK"
                    )}
                  </CardActions>
                  {user.isAdmin ? (
                    <div>
                      <button
                        type="delete"
                        onClick={async () => {
                          await dispatch(deleteProduct(product.id));
                          await dispatch(fetchProducts());
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  ) : null}
                </Card>
              </Grid>
            ))
          : null}
      </Grid>
    </Container>
  );
};

export default AllProducts;
