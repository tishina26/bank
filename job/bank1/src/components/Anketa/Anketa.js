import React, { useState } from 'react';
import Header from '../Header/Header';
import './Anketa.css'

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
  const block_of_bankruptcyConclusion_HaveTo = (Object.keys(bankruptcyConclusion).length > 0) && 
    (((bankruptcyConclusion === 'HaveTo') || bankruptcyConclusion === 'Both')&& (
    /*заключение с обязанностью*/
    <p>Вам доступно только банкротство через суд, без этого, увы, никак не получится.
      Исходя из вашей анкеты, вы обязаны это сделать. В этом нет ничего страшного, это обычная процедура, но её необходимо соблюдать. Иначе на Вас могут оштрафовать на 1000-3000 рублей за несоблюдение этой обязанности. 
      Чтобы не лишиться так важных для вас в данной ситуации денег, всё нужно успеть сделать за 30 дней с момента как вы об этом узнали. Это может быть момент, когда вы узнали о сумме вашей задолженности или о невозможности расплатиться перед всеми вашими должниками.
      КНОПКА (Узнайте адрес и контакты арбитражного суда вашего региона)
      КНОПКА (Подробная информация о вашем процедуре банкротства и рисках) (тут ссылка на общую информацию с переходом сразу к части о судебном банкротстве, чтобы она не повторялась в двух местах одновременно)
      Для того, чтобы всё сделать грамотно, Вам необходимо правильно оформить все документы. Зарегистрируйтесь и воспользуйтесь составленными нами шаблонами заявления о признании Вас банкротом и полным пакетом документов, необходимых к подаче вместе с ним. 
    </p>));
  const block_of_bankruptcyConclusion_NotHaveTo = (Object.keys(conclusion).length > 0) &&
    (((conclusion === 'NotHaveTo')||(bankruptcyConclusion === 'Both'))&& (
    /*заключение без обязанности*/
    <p>Вам доступно только банкротство через суд. Исходя из вашей анкеты в этой процедуре нет прямой необходимости, но если вы считаете это необходимым, то вам предоставлено такое право.
      Чтобы весь процесс прошел успешно, вам нужно будет доказать то, что вы не можете платить по своим долгам. Это возможно сделать в таких случаях:
      если вы не оплачиваете долги, которые уже нужно закрыть
      размер ваших долгов больше чем всё ваше имущество
      если решением суда уже доказано, что у вас нет никакого имущества
      если вы не оплатили больше 10 процентов всех ваших долгов, хотя уже прошел месяц с момента, когда должны были их оплатить
      Помните, что банкротство довольно продолжительная процедура которая потребует времени и усилий. Принимайте своё решение изучив все риски и только после этого обращайтесь в арбитражный суд вашего региона.
      КНОПКА (Узнайте адрес и контакты арбитражного суда вашего региона)
      КНОПКА (Подробная информация о вашем процедуре банкротства и рисках) (тут ссылка на общую информацию с переходом сразу к части о судебном банкротстве, чтобы она не повторялась в двух местах одновременно)
      Для того, чтобы всё сделать грамотно, Вам необходимо правильно оформить все документы. Зарегистрируйтесь и воспользуйтесь составленными нами шаблонами заявления о признании Вас банкротом и полным пакетом документов, необходимых к подаче вместе с ним. 
    </p>));
  const block_of_bankruptcyConclusion_Both = (Object.keys(conclusion).length > 0) && (
    (conclusion === 'Both') && (
    <p>ИТОГОВОЕ ЗАКЛЮЧЕНИЕ
    Вы можете выбрать любой путь из представленных:
    {block_of_bankruptcyConclusion_HaveTo}
    ИЛИ 
    {block_of_bankruptcyConclusion_NotHaveTo}
    </p>));
  
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
       <Header loggedIn={props.loggedIn} theme={"header_theme_light"}/>
      <form onSubmit={handleSubmit}>
      {!isFinished && (
            <div>

            <label>1. Укажите, какую сумму вы должны?</label>
            <div>
              <label>
                <input
                  type="radio"
                  value="more1"
                  checked={debtAmount === "more1"}
                  onChange={(e) => setDebtAmount(e.target.value)}
                />
                Более 1 млн
              </label>
              <label>
                <input
                  type="radio"
                  value="less1more500"
                  checked={debtAmount === "less1more500"}
                  onChange={(e) => setDebtAmount(e.target.value)}
                />
                От 500к до 1 млн
              </label>
              <label>
                <input
                  type="radio"
                  value="more25less500"
                  checked={debtAmount === "more25less500"}
                  onChange={(e) => setDebtAmount(e.target.value)}
                />
                От 25к до 500к
              </label>
              <label>
                <input
                  type="radio"
                  value="less25"
                  checked={debtAmount === "less25"}
                  onChange={(e) => setDebtAmount(e.target.value)}
                />
                до 25к
              </label>
            </div>
          </div>
          )}

        {((debtAmount === "more1")||(debtAmount === "less1more500" )) && (
          <div>
            <>
              <label>2.1. Вы не платите по своим долгам больше 3 месяцев?</label>
              <div>
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
        )}
        {((debtAmount === "more1" && payDelay === 'no')||(debtAmount === "less25")||(debtAmount === "less1more500" && payDelay === 'no')||(debtAmount === "more25less500")) && (
          <div>
            <>
              <label>2.2. Если вы заплатите весь долг одному из своих кредиторов, то не сможете заплатить другим?</label>
              <div>
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
        )}

          {((debtAmount === "less1more500" && payDelay === 'no')||(debtAmount === "more25less500")) && payToOneCreditor === 'no' && (
            <div>
              <>
                <label>3.1. В Вашем отношении соблюдаются одновременно следующие условия?
                <ul><li>в отношении Вас окончено исполнительное производство в связи с возвращением исполнительного документа взыскателю, т.к. у Вас нет имущества, которым Вы можете расплатится по своим долгам;
                </li><li>у Вас не имеется иных неоконченных (или не прекращенных) исполнительных производств по взысканию долгов, возбужденных после возвращения исполнительного документа взыскателю?
                </li></ul></label>
                <div>
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
              </>
              <>
                <label>3.2. В Вашем отношении соблюдаются одновременно следующие условия?
                <ul><li>основной Ваш доход составляет пенсия;
                </li><li>у Вас есть выданный не позднее 1-го года назад исполнительный документ имущественного характера, который предъявлялся к исполнению (направлялся для исполнения), и требования по нему не исполнены или исполнены частично;
                </li><li>на дату подачи заявления у Вас нет имущества, на которое может быть обращено взыскание.
                </li></ul></label>
                <div>
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
              </>
              <>
                <label>3.3. В Вашем отношении соблюдаются одновременно следующие условия?
                <ul><li>Вы являетесь получателем ежемесячного пособия в связи с рождением и воспитанием ребенка;
                </li><li>у Вас есть выданный не позднее 1-го года назад исполнительный документ имущественного характера, который предъявлялся к исполнению (направлялся для исполнения), и требования по нему не исполнены или исполнены частично;
                </li><li>на дату подачи заявления у Вас нет имущества, на которое может быть обращено взыскание;
                </li></ul></label>
                <div>
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
              </>
              <>
                <label>3.4. У Вас есть выданный не позднее чем 7 лет назад документ имущественного характера, который предъявлялся к исполнению (направлялся для исполнения), и данные требования не исполнены или исполнены частично?</label>
                <div>
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
          )}

          {isFinished && ( 
            <div>

              <h2>Итоговое заключение</h2>
              <p>{block_of_bankruptcyConclusion}</p>
              <button onClick={props.navAnketa}>Сохраненные результаты</button>
            </div>
          )}

          {!isFinished && (
            <button type="submit">Далее</button>
          )}
        </form>
      </div>
    );
  };

  export default Anketa;