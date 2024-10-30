import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const API_KEY = '0c5de22b2a4d587622380e90f40977b8'; 

const CategoryMovies = () => {
  const { id } = useParams(); 
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fungsi untuk mengambil film berdasarkan kategori
    const fetchMoviesByCategory = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${id}`
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching category movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMoviesByCategory();
  }, [id]);

  return (
    <div className="p-6 bg-gray-300 dark:bg-slate-900 min-h-screen"> {/* Set background here */}
      <h1 className="text-4xl text-black dark:text-white font-extrabold text-center mb-8">Movies in Genre</h1>
      
      {loading ? (
        <p className="text-black dark:text-white text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {movies.map((movie) => (
            <div 
              key={movie.id} 
              className="bg-gray-400 dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105"
            >
              <img 
                src={movie.poster_path ? 
                  `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 
                  'https://via.placeholder.com/500x750?text=No+Image'} 
                alt={movie.title} 
                className="w-full h-80 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg text-black dark:text-white font-semibold mb-2">{movie.title}</h2>
                <p className="text-gray-800 dark:text-gray-400 text-sm mb-4">
                  {movie.overview.length > 100 ? `${movie.overview.slice(0, 100)}...` : movie.overview}
                </p>
                <Link to={`/detail/${movie.id}`}>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryMovies;
