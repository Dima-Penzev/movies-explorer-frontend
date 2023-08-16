import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

export default function MoviesCardList({ movies }) {
  return (
    <ul className="movies-card-list">
      {movies &&
        movies.map(({ nameRU, id, duration, image }) => (
          <MoviesCard
            image={image.url}
            title={nameRU}
            key={id}
            duration={duration}
          />
        ))}
    </ul>
  );
}
