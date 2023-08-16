import { useEffect, useState } from "react";
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
  const [renderedMovies, setRenderedMovies] = useState([]);

  function handleSearchMovies(query) {
    const normalizedQuery = query.toLowerCase();
    const filteredMovies = movies.filter(
      ({ nameRU, nameEN }) =>
        nameRU.includes(normalizedQuery) || nameEN.includes(normalizedQuery)
    );
    setFoundMovies(filteredMovies);
  }

  useEffect(() => {
    window.addEventListener("resize", () => {
      setTimeout(() => {
        let firstBundle;
        if (document.documentElement.clientWidth < 768) {
          firstBundle = movies && movies.slice(0, 5);
        } else if (
          document.documentElement.clientWidth >= 768 &&
          document.documentElement.clientWidth < 1280
        ) {
          firstBundle = movies && movies.slice(0, 8);
        } else if (document.documentElement.clientWidth >= 1280) {
          firstBundle = movies && movies.slice(0, 12);
        }
        setRenderedMovies(firstBundle);
      }, 1000);
    });
  }, [movies]);

  function handleAddMovies() {
    if (document.documentElement.clientWidth < 1280) {
      const m = movies.slice(renderedMovies.length, renderedMovies.length + 2);
      setRenderedMovies([...renderedMovies, ...m]);
      console.log(m);
    } else if (document.documentElement.clientWidth >= 1280) {
      const m = movies.slice(renderedMovies.length, renderedMovies.length + 3);
      setRenderedMovies([...renderedMovies, ...m]);
      console.log(m);
    }
  }
  console.log(renderedMovies.length);

  return (
    <div className="movies">
      <header className="movies__header">
        <Header>
          <Navigation />
        </Header>
      </header>
      <main className="movies__container">
        <SearchForm onSearchMovies={handleSearchMovies} />
        <MoviesCardList movies={renderedMovies} />
        {/* <Preloader /> */}
        <AddMoreBtn onAddMovies={handleAddMovies} />
      </main>
      <Footer />
    </div>
  );
}
