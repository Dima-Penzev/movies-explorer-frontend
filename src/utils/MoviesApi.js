const BASE_URL = "https://api.nomoreparties.co/beatfilm-movies";

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

export function getMovies() {
  return requestData(BASE_URL, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
}
