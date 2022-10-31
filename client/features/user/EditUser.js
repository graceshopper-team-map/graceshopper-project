import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "./userSlice";

const EditUser = (props) => {
  const { id } = props;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [biography, setBiography] = useState("");
  const [website, setWebsite] = useState("");
  const [facebook, setFacebook] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      editUser({
        userId: id,
        firstName,
        lastName,
        email,
        address,
        biography,
        website,
        facebook,
      })
    );
    setFirstName("");
    setLastName("");
    setEmail("");
    setAddress("");
    setBiography("");
    setWebsite("");
    setFacebook("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstName">First Name: </label>
        <input
          name="firstName"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="lastName">Last Name: </label>
        <input
          name="lastName"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email: </label>
        <input
          name="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="address">Address: </label>
        <input
          name="address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="biography">Biography: </label>
        <input
          name="biography"
          type="text"
          value={biography}
          onChange={(e) => setBiography(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="website">Website: </label>
        <input
          name="website"
          type="text"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="facebook">Facebook: </label>
        <input
          name="facebook"
          type="text"
          value={facebook}
          onChange={(e) => setFacebook(e.target.value)}
        />
      </div>
      <button
        type="submit"
        disabled={
          !firstName ||
          !lastName ||
          !email ||
          !address ||
          !biography ||
          !website ||
          !facebook
        }
      >
        Update
      </button>
    </form>
  );
};

export default EditUser;
