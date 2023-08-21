import { useContext, useEffect, useState } from "react";
import "../Movies/Movies.css";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { getSavedMovies } from "../../utils/MainApi";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";
import * as auth from "../../utils/MainApi";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { filterMovies } from "../../utils/filterMovies";
import {
  notifyEmptyQuery,
  notifyCommonError,
} from "../../notifications/notifications";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useLocation } from "react-router-dom";

export default function SavedMovies() {
  const { userId } = useContext(CurrentUserContext);
  const [foundMovies, setFoundMovies] = useState([]);
  const [renderedMovies, setRenderedMovies] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [movieQuery, setMovieQuery] = useState("");
  const [checked, setChecked] = useState(false);
  const { pathname } = useLocation();

  function handleSearchSavedMovies(query, shortMovieChecked) {
    if (query === "" && pathname === "/movies") {
      notifyEmptyQuery();
      return;
    }
    setMovieQuery(query);
    setChecked(shortMovieChecked);
  }

  function handleShortSavedMovies(shortMovieChecked) {
    setChecked(shortMovieChecked);
  }

  function handleDeleteMovie(movieId) {
    auth
      .deleteMovie(movieId)
      .then(() => {
        setFoundMovies((state) => state.filter((m) => m.movieId !== movieId));
      })
      .catch((err) => {
        notifyCommonError();
        console.log(err);
      });
  }

  useEffect(() => {
    setShowLoader(true);
    getSavedMovies()
      .then((response) => {
        const ownedMovies = response.data.filter(
          ({ owner }) => owner._id === userId
        );
        console.log(ownedMovies);
        setShowLoader(false);
        setFoundMovies(ownedMovies);
      })
      .catch((err) => {
        notifyCommonError();
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const normalizedQuery = movieQuery.toLowerCase();
    const filteredMovies = filterMovies(foundMovies, normalizedQuery, checked);

    setRenderedMovies(filteredMovies);
  }, [movieQuery, checked, foundMovies]);

  return (
    <div className="movies">
      <header className="movies__header">
        <Header>
          <Navigation />
        </Header>
      </header>
      <main className="movies__container movies__container_saved">
        <SearchForm
          onSearchMovies={handleSearchSavedMovies}
          onShortMovies={handleShortSavedMovies}
        />
        {showLoader && <Preloader />}
        {renderedMovies.length > 0 && (
          <MoviesCardList
            movies={renderedMovies}
            onDeleteCard={handleDeleteMovie}
          />
        )}
        {renderedMovies.length === 0 && (movieQuery || checked) && (
          <h2 className="movies__not-found">Ничего не найдено</h2>
        )}
        {foundMovies.length === 0 && !showLoader && (
          <h2 className="movies__not-found">Нет сохраненных фильмов</h2>
        )}
      </main>
      <Footer />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}
