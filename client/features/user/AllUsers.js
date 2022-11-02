import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "./userSlice";

const AllUsers = () => {
  const user = useSelector((state) => state.user.user);
  const users = useSelector((state) => state.user.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, []);

  if (!user.isAdmin) return <h3>Authorization needed</h3>;
  
  return (
    <>
        {users?.map((user) => {
            return (
                <div key = {user.id} className = "info-page">
                    <hr/>
                    <p>User Name: {user.username}</p>
                    <p>First Name: {user.firstName}</p>
                    <p>Last Name: {user.lastName}</p>
                    <p>Email: {user.email}</p>
                    <p>Website: {user.website}</p>
                    <p>Biography: {user.biography}</p>
                    <p>FaceBook: {user.facebook}</p>
                </div>
            )
            }
        )}
    </>
  );
};

export default AllUsers;