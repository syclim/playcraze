import "./Filters.scss";
import { obtainGameList } from "../../utils/database";
import { useState } from "react";

export default function Filters({ setGameList, filters, setFilters }) {
  const [placeholder, setPlaceholder] = useState("Search...");

  const handleFocus = () => {
    setPlaceholder("");
  };

  const handleBlur = (event) => {
    if (event.target.value === "") {
      setPlaceholder("Search...");
    }
  };

  function handleOnChange(event) {
    const { name, value } = event.target;

    const newFilters = { ...filters, ...{ [name]: value } };

    setFilters(newFilters);
  }

  function handleOnSearch(event) {
    event.preventDefault();
    obtainGameList(filters, setGameList);
  }

  function handleOnClick(event) {
    event.preventDefault();
    const newFilters = {
      platform: "",
      genre: "",
      search: "",
    };
    setPlaceholder("Search...");
    setFilters(newFilters);

    obtainGameList(newFilters, setGameList);
  }

  return (
    <div className="filters">
      <form className="filters__form">
        <div className="filters__search">
          <input
            type="text"
            name="search"
            placeholder={placeholder}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="filters__search-bar"
            autoComplete="off"
            value={filters.search}
            onChange={handleOnChange}
          />
        </div>
        <div className="filters__dropdowns">
          <label className="filters__label">
            <div className="filters__label-text">Platform:</div>
            <select
              name="platform"
              className={
                filters.platform === ""
                  ? "filters__selects filters__selects--placeholder"
                  : "filters__selects"
              }
              value={filters.platform}
              onChange={handleOnChange}
            >
              <option value="">All</option>
              <option value="4">PC</option>
              <option value="1">PlayStation</option>
              <option value="18">Xbox</option>
              <option value="7">Nintendo</option>
              <option value="3">iOS</option>
              <option value="21">Android</option>
              <option value="5">macOS</option>
              <option value="6">Linux</option>
              <option value="8">Web</option>
              <option value="9">PlayStation 2</option>
            </select>
          </label>
          <label className="filters__label">
            <div className="filters__label-text">Genre:</div>
            <select
              name="genre"
              className={
                filters.genre === ""
                  ? "filters__selects filters__selects--placeholder"
                  : "filters__selects"
              }
              onChange={handleOnChange}
              value={filters.genre}
            >
              <option value="">All</option>
              <option value="action">Action</option>
              <option value="adventure">Adventure</option>
              <option value="role-playing-games-rpg">Role-Playing</option>
              <option value="simulation">Simulation</option>
              <option value="strategy">Strategy</option>
              <option value="puzzle">Puzzle</option>
              <option value="sports">Sports</option>
              <option value="racing">Racing</option>
              <option value="fighting">Fighting</option>
              <option value="shooter">Shooter</option>
            </select>
          </label>
        </div>
        <button className="filters__button" onClick={handleOnSearch}>
          Search
        </button>
        <button className="filters__button" onClick={handleOnClick}>
          Reset Filters
        </button>
      </form>
    </div>
  );
}
