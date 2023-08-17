import { useState } from "react";
import "../Movies/Movies.css";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

export default function SavedMovies() {
  const [movieQuery, setMovieQuery] = useState("");
  const [checked, setChecked] = useState(false);

  function handleSearchMovies(query, shortMovieChecked) {
    setMovieQuery(query);
    setChecked(shortMovieChecked);
  }

  function handleShortMovies(shortMovieChecked) {
    setChecked(shortMovieChecked);
  }
  return (
    <div className="movies">
      <header className="movies__header">
        <Header>
          <Navigation />
        </Header>
      </header>
      <main className="movies__container movies__container_saved">
        <SearchForm
          onSearchMovies={handleSearchMovies}
          onShortMovies={handleShortMovies}
        />
        <MoviesCardList />
      </main>
      <Footer />
    </div>
  );
}
