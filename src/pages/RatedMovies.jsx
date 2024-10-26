import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa"; 

const RatedMovies = () => {
  const [ratedMovies, setRatedMovies] = useState([]);

  
  useEffect(() => {
    const storedRatedMovies = JSON.parse(localStorage.getItem("ratedMovies")) || [];
    setRatedMovies(storedRatedMovies);
  }, []);

  
  const sendRatingToTMDB = async (movieId, rating) => {
    const apiKey = "0c5de22b2a4d587622380e90f40977b8"; 
    const sessionId = "120.188.73.42"; 
    const url = `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${apiKey}&session_id=${sessionId}`;

    try {
      const response = await axios.post(
        url,
        { value: rating * 2 }, 
        { headers: { "Content-Type": "application/json;charset=utf-8" } }
      );
      console.log("Rating sent successfully:", response.data);
    } catch (error) {
      console.error("Error sending rating to TMDB:", error);
    }
  };

  
  const handleDelete = (id) => {
    const updatedMovies = ratedMovies.filter(movie => movie.id !== id);
    localStorage.setItem("ratedMovies", JSON.stringify(updatedMovies));
    setRatedMovies(updatedMovies);
  };

  return (
    <div className="bg-gray-300 dark:bg-slate-900 min h-screen py-3">
      <div className="container mx-auto mt-10 mb-20">
        <h1 className="text-4xl font-extrabold text-black dark:text-white mb-8 text-center">Rated Movies</h1>
        {ratedMovies.length === 0 ? (
          <p className="text-black dark:text-white text-center">No movies rated yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ratedMovies.map((movie) => (
              <div key={movie.id} className="bg-gray-800 rounded-lg shadow-2xl transition-transform transform hover:scale-105 overflow-hidden">
                <img 
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                  alt={movie.title} 
                  className="w-full h-64 object-cover transition duration-300 ease-in-out hover:opacity-90" 
                />
                <div className="p-4">
                  <h2 className="text-xl text-white font-semibold mb-2">{movie.title}</h2>
                  <div className="flex items-center mb-3">
                    {/* Render stars based on the rating */}
                    {[...Array(5)].map((_, index) => (
                      <FaStar key={index} className={`h-5 w-5 ${index < movie.rating ? 'text-yellow-400' : 'text-gray-400'}`} />
                    ))}
                    <span className="text-gray-400 ml-2">({movie.rating}/5)</span>
                  </div>
                  <button 
                    onClick={() => handleDelete(movie.id)} 
                    className="mt-3 w-full bg-red-600 hover:bg-red-800 text-white font-semibold py-2 rounded-md transition duration-300 shadow-md transform hover:scale-105"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RatedMovies;
