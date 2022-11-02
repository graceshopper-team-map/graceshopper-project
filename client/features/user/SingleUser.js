import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleUser } from "./userSlice.js";
import EditUser from "./EditUser.js";

const SingleUser = () => {
  const user = useSelector((state) => state.user.user);
  const userId = useSelector((state) => state.auth.me.id);
  const { id } = user;
  const dispatch = useDispatch();

  const {
    username,
    firstName,
    lastName,
    email,
    imageUrl,
    biography,
    address,
    website,
    facebook,
  } = user;

  useEffect(() => {
    dispatch(fetchSingleUser(userId));
  }, []);

  return (
    <div>
      <EditUser id={id} />
      <div>
        <img src={imageUrl} />
      </div>
      <div className="info-page">
        <h3>Name: {`${firstName} ${lastName}`}</h3>
        <p>Username: {username}</p>
        <p>Email: {email}</p>
        <p>Address: {address}</p>
        <p>Website: {website}</p>
        <p>Biography: {biography}</p>
        <p>Facebook: {facebook}</p>
      </div>
    </div>
  );
};

export default SingleUser;
