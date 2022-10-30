import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../app/store";
import {
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useEffect } from "react";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  // const order = useSelector((state) => state.order.userOrders)[0];
  // console.log("iamuser: ", order);
  // const totalProductCount = () => {
  //   let total = 0;
  //   order.products.forEach((product) => {
  //     console.log(product.gameOrder);
  //   });
  // };

  // totalProductCount();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/login");
  };

  // useEffect(() => {
  //   if (userId) {
  //     dispatch(fetchUserOrders(userId));
  //   }
  // }, [userId]);

  return (
    <>
      <AppBar position="fixed" className="custom-navbar">
        <Container>
          <Toolbar>
            <Typography
              component={Link}
              to="/products"
              variant="h5"
              color="inherit"
              className="custom-title"
            >
              GameMap
            </Typography>
            {isLoggedIn ? (
              <div className="nav-wrapper">
                {/* The navbar will show these links after you log in */}
                <Link className="custom-a" to="/home">
                  Home
                </Link>
                <button type="button" onClick={logoutAndRedirectHome}>
                  Logout
                </button>
                <Link className="custom-a" to="/products">
                  Products
                </Link>
                <IconButton component={Link} to="/cart">
                  <Badge badgeContent={"0"} color="secondary">
                    <ShoppingCartIcon className="custom-cart" />
                  </Badge>
                </IconButton>
              </div>
            ) : (
              <div className="nav-wrapper">
                {/* The navbar will show these links before you log in */}
                <Link className="custom-a" to="/home">
                  Home
                </Link>
                <Link className="custom-a" to="/login">
                  Login
                </Link>
                <Link className="custom-a" to="/signup">
                  Sign Up
                </Link>
                {/* <Link to="/cart">Cart</Link> */}
                <Link className="custom-a" to="/products">
                  Products
                </Link>
                <IconButton component={Link} to="/cart">
                  <Badge badgeContent={"0"} color="secondary">
                    <ShoppingCartIcon className="custom-cart" />
                  </Badge>
                </IconButton>
              </div>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <hr />
    </>
  );
};

export default Navbar;
