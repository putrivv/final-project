import React from 'react';
import { Link } from 'react-router-dom';

const Kategori = () => {
  const categories = [
    { id: 28, name: 'Action' },
    { id: 35, name: 'Comedy' },
    { id: 18, name: 'Drama' },
    { id: 27, name: 'Horror' },
    { id: 9648, name: 'Mystery' },
    { id: 14, name: 'Fantasy' },
    { id: 10749, name: 'Romance' },
    { id: 36, name: 'History' },
    { id: 10402, name: 'Music' },
    
  ];

  return (
    <div className="p-6 bg-gray-300 dark:bg-slate-900 min-h-screen">
      <h1 className="text-4xl text-black dark:text-white font-extrabold text-center mb-8">Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/kategori/${category.id}`}
            className="bg-gray-800 rounded-lg p-4 text-white hover:bg-gray-700 transition duration-300"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Kategori;
