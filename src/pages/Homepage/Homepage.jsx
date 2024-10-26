import axios from "axios";
import { useEffect } from "react";
import HomepageView from "./HomepageView";
import { useDispatch, useSelector } from "react-redux";
import {
  setNowPlayingData,
  setPopularData,
  setTopRatedData,
  setUpcomingData,
} from "../../store/action/homepageAction";

const Homepage = () => {
  // const [nowPlayingData, setNowPlayingData] = useState();
  // const [popularData, setPopularData] = useState();
  // const [topRatedData, setTopRatedData] = useState();
  // const [upcomingData, setUpcomingData] = useState();

  const data = useSelector((state) => state.home);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(data);
  }, [data]);

  // const getRandomItem = (array) => {
  //   const randomIndex = Math.floor(Math.random() * array.length);
  //   return array[randomIndex];
  // };

  // Fetch Now Playing movies
  const fetchNowPlaying = async () => {
    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/now_playing",
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYzVkZTIyYjJhNGQ1ODc2MjIzODBlOTBmNDA5NzdiOCIsIm5iZiI6MTcyOTU1OTU2Mi4wMDk1MTUsInN1YiI6IjY3MDQ4NDRhOThkZjhlYTAxNTFkMzA3ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Zb3diDQZgOb0Y9vfH4GQKyeLapnqvUvgJ7RCJ0gnW40",
        },
      }
    );
    dispatch(setNowPlayingData(response.data));
  };

  // Fetch Popular movies
  const fetchPopular = async () => {
    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/popular",
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYzVkZTIyYjJhNGQ1ODc2MjIzODBlOTBmNDA5NzdiOCIsIm5iZiI6MTcyOTU1OTU2Mi4wMDk1MTUsInN1YiI6IjY3MDQ4NDRhOThkZjhlYTAxNTFkMzA3ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Zb3diDQZgOb0Y9vfH4GQKyeLapnqvUvgJ7RCJ0gnW40",
        },
      }
    );
    dispatch(setPopularData(response.data));
  };

  // Fetch Top Rated movies
  const fetchTopRated = async () => {
    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/top_rated",
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYzVkZTIyYjJhNGQ1ODc2MjIzODBlOTBmNDA5NzdiOCIsIm5iZiI6MTcyOTU1OTU2Mi4wMDk1MTUsInN1YiI6IjY3MDQ4NDRhOThkZjhlYTAxNTFkMzA3ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Zb3diDQZgOb0Y9vfH4GQKyeLapnqvUvgJ7RCJ0gnW40",
        },
      }
    );
    dispatch(setTopRatedData(response.data));
  };

  // Fetch Upcoming movies
  const fetchUpcoming = async () => {
    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/upcoming",
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYzVkZTIyYjJhNGQ1ODc2MjIzODBlOTBmNDA5NzdiOCIsIm5iZiI6MTcyOTU1OTU2Mi4wMDk1MTUsInN1YiI6IjY3MDQ4NDRhOThkZjhlYTAxNTFkMzA3ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Zb3diDQZgOb0Y9vfH4GQKyeLapnqvUvgJ7RCJ0gnW40",
        },
      }
    );
    dispatch(setUpcomingData(response.data));
  };

  useEffect(() => {
    fetchNowPlaying();
    fetchPopular();
    fetchTopRated();
    fetchUpcoming();
  }, []);

  return (
    <HomepageView
      data={data.nowPlayingData}
      popularData={data.popularData}
      ratedData={data.topRatedData}
      comingData={data.upcomingData}
      // getRandomItem={getRandomItem}
    />
  );
};

export default Homepage;
