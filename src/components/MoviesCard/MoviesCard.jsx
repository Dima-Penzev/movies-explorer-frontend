import "./MoviesCard.css";

export default function MoviesCard({ image }) {
  return (
    <li className="movies-card">
      <div className="movies-card__container">
        <h2 className="movies-card__title">В погоне за Бенкси</h2>
        <p className="movies-card__duration">27 минут</p>
      </div>
      <img className="movies-card__image" src={image} alt="постер фильма" />
      <button className="movies-card__button" type="button">
        Сохранить
      </button>
    </li>
  );
}
