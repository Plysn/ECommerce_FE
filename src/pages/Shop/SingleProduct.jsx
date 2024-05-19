import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BreadCrumb from "../../components/Breadcrumb/BreadCrumb";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import Review from "../../components/Review/Review";
import MostPopularPost from "../Blog/MostPopularPost";
import ProductDisplay from "./ProductDisplay";
import axios from "axios";
import { Link } from "react-router-dom";


const SingleProduct = () => {
  const { id } = useParams();
  const [result, setResult] = useState([]);
  useEffect(() => {
    async function get_data() {
      try {
        console.log(id);
        const rep = await axios.get(`https://ecommercebackend-953d.up.railway.app/api/products/${id}`);
       
        setResult([rep.data.data])
        console.log(rep)
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    }
    get_data();
   
  }, [id]);


  return (
    <div>
      <BreadCrumb title={"OUR SHOP SINGLE"} curPage={<Link to="/shop">Shop</Link>} addi={"Single Product"} />
      <div className="shop-single padding-tb aside-bg">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-12">
              <article>
                <div className="product-details">
                  <div className="row align-items-center">
                    <div className="col-md-6 col-12">
                      <div className="product-thumb">
                        <div className="swiper-container pro-single-top">
                          <Swiper
                            spaceBetween={30}
                            slidesPerView={1}
                            modules={[Navigation]}
                          >
                            {result.map((item, i) => (
                              <SwiperSlide key={i}>
                                <div className="single-thumb">
                                  <img src={item.img} alt="" />
                                </div>  
                              </SwiperSlide>
                            ))}
                            {result.map((item, i) => (
                              <SwiperSlide key={i}>
                                <div className="single-thumb">
                                  <img src={item.img} alt="" />
                                </div>
                              </SwiperSlide>
                            ))}
                          </Swiper>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <div className="post-content">
                        <div>
                          {result.map((item) => (
                            <ProductDisplay item={item} key={item.id} token={localStorage.getItem('access_token')} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


                <div className="review">
                  <Review />
                </div>
              </article>
            </div>
            <div className="col-lg-4 col-md-7 col-12">
              <aside className="ps-lg-4">
                <MostPopularPost />
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default SingleProduct;

