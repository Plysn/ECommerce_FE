import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Rating from "../../components/Rating/Rating";
import { useEffect, useState } from "react";
import { Skeleton } from "antd";
import Pagination from "../Shop/Pagination";
const title = "Our Products";

const CategoryShowCase = ({ products }) => {
  const [items, setItems] = useState(products);
  const [currentPage, setCurrentPage] = useState(1);

  const btnText = "Shop Now";
  const filterItem = (categItem) => {
    const updateItems = products.filter((curElem) => {
      return curElem.category.name === categItem;
    });
    setItems(updateItems);
  };
  const displayedProducts = items.slice((currentPage - 1) * 8, currentPage * 8);

  useEffect(() => {
    setItems(products);
  }, [products]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="course-section style-3 padding-tb">
      <div className="course-shape one">
        <img src="/src/assets/images/shape-img/icon/01.png" alt="education" />
      </div>
      <div className="course-shape two">
        <img src="/src/assets/images/shape-img/icon/02.png" alt="education" />
      </div>
      <div className="container">
        {/* section header */}
        <div className="section-header">
          <h2 className="title">{title}</h2>
          <div className="course-filter-group">
            <ul className="lab-ul">
              <li onClick={() => setItems(items)}>All</li>
              <li onClick={() => filterItem("Adidas")}>Adidas</li>
              <li onClick={() => filterItem("Nike")}>Nike</li>
              <li onClick={() => filterItem("Oxford")}>Oxford</li>
              <li onClick={() => filterItem("Loafer")}>Loafer</li>
            </ul>
          </div>
        </div>

        {/* section body */}
        <div className="section-wrapper">
          <div className="row g-4 justify-content-center row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-1 course-filter">
            {displayedProducts ? (
              displayedProducts?.map((elem) => (
                <Link to={`/shop/${elem.id}`} key={elem.id}>
                  <div className="col">
                    <div className="course-item style-4">
                      <div className="course-inner">
                        <div className="course-thumb">
                          <img src={elem.img} alt="" className="img-card-2" />
                          <div
                            style={{ minHeight: "50px" }}
                            className="course-category"
                          >
                            <div className="course-cate">
                              {elem.category.name}
                            </div>
                            <div className="course-reiew">
                              <Rating rating={elem.ratings} />
                            </div>
                          </div>
                        </div>
                        <div style={{
                          padding: '6px 15px',
                          width: '220px',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}>
                          {elem.name}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <Skeleton />
            )}
          </div>
          <Pagination
            totalProducts={items.length}
            productsPerPage={8}
            activePage={currentPage}
            paginate={paginate}
          />
          <div className="text-center mt-5 ">
            <Link to="/shop" className="btn-shop-home">
              <span>{btnText}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

CategoryShowCase.propTypes = {
  products: PropTypes.array.isRequired,
};

export default CategoryShowCase;
