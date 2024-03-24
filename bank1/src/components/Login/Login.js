import React, { useRef, useState } from "react";
import "./Login.css";
import logo1 from "../../images/logo1.svg";
import logo2 from "../../images/logo2.svg";
import { Link } from "react-router-dom";

function Login(props) {
  const reff = useRef();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordError, setPasswordErr] = useState("");
  const [emailError, setEmailErr] = useState("");
  const [isDisabled, setIsDis] = useState(true);

  function formVal() {
    const tag = reff.current;
    if (tag.checkValidity()) {
      setIsDis(false);
    } else {
      setIsDis(true);
    }
  }

  function pasChenge(evt) {
    setPassword(evt.target.value);
    if (evt.target.validity.valid) {
      setPasswordErr("");
    } else {
      setPasswordErr("Минимум - 8 символов, максимум - 30");
    }
    formVal();
  }
  function emailChange(evt) {
    setEmail(evt.target.value);
    if (evt.target.validity.valid) {
      setEmailErr("");
    } else {
      setEmailErr("Введён некорректный e-mail");
    }
    formVal();
  }



  function handleSubmit(evt) {
    evt.preventDefault();
    props.onLogin(email, password);
    setEmail("");
    setPassword("");
  }

  return (
    <main className="login">
      <div className="login__dev">
        <form  ref={ reff } className="login__form" noValidate onSubmit={handleSubmit}>
          <Link className="login__button login__button_logo" to="/">
          <img alt="Лого" src={ logo1 } className="register__logo"/>
          <img alt="Лого" src={ logo2 } className="register__logo2"/>
          </Link>
          <h2 className="login__title">Рады видеть!</h2>
          <fieldset className="login__info">
            <div className="login__input-dev">
              <label className="login__ll">E-mail</label>
              <input
                className="login__input login__input_email-user"
                type="email"
                id="emailUser-input"
                maxLength="40"
                minLength="2"
                name="emailUser"
                value={email || ""}
                onChange={emailChange}
                required
                pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,63}$"
              />
              <span className="login__input-error emailUser-input-error">{emailError}</span>
            </div>
            <div className="login__input-dev">
              <label className="login__ll">Пароль</label>
              <input
                className="login__input login__input_password-user"
                type="password"
                id="passwordUser-input"
                minLength="8"
                maxLength="30"
                name="passwordUser"
                value={password || ""}
                onChange={pasChenge}
                required
              />
              <span className="login__input-error passwordUser-input-error">{passwordError}</span>
            </div>
          </fieldset>
          <div className="login__button-error">
            <p className="login__error-text">{props.errorOfLogin}</p>
          </div>
          <button className="login__button login__button_signin" type="submit" aria-label="Авторизоваться" disabled={ isDisabled }>Войти</button>
          <h3 className="login__text-register">Ещё не зарегистрированы?
            <Link className="login__button login__button_text-register" to="/signup">Регистрация</Link>
          </h3>
        </form>
      </div>
    </main>
  );
}

export default Login;