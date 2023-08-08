import s from "./MoviesCard.module.css";

export default function MoviesCard() {
  return (
    <div className={s.moviesCard}>
      <h2 className={s.MoviesCard__title}>В погоне за Бенкси</h2>
      <p className={s.moviesCard__duration}>27 минут</p>
      <img className={s.moviesCard__image} src="" alt="" />
      <button className={s.moviesCard__button} type="button">
        Сохранить
      </button>
    </div>
  );
}
