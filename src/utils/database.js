import axios from "axios";

export function obtainGameList(gameFilters, gameListFunction) {
  const url_filters =
    "/" +
    (gameFilters.search ? gameFilters.search + "&" : "&") +
    (gameFilters.genre ? gameFilters.genre + "&" : "&") +
    (gameFilters.platform ? gameFilters.platform : "");

  axios
    .get(`http://localhost:8080/games/${url_filters}`)
    .then((response) => {
      gameListFunction(response.data.results.slice(0, 10));
    })
    .catch((error) => {
      if (error.response && error.response.status === 404) {
      }
    });
}
