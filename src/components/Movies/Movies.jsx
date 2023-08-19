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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Movies() {
  const [foundMovies, setFoundMovies] = useState(
    JSON.parse(localStorage.getItem("movies-list")) ?? []
  );
  const [renderedMovies, setRenderedMovies] = useState([]);
  const [movieQuery, setMovieQuery] = useState(
    localStorage.getItem("movie-query") ?? null
  );
  const [savedMovieIdsArr, setSavedMoviesIdsArr] = useState([]);
  const [checked, setChecked] = useState(false);
  const [status, setStatus] = useState("idle");
  const notifyEmptyQuery = () => toast.error("Нужно ввести ключевое слово.");

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
    setMovieQuery(query);
    localStorage.setItem("movie-query", query);
    handleShortMovies(shortMovieChecked);
  }

  function handleShortMovies(shortMovieChecked) {
    setChecked(shortMovieChecked);
    localStorage.setItem("short-movie-checked", shortMovieChecked);
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
          console.log(err);
        });
    }
  }

  useEffect(() => {
    let firstBundle;

    if (document.documentElement.clientWidth < 768) {
      firstBundle = foundMovies && foundMovies.slice(0, 5);
    } else if (
      document.documentElement.clientWidth >= 768 &&
      document.documentElement.clientWidth < 1280
    ) {
      firstBundle = foundMovies && foundMovies.slice(0, 8);
    } else if (document.documentElement.clientWidth >= 1280) {
      firstBundle = foundMovies && foundMovies.slice(0, 12);
    }
    setRenderedMovies(firstBundle);
    setStatus("resolved");
  }, [foundMovies]);

  useEffect(() => {
    const onResize = () => {
      setTimeout(() => {
        let firstBundle;
        if (
          document.documentElement.clientWidth < 768 &&
          renderedMovies &&
          renderedMovies.length <= 5
        ) {
          firstBundle = foundMovies && foundMovies.slice(0, 5);
        } else if (
          document.documentElement.clientWidth >= 768 &&
          document.documentElement.clientWidth < 1280 &&
          renderedMovies &&
          renderedMovies.length <= 8
        ) {
          firstBundle = foundMovies && foundMovies.slice(0, 8);
        } else if (
          document.documentElement.clientWidth >= 1280 &&
          renderedMovies &&
          renderedMovies.length <= 12
        ) {
          firstBundle = foundMovies && foundMovies.slice(0, 12);
        } else {
          return;
        }

        if (firstBundle) {
          setRenderedMovies(firstBundle);
        }
      }, 1000);
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [foundMovies, renderedMovies]);

  useEffect(() => {
    if (movieQuery) {
      setStatus("pending");
      const normalizedQuery = movieQuery.toLowerCase();

      getMovies()
        .then((response) => {
          const filteredMovies = response.filter(
            ({ nameRU, nameEN, duration }) => {
              const normalizedNameRU = nameRU.toLowerCase();
              const normalizedNameEN = nameEN.toLowerCase();

              if (checked) {
                return (
                  (normalizedNameRU.includes(normalizedQuery) ||
                    normalizedNameEN.includes(normalizedQuery)) &&
                  duration <= 40
                );
              } else {
                return (
                  normalizedNameRU.includes(normalizedQuery) ||
                  normalizedNameEN.includes(normalizedQuery)
                );
              }
            }
          );

          if (!filteredMovies.length) {
            setStatus("notFound");
          } else {
            setStatus("resolved");
            setFoundMovies(filteredMovies);
            localStorage.setItem("movies-list", JSON.stringify(filteredMovies));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [movieQuery, checked]);

  useEffect(() => {
    auth
      .getSavedMovies()
      .then((res) => {
        res.data.forEach(({ movieId }) => {
          setSavedMoviesIdsArr((savedMovieIdsArr) => [
            movieId,
            ...savedMovieIdsArr,
          ]);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
          onShortMovies={handleShortMovies}
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
        autoClose={3000}
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
