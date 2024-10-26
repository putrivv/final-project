import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage/Homepage";
import Footer from "./components/Footer";
import Detail from "./pages/Detail";
import RatedMovies from "./pages/RatedMovies";
import Search from "./components/Search";
import FavoriteMovies from "./pages/FavoriteMovies";
import Kategori from "./pages/Kategori/Kategori"; 
import CategoryMovies from "./pages/Kategori/CategoryMovies";
import ThemeContext from "./components/context/ThemeContext";
import store from "./store/store";
import { useState } from "react";
import { Provider } from "react-redux";

function App() {
  const theme = useState("light");
  return (
    <BrowserRouter>
      <ThemeContext.Provider value={theme}>
        <Provider store={store}>
          <Navbar />
          <div className="pt-16"></div>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/search" element={<Search />} />
            <Route path="/rated" element={<RatedMovies />} />
            <Route path="/favorite" element={<FavoriteMovies />} />
            <Route path="/kategori" element={<Kategori />} />
            <Route path="/kategori/:id" element={<CategoryMovies />} />
          </Routes>
        </Provider>
        <Footer />
      </ThemeContext.Provider>
    </BrowserRouter>
  );
}

export default App;
