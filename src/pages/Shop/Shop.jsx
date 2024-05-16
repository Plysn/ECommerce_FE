import React from "react";
import BreadCrumb from "../../components/Breadcrumb/BreadCrumb";
import { useState, useEffect } from "react";
import Search from "./Search";
import Pagination from "./Pagination";
import ShopCategory from "./ShopCategory";
import Tags from "./Tags";
import ProductCards from "./ProductCards";
const showResult = "Showing 01 - 12 of 139 Results";
import MostPopularPost from "../Blog/MostPopularPost";
import { useParams } from "react-router-dom";
import axios from "axios";

const Shop = () => {
  const { id } = useParams();
  const [GridList, setGridList] = useState(true);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12; // Number of products per page

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://ecommercebackend-production-4f03.up.railway.app/api/products`);
      setProducts(response.data.data);
      console.log(response);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
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
  const menuItems = [...new Set(products.map((Val) => Val.seller))];

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
      <BreadCrumb title={"Our Shop Pages"} curPage={"Shop"} />

      {/* shop page */}
      <div className="shop-page padding-tb">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-12">
              <article>
                <div className="shop-title d-flex flex-wrap justify-content-between">
                  <p>{showResult}</p>
                  <div
                    className={`product-view-mode ${
                      GridList ? "gridActive" : "listActive"
                    }`}
                  >
                    <a className="grid" onClick={() => setGridList(!GridList)}>
                      <i className="icofont-ghost"></i>
                    </a>
                    <a className="list" onClick={() => setGridList(!GridList)}>
                      <i className="icofont-listine-dots"></i>
                    </a>
                  </div>
                </div>

                <div>
                  <ProductCards
                    products={currentProducts}
                    GridList={GridList}
                  />
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
                <Search products={products} GridList={GridList} />
                <ShopCategory
                  filterItem={filterItem}
                  setProducts={setProducts}
                  selectedCategory={selectedCategory}
                />
                <MostPopularPost />
                <Tags />
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
