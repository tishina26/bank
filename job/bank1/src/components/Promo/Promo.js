import React from "react";
import "./Promo.css";
import s from '../../images/syd0.svg'

function Promo() {
  return (
    <section className="promo">
      <div className="promo__dev">
        <div className="promo__info">
          <h1 className="promo__title">Проверьте свои возможности банкротсва</h1>
          <p className="promo__text">Мы предоставляем информацию и консультации, помогающие вам разобраться в вашей ситуации и принять взвешенное решение.</p>
        </div>
        <img alt="Логотип планеты" src={s} className="promo__image"/>
      </div>
    </section>
  );
}

export default Promo;