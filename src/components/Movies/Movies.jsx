import { useEffect, useState } from "react";
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
import {
  notifyEmptyQuery,
  notifyCommonError,
} from "../../notifications/notifications";

export default function Movies() {
  const [foundMovies, setFoundMovies] = useState(
    localStorage.getItem("movies-list")
      ? JSON.parse(localStorage.getItem("movies-list"))
      : []
  );
  const [renderedMovies, setRenderedMovies] = useState([]);
  const [savedMovieIdsArr, setSavedMoviesIdsArr] = useState(
    localStorage.getItem("liked-movies-ids-arr")
      ? JSON.parse(localStorage.getItem("liked-movies-ids-arr"))
      : []
  );
  const [status, setStatus] = useState(
    localStorage.getItem("movies-list") ? "resolved" : "idle"
  );

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
    setStatus("pending");
    const normalizedQuery = query.toLowerCase();

    getMovies()
      .then((response) => {
        const filteredMovies = filterMovies(
          response,
          shortMovieChecked,
          normalizedQuery
        );

        if (!filteredMovies.length) {
          setStatus("notFound");
        } else {
          setStatus("resolved");
          setFoundMovies(filteredMovies);
          localStorage.setItem("movie-query", normalizedQuery);
          localStorage.setItem("short-movie-checked", shortMovieChecked);
          localStorage.setItem("movies-list", JSON.stringify(filteredMovies));
        }
      })
      .catch((err) => {
        setStatus("rejected");
        notifyCommonError();
        console.log(err);
      });
  }

  function handleSearchShortMovies(shortMovieChecked) {
    if (foundMovies.length > 0) {
      const filteredMovies = shortMovieChecked
        ? foundMovies.filter(({ duration }) => duration <= 40)
        : foundMovies;

      if (!filteredMovies.length) {
        setStatus("notFound");
      } else {
        setStatus("resolved");
        setRenderedMovies(filteredMovies);
      }
    }
  }

  function toggleLikeMovie(movieId, movieLike) {
    if (!movieLike) {
      const likedMovie = renderedMovies.find(({ id }) => movieId === id);

      auth
        .saveMovie(likedMovie)
        .then(() => {
          setSavedMoviesIdsArr((savedMovieIdsArr) => [
            movieId,
            ...savedMovieIdsArr,
          ]);
        })
        .catch((err) => {
          notifyCommonError();
          console.log(err);
        });
    } else {
      auth
        .deleteMovie(movieId)
        .then(() => {
          setSavedMoviesIdsArr((savedMovieIdsArr) =>
            savedMovieIdsArr.filter((id) => id !== movieId)
          );
        })
        .catch((err) => {
          notifyCommonError();
          console.log(err);
        });
    }
  }

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
    if (savedMovieIdsArr.length === 0 && renderedMovies.length !== 0) {
      auth
        .getSavedMovies()
        .then((res) => {
          res.data.forEach(({ movieId }) => {
            setSavedMoviesIdsArr((state) => [movieId, ...state]);
          });
        })
        .catch((err) => {
          notifyCommonError();
          console.log(err);
        });
    }
    localStorage.setItem(
      "liked-movies-ids-arr",
      JSON.stringify(savedMovieIdsArr)
    );
  }, [savedMovieIdsArr, renderedMovies]);

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
            savedMovieIdsArr={savedMovieIdsArr}
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
