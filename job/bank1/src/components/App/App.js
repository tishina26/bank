// eslint-disable-next-line
import React, {useEffect, useState} from "react";
import {Route, Routes, useNavigate} from "react-router-dom";
import "./App.css";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Info from "../Info/Info";
import Anketa from "../Anketa/Anketa";
import AnketaResults from "../AnketaResults/AnketaResults";
/*import Preloader from "../Preloader/Preloader";*/
import Usefull from "../Usefull/Usefull";

import * as mainApi from "../../utils/MainApi";
import PageNotFound from "../PageNotFound/PageNotFound";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const [loggedIn, setLoggIn] = useState(false);
  const [errorOfLogin, setErrorLog] = useState("");
  // eslint-disable-next-line
  const [isLoading, setLoad] = useState(true);
  const [currentUser, setCurUser] = useState({});
  const [errorOfRegister, setErrorReg] = useState("");
  const [resultOfEdit, setResultOfEdit] = useState("");
  const nav = useNavigate();

  function registerHandle(name, email, password) {
    setLoad(true);
    mainApi.register(name, email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          checkTok().then((loggedIn) => {
            if (loggedIn) {
              setLoggIn(true);
              nav('/');
            }

          });
          setErrorReg('');
        }
      })
      .catch((err) => {
        console.log(`Ошибка ${err.status}`);
        err.status === 409
          ? setErrorReg('Пользователь с таким email уже существует')
          : setErrorReg('При регистрации пользователя произошла ошибка');
      })
      .finally(() => setLoad(false));
  }
  function checkTok() {
    const token = localStorage.getItem("token");
    if (token) {
      return mainApi.checkTok(token)
        .then((userInfo) => {
          if (userInfo) {
            setLoggIn(true);
            setCurUser(userInfo);
            setLoad(false);
            return true;
          } else {
            localStorage.removeItem("token");
            setLoad(false);
            return false;
          }
        })
        .catch(err => console.log(`Ошибка ${err.status}`));
    } else {
      setLoad(false);
    }
  }
  function loginHandle(email, password) {
    setLoad(true);
    mainApi.authorise(email, password)
      .then((data) => {
        if (data.token) {
          checkTok().then((res) => {
            if (res) {
              nav("/");
            }
          });
          setErrorLog("")
        }
      })
      .catch((err) => {
        console.log(`Ошибка: ${err.status}`);
        if (err.status === 401) {
          setErrorLog("Неправильный логин или пароль");
        } else if (err.status === 400) {
          setErrorLog("Токен не передан или передан не в том формате");
        } else if (err.status === 403) {
          setErrorLog("Переданный токен некорректен");
        }
      })
      .finally(() => setLoad(false))
  }

  function handleSignOut() {
    setLoggIn(false);

    setCurUser({});
    localStorage.clear();

    nav("/");
  }

  function navToAnketa() {
    // Сдалал так, не бейте пж
    nav("/anketa_result");
  }


  function profileUpHandle(name, email) {
    setLoad(true);
    mainApi.updateProfile(name,email)
      .then((userInfo) => {
        setCurUser(userInfo);
        setResultOfEdit("Данные успешно изменены");

      })
      .catch((err) => {
        console.log(`Ошибка: ${err.status}`);
        err.status === 409
          ? setResultOfEdit("Пользователь с таким email уже существует")
          : setResultOfEdit("При обновлении произошла ошибка")
      })
      .finally(() => setLoad(false))

  }



  return (
    <CurrentUserContext.Provider value={ currentUser }>
      <div className="page">

          <Routes>
            <Route path="/" element={<Main loggedIn={loggedIn}/>}/>
            <Route
              path="/profile"
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  {currentUser && (
                    <Profile
                      loggedIn={loggedIn}
                      onUpdateUser={profileUpHandle}
                      resultOfEdit={resultOfEdit}
                      onSignOut={handleSignOut}
                      navToAnketa={navToAnketa}

                    />
                    )}
                </ProtectedRoute>
              }
            />
           {loggedIn ? <Route path='*' element={<PageNotFound />} /> : <Route path='/signup' element={<Register name="Виталий"
                  email="pochta@yandex.ru" onRegister={registerHandle} errorOfRegister={errorOfRegister} />} />}
          {loggedIn ? <Route path='*' element={<PageNotFound />} /> : <Route path='/signin' element={<Login name="Виталий"
                  email="pochta@yandex.ru" onLogin={loginHandle} errorOfLogin={errorOfLogin} />} />}
            <Route path="*" element={<PageNotFound/>}/>
            <Route path='/info' element={<Info/>}/>
            <Route path='/anketa' element={<Anketa loggedIn={loggedIn} navAnketa={navToAnketa}/>}/>
            <Route path='/anketa_result' element={<AnketaResults loggedIn={loggedIn}/>}/>
            <Route path='/usefull' element={<Usefull loggedIn={loggedIn}/>}/>
          </Routes>

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;