import { useEffect, useState } from "react";
import Banner from "./Banner";
import HomeCategory from "./HomeCategory";
import AppSection from "./AppSection";
import CategoryShowCase from "./CategoryShowCase";
import productApi from "../../services/product";
import { message } from "antd";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await productApi.getListProducts();
        setProducts(response.data.data);
      } catch (error) {
        message.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Banner />
      <HomeCategory />
      <CategoryShowCase products={products} />
      <AppSection />
    </>
  );
}

export default Home;
