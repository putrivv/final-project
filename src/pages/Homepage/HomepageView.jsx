import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const HomepageView = ({ data, popularData, ratedData, comingData }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    "https://image.tmdb.org/t/p/w1280/1E5baAaEse26fej7uHcjOgEE2t2.jpg",
    "https://image.tmdb.org/t/p/w1280/oBgWY00bEFeZ9N25wWVyuQddbAo.jpg",
    "https://image.tmdb.org/t/p/w1280/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
    "https://image.tmdb.org/t/p/w1280/74xTEgt7R36Fpooo50r9T25onhq.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col transition-colors duration-300"
      style={{
        backgroundImage: `url(${images[currentImage]})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        transition: "background-image 1s ease-in-out",
      }}
    >
      {/* Hero Section */}
      <div className="hero flex flex-col items-start justify-center py-24 min-h-[70vh] relative z-10">
        <div className="hero-content max-w-2xl p-8 bg-gradient-to-r from-white to-transparent dark:from-gray-800 bg-opacity-60 rounded-lg shadow-lg">
          <h1 className="mb-4 text-5xl font-bold text-black dark:text-white leading-tight">
            Step into the World of <span className="text-blue-600 dark:text-blue-400">Cinema</span>
          </h1>
          <p className="mb-6 text-lg text-black dark:text-gray-300">
            Experience the magic of storytelling through breathtaking visuals and unforgettable adventures.
          </p>
        </div>
      </div>

      {/* Movie Sections */}
      <div className="relative text-black dark:text-white">
        <div className="absolute inset-0 bg-white bg-opacity-20 dark:bg-gray-900 dark:bg-opacity-70"></div>
        <div className="relative z-10 pt-9">
          <MovieSection title="Now Playing" movies={data?.results} />
          <MovieSection title="Popular Movies" movies={popularData?.results} />
          <MovieSection title="Top Rated Movies" movies={ratedData?.results} />
          <MovieSection title="Upcoming Movies" movies={comingData?.results} />
        </div>
      </div>
    </div>
  );
};

const MovieSection = ({ title, movies }) => (
  <div className="bg-opacity-80 text-black dark:text-white py-10">
    <div className="container mx-auto px-6">
      <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-gray-200">{title}</h1>
      <div className="overflow-x-auto whitespace-nowrap">
        <div className="flex space-x-6">
          {movies?.map((item, index) => (
            <div
              key={index}
              className="relative group inline-block rounded-lg overflow-hidden shadow-lg transition-shadow duration-300 transform hover:scale-105 hover:shadow-xl"
              style={{ minWidth: "220px", maxWidth: "260px" }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={item.title}
                className="w-full h-[340px] object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black to-transparent">
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <Link
                  to={`/detail/${item.id}`}
                  className="mt-2 btn bg-transparent border border-black px-4 py-2 text-sm font-semibold uppercase tracking-wide rounded-full 
                    hover:bg-white hover:text-black transition duration-300
                    dark:bg-transparent dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default HomepageView;
