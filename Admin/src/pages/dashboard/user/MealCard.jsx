import React, { useState } from "react";

const MealCard = ({ meal }) => {
  const defaultImage = `http://43.204.2.84:7200/uploads/images/1734288231651-vegetables-155616_640.png`;
  const [hovered, setHovered] = useState(false);

  const handleHighlight = async (imageUrl) => {
    try {
      const response = await fetch("http://your-api-url/highlight-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageUrl }),
      });
      const result = await response.json();
      // console.log("Image highlighted:", result);
    } catch (error) {
      console.error("Error highlighting image:", error);
    }
  };

  const imageUrl = meal?.image || defaultImage;

  return (
    <div
      className="flex-shrink-0 w-32 h-32 relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <img
        src={imageUrl}
        alt={`${meal.category} image`}
        className="w-full h-full object-cover rounded-lg"
      />

      {/* Overlay */}
      {/* {hovered && meal?.image && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
          <button
            style={{
              fontSize: "9px",
              padding: "4px",
            }}
            onClick={() => handleHighlight(meal.image)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Highlight this image
          </button>
        </div>
      )} */}
    </div>
  );
};

export default MealCard;
