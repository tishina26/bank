import React from "react";
import "./Promo.css";
import { NavLink } from "react-router-dom";

function Promo() {
  return (
    <section className="promo">
      <div className="promo__dev">
        <div className="promo__info">
          <h1 className="promo__title">Проверьте свои возможности банкротсва</h1>
          <div className="promo__block">
            <p className="promo__text">Ответьте на несколько вопросов, чтобы определить, является ли банкротство правильным решением для вас. </p>
            <NavLink to='/anketa' className='promo__button'>Перейти к анкете</NavLink>

          </div>
          <div className="promo__line"></div>
          <div className="promo__block">
            <p className="promo__text">Узнайте о процедуре банкротства физического лица, о её основных этапах, правилах и последствиях.</p>
            <NavLink to='/usefull' className='promo__button_know'>Узнать</NavLink>

          </div>
          <div className="promo__line"></div>
          <div className="promo__block_sps">
            <h2 className="promo__subtitle">Полезные ресурсы</h2>
            <p className="promo__text">Здесь можно будет реализовать как-нибудь связь с СПС, пока в разработке</p>
            <NavLink className='promo__button_sps'>Найти</NavLink>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Promo;