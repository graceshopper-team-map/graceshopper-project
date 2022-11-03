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
  Button,
  Box,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useEffect } from "react";
import { fetchSingleUser } from "../user/userSlice";

const Navbar = ({ totalCount }) => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const userId = useSelector((state) => state.auth.me.id);
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
  }, [userId]);

  return (
    <>
      <AppBar position="fixed" className="custom-navbar">
        <Container>
          <Toolbar>
            <Typography variant="h5" color="inherit" className="custom-title">
              GameMap
            </Typography>
            {isLoggedIn ? (
              <Box className="nav-wrapper">
                {/* The navbar will show these links after you log in */}
                <Link
                  style={{ marginTop: "10px" }}
                  className="custom-a"
                  to="/home"
                >
                  Home
                </Link>
                <Link
                  style={{ marginTop: "10px" }}
                  className="custom-a"
                  to="/profile"
                >
                  Profile
                </Link>
                <Link
                  style={{ marginTop: "10px" }}
                  className="custom-a"
                  to="/orders"
                >
                  My Orders
                </Link>
                {user.isAdmin ? (
                  <Link
                    style={{ marginTop: "10px" }}
                    className="custom-a"
                    to="/users"
                  >
                    Users
                  </Link>
                ) : null}
                <IconButton component={Link} to="/cart">
                  <Badge
                    style={{ marginLeft: "5px" }}
                    badgeCount={totalCount}
                    color="secondary"
                  >
                    <ShoppingCartIcon className="custom-cart" />
                  </Badge>
                </IconButton>
                <Button
                  type="button"
                  className="logout"
                  onClick={logoutAndRedirectHome}
                >
                  Logout
                </Button>
              </Box>
            ) : (
              <div className="nav-wrapper">
                {/* The navbar will show these links before you log in */}
                <Link
                  style={{ marginTop: "10px" }}
                  className="custom-a"
                  to="/login"
                >
                  Login
                </Link>
                <Link
                  style={{ marginTop: "10px" }}
                  className="custom-a"
                  to="/signup"
                >
                  Sign Up
                </Link>
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
