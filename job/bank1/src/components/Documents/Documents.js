import React, { useState, useEffect } from 'react';
import { MY_URL } from "../../utils/constans";
import './Documents.css'
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { NavLink } from 'react-router-dom';

function Documents(props) {
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

  const documentNamesSyd = [
    {id: 1, text: 'Заявление гражданина о признании его банкротом через суд', file: 'Заявление_гр_о_пр_банк_ч_суд'},
    {id: 2, text: 'Опись имущества гражданина', file: 'опись_имущ_граж'},
    {id: 3, text: 'Список кредиторов и должников гражданина', file: 'список_кредиторов'},
  ];
  const documentNamesVne = [
    {id: 1, text: 'Заявление гражданина о признании его банкротом во внесудебном порядке', file: 'Заявление_гр_о_пр_банк_вне'},
    {id: 2, text: 'Список кредиторов и должников гражданина', file: 'список_кредиторов_вне'},
  ];

  function docs(docArr) {
    return documentNamesSyd.map(doc => (
    <div key={doc.id}>
          <li>
            {doc.text}{" "}
            <ul><li>Пустой шаблон
            <button
              className="documents__btn"
              onClick={() => handleDownload(doc.file+'.docx')}
            >
              Скачать
            </button>
            <button
              className="documents__btn"
              onClick={() => handlePreview(doc.file+'_шаблон.pdf')}
            >
              Предпросмотр
            </button>
            </li>
            <li>Пример заполнения
            <button
              className="documents__btn"
              onClick={() => handleDownload(doc.file+'.pdf')}
            >
              Скачать
            </button>
            <button
              className="documents__btn"
              onClick={() => handlePreview(doc.file+'.pdf')}
            >
              Предпросмотр
            </button></li></ul>
          </li>
    </div>
  ))};


  const bankruptcyConclusion = (Object.keys(anketaData).length > 0) && (anketaData.bankruptcyConclusion);

  const docSyd = (Object.keys(bankruptcyConclusion).length > 0) &&
    (<><div>{docs(documentNamesSyd)}
            <button
              className="documents__btn"
              onClick={() => handleDownload("весь_архив_суд.zip")}
            >
              Скачать весь архив
            </button>
            <button
              className="documents__btn"
              onClick={() => handleDownload("все_шаблоны_суд.zip")}
            >
              Скачать все шаблоны
            </button>
            <button
              className="documents__btn"
              onClick={() => handleDownload("все_примеры_суд.zip")}
            >
              Скачать все примеры
            </button>

    </div></>);
  const docVne = (Object.keys(bankruptcyConclusion).length > 0) &&
    (bankruptcyConclusion === 'Both') &&
    (<><div>{docs(documentNamesVne)}

            <button
              className="documents__btn"
              onClick={() => handleDownload("весь_архив_вне.zip")}
            >
              Скачать весь архив
            </button>
            <button
              className="documents__btn"
              onClick={() => handleDownload("все_шаблоны_вне.zip")}
            >
              Скачать все шаблоны
            </button>
            <button
              className="documents__btn"
              onClick={() => handleDownload("все_примеры_вне.zip")}
            >
              Скачать все примеры
            </button>


    </div></>);

  let doc = 'def';
  if (bankruptcyConclusion === 'Both') {
    doc = 'both';
  } else if (bankruptcyConclusion === 'HaveTo') {
    doc = 'haveto';
  } else if (bankruptcyConclusion === 'NotHaveTo') {
    doc = 'nothaveto';
  } else {
    doc = 'less';
  }


  const handleDownload = (filename) => {
    const token = localStorage.getItem("token");

    // Добавляем токен авторизации в заголовки запроса
    const headers = {
      Authorization: `Bearer ${token}`
    };

    // Отправляем запрос на сервер для загрузки файла
    fetch(`${MY_URL}/files/${filename}`, {
      method: "GET",
      headers: headers
    })
      .then((response) => {
        // Проверяем, успешно ли выполнен запрос
        if (!response.ok) {
          throw new Error("Ошибка при загрузке файла");
        }
        return response.blob(); // Получаем содержимое файла в формате blob
      })
      .then((blob) => {
        // Создаем URL объект для содержимого blob
        const url = window.URL.createObjectURL(new Blob([blob]));
        // Создаем ссылку для скачивания файла
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", filename); // Указываем имя файла для скачивания
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch((error) => {
        console.error("Ошибка:", error);
      });
  };


  const handlePreview = (filename) => {
    // Функция для открытия предпросмотра документа
    window.open(`${MY_URL}/files/${filename}`, '_blank');
  };

  /*проверка, была ли анкета хоть раз пройдена*/
  if (Object.keys(anketaData).length === 0) {
    return (
    <div>
      <Header loggedIn={props.loggedIn} theme={"header_theme_dark"} />
      <main className="main">
      <h2 className="profile__title">НЕТ РЕЗУЛЬТАТОВ</h2>
        <div>
          Вы еще не прошли анкету. Пожалуйста, сначала пройдите ее, тогда появятся результаты и соответствующие им документы.
          <div><NavLink to="/anketa" className='navlink' >Пройти анкету</NavLink></div>
      </div>
      </main>
      <Footer/>
    </div>
  )}

  return (
    <>
      <Header loggedIn={props.loggedIn} theme={"header_theme_dark"} />
      <main className='main'>
      {(doc === "both") && (
        <>
        <h2>Вам доступно два варианта банкротства. Необходимые документы:</h2>
        <div className='documents-container'>
          <div className='documents-column'>
            <h3>Документы для банкротства через суд</h3>
            {docSyd}
            <a className='doc__more' href='/usefull#syd'>Подробнее о вашей процедуре</a>
            <NavLink to='/adress' className='navlink'>Найти адрес суда</NavLink>
          </div>
          <div className='documents-column'>
            <h3>Документы для банкротства во внесудебном порядке</h3>

            {docVne}
            <a className='doc__more' href='/usefull#vne'>Подробнее о вашей процедуре</a>
            <p>Заявление подается в МФЦ по месту жительства или месту пребывания гражданина</p>
          </div>
        </div>

        </>
      )}
      {(doc !== "both") && (
        <>
        <h2>Вам доступно только банкротство через суд. Необходимые документы:</h2>
        <div>
          {docSyd}
          <a className='doc__more' href='/usefull#syd'>Подробнее о вашей процедуре</a>
          <NavLink to='/adress' className='navlink'>Найти адрес суда</NavLink>
        </div>
        </>
      )}

      </main>
      <Footer />
    </>
  )
}

export default Documents;