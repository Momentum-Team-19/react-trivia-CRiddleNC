// Catagories.jsx
import React from "react";

function Categories({ trivCatData, handleCategory }) {
  return (
    <div>
      <h2>Choose a category to start a quiz!</h2>
      {trivCatData.map((trivCat) => (
        <button
          id={trivCat.id}
          onClick={() => handleCategory(trivCat)}
          key={trivCat.id}
        >
          {trivCat.name}
        </button>
      ))}
    </div>
  );
}

export default Categories;
