import React from "react";
import "./PopupBurger.css";
import account from "../../images/profile.svg";
import { NavLink } from "react-router-dom";

function PopupBurger(props) {
  const setActive = ({isActive}) =>
    isActive ? "popupBurger__link popupBurger__link_act" : "popupBurger__link";

  return (
    <section className={`popupBurger ${props.isOpen ? "popupBurger_opened" : ""}`}>
      <button className="popupBurger__button-close" type="button" onClick={props.isClose} aria-label="Закрыть меню"/>
      <div className="popupBurger__container">
        <div className="popupBurger__links">
          <NavLink to="/" className={ setActive }>Главная</NavLink>
          <NavLink to="/anketa" className={ setActive }>Анкета</NavLink>
          <NavLink to="/anketa_result" className={ setActive }>Результаты анкеты</NavLink>
          <NavLink to="/documents" className={ setActive }>Мои документы</NavLink>
        </div>
        <NavLink to="/profile" className="popupBurger__profile">
          <img className="popupBurger__profile-image" src={account} alt="Кнопка Аккаунт"/>
        </NavLink>
      </div>
    </section>
  );
}

export default PopupBurger;