import React, { useState } from "react";

const StarRating = ({ onRate }) => {
  const [currentRating, setCurrentRating] = useState(0);

  const handleStarClick = (index) => {
    const newRating = index + 1; 
    setCurrentRating(newRating); 
    onRate(newRating); 
  };

  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          className={`cursor-pointer text-2xl ${
            index < currentRating ? "text-yellow-400" : "text-gray-500"
          }`}
          onClick={() => handleStarClick(index)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
