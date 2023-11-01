import GameFinder from "../../components/GameFinder/GameFinder";
import "./Home.scss";

function Home({ isLoggedIn, userDetails, setUserDetails, apiURL }) {
  if (isLoggedIn && !userDetails) {
    return <div className="App"></div>;
  }

  return (
    <div className="home">
      <div className="home__content">
        <GameFinder
          isLoggedIn={isLoggedIn}
          userDetails={userDetails}
          setUserDetails={setUserDetails}
          apiURL={apiURL}
        />
      </div>
    </div>
  );
}

export default Home;
