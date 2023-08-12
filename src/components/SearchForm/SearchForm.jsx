import "./SearchForm.css";

export default function SearchForm() {
  return (
    <form className="search-form">
      <div className="search-form__container">
        <input
          className="search-form__input"
          type="text"
          placeholder="Фильм"
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
