// import { useState } from "react";
import { Link } from "react-router-dom";
import Rating from "../../components/Rating/Rating";
import { useState } from "react";
const title = "Our Products";
import Data from "../../data/products.json";

const CategoryShowCase = () => {
  const btnText = "Shop Now";
  const [items, setItems] = useState(Data);
  const filterItem = (categItem) => {
    const updateItems = Data.filter((curElem) => {
      return curElem.category === categItem;
    });
    setItems(updateItems);
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
              <li onClick={() => setItems(Data)}>All</li>
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
            {items.slice(0, 8).map((elem) => {
              const { id, img, category, name, seller, price } = elem;

              return (
                <Link to={`/shop/${id}`} key={id}>
                  <div className="col">
                    <div className="course-item style-4">
                      <div className="course-inner">
                        <div className="course-thumb">
                          <img src={img} alt="" className="img-card-2" />
                          <div className="course-category">
                            <div className="course-cate">{category}</div>
                            <div className="course-reiew">
                              <Rating />
                            </div>
                          </div>
                        </div>

                        {/* content  */}
                        <div className="course-content">
                          {/* <Link to="/shop/1234"> */}
                          <h5>{name}</h5>
                          {/* </Link> */}
                          <div className="course-footer">
                            <div className="course-author">
                              {/* <Link to="/team-single" className="ca-name"> */}
                              <h1 className="ca-name">{seller}</h1>
                              {/* </Link> */}
                            </div>
                            <div className="course-price">${price}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
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

export default CategoryShowCase;
