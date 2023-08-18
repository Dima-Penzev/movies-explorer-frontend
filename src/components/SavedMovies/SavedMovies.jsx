import { useEffect, useState } from "react";
import "../Movies/Movies.css";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { getSavedMovies } from "../../utils/MainApi";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";
import * as auth from "../../utils/MainApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SavedMovies() {
  const [movieQuery, setMovieQuery] = useState("");
  const [checked, setChecked] = useState(false);
  const [foundMovies, setFoundMovies] = useState([]);
  const [renderedMovies, setRenderedMovies] = useState([]);
  const [status, setStatus] = useState("idle");
  const notifyEmptyQuery = () => toast.error("Нужно ввести ключевое слово.");

  function handleSearchSavedMovies(query, shortMovieChecked) {
    if (query === "") {
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
        setRenderedMovies((state) =>
          state.filter((m) => m.movieId !== movieId)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    setStatus("pending");
    getSavedMovies()
      .then((response) => {
        setStatus("resolved");
        setFoundMovies(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
    setStatus("pending");
    const normalizedQuery = movieQuery.toLowerCase();

    const filteredMovies = foundMovies.filter(
      ({ nameRU, nameEN, duration }) => {
        if (checked) {
          return (
            (nameRU.includes(normalizedQuery) ||
              nameEN.includes(normalizedQuery)) &&
            duration <= 40
          );
        } else {
          return (
            nameRU.includes(normalizedQuery) || nameEN.includes(normalizedQuery)
          );
        }
      }
    );

    if (!filteredMovies.length) {
      setStatus("notFound");
    } else {
      setStatus("resolved");
      setRenderedMovies(filteredMovies);
    }
  }, [movieQuery, checked]);
  console.log(foundMovies);
  console.log(checked);
  console.log(movieQuery);

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
        {status === "pending" && <Preloader />}
        {status === "resolved" && renderedMovies.length > 0 && (
          <MoviesCardList
            movies={renderedMovies}
            onDeleteCard={handleDeleteMovie}
          />
        )}
        {status === "notFound" && (
          <h2 className="movies__not-found">Ничего не найдено</h2>
        )}
        {!renderedMovies.length && status !== "pending" && (
          <h2 className="movies__not-found">Нет сохраненных фильмов</h2>
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
