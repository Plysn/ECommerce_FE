import React, { useEffect, useState } from "react";
import axios from "axios";

const ShopCategory = ({ filterItem, setProducts, selectedCategory }) => {
  const [categories, setCategories] = useState([]);

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://ecommercebackend-953d.up.railway.app/api/categories');
      setCategories(response.data.data);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu thể loại:', error);
    }
  };

  // Fetch products by category
  const fetchProductsByCategory = async (categoryId) => {
    try {
      const response = await axios.get(`https://ecommercebackend-953d.up.railway.app/api/products/list/${categoryId}`);
      setProducts(response.data.data);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu sản phẩm theo thể loại:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryChange = (categoryId) => {
    if (categoryId === "all") {
      filterItem("All");
    } else {
      fetchProductsByCategory(categoryId);
    }
  };

  return (
    <div className="tags-category">
      <h5 className="title">All Categories</h5>

      <button
        className={`btn ${selectedCategory === "All" ? "bg-warning" : ""}`}
        onClick={() => handleCategoryChange("all")}
      >
        All
      </button>

      {categories.map((category, id) => (
        <button
          className={`btn m-2 ${selectedCategory === category.name ? "bg-warning" : ""}`}
          onClick={() => handleCategoryChange(category.id)}
          key={id}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default ShopCategory;