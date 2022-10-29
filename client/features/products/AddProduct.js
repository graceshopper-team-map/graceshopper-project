import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct, fetchProducts } from "./productSlice";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("")
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await dispatch(addProduct({ name, price, quantity, description, genre }));
    await dispatch(fetchProducts())
    setName("");
    setPrice("")
    setQuantity("");
    setDescription("")
    setGenre("")
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
      <div>
        <label htmlFor="genre">Genre: </label>
        <input
          name="genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
      </div>
      <button type="submit" disabled={!name || !price || !quantity || !description || !genre }>
        Add Product
      </button>
    </form>
  );
};

export default AddProduct;