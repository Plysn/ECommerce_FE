import React, { useState } from "react";

import productData from "../../data/products.json";
import { Link } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";

const title = (
  <h2>
    Search Your One From <span>Thousand</span> Of Products
  </h2>
);
const desc = "We Have The Largest Collection of products";

const Banner = () => {
  // product search funtionality
  const [searchInput, setSearchInput] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(productData);

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchInput(searchTerm);

    // Filter products based on the search term
    const filtered = productData.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="banner-section style-4">
      <div className="container">
        <div className="banner-content">
          {title}
          <form>
            <input
              type="text"
              name="search"
              placeholder="Search your product"
              value={searchInput}
              onChange={handleSearch}
            />
            <button type="submit" style={{ paddingRight: 40, fontSize: 20, color: "#ffdf40" }}>
              Search
            </button>
          </form>
          <p>{desc}</p>
          <ul className="lab-ul">
            {searchInput &&
              filteredProducts.map((product, i) => (
                <li key={i}>
                  <Link to={`/shop/${product.id}`}> {product.name}</Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Banner;
