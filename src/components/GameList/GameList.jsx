import "./GameList.scss";
import { Link } from "react-router-dom";
import axios from "axios";

export default function GameList({
  gameList,
  isLoggedIn,
  userDetails,
  setUserDetails,
  apiURL,
}) {
  if (!gameList.length) {
    return <div className=""></div>;
  }

  function handleOnClick(event) {
    const gameDetails = gameList.find((game) => game.id == event.target.value);
    const addPromise =
      event.target.id === "add"
        ? axios.post(apiURL + "/user/profile/add", {
            user_id: userDetails.userId,
            game_id: gameDetails.id,
            game_name: gameDetails.name,
            game_genre: gameDetails.genres[0].name,
            game_released: gameDetails.released.slice(0, 4),
            game_slug: gameDetails.slug,
          })
        : Promise.resolve(); // No operation if event.target.id is not "add"

    const removePromise =
      event.target.id === "remove"
        ? axios.delete(
            apiURL + `/user/profile/${userDetails.userId}/${event.target.value}`
          )
        : Promise.resolve(); // No operation if event.target.id is not "remove"

    Promise.all([addPromise, removePromise])
      .then(() => {
        axios
          .get(apiURL + "/user/profile", {
            headers: {
              Authorization: `Bearer ${sessionStorage.authToken}`,
            },
          })
          .then((response) => {
            setUserDetails(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  if (isLoggedIn) {
    if (!userDetails) {
      return <div className=""></div>;
    }
  }

  return (
    <div className="list">
      {gameList.map((game) => {
        return (
          <div className="list__game" key={game.id}>
            <Link target="_blank" to={`https://rawg.io/games/${game.slug}`}>
              <div className="list__game-title">{game.name}</div>
            </Link>
            <div className="list__other-game-info">
              <div className="list__game-genre">
                {game.genres.length > 0 ? game.genres[0].name : ""}
              </div>
              <div className="list__game-year">
                {game.released ? game.released.substring(0, 4) : ""}
              </div>
              {isLoggedIn &&
                !userDetails.games.some((listGame) => {
                  return listGame.id == game.id;
                }) && (
                  <button
                    className="list__game-button list__game-button--add"
                    value={game.id}
                    id="add"
                    onClick={handleOnClick}
                  >
                    Add
                  </button>
                )}
              {isLoggedIn &&
                userDetails.games.some((listGame) => {
                  return listGame.id == game.id;
                }) && (
                  <button
                    className="list__game-button list__game-button--remove"
                    value={game.id}
                    id="remove"
                    onClick={handleOnClick}
                  >
                    Remove
                  </button>
                )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
