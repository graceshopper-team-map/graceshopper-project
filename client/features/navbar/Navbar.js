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

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      <nav>
        <Container>
          <Toolbar>
            {isLoggedIn ? (
              <div>
                {/* The navbar will show these links after you log in */}
                <Link to="/home">Home</Link>
                <button type="button" onClick={logoutAndRedirectHome}>
                  Logout
                </button>
                <Link to="/products">Products</Link>
                <Link to="/cart">Cart</Link>
              </div>
            ) : (
              <div>
                {/* The navbar will show these links before you log in */}
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
                <Link to="/home">Home</Link>
                <Link to="/products">Products</Link>
              </div>
            )}
          </Toolbar>
        </Container>
      </nav>
      <hr />
    </>
  );
};

export default Navbar;
