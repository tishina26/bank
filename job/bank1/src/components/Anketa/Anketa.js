import React, { useState } from 'react';
import Header from '../Header/Header';
import './Anketa.css'
import { NavLink } from 'react-router-dom';
import Footer from '../Footer/Footer';

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
  const [linkTo, setLinkTo] = useState('');
  const [nextDisabled, setNextDisabled] = useState(true);
  const [isComplete, setIsComplete] = useState(false);


  const anketaEnded = () => {
    let allAddQ = (additionalQuestion1 !== '' &&
    additionalQuestion2 !== '' &&
    additionalQuestion3 !== '' &&
    additionalQuestion4 !== '') // All Additional questions are answered

    return !(debtAmount === "more1" && (payDelay === 'yes' || payDelay === 'no' && payToOneCreditor !== '') ||
    debtAmount === "less1more500" && (payDelay === 'yes' || payDelay === 'no' && (payToOneCreditor === 'yes' || allAddQ )) ||
    debtAmount === "more25less500" && (payToOneCreditor === 'yes' || allAddQ ) ||
    debtAmount === "less25"
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let conclusion ='';
    const [HaveTo, NotHaveTo, Both, Less] = ['HaveTo', 'NotHaveTo', 'Both', 'Less'];
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
        conclusion = Less;

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
          setIsComplete(true)
          sessionStorage.setItem('anketaResults', JSON.stringify({
            debtAmount,
            payDelay,
            payToOneCreditor,
            additionalQuestion1,
            additionalQuestion2,
            additionalQuestion3,
            additionalQuestion4,
            bankruptcyConclusion: conclusion,
          }));
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
    <p>В данном случае доступно только банкротство через суд, и оно является обязательным.</p>
      <p>Иначе Вас могут оштрафовать на 1000 - 3000 рублей (<a href='https://www.consultant.ru/document/cons_doc_LAW_34661/cd9e7b3faed04ce5a1863ac280a28ee438df0280/' className='KoAPRef'>ст. 14.13 КоАП РФ</a>).</p>
      <p>Главное, это успеть всё сделать в течение 30 дней с того момента, как Вы узнали или должны были узнать о своих невыплаченных долгах (<a href='https://www.consultant.ru/document/cons_doc_LAW_39331/c2c8c81ee8e4bd843286b08b10607f00ec6ae073/' className='BankLawRef'>ст. 213.4 Закона "О банкротстве"</a>) Это может быть, например, момент, когда Вы узнали о сумме вашего долга и или о невозможности расплатиться перед всеми вашими должниками. Или получили уведомление о необходимости выплатить долг.</p>

      </>));

  const block_of_bankruptcyConclusion_NotHaveTo = (Object.keys(conclusion).length > 0) &&
    (((conclusion === 'NotHaveTo')||(conclusion === 'Both'))&& (
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
  const block_of_bankruptcyConclusion_Both = (Object.keys(conclusion).length > 0) && (
    (conclusion === 'Both') && (
      <>
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

const block_of_bankruptcyConclusion_Less = (Object.keys(conclusion).length > 0) && (
  (conclusion === 'Less') && (
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
let link = ''
  /*теперь выберем нужный нам вариант*/
  if (conclusion === Both) {
    link = '/usefull#both'
    setBlock_of_bankruptcyConclusion(block_of_bankruptcyConclusion_Both);
    setLinkTo(link)
  } else if (conclusion === HaveTo) {
    setBlock_of_bankruptcyConclusion(block_of_bankruptcyConclusion_HaveTo);
    link = '/usefull#syd'
    setLinkTo(link)
  } else if (conclusion === NotHaveTo){
    setBlock_of_bankruptcyConclusion(block_of_bankruptcyConclusion_NotHaveTo);
    link = '/usefull#syd'
    setLinkTo(link)
  } else{
  setBlock_of_bankruptcyConclusion(block_of_bankruptcyConclusion_Less);
  link = '/usefull#syd'
  setLinkTo(link)
}
};



  return (
    <div>
       <Header loggedIn={props.loggedIn} theme={"header_theme_dark"}/>
       <main className="main">
      <form className='anketa__form' onSubmit={handleSubmit}>
      {!isFinished && (
        <>
            <div className='anketa__que-container'>

            <label className='anketa__que'>Укажите, какую сумму Вы должны?</label>
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
        {((debtAmount === "more1" && payDelay === 'no')||(debtAmount === "less1more500" && payDelay === 'no')||(debtAmount === "more25less500")) && (
          <>
          <div className='anketa__que-container'>
            <>
              <label className='anketa__que'>Если Вы заплатите весь долг одному из своих кредиторов, то не сможете заплатить другим?</label>
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
                <label className='anketa__que'>Для Вас актуальны такие обстоятельства?
                <ul><li>с Вас не взыскивают долги, потому что Вам нечем по ним платить
                </li><li>сейчас у Вас не пытаются взыскать другие долги по решению суда

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
                <label className='anketa__que anketa__que_dop'>Для Вас актуальны такие обстоятельства?
                <ul><li>основной Ваш доход - пенсия
                </li><li>с Вас пытались взыскать долг по решению суда не позднее одного года назад, но это не удалось
                </li><li>сейчас у Вас нет имущества, которым можно расплатиться по долгам
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
                <label className='anketa__que anketa__que_dop'>Для Вас актуальны такие обстоятельства?
                <ul><li>Вы получаете ежемесячное пособие на ребенка
                </li><li>с Вас пытались взыскать долг по решению суда не позднее одного года назад, но это не удалось
                </li><li>сейчас у Вас нет имущества, которым можно расплатиться по долгам
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
                <label className='anketa__que anketa__que_dop'>С Вас не позднее 7 лет назад пытались взыскать долги по решению суда, но решение не было полностью или частично исполнено?
</label>
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
              <div className='anketa__res_title'>
              <h2 className='anketa__conclusion-title' >Итоговое заключение</h2>
              <a className='anketa__back' href='/anketa'>Назад</a>
              </div>

              <div className='anketa__conc-container'>{block_of_bankruptcyConclusion}</div>

              {props.loggedIn ? (
                <>
                <div className='ahketa__btns'>

<a className='results__more' href={linkTo}>Подробнее о вашей процедуре</a>
<a className='results__doc' href='/documents'>Перейти к документам</a>
</div>
                <p className='anketa__text'>Для того, чтобы всё сделать грамотно, Вам необходимо правильно оформить все документы. Воспользуйтесь составленными нами шаблонами заявления о признании Вас банкротом и полным пакетом документов, необходимых к подаче вместе с ним.</p>
                <button className='anketa__results' onClick={props.navAnketa}>Сохраненные результаты</button>
                </>
            ):(
              <>
              <div className='ahketa__btns'>

              <a className='results__more' href={linkTo}>Подробнее о вашей процедуре</a>

            </div>

          <p className='anketa__text'>Чтобы избежать напрасных усилий, Вам необходимо правильно оформить все документы. <a href='signup' className='anketa__register'>Зарегистрируйтесь</a> и воспользуйтесь составленными нами шаблонами заявления о признании Вас банкротом и полным пакетом документов, необходимых к подаче вместе с ним.</p>
          </>
        )}


            </div>
          )}

          {!isFinished && (
            <button className='anketa__save' type="submit" disabled={anketaEnded()}>Далее</button>
          )}
        </form>
        </main>
        <Footer/>
      </div>

    );
  };

  export default Anketa;