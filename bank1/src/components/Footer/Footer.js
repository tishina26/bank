import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__dev">
        <p className="footer__text">Проект стажеров команды 1, можно название компании просто указать</p>
        <div className="footer__info">
          <p className="footer__year">&#169; 2024</p>
          <ul className="footer__list">
            <li className="footer__item">
              <a className="footer__link" href="#" target="_blank" rel="noreferrer">Ссылка</a>
            </li>
            <li className="footer__item">
              <a className="footer__link"  rel="noreferrer" href="#" target="_blank" >Ссылка</a>
            </li>
            <li className="footer__item">
              <a className="footer__link" rel="noreferrer" href="#" target="_blank" >Ссылка</a>
            </li>
          </ul>
        </div>
      </div>
      </footer>
  );
}

export default Footer;