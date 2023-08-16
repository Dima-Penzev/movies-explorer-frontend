import "./MoviesCard.css";

export default function MoviesCard({ title, duration, image }) {
  return (
    <li className="movies-card">
      <div className="movies-card__container">
        <h2 className="movies-card__title">{title}</h2>
        <p className="movies-card__duration">{duration} минут</p>
      </div>
      <div className="movies-card__image-thumb">
        <img
          className="movies-card__image"
          src={`https://api.nomoreparties.co/${image}`}
          alt={title}
        />
      </div>
      <button className="movies-card__button" type="button">
        Сохранить
      </button>
    </li>
  );
}
