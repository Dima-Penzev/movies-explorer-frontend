export function filterMovies(moviesArr, shortMovieChecked, movieQuery) {
  return moviesArr.filter(({ nameRU, nameEN, duration }) => {
    const normalizedNameRU = nameRU.toLowerCase();
    const normalizedNameEN = nameEN.toLowerCase();

    if (shortMovieChecked) {
      return (
        (normalizedNameRU.includes(movieQuery) ||
          normalizedNameEN.includes(movieQuery)) &&
        duration <= 40
      );
    } else {
      return (
        normalizedNameRU.includes(movieQuery) ||
        normalizedNameEN.includes(movieQuery)
      );
    }
  });
}
