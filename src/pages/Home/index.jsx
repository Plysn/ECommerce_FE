import React from "react";
import Banner from "./Banner";
import HomeCategory from "./HomeCategory";
import Register from "./Register";
import AppSection from "./AppSection";
import CategoryShowCase from "./CategoryShowCase";

function Home() {
  return (
    <>
      <Banner />
      <HomeCategory />
      <CategoryShowCase />
      <AppSection />
    </>
  );
}

export default Home;
