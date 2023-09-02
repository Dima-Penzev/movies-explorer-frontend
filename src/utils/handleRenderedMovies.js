export function handleRenderedMovies(foundMovies, renderedMovies) {
  let moviesBundle;
  if (
    document.documentElement.clientWidth < 768 &&
    renderedMovies &&
    renderedMovies.length <= 5
  ) {
    moviesBundle = foundMovies && foundMovies.slice(0, 5);
  } else if (
    document.documentElement.clientWidth >= 768 &&
    document.documentElement.clientWidth < 1280 &&
    renderedMovies &&
    renderedMovies.length <= 8
  ) {
    moviesBundle = foundMovies && foundMovies.slice(0, 8);
  } else if (
    document.documentElement.clientWidth >= 1280 &&
    renderedMovies &&
    renderedMovies.length <= 12
  ) {
    moviesBundle = foundMovies && foundMovies.slice(0, 12);
  } else {
    return;
  }
  return moviesBundle;
}
