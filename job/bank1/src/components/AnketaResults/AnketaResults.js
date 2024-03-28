import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import './AnketaResults.css'
import { NavLink } from 'react-router-dom';
// eslint-disable-next-line
import {yes, no, haveTo, notHaveTo, both} from '../../utils/constans.js'
// eslint-disable-next-line
import {more1, less25, less1more500, more25less500} from '../../utils/constans.js'
import {conclusionHaveTo, conclusionNotHaveTo, conclusionBoth} from '../../utils/constans.js'

const AnketaResults = (props) => {
  const [anketaData, setAnketaData] = useState({});
  const [loading, setLoading] = useState(true);
  const debtAmount = ((anketaData.debtAmount === less25) && ('до 25 тыс.₽')) || (
                      (anketaData.debtAmount === more25less500) && ('От 25 тыс.₽ до 500 тыс.₽')) || (
                      (anketaData.debtAmount === less1more500) && ('От 500 тыс.₽ до 1 млн₽')) || (
                      (anketaData.debtAmount === more1) && ('Более 1 млн₽'));
  const payDelay = ((anketaData.payDelay === yes) && ('Да')) || 'Нет';
  const payToOneCreditor = ((anketaData.payToOneCreditor === yes) && ('Да')) || 'Нет';
  const additionalQuestion1 = ((anketaData.additionalQuestion1 === yes) && ('Да')) || 'Нет';
  const additionalQuestion2 = ((anketaData.additionalQuestion2 === yes) && ('Да')) || 'Нет';
  const additionalQuestion3 = ((anketaData.additionalQuestion3 === yes) && ('Да')) || 'Нет';
  const additionalQuestion4 = ((anketaData.additionalQuestion4 === yes) && ('Да')) || 'Нет';
  const bankruptcyConclusion = anketaData.bankruptcyConclusion;

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

  const block_of_debtAmount = (Object.keys(anketaData.debtAmount).length > 0) && (
    <><div className = "question">
      <h3 className = 'que__title'>Сумма задолженности</h3>
      <p className = 'que__title'>{debtAmount}</p>
    </div>
    <div className = 'anketa__line'></div>
    </>
  );
  const block_of_payDelay = (Object.keys(anketaData.payDelay).length > 0) && (
    <><div className = "question">
      <h3 className = 'que__title'>Вы не платите по своим долгам больше 3 месяцев?</h3>
      <p className = 'que__title'>{payDelay}</p>
    </div>
    <div className = 'anketa__line'></div>
    </>
  );
  const block_of_payToOneCreditor = (Object.keys(anketaData.payToOneCreditor).length > 0) && (
    <><div className = "question">
      <h3 className = 'que__title'>Если вы заплатите весь долг одному из своих кредиторов, то не сможете заплатить другим?</h3>
      <p className = 'que__title'>{payToOneCreditor}</p>
    </div>
    <div className = 'anketa__line'></div>
    </>
  );
  const block_of_additionalQuestion1 = (Object.keys(anketaData.additionalQuestion1).length > 0) && (
    <><div className = 'dop'>
    <div className = "question">
      <h3 className = 'que__title'>В Вашем отношении соблюдаются одновременно следующие условия?</h3>
      <p className = 'que__title'>{additionalQuestion1}</p>
    </div>
    <ul className = 'dop__list'>
      <li className = 'dop__li'>В отношении Вас окончено исполнительное производство в связи с возвращением исполнительного документа взыскателю, т.к. у Вас нет имущества, которым Вы можете расплатится по своим долгам</li>
      <li className = 'dop__li'>У Вас не имеется иных неоконченных (или не прекращенных) исполнительных производств по взысканию долгов, возбужденных после возвращения исполнительного документа взыскателю</li>
      </ul>
    </div>
    <div className = 'anketa__line'></div>
    </>
  );
  const block_of_additionalQuestion2 = (Object.keys(anketaData.additionalQuestion2).length > 0) && (
    <><div className = 'dop'>
    <div className = "question">
      <h3 className = 'que__title'>В Вашем отношении соблюдаются одновременно следующие условия?</h3>
      <p className = 'que__title'>{additionalQuestion2}</p>
    </div>
    <ul className = 'dop__list'><li>Основной Ваш доход составляет пенсия
      </li><li className = 'dop__li'>У Вас есть выданный не позднее 1-го года назад исполнительный документ имущественного характера, который предъявлялся к исполнению (направлялся для исполнения), и требования по нему не исполнены или исполнены частично
      </li><li className = 'dop__li'>На дату подачи заявления у Вас нет имущества, на которое может быть обращено взыскание
      </li></ul>
    </div>
    <div className = 'anketa__line'></div>
    </>
  );
  const block_of_additionalQuestion3 = (Object.keys(anketaData.additionalQuestion3).length > 0) && (
    <><div className = 'dop'>
    <div className = "question">
      <h3 className = 'que__title'>В Вашем отношении соблюдаются одновременно следующие условия?</h3>
      <p className = 'que__title'>{additionalQuestion3}</p>
    </div>
    <ul className = 'dop__list'><li className = 'dop__li'>Вы являетесь получателем ежемесячного пособия в связи с рождением и воспитанием ребенка
      </li><li className = 'dop__li'>У Вас есть выданный не позднее 1-го года назад исполнительный документ имущественного характера, который предъявлялся к исполнению (направлялся для исполнения), и требования по нему не исполнены или исполнены частично
      </li><li className = 'dop__li'>На дату подачи заявления у Вас нет имущества, на которое может быть обращено взыскание
      </li></ul>
    </div>
    <div className = 'anketa__line'></div>
    </>
  );
  const block_of_additionalQuestion4 = (Object.keys(anketaData.additionalQuestion4).length > 0) && (
    <><div className = "question">
      <h3 className = 'que__title_last'>У Вас есть выданный не позднее чем 7 лет назад документ имущественного характера, который предъявлялся к исполнению (направлялся для исполнения), и данные требования не исполнены или исполнены частично?</h3>
      <p className = 'que__title'>{additionalQuestion4}</p>
    </div>
    <div className = 'anketa__line'></div>
    </>
  );

  /*теперь выберем нужный нам вариант заключения*/
  let block_of_bankruptcyConclusion = 'def';
  if (bankruptcyConclusion === both) {
    block_of_bankruptcyConclusion = conclusionBoth;
  } else if (bankruptcyConclusion === haveTo) {
    block_of_bankruptcyConclusion = conclusionHaveTo;
  } else {
    block_of_bankruptcyConclusion = conclusionNotHaveTo;
  }

  /*проверка, была ли анкета хоть раз пройдена*/
  if (Object.keys(anketaData).length === 0) {
    return (
    <div>
      <Header loggedIn = {props.loggedIn} theme = {"header_theme_light"} />
      <h2 className = "profile__title">Результаты анкеты</h2>
      <div className = "results">
        <div className = "question">
          <h3>Вы еще не прошли анкету</h3>
        </div>
      </div>
    </div>
  )}

  return (
    <div>
      <Header loggedIn = {props.loggedIn} theme = {"header_theme_dark"} />
      <div className = 'results__container'>
        <div className = 'results__con1'>
          <div className = 'results__header'>
            <h2 className = "results__title">Моя анкета</h2>
            <NavLink className = 'results__edit_btn' to = '/anketa'>Редактировать</NavLink>
          </div>
          <div className = "results">

              {block_of_debtAmount}
              {block_of_payDelay}
              {block_of_payToOneCreditor}
              {block_of_additionalQuestion1}
              {block_of_additionalQuestion2}
              {block_of_additionalQuestion3}
              {block_of_additionalQuestion4}

          </div>
        </div>
        <div className = 'results__cons'>
          <h2 className = 'anketa__conclusion-title'>Итоговое заключение</h2>
          <div className = 'results__conc__text'>
            {block_of_bankruptcyConclusion}
          </div>
          <div className = 'ahketa__btns'>
                <button className = 'anketa__btn_adress'>Узнать адреса</button>
                <NavLink  className = 'anketa__btn_more' to = '/usefull'>Подробнее</NavLink>
              </div>
              <p className = 'res__text'>Для того, чтобы всё сделать грамотно, Вам необходимо правильно оформить все документы. Воспользуйтесь составленными нами шаблонами заявления о признании Вас банкротом и полным пакетом документов, необходимых к подаче вместе с ним.</p>
        </div>
    </div>
    </div>
  );
};

export default AnketaResults;
