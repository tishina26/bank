import React, {useContext, useState, useRef, useEffect} from "react";
import "./Profile.css";
import Header from "../Header/Header";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Profile(props) {
  const ref = useRef();
  const curUser = useContext(CurrentUserContext);
  const [email, setEmail] = useState(curUser.email);
  const [name, setName] = useState(curUser.name);
  const [emailErr, setEmailErr] = useState("");
  const [nameError, setNameError] = useState("");
  const [isVal, setIsVal] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);


  function changeNameValid(evt) {
    setName(evt.target.value);
    if (evt.target.validity.valid) {
      setNameError("");
    } else {
      setNameError("Минимум - 2 символа, максимум - 40");
    }
    formValid();
  }


  function formValid() {
    const tag = ref.current;
    if (tag.checkValidity()) {
      setIsVal(true);
    } else {
      setIsVal(false);
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser(name, email);
  }

  function chandleEmailHandle(evt) {
    setEmail(evt.target.value);
    if (evt.target.validity.valid) {
      setEmailErr("");
    } else {
      setEmailErr("некорректный e-mail");
    }
    formValid();
  }

  useEffect(() => {
    if (isVal && (name !== curUser.name || email !== curUser.email)) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
    // eslint-disable-next-line
  }, [name, email, curUser.name, curUser.email])

  return (
    <>
      <Header theme={"header_theme_dark"} loggedIn={props.loggedIn}/>
      <main className="profile">
        <div className="profile__dev">
          <form className="profile__form" noValidate ref={ref} onSubmit={handleSubmit}>
            <h2 className="profile__title">Привет, {curUser.name}!</h2>
            <fieldset className="profile__info">
              <div className="profile__ll">
                <span className="profile__input-text">Имя</span>
                <input
                  className="profile__input profile__input_name-user"
                  minLength="2"
                  maxLength="40"
                  type="text"
                  id="nameUser-input"
                  name="nameUser"
                  defaultValue={curUser.name}
                  required
                  onChange={changeNameValid}
                />
                <span className=" nameUser-input-error profile__input-error ">{nameError}</span>
              </div>
              <div className="profile__ll">
                <span className="profile__input-text">E-mail</span>
                <input
                  className=" profile__input_email-user profile__input"
                  type="email"
                  minLength="2"
                  maxLength="40"
                  id="emailUser-input"
                  name="emailUser"
                  defaultValue={curUser.email}
                  pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,63}$"
                  required
                  onChange={chandleEmailHandle}
                />
                <span className="profile__input-error emailUser-input-error">{emailErr}</span>
              </div>
            </fieldset>
              <p className="profile__edit-text">{props.resultOfEdit}</p>
            <div className="profile__buttons">
              <button
                className="profile__button profile__button_edit"
                type="submit"
                aria-label="Редактировать профиль"
                disabled={isDisabled}>Редактировать
              </button>
              <button
                className="profile__button profile__button_anketa"
                type="submit"
                aria-label="Моя анкета"
                onClick={props.navToAnketa}>Моя анкета
              </button>
              <button
                className="profile__button profile__button_exit"
                type="button"
                aria-label="Выйти из аккаунта"
                onClick={props.onSignOut}>Выйти из аккаунта
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export default Profile;