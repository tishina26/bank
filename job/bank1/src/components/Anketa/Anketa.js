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

  const handleSubmit = (e) => {
    e.preventDefault();
    let conclusion =''
    if (debtAmount === "more1") {
      if (payDelay === 'yes') {
        conclusion ='HaveTo';
      } else if (payToOneCreditor === 'yes') {
        conclusion ='HaveTo';
      } else {
        conclusion ='NotHaveTo';
      }
    } else if (debtAmount === "less1more500") {
      if (payDelay === 'yes') {
        conclusion ='HaveTo';
      } else if (payToOneCreditor === 'yes') {
        conclusion ='HaveTo';
      } else if (additionalQuestion1 === 'no' && additionalQuestion2 === 'no' && additionalQuestion3 === 'no' && additionalQuestion4 === 'no') {
        conclusion ='NotHaveTo';
      } else {
        conclusion ='Both';
      }
    }
    else if (debtAmount === "more25less500") {
      if (payToOneCreditor === 'yes') {
        conclusion ='HaveTo';
      } else if (additionalQuestion1 === 'no' && additionalQuestion2 === 'no' && additionalQuestion3 === 'no' && additionalQuestion4 === 'no') {
        conclusion ='NotHaveTo';
      } else {
        conclusion ='both';
      }
    }
    else if (debtAmount === "less25") {
      if (payToOneCreditor === 'yes') {
        conclusion ='HaveTo';
      } else {
        conclusion ='NotHaveTo';
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
              <p>{bankruptcyConclusion}</p>
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