import React, { useState, useEffect } from "react";
import BreadCrumb from "../../components/Breadcrumb/BreadCrumb";
import Search from "./Search";
import Pagination from "./Pagination";
import ShopCategory from "./ShopCategory";
import ProductCards from "./ProductCards";
import MostPopularPost from "../Blog/MostPopularPost";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Shop = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12; // Number of products per page

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://ecommercebackend-953d.up.railway.app/api/products`
      );
      setProducts(response.data.data);
      console.log(response);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Function to change the current page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // category based filtering
  const menuItems = [...new Set(products.map((val) => val.seller))];

  const filterItem = (curcat) => {
    if (curcat === "All") {
      fetchData();
    } else {
      const newItem = products.filter((newVal) => {
        return newVal.seller === curcat;
      });
      setProducts(newItem);
    }
    setSelectedCategory(curcat);
  };

  return (
    <div>
      <BreadCrumb
        title={"Our Shop Pages"}
        curPage={<Link to="/shop">Shop</Link>}
      />

      {/* shop page */}
      <div className="shop-page padding-tb">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-12">
              <article>
                <div className="shop-title">
                  <p className="showResult">
                    Showing {indexOfFirstProduct + 1} -{" "}
                    {Math.min(indexOfLastProduct, products.length)} of{" "}
                    {products.length} Results
                  </p>
                </div>

                <div>
                  <ProductCards products={currentProducts} GridList={true} />
                </div>

                <Pagination
                  productsPerPage={productsPerPage}
                  totalProducts={products.length}
                  paginate={paginate}
                  activePage={currentPage}
                />
              </article>
            </div>
            <div className="col-lg-4 col-12">
              <aside>
                <Search products={products} GridList={true} />
                <ShopCategory
                  filterItem={filterItem}
                  setProducts={setProducts}
                  selectedCategory={selectedCategory}
                />
                <MostPopularPost />
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
