import "./Profile.scss";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Profile({ userDetails, setUserDetails, apiURL }) {
  const navigate = useNavigate();
  const [profilePageNumber, setProfilePageNumber] = useState(1);
  const [showProfileBack, setShowProfileBack] = useState(false);
  const [showProfileNext, setShowProfileNext] = useState(false);

  function handleOnClick() {
    sessionStorage.clear();
    navigate("/");
  }

  function handleOnClick2(event) {
    const removePromise = axios.delete(
      apiURL + `/user/profile/${userDetails.userId}/${event.target.value}`
    );
    const changePage = () => {
      if ((userDetails.games.length - 1) % 5 === 0) {
        setProfilePageNumber((prev) => prev - 1);
      }
    };

    Promise.all([removePromise, changePage()])
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

  function handleOnClick3(event) {
    if (event.target.id === "next" && showProfileNext) {
      setProfilePageNumber((prev) => prev + 1);
      setShowProfileBack(true);
      if (profilePageNumber >= userDetails.games.length / 5 - 1) {
        setShowProfileNext(false);
      }
    } else if (event.target.id === "back" && showProfileBack) {
      setProfilePageNumber((prev) => prev - 1);
      setShowProfileNext(true);
      if (profilePageNumber === 2) {
        setShowProfileBack(false);
      }
    }
  }

  if (!userDetails) {
    return <></>;
  }

  useEffect(() => {
    if (userDetails.games.length - 5 * profilePageNumber > 0) {
      setShowProfileNext(true);
    } else {
      setShowProfileNext(false);
    }
    if (profilePageNumber === 1) {
      setShowProfileBack(false);
    }
  }, [userDetails]);

  console.log(userDetails.games);

  return (
    <div className="profile">
      <div className="profile__welcome">Welcome, {userDetails.username}!</div>
      {!userDetails.games[0].id && (
        <div className="profile__new-account">
          <div className="profile__new-account-text">
            Your game list is looking a little empty!
          </div>
          <div className="profile__new-account-text">
            Navigate to the Game Finder and click "add" to add games to your
            list.
          </div>
        </div>
      )}

      {userDetails.games[0].id && (
        <div className="profile__list">
          <div className="profile__mobile-buttons">
            <button
              className={`${
                showProfileBack
                  ? "profile__button profile__back-button--mobile"
                  : "profile__button profile__button--hide profile__back-button--mobile "
              }`}
              id="back"
              onClick={handleOnClick3}
            >
              Back
            </button>
            <button
              onClick={handleOnClick3}
              id="next"
              className={`${
                showProfileNext
                  ? "profile__button profile__next-button--mobile profile__next-button-arrow"
                  : "profile__button profile__button--hide profile__next-button--mobile profile__next-button-arrow"
              }`}
            >
              Next
            </button>
          </div>
          <button
            className={`${
              showProfileBack
                ? "profile__button profile__back-button"
                : "profile__button profile__button--hide profile__back-button"
            }`}
            id="back"
            onClick={handleOnClick3}
          >
            Back{" "}
          </button>
          <div className="profile__game-list-games">
            {userDetails.games
              .slice(profilePageNumber * 5 - 5, profilePageNumber * 5)
              .map((game) => {
                return (
                  <div className="profile__list-game" key={game.id}>
                    <Link
                      target="_blank"
                      to={`https://www.youtube.com/watch?v=${game.slug}`}
                    >
                      <div className="profile__list-game-title">
                        {game.name}
                      </div>
                    </Link>
                    <div className="profile__list-other-game-info">
                      <div className="profile__list-game-genre">
                        {game.genre}
                      </div>
                      <div className="profile__list-game-year">
                        {game.released}
                      </div>
                      <button
                        className="profile__list-game-button"
                        value={game.id}
                        onClick={handleOnClick2}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
          <button
            onClick={handleOnClick3}
            id="next"
            className={`${
              showProfileNext
                ? "profile__button profile__next-button profile__next-button-arrow"
                : "profile__button profile__button--hide profile__next-button profile__next-button-arrow"
            }`}
          >
            Next{" "}
          </button>
          <div className="profile__mobile-buttons">
            <button
              className={`${
                showProfileBack
                  ? "profile__button profile__back-button--mobile"
                  : "profile__button profile__button--hide profile__back-button--mobile "
              }`}
              id="back"
              onClick={handleOnClick3}
            >
              Back
            </button>
            <button
              onClick={handleOnClick3}
              id="next"
              className={`${
                showProfileNext
                  ? "profile__button profile__next-button--mobile profile__next-button-arrow"
                  : "profile__button profile__button--hide profile__next-button--mobile profile__next-button-arrow"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
      <div className="profile__buttons">
        <button
          className="profile__back-home"
          onClick={() => {
            navigate("/");
          }}
        >
          <span>Back to game finder</span>
        </button>
        <button className="profile__log-out" onClick={handleOnClick}>
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
}
