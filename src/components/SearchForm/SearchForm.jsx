import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./SearchForm.css";

export default function SearchForm({ onSearchMovies, onShortMovies, status }) {
  const location = useLocation();
  const [formFilm, setFormFilm] = useState(
    location.pathname === "/movies" && localStorage.getItem("movie-query")
      ? localStorage.getItem("movie-query")
      : ""
  );
  const [checked, setChecked] = useState(
    location.pathname === "/movies" &&
      localStorage.getItem("short-movie-checked")
      ? JSON.parse(localStorage.getItem("short-movie-checked"))
      : false
  );

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case "movie":
        setFormFilm(value);
        break;

      case "short-movies":
        setChecked(!checked);
        break;

      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSearchMovies(formFilm, checked);
  };

  useEffect(() => {
    onShortMovies(checked);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked]);

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-form__container">
        <input
          className="search-form__input"
          type="text"
          placeholder="Фильм"
          name="movie"
          value={formFilm}
          onChange={handleChange}
        />
        <button
          disabled={status === "pending"}
          className={`search-form__button ${
            status === "pending" && "search-form__button-disabled"
          }`}
          type="submit"
        >
          Поиск
        </button>
      </div>
      <p className="search-form__short-movie">
        <label className="search-form__switch">
          <input
            className="search-form__checkbox"
            type="checkbox"
            name="short-movies"
            checked={checked}
            onChange={handleChange}
          />
          <span className="search-form__slider"></span>
        </label>
        Короткометражки
      </p>
    </form>
  );
}
