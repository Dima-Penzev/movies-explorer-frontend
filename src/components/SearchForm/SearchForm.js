import s from "./SearchForm.module.css";

export default function SearchForm() {
  return (
    <form className={s.searchForm}>
      <div className={s.searchForm__container}>
        <input
          className={s.searchForm__input}
          type="text"
          placeholder="Фильм"
        />
        <button className={s.searchForm__button} type="submit">
          Поиск
        </button>
      </div>
      <p className={s.searchForm__shortMovie}>
        <label className={s.searchForm__switch}>
          <input className={s.searchForm__checkbox} type="checkbox" />
          <span className={s.searchForm__slider}></span>
        </label>
        Короткометражки
      </p>
    </form>
  );
}
