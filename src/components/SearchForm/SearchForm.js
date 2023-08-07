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
      <label>
        <input type="checkbox" />
        Короткометражки
      </label>
    </form>
  );
}
