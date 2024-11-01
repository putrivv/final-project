
import React from "react";

// Komponen Favorite ini digunakan untuk menampilkan tombol
// yang memungkinkan pengguna menghapus film dari daftar favorit

const Favorite = ({ movieData, handleRemove }) => {
  const handleClick = () => {
    handleRemove(movieData.id);
  };

  return (
    <button
      onClick={handleClick}
      className="mt-4 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300"
    >
      Remove from Favorites
    </button>
  );
};

export default Favorite;
