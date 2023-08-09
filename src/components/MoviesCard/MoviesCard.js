import s from "./MoviesCard.module.css";
// import pic_1 from "../../temporaryImages/pic_1.jpg";

export default function MoviesCard({ image }) {
  return (
    <li className={s.moviesCard}>
      <div className={s.moviesCard__container}>
        <h2 className={s.moviesCard__title}>В погоне за Бенкси</h2>
        <p className={s.moviesCard__duration}>27 минут</p>
      </div>
      <img className={s.moviesCard__image} src={image} alt="постер фильма" />
      <button className={s.moviesCard__button} type="button">
        Сохранить
      </button>
    </li>
  );
}
