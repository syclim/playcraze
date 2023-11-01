import "./GameFinder.scss";
import { useEffect, useState } from "react";
import React from "react";
import Filters from "../Filters/Filters";
import GameList from "../GameList/GameList";
import { obtainGameList } from "../../utils/database";

export default function GameFinder({
  isLoggedIn,
  userDetails,
  setUserDetails,
  apiURL,
}) {
  const [gameList, setGameList] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    genres: "",
    platforms: "",
  });

  useEffect(() => {
    setTimeout(() => {
      obtainGameList(filters, setGameList);
    }, 500);
  }, []);

  if (!gameList || (isLoggedIn && !userDetails)) {
    return (
      <div className="finder">
        <div className="finder__loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="finder">
      <Filters
        filters={filters}
        setFilters={setFilters}
        setGameList={setGameList}
      />
      <div className="finder__game-list">
        <GameList
          gameList={gameList}
          isLoggedIn={isLoggedIn}
          userDetails={userDetails}
          setUserDetails={setUserDetails}
          apiURL={apiURL}
        />
      </div>
    </div>
  );
}
