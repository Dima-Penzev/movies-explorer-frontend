import { useState, useEffect } from "react";
import "./SearchForm.css";

export default function SearchForm({ onSearchMovies, onShortMovies }) {
  const [formFilm, setFormFilm] = useState("");
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setFormFilm("");
    // setChecked(false);
  }, []);

  useEffect(() => {
    onShortMovies(checked);
  }, [checked]);

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
        <button className="search-form__button" type="submit">
          Поиск
        </button>
      </div>
      <p className="search-form__short-movie">
        <label className="search-form__switch">
          <input
            className="search-form__checkbox"
            type="checkbox"
            name="short-movies"
            // value={checked}
            onChange={handleChange}
          />
          <span className="search-form__slider"></span>
        </label>
        Короткометражки
      </p>
    </form>
  );
}
