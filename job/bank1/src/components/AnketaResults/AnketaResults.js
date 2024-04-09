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

  if (Object.keys(anketaData).length === 0) {
    return (
      <>
      <Header loggedIn={props.loggedIn} theme={"header_theme_dark"} />
      <main className='main'>
        <h4>Чтобы получить результаты, пожалуйста, пройдите анкету.</h4>
        <NavLink to="/anketa" className='usefull__anketa'>Пройти анкету</NavLink>

      </main>
      <Footer />
    </>

    );
  }
  const block_of_debtAmount = (Object.keys(anketaData.debtAmount).length > 0) && (
    <>
    <div className="question">
      <h3 className='que__title'>Сумма задолженности</h3>
      <p className='que__title'>{debtAmount}</p>
    </div>
    <div className='anketa__line'></div>
    </>
  );
  const block_of_payDelay = (Object.keys(anketaData.payDelay).length > 0) && (
    <>
    <div className="question">
      <h3 className='que__title'>Вы не платите по своим долгам больше 3 месяцев?</h3>
      <p className='que__title'>{payDelay}</p>
    </div>
    <div className='anketa__line'></div>
    </>
  );
  const block_of_payToOneCreditor = (Object.keys(anketaData.payToOneCreditor).length > 0) && (
    <>
    <div className="question">
      <h3 className='que__title'>Если Вы заплатите весь долг одному из своих кредиторов, то не сможете заплатить другим?</h3>
      <p className='que__title'>{payToOneCreditor}</p>
    </div>
    <div className='anketa__line'></div>
    </>
  );
  const block_of_additionalQuestion1 = (Object.keys(anketaData.additionalQuestion1).length > 0) && (
    <>
    <div className='dop'>
    <div className="question">
      <h3 className='que__title'>Для Вас актуальны такие обстоятельства?</h3>

      <p className='que__title'>{additionalQuestion1}</p>
    </div>
    <ul className='dop__list'>
      <li className='dop__li'>С Вас не взыскивают долги, потому что Вам нечем по ним платить</li>
      <li className='dop__li'>Сейчас у Вас не пытаются взыскать другие долги по решению суда</li>
      </ul>
    </div>
    <div className='anketa__line'></div>
    </>
  );
  const block_of_additionalQuestion2 = (Object.keys(anketaData.additionalQuestion2).length > 0) && (
    <>
    <div className='dop'>
    <div className="question">
      <h3 className='que__title'>Для Вас актуальны такие обстоятельства?</h3>
      <p className='que__title'>{additionalQuestion2}</p>
    </div>
    <ul className='dop__list'><li>Основной Ваш доход - пенсия
      </li><li className='dop__li'>С Вас пытались взыскать долг по решению суда не позднее одного года назад, но это не удалось
      </li><li className='dop__li'>Сейчас у Вас нет имущества, которым можно расплатиться по долгам
      </li></ul>
    </div>
    <div className='anketa__line'></div>
    </>
  );
  const block_of_additionalQuestion3 = (Object.keys(anketaData.additionalQuestion3).length > 0) && (
    <>
    <div className='dop'>
    <div className="question">
      <h3 className='que__title'>Для Вас актуальны такие обстоятельства?</h3>
      <p className='que__title'>{additionalQuestion3}</p>
    </div>
    <ul className='dop__list'><li className='dop__li'>Вы получаете ежемесячное пособие на ребенка
      </li><li className='dop__li'>С Вас пытались взыскать долг по решению суда не позднее одного года назад, но это не удалось
      </li><li className='dop__li'>Сейчас у Вас нет имущества, которым можно расплатиться по долгам
      </li></ul>
    </div>
    <div className='anketa__line'></div>
    </>
  );
  const block_of_additionalQuestion4 = (Object.keys(anketaData.additionalQuestion4).length > 0) && (
    <>
    <div className="question">
      <h3 className='que__title_last'>С Вас не позднее 7 лет назад пытались взыскать долги по решению суда, но решение не было полностью или частично исполнено?</h3>
      <p className='que__title'>{additionalQuestion4}</p>
    </div>
    <div className='anketa__line'></div>
    </>
  );

  /*длинные блоки заключений*/
  const bankruptcyConclusion = anketaData.bankruptcyConclusion;
  const block_of_bankruptcyConclusion_HaveTo = (Object.keys(bankruptcyConclusion).length > 0) &&
    (((bankruptcyConclusion === 'HaveTo') ||bankruptcyConclusion === 'Both')&& (
    /*заключение с обязанностью*/
    <>
    <p>В данном случае доступно только банкротство через суд, и оно является обязательным.</p>
      <p>Иначе Вас могут оштрафовать на 1000 - 3000 рублей (<a href='https://www.consultant.ru/document/cons_doc_LAW_34661/cd9e7b3faed04ce5a1863ac280a28ee438df0280/' className='KoAPRef'>ст. 14.13 КоАП РФ</a>).</p>
      <p>Главное, это успеть всё сделать в течение 30 дней с того момента, как Вы узнали или должны были узнать о своих невыплаченных долгах (<a href='https://www.consultant.ru/document/cons_doc_LAW_39331/c2c8c81ee8e4bd843286b08b10607f00ec6ae073/' className='BankLawRef'>ст. 213.4 Закона "О банкротстве"</a>) Это может быть, например, момент, когда Вы узнали о сумме вашего долга и или о невозможности расплатиться перед всеми вашими должниками. Или получили уведомление о необходимости выплатить долг.</p>

      </>));
  const block_of_bankruptcyConclusion_NotHaveTo = (Object.keys(bankruptcyConclusion).length > 0) &&
    (((bankruptcyConclusion === 'NotHaveTo')||(bankruptcyConclusion === 'Both'))&& (
    /*заключение без обязанности*/
    <>
    <p>Если Вы считаете, что банкротство Вам необходимо, то исходя из ответов, это можно сделать только через суд. Вы не обязаны становится банкротом, это лишь ваше право (<a href='https://www.consultant.ru/document/cons_doc_LAW_39331/c2c8c81ee8e4bd843286b08b10607f00ec6ae073/' className='BankLawRef'>ст. 213.4 Закона "О банкротстве"</a>).</p>
      <p>Чтобы весь процесс прошел успешно, Вам нужно будет доказать то, что Вы не можете платить по своим долгам. Это возможно сделать в таких случаях:</p>
      <li>если Вы не оплачиваете долги, которые уже нужно закрыть</li>
      <li>размер ваших долгов больше чем стоимость вашего имущества</li>
      <li>если решением суда уже доказано, что у Вас нет никакого имущества</li>
      <li>если Вы не оплатили больше 10 процентов всех ваших долгов, хотя уже прошел месяц с момента, когда должны были их оплатить</li>
      <p>Помните, что банкротство довольно продолжительная процедура которая потребует времени, усилий и денег. Принимайте окончательное решение, изучив все риски, и только после этого подавайте заявление в арбитражный суд вашего региона.</p>

      </>));
  const block_of_bankruptcyConclusion_Both = (Object.keys(bankruptcyConclusion).length > 0) && (
    (bankruptcyConclusion === 'Both') && ( <>
      <p>На выбор Вам доступно два вида процедуры банкротства. Исходя из ваших ответов, вы можете выбрать как банкротство через суд, так воспользоваться правом на упрощённую процедуру банкротства через МФЦ.</p>
        <p>Если Вы решите пойти в суд, то Вам необходимо будет доказать, что Вы не можете платить по своим долгам. Это возможно сделать в таких случаях:</p>
        <li>если Вы не оплачиваете долги, которые уже нужно закрыть</li>
        <li>размер ваших долгов больше чем стоимость вашего имущества</li>
        <li>если решением суда уже доказано, что у Вас нет никакого имущества</li>
        <li>если Вы не оплатили больше 10 процентов всех ваших долгов, хотя уже прошел месяц с момента, когда должны были их оплатить</li>
        <p>Выбрав упрощенный способ, Вам нужно будет предоставить в МФЦ документы, которыми можно подтвердить, что у вас одновременно совпадают такие условия:</p>
        <li>с Вас не взыскивают долги, потому что Вам нечем по ним платить</li>
        <li>сейчас у Вас не пытаются взыскать другие долги по другому решению суда</li>
        <p>При принятии решения всегда стоит помнить о том, что банкротство в вашем случае не обязательно, Вы лишь сами можете определить, нужно ли Вам это.</p>

        </>));


const block_of_bankruptcyConclusion_Less = (Object.keys(bankruptcyConclusion).length > 0) && (
  (bankruptcyConclusion === 'Less') && (
    <>
    <p>Вы можете обратиться только в арбитражный суд с заявлением о банкротстве. Сумма Вашего долга невелика, поэтому процедура банкротства с учетом затрат может оказаться бессмысленной.</p>
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


      <p>В данном случае, возможно, расплатиться с кредиторами будет проще, чем запускать довольно продолжительную и дорогостоящую процедуру банкротства. Но Вы имеете право обратиться в суд, если все же решились на банкротство.</p>
      <p>Чтобы весь процесс прошел успешно, Вам нужно будет доказать, что Вы не можете платить по своим долгам. Это возможно сделать в таких случаях:</p>
      <li>если Вы не оплачиваете долги, которые уже нужно закрыть</li>
      <li>размер ваших долгов больше чем стоимость вашего имущества</li>
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
    linkMore = '/usefull#both'
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