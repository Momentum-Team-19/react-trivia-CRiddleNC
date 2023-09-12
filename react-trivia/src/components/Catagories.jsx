// Catagories.jsx
import React from "react"

function Categories({ trivCatData, handleCategory }) {

    return (
    <div>
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