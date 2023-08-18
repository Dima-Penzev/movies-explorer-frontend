import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

export default function MoviesCardList({
  movies,
  onCardLike,
  onDeleteCard,
  savedMovieIdsArr,
}) {
  return (
    <ul className="movies-card-list">
      {movies &&
        movies.map(({ image, nameRU, id, movieId, duration }) => (
          <MoviesCard
            image={image.url || image}
            title={nameRU}
            key={id || movieId}
            cardId={id || movieId}
            duration={duration}
            onCardLike={onCardLike}
            onDeleteCard={onDeleteCard}
            savedMovieIdsArr={savedMovieIdsArr}
          />
        ))}
    </ul>
  );
}
