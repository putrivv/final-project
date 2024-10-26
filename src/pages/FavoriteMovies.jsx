import React, { useState, useEffect } from "react";
import Favorite from "../components/Favorite"; 

const FavoriteMovies = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favoriteMoviesData")) || {};
    setFavoriteMovies(Object.values(storedFavorites)); 
  }, []);

  
  const handleUnfavorite = (movieId) => {
    
    const storedFavorites = JSON.parse(localStorage.getItem("favoriteMoviesData")) || {};
    delete storedFavorites[movieId]; 
    localStorage.setItem("favoriteMoviesData", JSON.stringify(storedFavorites)); 

    
    setFavoriteMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== movieId));
  };

  return (
    <div className="bg-gray-300 dark:bg-slate-900 min-h-screen py-10">
      <div className="container mx-auto">
        <h1 className="text-4xl font-extrabold text-black dark:text-white mb-8 text-center">Favorite Movies</h1>
        {favoriteMovies.length === 0 ? (
          <p className="text-white text-center">No favorite movies found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteMovies.map((movie) => (
              <div key={movie.id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
                <img 
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                  alt={movie.title} 
                  className="w-full h-64 object-cover transition duration-300 ease-in-out hover:opacity-80" 
                />
                <div className="p-4">
                  <h2 className="text-xl text-white font-semibold mb-2">{movie.title}</h2>
                  <p className="text-gray-400 text-sm mb-2">Release Date: {movie.release_date}</p>
                  <p className="text-gray-400 text-sm mb-4">Rating: {movie.vote_average}/10</p>
                  <Favorite movie={movie} onUnfavorite={handleUnfavorite} /> 
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoriteMovies;
