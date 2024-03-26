import React from "react";
import "./Tech.css";

function Techs() {
  return (
    <section className="tech">
      <div className="about-project__dev">
        <h2 className="about-project__header">Проверьте свою ситуацию</h2>
            <div className="about__container">
                <p className="about-project__list-text">Ответьте на несколько вопросов, чтобы оценить свою финансовую ситуацию и определить, является ли банкротство правильным решением для вас. Наш инструмент поможет вам получить предварительное представление о вашей ситуации.</p>
                <button className="about__btn"><a href='/anketa' className="about__link">Перейти к анкете</a></button>
            </div>
            
      </div>
    </section>
  );
}

export default Techs;