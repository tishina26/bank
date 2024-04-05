import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__dev">

        <div className="footer__info">
          <p className="footer__year">&#169; 2024</p>
          <p className="footer__text">Сведения, предоставленные на сайте, носят справочный характер</p>
          <ul className="footer__list">
            <li className="footer__item">
              <a className="footer__link" href="#" target="_blank" rel="noreferrer">Ссылка</a>
            </li>

          </ul>
        </div>
      </div>
      </footer>
  );
}

export default Footer;