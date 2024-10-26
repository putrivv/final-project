import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';

const API_KEY = '0c5de22b2a4d587622380e90f40977b8'; 

const MovieSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('query') || '';
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('All'); 

  useEffect(() => {
    const fetchMovies = async () => {
      if (!searchQuery) return; 
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchQuery)}`
        );
        setMovieList(data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies(); 
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    const newSearch = e.target.value;
    setSearchParams({ query: newSearch }); 
  };

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value); 
  };

  
  const availableGenres = [
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

 
  const filteredMovies = selectedGenre === 'All' ? movieList : movieList.filter(movie => {
    return movie.genre_ids && movie.genre_ids.includes(parseInt(selectedGenre));
  });

  return (
    <div className="p-6 bg-gray-300 dark:bg-slate-900 min-h-screen">
      <h1 className="text-4xl text-center mb-6 text-black dark:text-white font-extrabold">
        Movie Search
      </h1>
      <input
        type="text"
        placeholder="Search for movies..."
        className="input input-bordered w-full mb-4 rounded-lg shadow-lg p-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        value={searchQuery}
        onChange={handleSearchChange} 
      />

      {/* Dropdown Filter Label */}
      <label className="text-black dark:text-white mb-2 block">Filter by Genre</label>
      <select
        value={selectedGenre}
        onChange={handleGenreChange} // Update genre filter on selection
        className="select select-bordered w-full mb-6 rounded-lg shadow-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        style={{ padding: '0.5rem 0.75rem' }} // Adjust padding for better text positioning
      >
        <option value="All">All</option>
        {availableGenres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>

      {isLoading && <p className="text-black dark:text-white text-center text-xl">Loading...</p>}
      
      {filteredMovies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMovies.map((movie) => (
            <div key={movie.id} className="card bg-gray-800 rounded-lg shadow-xl transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
              <figure className="relative">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="rounded-t-lg object-cover h-80 w-full"
                />
                <div className="absolute top-2 left-2 bg-blue-600 text-white text-sm font-semibold rounded px-2 py-1">
                  {movie.vote_average} ⭐
                </div>
              </figure>
              <div className="card-body p-6">
                <h2 className="text-xl text-white font-bold mb-2">{movie.title}</h2>
                <p className="text-gray-400 text-sm mb-4">
                  {movie.overview.length > 100 ? `${movie.overview.slice(0, 100)}...` : movie.overview}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-xs italic">{new Date(movie.release_date).getFullYear()}</span>
                  <Link to={`/detail/${movie.id}`}>
                    <button className="bg-blue-600 text-white py-1 px-3 rounded-md hover:bg-blue-800 transition duration-300">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-black dark:text-white text-center">No movies found.</p>
      )}
    </div>
  );
};

export default MovieSearch;
