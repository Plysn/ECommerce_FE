import React, { useState } from "react";
import Rating from "../Rating/Rating";

const reviwtitle = "Add a Review";
let ReviewList = [
  {
    imgUrl: "/src/assets/images/instructor/01.jpg",
    imgAlt: "Client thumb",
    name: "Ganelon Boileau",
    date: "Posted on Jul 28, 2023 at 6:57 am",
    desc: "Good.",
  },
  {
    imgUrl: "/src/assets/images/instructor/02.jpg",
    imgAlt: "Client thumb",
    name: "Morgana Cailot",
    date: "Posted on Oct 10, 2023 at 9:32 am",
    desc: "Awesome.",
  },
  {
    imgUrl: "/src/assets/images/instructor/03.jpg",
    imgAlt: "Client thumb",
    name: "Telford Bois",
    date: "Posted on Dec 10, 2023 at 8:11 pm",
    desc: "Cheap.",
  },
  {
    imgUrl: "/src/assets/images/instructor/04.jpg",
    imgAlt: "Client thumb",
    name: "Cher Daviau",
    date: "Posted on Jan 16, 2024 at 11:12 am",
    desc: "Beautiful.",
  },
];

const Review = () => {
  const [reviewShow, setReviewShow] = useState(true);
  return (
    <>
      {" "}
      <ul
        className={`review-nav lab-ul ${
          reviewShow ? "RevActive" : "DescActive"
        }`}
      >
        <li onClick={() => setReviewShow(!reviewShow)} className="desc">
          Description
        </li>
        <li onClick={() => setReviewShow(!reviewShow)} className="rev">
          Reviews 4
        </li>
      </ul>
      <div
        className={`review-content ${
          reviewShow ? "review-content-show" : "description-show"
        }`}
      >
        <div className="review-showing">
          <ul className="content lab-ul">
            {ReviewList.map((review, i) => (
              <li key={i}>
                <div className="post-thumb">
                  <img src={`${review.imgUrl}`} alt={`${review.imgAlt}`} />
                </div>
                <div className="post-content">
                  <div className="entry-meta">
                    <div className="posted-on">
                      <a href="#">{review.name}</a>
                      <p>{review.date}</p>
                    </div>
                    <Rating />
                  </div>
                  <div className="entry-content">
                    <p>{review.desc}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="description">
          <p>
            The quality of these shoes is excellent. From the durable materials used to their meticulous craftsmanship, every aspect speaks of high standards. The stitching is impeccable, ensuring longevity, while the materials feel sturdy yet comfortable. Not only are they stylish, but they also provide ample support and comfort for long hours of wear. Overall, these shoes exemplify top-notch quality and are certainly worth the investment.
          </p>
        </div>
      </div>
    </>
  );
};

export default Review;