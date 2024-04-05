import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import { NavLink } from 'react-router-dom';
import './AnketaResults.css'
import Footer from '../Footer/Footer';

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

  const block_of_debtAmount = (Object.keys(anketaData).length > 0) && (Object.keys(anketaData.debtAmount).length > 0) && (
    <>
    <div className="question">
      <h3 className='que__title'>Сумма задолженности</h3>
      <p className='que__title'>{debtAmount}</p>
    </div>
    <div className='anketa__line'></div>
    </>
  );
  const block_of_payDelay = (Object.keys(anketaData).length > 0) && (Object.keys(anketaData.payDelay).length > 0) && (
    <>
    <div className="question">
      <h3 className='que__title'>Вы не платите по своим долгам больше 3 месяцев?</h3>
      <p className='que__title'>{payDelay}</p>
    </div>
    <div className='anketa__line'></div>
    </>
  );
  const block_of_payToOneCreditor = (Object.keys(anketaData).length > 0) && (Object.keys(anketaData.payToOneCreditor).length > 0) && (
    <>
    <div className="question">
      <h3 className='que__title'>Если Вы заплатите весь долг одному из своих кредиторов, то не сможете заплатить другим?</h3>
      <p className='que__title'>{payToOneCreditor}</p>
    </div>
    <div className='anketa__line'></div>
    </>
  );
  const block_of_additionalQuestion1 = (Object.keys(anketaData).length > 0) && (Object.keys(anketaData.additionalQuestion1).length > 0) && (
    <>
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
    <div className='anketa__line'></div>
    </>
  );
  const block_of_additionalQuestion2 = (Object.keys(anketaData).length > 0) && (Object.keys(anketaData.additionalQuestion2).length > 0) && (
    <>
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
    <div className='anketa__line'></div>
    </>
  );
  const block_of_additionalQuestion3 = (Object.keys(anketaData).length > 0) && (Object.keys(anketaData.additionalQuestion3).length > 0) && (
    <>
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
    <div className='anketa__line'></div>
    </>
  );
  const block_of_additionalQuestion4 = (Object.keys(anketaData).length > 0) && (Object.keys(anketaData.additionalQuestion4).length > 0) && (
    <>
    <div className="question">
      <h3 className='que__title_last'>У Вас есть выданный не позднее чем 7 лет назад документ имущественного характера, который предъявлялся к исполнению (направлялся для исполнения), и данные требования не исполнены или исполнены частично?</h3>
      <p className='que__title'>{additionalQuestion4}</p>
    </div>
    <div className='anketa__line'></div>
    </>
  );

  /*длинные блоки заключений*/
  const bankruptcyConclusion = (Object.keys(anketaData).length > 0) && (anketaData.bankruptcyConclusion);
  const block_of_bankruptcyConclusion_HaveTo = (Object.keys(bankruptcyConclusion).length > 0) &&
    (((bankruptcyConclusion === 'HaveTo') ||bankruptcyConclusion === 'Both')&& (
    /*заключение с обязанностью*/
    <>
    <p>Вам доступно только банкротство через суд, без этого, увы, никак не получится.</p>
      <p>Исходя из вашей анкеты, Вы обязаны это сделать. В этом нет ничего страшного, это обычная процедура, но её необходимо соблюдать. Иначе Вас оштрафуют на 1000-3000 рублей за несоблюдение этой обязанности в соответствии со статьей 14.13 КоАП РФ.</p>
      <p>Согласно статье 213.4 Закона о банкротстве на подачу заявления о признании банкротом у Вас есть 30 дней. Срок течет с момента, когда Вы узнали или должны были узнать о своих невыплаченных долгах. Это может быть момент, когда Вы узнали о сумме вашей задолженности или о невозможности расплатиться перед всеми вашими должниками.</p>

      </>));
  const block_of_bankruptcyConclusion_NotHaveTo = (Object.keys(bankruptcyConclusion).length > 0) &&
    (((bankruptcyConclusion === 'NotHaveTo')||(bankruptcyConclusion === 'Both'))&& (
    /*заключение без обязанности*/
    <>
    <p>Вам доступно только банкротство через суд. Исходя из вашей анкеты в этой процедуре нет прямой необходимости. Однако статьёй 213.4 Закона о банкротстве предусмотрено ваше право на банкротство.</p>
      <p>Чтобы весь процесс прошел успешно, Вам нужно будет доказать то, что Вы не можете платить по своим долгам. Это возможно сделать в таких случаях:</p>
      <li>если Вы не оплачиваете долги, которые уже нужно закрыть</li>
      <li>размер ваших долгов больше чем всё ваше имущество</li>
      <li>если решением суда уже доказано, что у Вас нет никакого имущества</li>
      <li>если Вы не оплатили больше 10 процентов всех ваших долгов, хотя уже прошел месяц с момента, когда должны были их оплатить</li>
      <p>Помните, что банкротство довольно продолжительная процедура которая потребует времени и усилий. Принимайте своё решение изучив все риски и только после этого обращайтесь в арбитражный суд вашего региона.</p>

      </>));
  const block_of_bankruptcyConclusion_Both = (Object.keys(bankruptcyConclusion).length > 0) && (
    (bankruptcyConclusion === 'Both') && ( <>
      <p>На выбор Вам доступно два вида процедуры банкротства. Вы можете выбрать классический вариант и осуществить это через арбитражный суд. Также статьей 223.2 Закона о банкротстве вам предоставлено право на упрощенную процедуру через МФЦ.</p>
        <p>Если Вы решите пойти в суд то вам необходимо будет доказать, что Вы не можете платить по своим долгам. Это возможно сделать в таких случаях:</p>
        <li>если Вы не оплачиваете долги, которые уже нужно закрыть</li>
        <li>размер ваших долгов больше чем всё ваше имущество</li>
        <li>если решением суда уже доказано, что у Вас нет никакого имущества</li>
        <li>если Вы не оплатили больше 10 процентов всех ваших долгов, хотя уже прошел месяц с момента, когда должны были их оплатить</li>
        <p>Если Вы выберите упрощенный способ, то нужно предоставить в МФЦ документы, которыми можно подтвердить, что у Вас одновременно совпадают такие условия:</p>
        <li>в отношении Вас окончено взыскание денег в связи с тем, что у Вас нет имущества, которым Вы можете расплатится по своим долгам</li>
        <li>у Вас не имеется иных неоконченных (или не прекращенных) исполнительных производств по взысканию долгов</li>
        <p>При принятии решения всегда стоит помнить о том, что банкротство в вашем случае не обязательно, Вы лишь сами можете определить, нужно ли Вам это</p>

        </>));


const block_of_bankruptcyConclusion_Less = (Object.keys(bankruptcyConclusion).length > 0) && (
  (bankruptcyConclusion === 'Less') && (
    <>
    <p>Вы можете обратиться только в арбитражный суд с заявлением о банкротстве. Стоит отметить, что ваша сумма достаточно невелика, поэтому процедура банкротства может быть нецелесообразной.</p>
    <div>
      <ul>
      <li>Ваш долг:</li>
      <li>Меньше 25 000 рублей</li>
      </ul>
      <ul>
      <li>Ваши затраты:</li>
      <li>25 000 рублей вносится на депозит суда</li>
      <li>300 рублей государственная пошлина</li>
      <li>5 000 – 15 000 рублей будет стоить оповещение ваших кредиторов</li>
      </ul>
    </div>


      <p>Как Вы видите, возможно, расплатиться с кредиторами будет дешевле, чем запускать довольно продолжительную процедуру банкротства.</p>
      <p>Конечно, по ст. 213.4 Закона о банкротстве Вы имеете на это право. Мы не можем Вас в этом ограничить, если Вы уже решились на банкротство.</p>
      <p>Чтобы весь процесс прошел успешно, Вам нужно будет доказать, что Вы не можете платить по своим долгам. Это возможно сделать в таких случаях:</p>
      <li>если Вы не оплачиваете долги, которые уже нужно закрыть</li>
      <li>размер ваших долгов больше чем всё ваше имущество</li>
      <li>если решением суда уже доказано, что у Вас нет никакого имущества</li>
      <li>если Вы не оплатили больше 10 процентов всех ваших долгов, хотя уже прошел месяц с момента, когда должны были их оплатить</li>
      <p>Принимайте своё решение изучив все риски и только после этого обращайтесь в арбитражный суд вашего региона. </p>

      </>));
  /*теперь выберем нужный нам вариант*/
  let block_of_bankruptcyConclusion = 'def';
  let linkMore = '';
  let linkDocs = '/documents';
  if (bankruptcyConclusion === 'Both') {
    block_of_bankruptcyConclusion = block_of_bankruptcyConclusion_Both;
    linkMore = '/usefull'
  } else if (bankruptcyConclusion === 'HaveTo') {
    block_of_bankruptcyConclusion = block_of_bankruptcyConclusion_HaveTo;
    linkMore = '/usefull#syd'
  } else if (bankruptcyConclusion === 'NotHaveTo') {
    block_of_bankruptcyConclusion = block_of_bankruptcyConclusion_NotHaveTo;
    linkMore = '/usefull#syd'
  } else {
    block_of_bankruptcyConclusion = block_of_bankruptcyConclusion_Less;
    linkMore = '/usefull#syd'
  }

  /*проверка, была ли анкета хоть раз пройдена*/
  if (Object.keys(anketaData).length === 0) {
    return (
    <div>
      <Header loggedIn={props.loggedIn} theme={"header_theme_dark"} />
      <main className="main">
      <h2 className="profile__title">НЕТ РЕЗУЛЬТАТОВ</h2>
        <div>
          Вы еще не прошли анкету. Пожалуйста, сначала пройдите ее, тогда результаты сохранятся и будут доступны в личном кабинете.
          <div><NavLink to="/anketa" className='navlink' >Пройти анкету</NavLink></div>
      </div>
      </main>
      <Footer/>
    </div>
  )}

  return (
    <div>
      <Header loggedIn={props.loggedIn} theme={"header_theme_dark"} />
      <main className="main">
      <div className='results__container'>
        <div className='results__con1'>
          <div className='results__header'>
            <h2 className="results__title">Моя анкета</h2>
            <NavLink className='results__edit_btn' to='/anketa'>Редактировать</NavLink>
          </div>
          <div className="results">
              {block_of_debtAmount}
              {block_of_payDelay}
              {block_of_payToOneCreditor}
              {block_of_additionalQuestion1}
              {block_of_additionalQuestion2}
              {block_of_additionalQuestion3}
              {block_of_additionalQuestion4}
          </div>
        </div>
        <div className='results__cons'>
          <h2 className='anketa__conclusion-title' >Итоговое заключение</h2>
          <div className='results__conc__text'>
            {block_of_bankruptcyConclusion}
          </div>
          <div className='ahketa__btns'>
                <a className='results__more' href={linkMore}>Подробнее о вашей процедуре</a>
                <a className='results__doc' href={linkDocs}>Перейти к документам</a>
              </div>
              <p className='res__text'>Для того, чтобы всё сделать грамотно, Вам необходимо правильно оформить все документы. Воспользуйтесь составленными нами шаблонами заявления о признании Вас банкротом и полным пакетом документов, необходимых к подаче вместе с ним.</p>

        </div>



    </div>
    </main>
    <Footer/>
    </div>
  );
};

export default AnketaResults;