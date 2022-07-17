import headerLogo from '../images/Logo-header.svg';
import React, { useState, useEffect, useCallback } from "react";
import { Link, Route } from 'react-router-dom';


function Header({ email, onSignOut, loggedIn }) {

  //* Состояния
  const [isClicked, setIsClicked] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  //* Проверка ширины окна просмотра, если больше 767 то бургер-меню считается открытым. 
  //* Без контроля ширины окна просмотра, если в мобильной версии закрыть бургер меню и развернуть большой экран, то поле имейла и кнопка имеют display: none;
  let resizeWindow = useCallback(() => {
    setWindowWidth(window.innerWidth);
    if (windowWidth >= 767) {
      setIsClicked(true);
    }
  }, [windowWidth]);

  //* Проверка ширины окна при монтировании компонентов
  useEffect(() => {
    if(loggedIn) {
      resizeWindow();
      window.addEventListener("resize", resizeWindow);
      return () => window.removeEventListener("resize", resizeWindow);
    }
  }, [resizeWindow, loggedIn]);

  function handleClickMenu() {
    setIsClicked(!isClicked)
  }


  return (
    <header className="header">
      <img className="header__logo" alt="Логотип" src={headerLogo} />
      <Route path="/sign-in">
        <Link to='sign-up' className={`${loggedIn ? 'header__link' : 'header__link header__link_login'}`}>Регистрация</Link>
      </Route>
      <Route path="/sign-up">
        <Link to='sign-in' className={`${loggedIn ? 'header__link' : 'header__link header__link_login'}`}>Войти</Link>
      </Route>
      <Route exact path="/">
        <div className='header__burger-menu'>
          <button type="button" className={`${isClicked ? 'header__button header__button_close' : 'header__button header__button_burger'}`} onClick={handleClickMenu}>
            <span></span>
          </button>
        </div>
        <div className={`${isClicked ? 'header__user-menu' : 'not-active'}`}>
          <p className='header__email'>{email}</p>
          <button
            onClick={() => {
              onSignOut();
              handleClickMenu();
            }}
            className='header__link header__link_button'>Выйти</button>
        </div>
      </Route>
    </header>
  )
}
export default Header;
