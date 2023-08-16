import { useState, useEffect } from "react";
import "./SearchForm.css";

export default function SearchForm({ onSearchMovies }) {
  const [formFilm, setFormFilm] = useState("");

  useEffect(() => {
    setFormFilm("");
  }, []);

  const handleChange = (e) => {
    const { value } = e.currentTarget;
    setFormFilm(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchMovies(formFilm);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-form__container">
        <input
          className="search-form__input"
          type="text"
          placeholder="Фильм"
          value={formFilm}
          onChange={handleChange}
        />
        <button className="search-form__button" type="submit">
          Поиск
        </button>
      </div>
      <p className="search-form__short-movie">
        <label className="search-form__switch">
          <input className="search-form__checkbox" type="checkbox" />
          <span className="search-form__slider"></span>
        </label>
        Короткометражки
      </p>
    </form>
  );
}
