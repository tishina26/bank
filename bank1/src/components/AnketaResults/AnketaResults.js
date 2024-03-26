import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';

const AnketaResults = (props) => {
  const [anketaData, setAnketaData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    // Выполнение запроса к серверу для получения данных анкеты
    fetch("/anketa", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    .then(response => {
      if (response.status === 401) {
        console.log('Необходима регистрация');
      } else if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }
      return response.json();
    })
    .then(data => {
      setAnketaData(data); // Установка данных анкеты в состояние
      setLoading(false);
    })
    .catch(error => {
      console.log('Fetch Error :-S', error);
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header loggedIn={props.loggedIn} theme={"header_theme_light"} />
      <h2 className="profile__title">Результаты анкеты</h2>
      <div className="results">
        <div className="question">
          <h3>1. Укажите, какую сумму вы должны?</h3>
          <p>{anketaData.debtAmount}</p>
        </div>
        {anketaData.debtAmount === "more1" && (
          <>
            <div className="question">
              <h3>2.1. Вы не платите по своим долгам больше 3 месяцев?</h3>
              <p>{anketaData.payDelay}</p>
            </div>
            {anketaData.payDelay === 'no' && (
              <div className="question">
                <h3>2.2. Если вы заплатите весь долг одному из своих кредиторов, то не сможете заплатить другим?</h3>
                <p>{anketaData.payToOneCreditor}</p>
              </div>
            )}
          </>
        )}
        {anketaData.debtAmount === "less1more500" && (
          <>
            <div className="question">
              <h3>2.1. Вы не платите по своим долгам больше 3 месяцев?</h3>
              <p>{anketaData.payDelay}</p>
            </div>
            {anketaData.payDelay === 'no' && (
              <div className="question">
                <h3>2.2. Если вы заплатите весь долг одному из своих кредиторов, то не сможете заплатить другим?</h3>
                <p>{anketaData.payToOneCreditor}</p>
              </div>
            )}
            {anketaData.additionalQuestion1 && (
              <div className="question">
                <h3>Дополнительный вопрос 1</h3>
                <p>{anketaData.additionalQuestion1}</p>
              </div>
            )}
            {anketaData.additionalQuestion2 && (
              <div className="question">
                <h3>Дополнительный вопрос 2</h3>
                <p>{anketaData.additionalQuestion2}</p>
              </div>
            )}
            {anketaData.additionalQuestion3 && (
              <div className="question">
                <h3>Дополнительный вопрос 3</h3>
                <p>{anketaData.additionalQuestion3}</p>
              </div>
            )}
            {anketaData.additionalQuestion4 && (
              <div className="question">
                <h3>Дополнительный вопрос 4</h3>
                <p>{anketaData.additionalQuestion4}</p>
              </div>
            )}
          </>
        )}
        {/* Продолжайте добавлять проверки и вывод соответствующих данных для остальных вопросов */}
        <div className="question">
          <h3>Итоговое заключение</h3>
          <p>{anketaData.bankruptcyConclusion}</p>
        </div>
      </div>
    </div>
  );
};

export default AnketaResults;
