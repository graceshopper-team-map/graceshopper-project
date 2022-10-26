import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../features/slices/productSlice";
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
    <div className="product-wrapper">
      <div>
        {products &&
          products.map((product) => (
            <div className="product-card" key={product.id}>
              <Link to={`/products/${product.id}`}>
                <img src={product.imageUrl} width="150px" height="150px" />
              </Link>
              <p>{product.price / 100}</p>
              <p>{product.name}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllProducts;
