import { NavLink, Link } from "react-router-dom";
import "./Header.scss";

function Header({ isLoggedIn }) {
  const navLinkActive = ({ isActive }) => {
    if (isActive) {
      return "header__link header__link--active";
    } else {
      return "header__link";
    }
  };

  return (
    <header className="header">
      <Link to="/">
        <div className="header__title">PlayCraze</div>
      </Link>
      <nav className="header__nav">
        <ul className="header__list">
          {isLoggedIn ? (
            <li className="header__list-item">
              <NavLink className={navLinkActive} to="/profile">
                My Saved Games
              </NavLink>
            </li>
          ) : (
            <li className="header__list-item">
              <NavLink className={navLinkActive} to="/login">
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
