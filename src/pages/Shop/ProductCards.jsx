// /* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import Rating from "../../components/Rating/Rating";

const ProductCards = ({ products, GridList }) => {
  return (
    <div
      className={`shop-product-wrap row justify-content-center ${
        GridList ? "grid" : "list"
      }`}
    >
      {products.map((product, i) => (
        <div className="col-lg-4 col-md-6 col-12" key={i}>
          <div className="product-item">
            <div className="product-thumb">
              <Link to={`/shop/${product.id}`}>
                <img
                  src={`${product.img}`}
                  alt={`${product.imgAlt}`}
                  className="img-card"
                />
              </Link>
            </div>
            <div className="product-content">
              <h5>
                <Link to={`/shop/${product.id}`}>{product.name}</Link>
              </h5>
              <p className="productRating">
                <Rating />
              </p>
              <h6>${product.price}</h6>
            </div>
          </div>
          <div className="product-list-item">
            <Link to={`/shop/${product.id}`}>{product.name}</Link>
            <img
                  src={`${product.img}`}
                  alt={`${product.imgAlt}`}
            />
            <p className="productRating">
              <Rating />
            </p>
            <h6>${product.price}</h6>
            <p>{product.seller}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCards;
