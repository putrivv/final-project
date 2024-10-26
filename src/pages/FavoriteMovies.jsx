import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const FavoriteMovies = () => {
    const [favoriteMovies, setFavoriteMovies] = useState([]);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
        const favoriteMovieData = JSON.parse(localStorage.getItem('favoriteMoviesData')) || {};

        const movies = storedFavorites.map(id => favoriteMovieData[id]).filter(movie => movie); // Map to movie objects
        setFavoriteMovies(movies);
    }, []);

    return (
        <div className="bg-gray-300 text-black dark:bg-slate-900 dark:text-white min-h-screen py-8">
            <div className="container mx-auto p-4">
                <h1 className="text-4xl font-bold mb-8 text-center">Favorite Movies</h1>
                {favoriteMovies.length === 0 ? (
                    <p className="text-lg text-center">No favorite movies found.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {favoriteMovies.map((movie) => (
                            <div key={movie.id} className="rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800 transition-transform transform hover:scale-105 duration-300">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title}
                                    className="w-full h-[340px] object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{movie.title}</h3>
                                    <Link 
                                        to={`/detail/${movie.id}`} 
                                        className="mt-2 inline-block">
                                        <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors duration-300">
                                            View Details
                                        </button>
                                    </Link>
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
