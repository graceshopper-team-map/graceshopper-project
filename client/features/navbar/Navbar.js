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
import { fetchSingleUser } from "../user/userSlice";

// o: remove userOrder if not being used
const Navbar = ({ userOrder }) => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const userId = useSelector((state) => state.auth.me.id);
  // const order = useSelector((state) => state.order.userOrders)[0];
  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    if (userId) {
      dispatch(fetchSingleUser(userId));
    }
  }, [userId, dispatch]);

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
            {/* o: this could benefit from separating into two other components */}
            {isLoggedIn ? (
              <div className="nav-wrapper">
                {/* The navbar will show these links after you log in */}
                <Link className="custom-a" to="/home">
                  Home
                </Link>
                <Link className="custom-a" to="/products">
                  Products
                </Link>
                <Link className="custom-a" to="/profile">
                  Profile
                </Link>
                {user.isAdmin ? (
                  <Link className="custom-a" to="/users">
                    Users
                  </Link>
                ) : null}
                <button type="button" onClick={logoutAndRedirectHome}>
                  Logout
                </button>
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
