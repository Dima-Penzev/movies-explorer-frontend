import { useEffect, useState } from "react";
import "./MoviesCard.css";
import { useLocation } from "react-router-dom";

export default function MoviesCard({
  title,
  duration,
  image,
  cardId,
  onCardLike,
  onDeleteCard,
  savedMovieIdsArr,
}) {
  const [isLiked, setIsLiked] = useState(false);
  const movieDuration = timeConvert(duration);
  const location = useLocation();

  function timeConvert(durationMin) {
    const hours = durationMin / 60;
    const rhours = Math.floor(hours);
    const minutes = (hours - rhours) * 60;
    const rminutes = Math.round(minutes);

    return rhours ? `${rhours}ч ${rminutes}м` : `${rminutes}м`;
  }

  function handleLikeClick() {
    if (location.pathname === "/movies") {
      onCardLike(cardId, isLiked);
    }
    if (location.pathname === "/saved-movies") {
      onDeleteCard(cardId);
    }
  }

  useEffect(() => {
    setIsLiked(
      savedMovieIdsArr && savedMovieIdsArr.includes(cardId) ? true : false
    );
  }, [savedMovieIdsArr]);

  return (
    <li className="movies-card">
      <div className="movies-card__container">
        <h2 className="movies-card__title">{title}</h2>
        <p className="movies-card__duration">{movieDuration}</p>
      </div>
      <div className="movies-card__image-thumb">
        <img
          className="movies-card__image"
          src={`https://api.nomoreparties.co/${image}`}
          alt={title}
        />
      </div>
      <button
        className={`movies-card__button  ${
          isLiked &&
          location.pathname === "/movies" &&
          "movies-card__button_saved"
        } ${
          location.pathname === "/saved-movies" && "movies-card__button_delete"
        }`}
        type="button"
        onClick={handleLikeClick}
      >
        Сохранить
      </button>
    </li>
  );
}
