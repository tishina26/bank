import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';

const AnketaResults = (props) => {
  const [anketaData, setAnketaData] = useState({});
  const [loading, setLoading] = useState(true);
  const debtAmount = ((anketaData.debtAmount === 'less25') && ('до 25к')) || (
                      (anketaData.debtAmount === 'more25less500') && ('От 25к до 500к')) || (
                      (anketaData.debtAmount === 'less1more500') && ('От 500к до 1 млн')) || (
                      (anketaData.debtAmount === 'more1') && ('Более 1 млн'));
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

  const block_of_debtAmount = (Object.keys(debtAmount).length > 0) && (
    <div className="question">
      <h3>1. Укажите, какую сумму вы должны?</h3>
      <p>{debtAmount}</p>
    </div>
  );
  const block_of_payDelay = (Object.keys(payDelay).length > 0) && (
    <div className="question">
      <h3>2.1. Вы не платите по своим долгам больше 3 месяцев?</h3>
      <p>{payDelay}</p>
    </div>
  );
  const block_of_payToOneCreditor = (Object.keys(payToOneCreditor).length > 0) && (
    <div className="question">
      <h3>2.2. Если вы заплатите весь долг одному из своих кредиторов, то не сможете заплатить другим?</h3>
      <p>{payToOneCreditor}</p>
    </div>
  );
  const block_of_additionalQuestion1 = (Object.keys(additionalQuestion1).length > 0) && (
    <div className="question">
      <h3>3.1. В Вашем отношении соблюдаются одновременно следующие условия?</h3>
      <ul><li>в отношении Вас окончено исполнительное производство в связи с возвращением исполнительного документа взыскателю, т.к. у Вас нет имущества, которым Вы можете расплатится по своим долгам;
      </li><li>у Вас не имеется иных неоконченных (или не прекращенных) исполнительных производств по взысканию долгов, возбужденных после возвращения исполнительного документа взыскателю?
      </li></ul>
      <p>{additionalQuestion1}</p>
    </div>
  );
  const block_of_additionalQuestion2 = (Object.keys(additionalQuestion2).length > 0) && (
    <div className="question">
      <h3>3.2. В Вашем отношении соблюдаются одновременно следующие условия?</h3>
      <ul><li>основной Ваш доход составляет пенсия;
      </li><li>у Вас есть выданный не позднее 1-го года назад исполнительный документ имущественного характера, который предъявлялся к исполнению (направлялся для исполнения), и требования по нему не исполнены или исполнены частично;
      </li><li>на дату подачи заявления у Вас нет имущества, на которое может быть обращено взыскание.
      </li></ul>
      <p>{additionalQuestion2}</p>
    </div>
  );
  const block_of_additionalQuestion3 = (Object.keys(additionalQuestion3).length > 0) && (
    <div className="question">
      <h3>3.3. В Вашем отношении соблюдаются одновременно следующие условия?</h3>
      <ul><li>Вы являетесь получателем ежемесячного пособия в связи с рождением и воспитанием ребенка;
      </li><li>у Вас есть выданный не позднее 1-го года назад исполнительный документ имущественного характера, который предъявлялся к исполнению (направлялся для исполнения), и требования по нему не исполнены или исполнены частично;
      </li><li>на дату подачи заявления у Вас нет имущества, на которое может быть обращено взыскание;
      </li></ul>
      <p>{additionalQuestion3}</p>
    </div>
  );
  const block_of_additionalQuestion4 = (Object.keys(additionalQuestion4).length > 0) && (
    <div className="question">
      <h3>3.4. У Вас есть выданный не позднее чем 7 лет назад документ имущественного характера, который предъявлялся к исполнению (направлялся для исполнения), и данные требования не исполнены или исполнены частично?</h3>
      <p>{additionalQuestion4}</p>
    </div>
  );

  /*длинные блоки заключений*/
  const bankruptcyConclusion = anketaData.bankruptcyConclusion;
  const block_of_bankruptcyConclusion_HaveTo = (Object.keys(bankruptcyConclusion).length > 0) && 
    (((bankruptcyConclusion === 'HaveTo') ||bankruptcyConclusion === 'Both')&& (
    /*заключение с обязанностью*/
    <div className="question">
      <h3>Итоговое заключение</h3>
      <p>Вам доступно только банкротство через суд, без этого, увы, никак не получится.
      Исходя из вашей анкеты, вы обязаны это сделать. В этом нет ничего страшного, это обычная процедура, но её необходимо соблюдать. Иначе на Вас могут оштрафовать на 1000-3000 рублей за несоблюдение этой обязанности. 
      Чтобы не лишиться так важных для вас в данной ситуации денег, всё нужно успеть сделать за 30 дней с момента как вы об этом узнали. Это может быть момент, когда вы узнали о сумме вашей задолженности или о невозможности расплатиться перед всеми вашими должниками.
      КНОПКА (Узнайте адрес и контакты арбитражного суда вашего региона)
      КНОПКА (Подробная информация о вашем процедуре банкротства и рисках) (тут ссылка на общую информацию с переходом сразу к части о судебном банкротстве, чтобы она не повторялась в двух местах одновременно)
      Для того, чтобы всё сделать грамотно, Вам необходимо правильно оформить все документы. Зарегистрируйтесь и воспользуйтесь составленными нами шаблонами заявления о признании Вас банкротом и полным пакетом документов, необходимых к подаче вместе с ним. 
      </p>
    </div>));
  const block_of_bankruptcyConclusion_NotHaveTo = (Object.keys(bankruptcyConclusion).length > 0) &&
    (((bankruptcyConclusion === 'NotHaveTo')||(bankruptcyConclusion === 'Both'))&& (
    /*заключение без обязанности*/
    <div className="question">
      <h3>Итоговое заключение</h3>
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
      </p>
    </div>));
  const block_of_bankruptcyConclusion_Both = (Object.keys(bankruptcyConclusion).length > 0) && (
    (bankruptcyConclusion === 'Both') && (
    <div>ИТОГОВОЕ ЗАКЛЮЧЕНИЕ
    Вы можете выбрать любой путь из представленных:
    {block_of_bankruptcyConclusion_HaveTo}
    ИЛИ 
    {block_of_bankruptcyConclusion_NotHaveTo}
    </div>));
  
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
          <h3>Вы еще не прошли анкету, поэтому пройдите ее, нажав на "Анкета" вверху страницы</h3>
        </div>
      </div>
    </div>
  )}

  return (
    <div>
      <Header loggedIn={props.loggedIn} theme={"header_theme_light"} />
      <h2 className="profile__title">Результаты анкеты</h2>
      <div className="results">
        {block_of_debtAmount}
        {block_of_payDelay}
        {block_of_payToOneCreditor}
        {block_of_additionalQuestion1}
        {block_of_additionalQuestion2}
        {block_of_additionalQuestion3}
        {block_of_additionalQuestion4}
        {block_of_bankruptcyConclusion}
      </div>
    </div>
  );
};

export default AnketaResults;
