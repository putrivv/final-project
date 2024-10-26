import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import RatingStar from "../components/RatingStar";
import { FaHeart, FaRegHeart } from "react-icons/fa"; 

export default function Detail() {
  const { id } = useParams(); 
  const [data, setData] = useState(null); 
  const [notification, setNotification] = useState(""); 
  const [favoriteMovies, setFavoriteMovies] = useState([]); 
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); 
  const API_KEY = "0c5de22b2a4d587622380e90f40977b8"; 

  const ambilMovie = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
      );
      setData(response.data); 
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  useEffect(() => {
    ambilMovie();
    const storedFavorites = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
    setFavoriteMovies(storedFavorites);
  }, [id]);

  const isFavorite = (movieId) => favoriteMovies.includes(movieId);

  const toggleFavorite = (movie) => {
    if (isButtonDisabled) return; 

    const updatedFavorites = isFavorite(movie.id)
      ? favoriteMovies.filter((favId) => favId !== movie.id) // Remove from favorites
      : [...favoriteMovies, movie.id]; // Add to favorites

    setFavoriteMovies(updatedFavorites);
    localStorage.setItem("favoriteMovies", JSON.stringify(updatedFavorites));

    const favoriteMovieData = JSON.parse(localStorage.getItem("favoriteMoviesData")) || {};
    if (updatedFavorites.includes(movie.id)) {
      favoriteMovieData[movie.id] = movie; 
    } else {
      delete favoriteMovieData[movie.id]; 
    }
    localStorage.setItem("favoriteMoviesData", JSON.stringify(favoriteMovieData));

    const action = isFavorite(movie.id) ? "removed from" : "added to";
    setNotification(`Movie ${action} favorites!`);
    
    setIsButtonDisabled(true);
    setTimeout(() => {
      setIsButtonDisabled(false);
      setNotification(""); 
    }, 3000);
  };

  const handleRate = (rating) => {
    const ratedMovie = {
      id: data.id,
      title: data.title,
      rating: rating,
      poster_path: data.poster_path,
    };

    const existingRatedMovies = JSON.parse(localStorage.getItem("ratedMovies")) || [];
    const isRated = existingRatedMovies.find((movie) => movie.id === ratedMovie.id);

    if (isRated) {
      const updatedMovies = existingRatedMovies.map((movie) =>
        movie.id === ratedMovie.id ? ratedMovie : movie
      );
      localStorage.setItem("ratedMovies", JSON.stringify(updatedMovies));
    } else {
      existingRatedMovies.push(ratedMovie);
      localStorage.setItem("ratedMovies", JSON.stringify(existingRatedMovies));
    }

    setNotification(`You rated "${data.title}" with ${rating} stars!`);
    
    setTimeout(() => {
      setNotification("");
    }, 3000);
  };

  return (
    <div>
      {/* Main content area */}
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${data?.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="hero-overlay bg-black opacity-70"></div>
        <div className="hero-content text-center flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8 pt-20 px-4 relative">
          {data ? (
            <>
              <div className="lg:w-1/3 relative"> 
                <img
                  src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} 
                  className="rounded-lg shadow-xl transition-transform duration-300 hover:scale-105"
                  alt={data.title}
                />
                
                <button
                  onClick={() => toggleFavorite(data)}
                  className="absolute bottom-4 right-4 bg-red-600 rounded-full p-3 shadow-lg transition-transform duration-200 hover:scale-110"
                  disabled={isButtonDisabled}
                >
                  {isFavorite(data.id) ? (
                    <FaHeart size={32} className="text-white" />
                  ) : (
                    <FaRegHeart size={32} className="text-white" />
                  )}
                </button>
              </div>
              <div className="text-white lg:w-2/3 lg:mr-8 space-y-4">
                <h1 className="text-4xl font-bold mb-2">{data.title}</h1>
                <p className="py-4 text-lg">{data.overview}</p>
                <div className="font-semibold">
                  <strong>Release Date:</strong> {data.release_date}
                </div>
                <div className="font-semibold">
                  <strong>Rating:</strong> {data.vote_average}/10
                </div>
                <div className="font-semibold">
                  <strong>Genres:</strong>{" "}
                  {data.genres.map((genre) => genre.name).join(", ")}
                </div>
                <div className="flex flex-col items-center mt-5">
                  <h2 className="text-2xl mb-2">Rate this movie:</h2>
                  <RatingStar onRate={handleRate} />
                  {notification && (
                    <div className="mt-2 bg-white bg-opacity-25 backdrop-blur-md text-white p-2 rounded-lg shadow-lg">
                      {notification}
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <p className="text-white">Loading movie details...</p>
          )}
        </div>
      </div>
    </div>
  );
}
