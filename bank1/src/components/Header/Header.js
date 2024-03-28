import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import logo1 from "../../images/logo1.svg";
import logo2 from "../../images/logo2.svg";
import Navigation from "../Navigation/Navigation";

function Header(props) {
  return (
    <header className={`header ${props.theme}`}>
      <div className="header__dev">

        <NavLink to="/" className='header__button header__button_logo'>
        <img alt="Лого" src={ logo1 } className="header__logo"/>
          <img alt="Лого" src={ logo2 } className="header__logo"/>
        </NavLink>



        {props.loggedIn ? (
          <Navigation/>
        ):(
        <div className="header__button_dev">
            <a href="/signup" className="header__button header__button_signup">Регистрация</a>
            <a className="header__button header__button_signin" href="/signin">Войти</a>
        </div>
        )}
      </div>
    </header>

  );
}

export default Header;