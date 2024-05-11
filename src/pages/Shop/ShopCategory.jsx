// /* eslint-disable react/prop-types */
const title = "All Categories";
import Data from "../../data/products.json";

const ShopCategory = ({
  filterItem,
  setItem,
  menuItems,
  setProducts,
  selectedCategory,
}) => {
  return (
    <>
      <div className="tags-category">
        <h5 className="title">{title}</h5>

        <button
          className={` ${selectedCategory === "All" ? "bg-warning" : ""}`}
          onClick={() => setProducts(Data)}
        >
          All
        </button>

        {menuItems.map((Val, id) => {
          return (
            <button
              className={`m-2 ${selectedCategory === Val ? "bg-warning" : ""}`}
              onClick={() => filterItem(Val)}
              key={id}
            >
              {Val}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default ShopCategory;