import React from "react";
import "./Usefull.css";

function Usefull() {
  return (
    <section className="about-project">
      <div className="about-project__dev">
        <h2 className="about-project__header">Полезные ресурсы</h2>
            <div className="aboutme__container">
                <p className="about-project__list-text">Здесь можно будет реализовать как-нибудь связь с СПС, пока в разработке</p>
                <button className="aboutme__btn"><a href='#' className="about__link">Найти</a></button>
            </div>

      </div>
    </section>
  );
}

export default Usefull;