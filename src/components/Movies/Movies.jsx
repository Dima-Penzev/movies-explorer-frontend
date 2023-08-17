import { useEffect, useState } from "react";
import AddMoreBtn from "../AddMoreBtn/AddMoreBtn";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Navigation from "../Navigation/Navigation";
// import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import { getMovies } from "../../utils/MoviesApi";
import "./Movies.css";

export default function Movies() {
  const [foundMovies, setFoundMovies] = useState([]);
  const [renderedMovies, setRenderedMovies] = useState([]);
  const [movieQuery, setMovieQuery] = useState("");
  const [checked, setChecked] = useState(false);

  console.log(foundMovies);
  console.log(renderedMovies);

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
    setMovieQuery(query);
    setChecked(shortMovieChecked);
  }

  function handleShortMovies(shortMovieChecked) {
    setChecked(shortMovieChecked);
    // if (shortMovieChecked) {
    //   const shortMovies = foundMovies.filter(({ duration }) => duration <= 40);

    //   if (!shortMovies.length) {
    //     return;
    //   } else {
    //     setRenderedMovies(shortMovies);
    //   }
    // } else {
    //   setRenderedMovies(renderedMovies);
    // }
  }

  console.log(checked);
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
    if (movieQuery) {
      const normalizedQuery = movieQuery.toLowerCase();

      getMovies()
        .then((response) => {
          const filteredMovies = response.filter(
            ({ nameRU, nameEN, duration }) => {
              if (checked) {
                return (
                  (nameRU.includes(normalizedQuery) ||
                    nameEN.includes(normalizedQuery)) &&
                  duration <= 40
                );
              } else {
                return (
                  nameRU.includes(normalizedQuery) ||
                  nameEN.includes(normalizedQuery)
                );
              }
            }
          );
          setFoundMovies(filteredMovies);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [movieQuery, checked]);

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
        <MoviesCardList movies={renderedMovies} />
        {/* <Preloader /> */}
        {renderedMovies && renderedMovies.length < foundMovies.length && (
          <AddMoreBtn onAddMovies={handleAddMovies} />
        )}
      </main>
      <Footer />
    </div>
  );
}
