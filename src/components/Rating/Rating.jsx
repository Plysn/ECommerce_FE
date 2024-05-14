import React from "react";
import { StarFilled, StarOutlined } from "@ant-design/icons";

const Rating = ({ rating }) => {
  return (
    <span className="rating">
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return ratingValue <= rating ? (
          <StarFilled key={i} />
        ) : (
          <StarOutlined key={i} />
        );
      })}
    </span>
  );
};

export default Rating;