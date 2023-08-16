import { useState } from "react";
import AddMoreBtn from "../AddMoreBtn/AddMoreBtn";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Navigation from "../Navigation/Navigation";
// import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";

export default function Movies({ movies }) {
  console.log(movies);
  const [foundMovies, setFoundMovies] = useState(null);

  function handleSearchMovies(query) {
    const normalizedQuery = query.toLowerCase();
    const filteredMovies = movies.filter(
      ({ nameRU, nameEN }) =>
        nameRU.includes(normalizedQuery) || nameEN.includes(normalizedQuery)
    );
    setFoundMovies(filteredMovies);
  }
  console.log(document.documentElement.clientWidth === 1288);

  return (
    <div className="movies">
      <header className="movies__header">
        <Header>
          <Navigation />
        </Header>
      </header>
      <main className="movies__container">
        <SearchForm onSearchMovies={handleSearchMovies} />
        <MoviesCardList movies={movies} />
        {/* <Preloader /> */}
        {/* <AddMoreBtn /> */}
      </main>
      <Footer />
    </div>
  );
}
