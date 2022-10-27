import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../features/slices/productSlice";
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
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

/*COMPS */
import Loading from "../Loading.js";

const AllProducts = () => {
  const products = useSelector((state) => state.product.products);
  const dispatch = useDispatch();
  console.log(products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  if (!products) return <Loading message="BRB Loading Games..." />;
  return (
    <Container className="product-wrapper">
      <Grid container spacing={4}>
        {products &&
          products.map((product) => (
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
                  <CardMedia>
                    <Link to={`/products/${product.id}`}>
                      <img className="card-image" src={product.imageUrl} />
                    </Link>
                  </CardMedia>
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
                <CardActionArea className="actions-content">
                  <>
                    <Typography
                      className="price"
                      gutterBottom
                      variant="h5"
                      component="h2"
                    >
                      {"$" + product.price / 100}
                    </Typography>
                    <Button
                      size="large"
                      className="custom-button"
                      onClick={() => "clicked"}
                    >
                      <ShoppingCartIcon /> Add to Cart
                    </Button>
                  </>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default AllProducts;
