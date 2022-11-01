import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { editProduct } from "./productSlice";

const EditProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const { productId } = useParams();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editProduct({ productId, name, price, quantity, description }));
    setName("");
    setPrice("");
    setQuantity("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Product Name: </label>
        <input
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="price">Price: </label>
        <input
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="quantity">Quantity: </label>
        <input
          name="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="description">Description: </label>
        <input
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button
        type="submit"
        disabled={!name || !price || !quantity || !description}
      >
        Update
      </button>
    </form>
  );
};

export default EditProduct;
