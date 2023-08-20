export function createInitialMoviesArr(foundMovies) {
  let initialMoviesBundle;

  if (document.documentElement.clientWidth < 768) {
    initialMoviesBundle = foundMovies && foundMovies.slice(0, 5);
  } else if (
    document.documentElement.clientWidth >= 768 &&
    document.documentElement.clientWidth < 1280
  ) {
    initialMoviesBundle = foundMovies && foundMovies.slice(0, 8);
  } else if (document.documentElement.clientWidth >= 1280) {
    initialMoviesBundle = foundMovies && foundMovies.slice(0, 12);
  }

  return initialMoviesBundle;
}
