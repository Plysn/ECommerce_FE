import React from "react";
import { Link } from "react-router-dom";
const title = "Most Popular Post";
const postList = [
  {
    id: 1,
    imgUrl: "/src/assets/images/blog/01.jpg",
    imgAlt: "rajibraj91",
    title: "Business Ueporting Rouncil Them Could Plan.",
    date: "Jun 05,2022",
  },
  {
    id: 2,
    imgUrl: "/src/assets/images/blog/02.jpg",
    imgAlt: "rajibraj91",
    title: "Financial Reporting Qouncil What Could More.",
    date: "Jun 05,2022",
  },
  {
    id: 3,
    imgUrl: "/src/assets/images/blog/03.jpg",
    imgAlt: "rajibraj91",
    title: "Consulting Reporting Qounc Arei Could More.",
    date: "Jun 05,2022",
  },
  {
    id: 4,
    imgUrl: "/src/assets/images/blog/04.jpg",
    imgAlt: "rajibraj91",
    title: "Strategic Social Media and of visual design.",
    date: "Jun 05,2022",
  },
];

const MostPopularPost = () => {
  return (
    <div className="category-blog">
      <h5 className="title-category-blog">{title}</h5>
      <ul className="post-category-blog">
        {postList.map((blog, i) => (
          <li className="d-flex flex-wrap justify-content-between" key={i}>
            <div className="post-thumb">
              <Link to={`/blog/${blog.id}`}>
                <img src={`${blog.imgUrl}`} alt={`${blog.imgAlt}`} />
              </Link>
            </div>
            <div className="post-content">
              <Link to={`/blog/${blog.id}`}>
                <h6>{blog.title}</h6>
              </Link>
              <p>{blog.date}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MostPopularPost;