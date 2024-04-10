import React from "react";
import "./Promo.css";
import s from '../../images/promo.svg'
import { NavLink } from "react-router-dom";

function Promo() {
  return (
    <section className="promo">
      <div className="promo__dev">
        <div className="promo__info">
          <h1 className="promo__title">Проверьте свои возможности банкротства</h1>

          <div className="promo__block">
            <p className="promo__text">Узнайте о процедуре банкротства физического лица, о её последствиях, основных этапах, правилах.</p>
            <NavLink to='/usefull' className='promo__button_know'>Узнать</NavLink>

          </div>
          <div className="promo__line"></div>
          <div className="promo__block">
            <p className="promo__text">Ответьте на несколько вопросов, чтобы определить, является ли банкротство правильным решением для вас. </p>
            <NavLink to='/anketa' className='promo__button'>Перейти к анкете</NavLink>

          </div>
          <div className="promo__line"></div>


        </div>

      </div>
    </section>
  );
}

export default Promo;