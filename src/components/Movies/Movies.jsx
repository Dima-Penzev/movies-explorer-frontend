import { useEffect, useState, useContext } from "react";
import AddMoreBtn from "../AddMoreBtn/AddMoreBtn";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Navigation from "../Navigation/Navigation";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import { getMovies } from "../../utils/MoviesApi";
import * as auth from "../../utils/MainApi";
import "./Movies.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { filterMovies } from "../../utils/filterMovies";
import { handleRenderedMovies } from "../../utils/handleRenderedMovies";
import { createInitialMoviesArr } from "../../utils/createInitialMoviesArr";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import {
  notifyEmptyQuery,
  notifyCommonError,
} from "../../notifications/notifications";

export default function Movies() {
  const [allMovies, setAllMovies] = useState(
    localStorage.getItem("all-movies-list")
      ? JSON.parse(localStorage.getItem("all-movies-list"))
      : []
  );
  const [foundMovies, setFoundMovies] = useState(
    localStorage.getItem("movies-list")
      ? JSON.parse(localStorage.getItem("movies-list"))
      : []
  );
  const [renderedMovies, setRenderedMovies] = useState([]);
  const [savedMovieArr, setSavedMoviesArr] = useState(
    localStorage.getItem("liked-movies-arr")
      ? JSON.parse(localStorage.getItem("liked-movies-arr"))
      : []
  );
  const [status, setStatus] = useState(
    localStorage.getItem("movies-list") ? "resolved" : "idle"
  );
  const [movieQuery, setMovieQuery] = useState(
    localStorage.getItem("movie-query")
      ? localStorage.getItem("movie-query")
      : ""
  );
  const [checked, setChecked] = useState(
    localStorage.getItem("short-movie-checked")
      ? JSON.parse(localStorage.getItem("short-movie-checked"))
      : false
  );
  const { userId } = useContext(CurrentUserContext);

  function handleAddMovies() {
    if (document.documentElement.clientWidth < 1280) {
      const moviesForAdd = foundMovies.slice(
        renderedMovies.length,
        renderedMovies.length + 2
      );
      setRenderedMovies([...renderedMovies, ...moviesForAdd]);
    } else if (document.documentElement.clientWidth >= 1280) {
      const moviesForAdd = foundMovies.slice(
        renderedMovies.length,
        renderedMovies.length + 3
      );
      setRenderedMovies([...renderedMovies, ...moviesForAdd]);
    }
  }

  function handleSearchMovies(query, shortMovieChecked) {
    if (query === "") {
      notifyEmptyQuery();
      return;
    }

    const normalizedQuery = query.toLowerCase();

    if (normalizedQuery === movieQuery) {
      return;
    }

    setStatus("pending");
    setMovieQuery(normalizedQuery);
    setChecked(shortMovieChecked);

    if (allMovies.length === 0) {
      getMovies()
        .then((response) => {
          setAllMovies(response);
          localStorage.setItem("all-movies-list", JSON.stringify(response));
        })
        .catch((err) => {
          setStatus("rejected");
          notifyCommonError();
          console.log(err);
        });
    }
  }

  function handleSearchShortMovies(shortMovieChecked) {
    setChecked(shortMovieChecked);
  }

  function toggleLikeMovie(cardId, movieLike) {
    const movie =
      savedMovieArr && savedMovieArr.find(({ movieId }) => movieId === cardId);
    const movieId = movie && movieLike ? movie._id : cardId;

    if (!movieLike) {
      const likedMovie = renderedMovies.find(({ id }) => movieId === id);

      auth
        .saveMovie(likedMovie)
        .then((res) => {
          setSavedMoviesArr((state) => [res.data, ...state]);
        })
        .catch((err) => {
          notifyCommonError();
          console.log(err);
        });
    } else {
      auth
        .deleteMovie(movieId)
        .then(() => {
          setSavedMoviesArr((state) =>
            state.filter((movie) => movie._id !== movieId)
          );
        })
        .catch((err) => {
          notifyCommonError();
          console.log(err);
        });
    }
  }

  useEffect(() => {
    if (allMovies.length > 0) {
      const filteredMovies = filterMovies(allMovies, checked, movieQuery);

      if (!filteredMovies.length) {
        setStatus("notFound");
      } else {
        setStatus("resolved");
        setFoundMovies(filteredMovies);
        localStorage.setItem("movie-query", movieQuery);
        localStorage.setItem("short-movie-checked", checked);
        localStorage.setItem("movies-list", JSON.stringify(filteredMovies));
      }
    }
  }, [allMovies, movieQuery, checked]);

  useEffect(() => {
    const initialMoviesBundle = createInitialMoviesArr(foundMovies);

    setRenderedMovies(initialMoviesBundle);
  }, [foundMovies]);

  useEffect(() => {
    const onResize = () => {
      setTimeout(() => {
        const moviesBundle = handleRenderedMovies(foundMovies, renderedMovies);

        if (moviesBundle) {
          setRenderedMovies(moviesBundle);
        }
      }, 1000);
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [foundMovies, renderedMovies]);

  useEffect(() => {
    if (savedMovieArr.length === 0 && allMovies.length !== 0) {
      auth
        .getSavedMovies()
        .then((res) => {
          const filteredMoviesArr = res.data.filter(
            ({ owner }) => owner._id === userId
          );
          setSavedMoviesArr(filteredMoviesArr);
        })
        .catch((err) => {
          notifyCommonError();
          console.log(err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allMovies]);

  useEffect(() => {
    localStorage.setItem("liked-movies-arr", JSON.stringify(savedMovieArr));
  }, [savedMovieArr]);

  return (
    <div className="movies">
      <header className="movies__header">
        <Header>
          <Navigation />
        </Header>
      </header>
      <main className="movies__container">
        <SearchForm
          onSearchMovies={handleSearchMovies}
          onShortMovies={handleSearchShortMovies}
          status={status}
        />
        {status === "pending" && <Preloader />}
        {status === "notFound" && (
          <h2 className="movies__not-found">Ничего не найдено</h2>
        )}
        {status === "resolved" && (
          <MoviesCardList
            movies={renderedMovies}
            onCardLike={toggleLikeMovie}
            savedMovieArr={savedMovieArr}
          />
        )}
        {status === "resolved" &&
          renderedMovies.length < foundMovies.length && (
            <AddMoreBtn onAddMovies={handleAddMovies} />
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
