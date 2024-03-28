import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import { NavLink } from 'react-router-dom';
import './AnketaResults.css'

const AnketaResults = (props) => {
  const [anketaData, setAnketaData] = useState({});
  const [loading, setLoading] = useState(true);
  const debtAmount = ((anketaData.debtAmount === 'less25') && ('до 25 тыс.₽')) || (
                      (anketaData.debtAmount === 'more25less500') && ('От 25 тыс.₽ до 500 тыс.₽')) || (
                      (anketaData.debtAmount === 'less1more500') && ('От 500 тыс.₽ до 1 млн₽')) || (
                      (anketaData.debtAmount === 'more1') && ('Более 1 млн₽'));
  const payDelay = ((anketaData.payDelay === 'yes') && ('Да')) || 'Нет';
  const payToOneCreditor = ((anketaData.payToOneCreditor === 'yes') && ('Да')) || 'Нет';
  const additionalQuestion1 = ((anketaData.additionalQuestion1 === 'yes') && ('Да')) || 'Нет';
  const additionalQuestion2 = ((anketaData.additionalQuestion2 === 'yes') && ('Да')) || 'Нет';
  const additionalQuestion3 = ((anketaData.additionalQuestion3 === 'yes') && ('Да')) || 'Нет';
  const additionalQuestion4 = ((anketaData.additionalQuestion4 === 'yes') && ('Да')) || 'Нет';


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
    <div className="question">
      <h3 className='que__title'>Сумма задолженности</h3>
      <p className='que__title'>{debtAmount}</p>
    </div>
  );
  const block_of_payDelay = (Object.keys(anketaData.payDelay).length > 0) && (
    <div className="question">
      <h3 className='que__title'>Вы не платите по своим долгам больше 3 месяцев?</h3>
      <p className='que__title'>{payDelay}</p>
    </div>
  );
  const block_of_payToOneCreditor = (Object.keys(anketaData.payToOneCreditor).length > 0) && (
    <div className="question">
      <h3 className='que__title'>Если вы заплатите весь долг одному из своих кредиторов, то не сможете заплатить другим?</h3>
      <p className='que__title'>{payToOneCreditor}</p>
    </div>
  );
  const block_of_additionalQuestion1 = (Object.keys(anketaData.additionalQuestion1).length > 0) && (
    <div className='dop'>
    <div className="question">
      <h3 className='que__title'>В Вашем отношении соблюдаются одновременно следующие условия?</h3>

      <p className='que__title'>{additionalQuestion1}</p>
    </div>
    <ul className='dop__list'>
      <li className='dop__li'>В отношении Вас окончено исполнительное производство в связи с возвращением исполнительного документа взыскателю, т.к. у Вас нет имущества, которым Вы можете расплатится по своим долгам</li>
      <li className='dop__li'>У Вас не имеется иных неоконченных (или не прекращенных) исполнительных производств по взысканию долгов, возбужденных после возвращения исполнительного документа взыскателю</li>
      </ul>
    </div>
  );
  const block_of_additionalQuestion2 = (Object.keys(anketaData.additionalQuestion2).length > 0) && (
    <div className='dop'>
    <div className="question">
      <h3 className='que__title'>В Вашем отношении соблюдаются одновременно следующие условия?</h3>
      <p className='que__title'>{additionalQuestion2}</p>
    </div>
    <ul className='dop__list'><li>Основной Ваш доход составляет пенсия
      </li><li className='dop__li'>У Вас есть выданный не позднее 1-го года назад исполнительный документ имущественного характера, который предъявлялся к исполнению (направлялся для исполнения), и требования по нему не исполнены или исполнены частично
      </li><li className='dop__li'>На дату подачи заявления у Вас нет имущества, на которое может быть обращено взыскание
      </li></ul>
    </div>
  );
  const block_of_additionalQuestion3 = (Object.keys(anketaData.additionalQuestion3).length > 0) && (
    <div className='dop'>
    <div className="question">
      <h3 className='que__title'>В Вашем отношении соблюдаются одновременно следующие условия?</h3>
      <p className='que__title'>{additionalQuestion3}</p>
    </div>
    <ul className='dop__list'><li className='dop__li'>Вы являетесь получателем ежемесячного пособия в связи с рождением и воспитанием ребенка
      </li><li className='dop__li'>У Вас есть выданный не позднее 1-го года назад исполнительный документ имущественного характера, который предъявлялся к исполнению (направлялся для исполнения), и требования по нему не исполнены или исполнены частично
      </li><li className='dop__li'>На дату подачи заявления у Вас нет имущества, на которое может быть обращено взыскание
      </li></ul>
    </div>
  );
  const block_of_additionalQuestion4 = (Object.keys(anketaData.additionalQuestion4).length > 0) && (
    <div className="question">
      <h3 className='que__title_last'>У Вас есть выданный не позднее чем 7 лет назад документ имущественного характера, который предъявлялся к исполнению (направлялся для исполнения), и данные требования не исполнены или исполнены частично?</h3>
      <p className='que__title'>{additionalQuestion4}</p>
    </div>
  );

  /*длинные блоки заключений*/
  const bankruptcyConclusion = anketaData.bankruptcyConclusion;
  const block_of_bankruptcyConclusion_HaveTo = (Object.keys(bankruptcyConclusion).length > 0) &&
    (((bankruptcyConclusion === 'HaveTo') ||bankruptcyConclusion === 'Both')&& (
    /*заключение с обязанностью*/
    <>
    <p>Вам доступно только банкротство через суд, без этого, увы, никак не получится.</p>
      <p>Исходя из вашей анкеты, вы обязаны это сделать. В этом нет ничего страшного, это обычная процедура, но её необходимо соблюдать. Иначе на Вас могут оштрафовать на 1000-3000 рублей за несоблюдение этой обязанности.</p>
      <p>Чтобы не лишиться так важных для вас в данной ситуации денег, всё нужно успеть сделать за 30 дней с момента как вы об этом узнали. Это может быть момент, когда вы узнали о сумме вашей задолженности или о невозможности расплатиться перед всеми вашими должниками.</p>

      </>));
  const block_of_bankruptcyConclusion_NotHaveTo = (Object.keys(bankruptcyConclusion).length > 0) &&
    (((bankruptcyConclusion === 'NotHaveTo')||(bankruptcyConclusion === 'Both'))&& (
    /*заключение без обязанности*/
    <>
    <p>Вам доступно только банкротство через суд. Исходя из вашей анкеты в этой процедуре нет прямой необходимости, но если вы считаете это необходимым, то вам предоставлено такое право.</p>
      <p>Чтобы весь процесс прошел успешно, вам нужно будет доказать то, что вы не можете платить по своим долгам. Это возможно сделать в таких случаях:</p>
      <li>если вы не оплачиваете долги, которые уже нужно закрыть</li>
      <li>размер ваших долгов больше чем всё ваше имущество</li>
      <li>если решением суда уже доказано, что у вас нет никакого имущества</li>
      <li>если вы не оплатили больше 10 процентов всех ваших долгов, хотя уже прошел месяц с момента, когда должны были их оплатить</li>
      <p>Помните, что банкротство довольно продолжительная процедура которая потребует времени и усилий. Принимайте своё решение изучив все риски и только после этого обращайтесь в арбитражный суд вашего региона.</p>

      </>));
  const block_of_bankruptcyConclusion_Both = (Object.keys(bankruptcyConclusion).length > 0) && (
    (bankruptcyConclusion === 'Both') && ( <>
      <p>На выбор вам доступно два вида процедуры банкротства. Вы можете выбрать либо осуществить это через арбитражный суд, либо через МФЦ в упрощенном виде. </p>
        <p>Если вы решите пойти в суд то вам необходимо будет доказать, что вы не можете платить по своим долгам. Это возможно сделать в таких случаях:</p>
        <li>если вы не оплачиваете долги, которые уже нужно закрыть</li>
        <li>размер ваших долгов больше чем всё ваше имущество</li>
        <li>если решением суда уже доказано, что у вас нет никакого имущества</li>
        <li>если вы не оплатили больше 10 процентов всех ваших долгов, хотя уже прошел месяц с момента, когда должны были их оплатить</li>
        <p>Если вы выберите упрощенный способ, то нужно предоставить в МФЦ документы, которыми можно подтвердить, что у вас одновременно совпадают такие условия:</p>
        <li>в отношении Вас окончено исполнительное производство в связи с возвращением исполнительного документа взыскателю, т.к. у Вас нет имущества, которым Вы можете расплатится по своим долгам</li>
        <li>у Вас не имеется иных неоконченных (или не прекращенных) исполнительных производств по взысканию долгов, возбужденных после возвращения исполнительного документа взыскателю</li>
        <p>При принятии решения всегда стоит помнить о том, что банкротство в вашем случае не обязательно, вы лишь сами можете определить, нужно ли вам это</p>

        </>));

  /*теперь выберем нужный нам вариант*/
  let block_of_bankruptcyConclusion = 'def';
  if (bankruptcyConclusion === 'Both') {
    block_of_bankruptcyConclusion = block_of_bankruptcyConclusion_Both;
  } else if (bankruptcyConclusion === 'HaveTo') {
    block_of_bankruptcyConclusion = block_of_bankruptcyConclusion_HaveTo;
  } else {
    block_of_bankruptcyConclusion = block_of_bankruptcyConclusion_NotHaveTo;
  }

  /*проверка, была ли анкета хоть раз пройдена*/
  if (Object.keys(anketaData).length === 0) {
    return (
    <div>
      <Header loggedIn={props.loggedIn} theme={"header_theme_light"} />
      <h2 className="profile__title">Результаты анкеты</h2>
      <div className="results">
        <div className="question">
          <h3>Вы еще не прошли анкету</h3>
        </div>
      </div>
    </div>
  )}

  return (
    <div>
      <Header loggedIn={props.loggedIn} theme={"header_theme_dark"} />
      <div className='results__container'>
        <div className='results__con1'>
          <div className='results__header'>
            <h2 className="results__title">Моя анкета</h2>
            <NavLink className='results__edit_btn' to='/anketa'>Редактировать</NavLink>
          </div>
          <div className="results">

              {block_of_debtAmount}
              <div className='anketa__line'></div>
              {block_of_payDelay}
              <div className='anketa__line'></div>
              {block_of_payToOneCreditor}
              <div className='anketa__line'></div>
              {block_of_additionalQuestion1}
              <div className='anketa__line'></div>
              {block_of_additionalQuestion2}
              <div className='anketa__line'></div>
              {block_of_additionalQuestion3}
              <div className='anketa__line'></div>
              {block_of_additionalQuestion4}

          </div>
        </div>
        <div className='results__cons'>
          <h2 className='anketa__conclusion-title' >Итоговое заключение</h2>
          <div className='results__conc__text'>
            {block_of_bankruptcyConclusion}
          </div>
          <div className='ahketa__btns'>
                <button className='anketa__btn_adress'>Узнать адреса</button>
                <NavLink  className='anketa__btn_more' to='/usefull'>Подробнее</NavLink>
              </div>
              <p className='res__text'>Для того, чтобы всё сделать грамотно, Вам необходимо правильно оформить все документы. Воспользуйтесь составленными нами шаблонами заявления о признании Вас банкротом и полным пакетом документов, необходимых к подаче вместе с ним.</p>

        </div>



    </div>
    </div>
  );
};

export default AnketaResults;