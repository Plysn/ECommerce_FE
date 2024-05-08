import React, { useState, useEffect } from "react";
import BreadCrumb from "../../components/Breadcrumb/BreadCrumb";
import Search from "./Search";
import Pagination from "./Pagination";
import ShopCategory from "./ShopCategory";
import ProductCards from "./ProductCards";
import MostPopularPost from "../Blog/MostPopularPost";
import Tags from "./Tags";
import axios from "axios";
import { useParams } from "react-router-dom";

const showResult = "Showing 01 - 12 of 139 Results";

const Shop = () => {
  const { id } = useParams();
  const [GridList, setGridList] = useState(true);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3002/api/product/get-all`);
      setProducts(response.data.data);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const menuItems = [...new Set(products.map((Val) => Val.category))];

  const filterItem = (curcat) => {
    const newItem = products.filter((newVal) => {
      return newVal.category === curcat;
    });
    setSelectedCategory(curcat);
    setProducts(newItem);
  };

  return (
    <div>
      <BreadCrumb title={"Our Shop Pages"} curPage={"Shop"} />
      <div className="shop-page padding-tb">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-12">
              <article>
                <div className="shop-title d-flex flex-wrap justify-content-between">
                  <p>{showResult}</p>
                  <div
                    className={`product-view-mode ${GridList ? "gridActive" : "listActive"}`}
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
                  <ProductCards products={currentProducts} GridList={GridList} />
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
                  setItem={setProducts}
                  menuItems={menuItems}
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
