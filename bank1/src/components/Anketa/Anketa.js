import React, { useState } from 'react';
import Header from '../Header/Header';
import './Anketa.css'
import { NavLink } from 'react-router-dom';

const Anketa = (props) => {
  const [debtAmount, setDebtAmount] = useState('');
  const [payDelay, setPayDelay] = useState('');
  const [payToOneCreditor, setPayToOneCreditor] = useState('');
  const [additionalQuestion1, setAdditionalQuestion1] = useState('');
  const [additionalQuestion2, setAdditionalQuestion2] = useState('');
  const [additionalQuestion3, setAdditionalQuestion3] = useState('');
  const [additionalQuestion4, setAdditionalQuestion4] = useState('');
  const [isFinished, setIsFinished] = useState(false);
  const [bankruptcyConclusion, setBankruptcyConclusion] = useState('');
  const [block_of_bankruptcyConclusion, setBlock_of_bankruptcyConclusion] = useState('');
  const [nextDisabled, setNextDisabled] = useState(true);

  const anketaEnded = () => {
    let allAddQ = (additionalQuestion1 !== '' &&
    additionalQuestion2 !== '' &&
    additionalQuestion3 !== '' &&
    additionalQuestion4 !== '') // All Additional questions are answered

    return !(debtAmount === "more1" && (payDelay === 'yes' || payDelay === 'no' && payToOneCreditor !== '') ||
    debtAmount === "less1more500" && (payDelay === 'yes' || payDelay === 'no' && (payToOneCreditor === 'yes' || allAddQ )) ||
    debtAmount === "more25less500" && (payToOneCreditor === 'yes' || allAddQ ) ||
    debtAmount === "less25" && (payToOneCreditor !== '')
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let conclusion ='';
    const [HaveTo, NotHaveTo, Both] = ['HaveTo', 'NotHaveTo', 'Both'];
    if (debtAmount === "more1") {
      if (payDelay === 'yes') {
        conclusion = HaveTo;
      } else if (payToOneCreditor === 'yes') {
        conclusion = HaveTo;
      } else {
        conclusion = NotHaveTo;
      }
    } else if (debtAmount === "less1more500") {
      if (payDelay === 'yes') {
        conclusion = HaveTo;
      } else if (payToOneCreditor === 'yes') {
        conclusion = HaveTo;
      } else if (additionalQuestion1 === 'no' && additionalQuestion2 === 'no' && additionalQuestion3 === 'no' && additionalQuestion4 === 'no') {
        conclusion = NotHaveTo;
      } else {
        conclusion = Both;
      }
    } else if (debtAmount === "more25less500") {
      if (payToOneCreditor === 'yes') {
        conclusion = HaveTo;
      } else if (additionalQuestion1 === 'no' && additionalQuestion2 === 'no' && additionalQuestion3 === 'no' && additionalQuestion4 === 'no') {
        conclusion = NotHaveTo;
      } else {
        conclusion = Both;
      }
    } else if (debtAmount === "less25") {
      if (payToOneCreditor === 'yes') {
        conclusion = HaveTo;
      } else {
        conclusion = NotHaveTo;
      }
    }
    setBankruptcyConclusion(conclusion)
    const token = localStorage.getItem('token');

    fetch('/anketa', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        debtAmount: debtAmount,
        payDelay: payDelay,
        payToOneCreditor: payToOneCreditor,
        additionalQuestion1: additionalQuestion1,
        additionalQuestion2: additionalQuestion2,
        additionalQuestion3: additionalQuestion3,
        additionalQuestion4: additionalQuestion4,
        bankruptcyConclusion: conclusion,
      }),
    })
      .then((response) => {
        if (response.status === 401) {
          console.log('Необходима регистрация');
        } else if (response.status !== 200) {
          console.log(
            'Looks like there was a problem. Status Code: ' + response.status
          );
          return;
        }
        setIsFinished(true);
      })
      .catch((error) => {
        console.log('Fetch Error :-S', error);
      });
      setDebtAmount('');
    setPayDelay('');
    setPayToOneCreditor('');
    setAdditionalQuestion1('');
    setAdditionalQuestion2('');
    setAdditionalQuestion3('');
    setAdditionalQuestion4('');


  /*длинные блоки заключений*/
  const block_of_bankruptcyConclusion_HaveTo = (Object.keys(conclusion).length > 0) &&
    (((conclusion === 'HaveTo') || conclusion === 'Both')&& (
    /*заключение с обязанностью*/
    <>
    <p>Вам доступно только банкротство через суд, без этого, увы, никак не получится.</p>
      <p>Исходя из вашей анкеты, вы обязаны это сделать. В этом нет ничего страшного, это обычная процедура, но её необходимо соблюдать. Иначе на Вас могут оштрафовать на 1000-3000 рублей за несоблюдение этой обязанности.</p>
      <p>Чтобы не лишиться так важных для вас в данной ситуации денег, всё нужно успеть сделать за 30 дней с момента как вы об этом узнали. Это может быть момент, когда вы узнали о сумме вашей задолженности или о невозможности расплатиться перед всеми вашими должниками.</p>

      </>));
  const block_of_bankruptcyConclusion_NotHaveTo = (Object.keys(conclusion).length > 0) &&
    (((conclusion === 'NotHaveTo')||(conclusion === 'Both'))&& (
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
  const block_of_bankruptcyConclusion_Both = (Object.keys(conclusion).length > 0) && (
    (conclusion === 'Both') && (
      <>
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
  if (conclusion === Both) {
    setBlock_of_bankruptcyConclusion(block_of_bankruptcyConclusion_Both);
  } else if (conclusion === HaveTo) {
    setBlock_of_bankruptcyConclusion(block_of_bankruptcyConclusion_HaveTo);
  } else {
    setBlock_of_bankruptcyConclusion(block_of_bankruptcyConclusion_NotHaveTo);
  }
};



  return (
    <div>
       <Header loggedIn={props.loggedIn} theme={"header_theme_dark"}/>
      <form className='anketa__form' onSubmit={handleSubmit}>
      {!isFinished && (
        <>
            <div className='anketa__que-container'>

            <label className='anketa__que'>Укажите, какую сумму вы должны?</label>
            <div className='anketa__ans-container'>
              <label>
                <input
                  type="radio"
                  value="more1"
                  checked={debtAmount === "more1"}
                  onChange={(e) => setDebtAmount(e.target.value)}
                />
                Более 1 млн₽
              </label>
              <label>
                <input
                  type="radio"
                  value="less1more500"
                  checked={debtAmount === "less1more500"}
                  onChange={(e) => setDebtAmount(e.target.value)}
                />
                От 500 тыс.₽ до 1 млн₽
              </label>
              <label>
                <input
                  type="radio"
                  value="more25less500"
                  checked={debtAmount === "more25less500"}
                  onChange={(e) => setDebtAmount(e.target.value)}
                />
                От 25 тыс.₽ до 500 тыс.₽
              </label>
              <label>
                <input
                  type="radio"
                  value="less25"
                  checked={debtAmount === "less25"}
                  onChange={(e) => setDebtAmount(e.target.value)}
                />
                до 25 тыс.₽
              </label>
            </div>
          </div>
          <div className='anketa__line'></div>
          </>
          )}

        {((debtAmount === "more1")||(debtAmount === "less1more500" )) && (
          <>
          <div className='anketa__que-container'>
            <>
              <label className='anketa__que'>Вы не платите по своим долгам больше 3 месяцев?</label>
              <div className='anketa__ans-container'>
                <label>
                  <input
                    type="radio"
                    value="yes"
                    checked={payDelay === "yes"}
                    onChange={(e) => setPayDelay(e.target.value)}
                  />
                  Да
                </label>
                <label>
                  <input
                    type="radio"
                    value="no"
                    checked={payDelay === "no"}
                    onChange={(e) => setPayDelay(e.target.value)}
                  />
                  Нет
                </label>
              </div>
            </>
          </div>
          <div className='anketa__line'></div>
          </>
        )}
        {((debtAmount === "more1" && payDelay === 'no')||(debtAmount === "less25")||(debtAmount === "less1more500" && payDelay === 'no')||(debtAmount === "more25less500")) && (
          <>
          <div className='anketa__que-container'>
            <>
              <label className='anketa__que'>Если вы заплатите весь долг одному из своих кредиторов, то не сможете заплатить другим?</label>
              <div className='anketa__ans-container'>
                <label>
                  <input
                    type="radio"
                    value="yes"
                    checked={payToOneCreditor === "yes"}
                    onChange={(e) => setPayToOneCreditor(e.target.value)}
                  />
                  Да
                </label>
                <label>
                  <input
                    type="radio"
                    value="no"
                    checked={payToOneCreditor === "no"}
                    onChange={(e) => setPayToOneCreditor(e.target.value)}
                  />
                  Нет
                </label>
              </div>
            </>
          </div>
          <div className='anketa__line'></div>
          </>
        )}

          {((debtAmount === "less1more500" && payDelay === 'no')||(debtAmount === "more25less500")) && payToOneCreditor === 'no' && (
            <>
            <div className='anketa__que-container'>
              <>
                <label className='anketa__que'>В Вашем отношении соблюдаются одновременно следующие условия?
                <ul><li>В отношении Вас окончено исполнительное производство в связи с возвращением исполнительного документа взыскателю, т.к. у Вас нет имущества, которым Вы можете расплатится по своим долгам
                </li><li>У Вас не имеется иных неоконченных (или не прекращенных) исполнительных производств по взысканию долгов, возбужденных после возвращения исполнительного документа взыскателю
                </li></ul></label>
                <div className='anketa__ans-container anketa__ans-container_dop'>
                  <label>
                    <input
                      type="radio"
                      value="yes"
                      checked={additionalQuestion1 === "yes"}
                      onChange={(e) => setAdditionalQuestion1(e.target.value)}
                    />
                    Да
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="no"
                      checked={additionalQuestion1 === "no"}
                      onChange={(e) => setAdditionalQuestion1(e.target.value)}
                    />
                    Нет
                  </label>
                </div>
                <div className='anketa__line'></div>
              </>
              <>
                <label className='anketa__que anketa__que_dop'>В Вашем отношении соблюдаются одновременно следующие условия?
                <ul><li>Основной Ваш доход составляет пенсия
                </li><li>У Вас есть выданный не позднее 1-го года назад исполнительный документ имущественного характера, который предъявлялся к исполнению (направлялся для исполнения), и требования по нему не исполнены или исполнены частично
                </li><li>На дату подачи заявления у Вас нет имущества, на которое может быть обращено взыскание
                </li></ul></label>
                <div className='anketa__ans-container anketa__ans-container_dop'>
                  <label>
                    <input
                      type="radio"
                      value="yes"
                      checked={additionalQuestion2 === "yes"}
                      onChange={(e) => setAdditionalQuestion2(e.target.value)}
                    />
                    Да
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="no"
                      checked={additionalQuestion2 === "no"}
                      onChange={(e) => setAdditionalQuestion2(e.target.value)}
                    />
                    Нет
                  </label>
                </div>
                <div className='anketa__line'></div>
              </>
              <>
                <label className='anketa__que anketa__que_dop'>В Вашем отношении соблюдаются одновременно следующие условия?
                <ul><li>Вы являетесь получателем ежемесячного пособия в связи с рождением и воспитанием ребенка
                </li><li>У Вас есть выданный не позднее 1-го года назад исполнительный документ имущественного характера, который предъявлялся к исполнению (направлялся для исполнения), и требования по нему не исполнены или исполнены частично
                </li><li>На дату подачи заявления у Вас нет имущества, на которое может быть обращено взыскание
                </li></ul></label>
                <div className='anketa__ans-container anketa__ans-container_dop'>
                  <label>
                    <input
                      type="radio"
                      value="yes"
                      checked={additionalQuestion3 === "yes"}
                      onChange={(e) => setAdditionalQuestion3(e.target.value)}
                    />
                    Да
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="no"
                      checked={additionalQuestion3 === "no"}
                      onChange={(e) => setAdditionalQuestion3(e.target.value)}
                    />
                    Нет
                  </label>
                </div>
                <div className='anketa__line'></div>
              </>
              <>
                <label className='anketa__que anketa__que_dop'>У Вас есть выданный не позднее чем 7 лет назад документ имущественного характера, который предъявлялся к исполнению (направлялся для исполнения), и данные требования не исполнены или исполнены частично?</label>
                <div className='anketa__ans-container anketa__ans-container_dop'>
                  <label>
                    <input
                      type="radio"
                      value="yes"
                      checked={additionalQuestion4 === "yes"}
                      onChange={(e) => setAdditionalQuestion4(e.target.value)}
                    />
                    Да
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="no"
                      checked={additionalQuestion4 === "no"}
                      onChange={(e) => setAdditionalQuestion4(e.target.value)}
                    />
                    Нет
                  </label>
                </div>
              </>
            </div>

            </>
          )}

          {isFinished && (
            <div>

              <h2 className='anketa__conclusion-title' >Итоговое заключение</h2>
              <div className='anketa__conc-container'>{block_of_bankruptcyConclusion}</div>
              <div className='ahketa__btns'>
                <button className='anketa__btn_adress'>Узнать адреса</button>
                <NavLink  className='anketa__btn_more' to='/usefull'>Подробнее</NavLink>
              </div>
              {props.loggedIn ? (
                <p className='anketa__text'>Для того, чтобы всё сделать грамотно, Вам необходимо правильно оформить все документы. Воспользуйтесь составленными нами шаблонами заявления о признании Вас банкротом и полным пакетом документов, необходимых к подаче вместе с ним.</p>
            ):(
          <p className='anketa__text'>Для того, чтобы всё сделать грамотно, Вам необходимо правильно оформить все документы. <a href='signup' className='anketa__register'>Зарегистрируйтесь</a> и воспользуйтесь составленными нами шаблонами заявления о признании Вас банкротом и полным пакетом документов, необходимых к подаче вместе с ним.</p>
        )}

              <button className='anketa__results' onClick={props.navAnketa}>Сохраненные результаты</button>
            </div>
          )}

          {!isFinished && (
            <button className='anketa__save' type="submit" disabled={anketaEnded()}>Далее</button>
          )}
        </form>
      </div>
    );
  };

  export default Anketa;