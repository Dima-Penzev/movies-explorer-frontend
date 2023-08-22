// const BASE_URL = "https://api.explorer-movies.nomoreparties.sbs";
const BASE_URL = "http://localhost:4000";

function requestData(url, option) {
  return fetch(url, option).then(getResponseData);
}

function getResponseData(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

export function register(name, email, password) {
  return requestData(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ name, email, password }),
  });
}

export function login(email, password) {
  return requestData(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });
}

export function logout() {
  return requestData(`${BASE_URL}/signout`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
}

export function getContent() {
  return requestData(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
}

export function updateUserData(name, email) {
  return requestData(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ name, email }),
  });
}

export function saveMovie({
  country,
  year,
  duration,
  director,
  description,
  nameEN,
  nameRU,
  id,
  image,
  trailerLink,
}) {
  return requestData(`${BASE_URL}/movies`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      country,
      duration,
      director,
      year,
      description,
      trailerLink,
      nameRU,
      nameEN,
      movieId: id,
      image: image.url,
      thumbnail: image.formats.thumbnail.url,
    }),
  });
}

export function deleteMovie(movieId) {
  return requestData(`${BASE_URL}/movies/${movieId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
}

export function getSavedMovies() {
  return requestData(`${BASE_URL}/movies`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
}
