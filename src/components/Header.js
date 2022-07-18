import headerLogo from "../images/Logo-header.svg";
import { Link, Route } from "react-router-dom";

function Header({ email, onSignOut, loggedIn }) {
  return (
    <header className="header">
      <img className="header__logo" alt="Логотип" src={headerLogo} />
      <Route path="/sign-in">
        <Link
          to="sign-up"
          className={`${
            loggedIn ? "header__link" : "header__link header__link_login"
          }`}
        >
          Регистрация
        </Link>
      </Route>
      <Route path="/sign-up">
        <Link
          to="sign-in"
          className={`${
            loggedIn ? "header__link" : "header__link header__link_login"
          }`}
        >
          Войти
        </Link>
      </Route>
      <Route exact path="/">
        <p className="header__email">{email}</p>
        <button onClick={onSignOut} className="header__link header__button">
          Выйти
        </button>
      </Route>
    </header>
  );
}
export default Header;
