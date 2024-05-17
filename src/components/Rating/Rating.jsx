import React from "react";
import { StarFilled, StarOutlined } from "@ant-design/icons";

const Rating = ({ rating }) => {
  return (
    <span className="rating">
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return ratingValue <= rating ? (
          <StarFilled key={i} style={{ color: "yellow" }} /> // Áp dụng màu vàng
        ) : (
          <StarOutlined key={i} style={{ color: "yellow" }} /> // Áp dụng màu vàng
        );
      })}
    </span>
  );
};

export default Rating;
