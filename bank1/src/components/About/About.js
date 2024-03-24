import React from "react";
import "./About.css";

function AboutProject() {
  return (
    <section className="about-project">
      <div className="about-project__dev">
        <h2 className="about-project__header">Что такое банкротство физического лица</h2>
            <div className="about__container">
                <p className="about-project__list-text">Узнайте о процедуре банкротства физического лица, о её основных этапах, правилах и последствиях. Мы предоставляем понятные объяснения и советы, чтобы помочь вам ориентироваться в этом сложном процессе.</p>
                <button className="about__btn"><a href='/info' className="about__link">Узнать</a></button>
            </div>
            
      </div>
    </section>
  );
}

export default AboutProject;