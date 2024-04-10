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

  if (Object.keys(anketaData).length === 0) {
    return (
      <>
      <Header loggedIn={props.loggedIn} theme={"header_theme_dark"} />
      <main className='main'>
        <h4>Чтобы получить пакет документов, пожалуйста, пройдите анкету.</h4>
        <NavLink to="/anketa" className='usefull__anketa'>Пройти анкету</NavLink>

      </main>
      <Footer />
    </>

    );
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
            <ul ><div className='usefull__doc'>
            <li>Пустой шаблон</li>
            <div className='usefull__dows'>
              <button
              className="documents__btn documents__btn1"
              onClick={() => handleDownload(doc.file+'.docx')}
            >
              Скачать
            </button>
            <button
              className="documents__btn documents__btn1"
              onClick={() => handlePreview(doc.file+'_шаблон.pdf')}
            >
              Предпросмотр
            </button>
            </div>
              </div>

              <div className='usefull__doc'>
              <li >Пример заполнения</li>
            <div className='usefull__dows'>
            <button
              className="documents__btn documents__btn1"
              onClick={() => handleDownload(doc.file+'.pdf')}
            >
              Скачать
            </button>
            <button
              className="documents__btn documents__btn1"
              onClick={() => handlePreview(doc.file+'.pdf')}
            >
              Предпросмотр
            </button>
            </div>
              </div>

            </ul>
          </li>
    </div>
  ))};



  const bankruptcyConclusion = anketaData.bankruptcyConclusion;

  const docSyd = (Object.keys(bankruptcyConclusion).length > 0) &&
    (<><div>{docs(documentNamesSyd)}
            <button
              className="documents__btn"
              onClick={() => handleDownload("весь_архив_суд.zip")}
            >
              Скачать все документы
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
              Скачать все документы
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

  return (
    <>
      <Header loggedIn={props.loggedIn} theme={"header_theme_dark"} />
      <main className='main'>
      {(doc === "both") && (
        <>
        <h2>Вам доступно два варианта банкротства. Необходимые документы:</h2>
        <div className='doc__pam'>
        <p>Полный перечень необходимых документов с пояснениями</p>
        <button className="documents__btn" onClick={() => handleDownload('памятка.pdf')}>Скачать</button>
        <button className="documents__btn" onClick={() => handlePreview('памятка.pdf')}>Предпросмотр</button>
        </div>


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
            <p>Заявление подается в <a className='documents__btn documents__btn1 documents__btn2' rel="noopener noreferrer" target="_blank" href='https://xn--d1achjhdicc8bh4h.xn--p1ai/search/mfc'><b>МФЦ</b></a> по месту жительства или месту пребывания гражданина</p>
          </div>
        </div>

        </>
      )}
      {(doc !== "both") && (
        <>
        <h2>Вам доступно только банкротство через суд. Необходимые документы:</h2>
        <div className='doc__pam'>
        <p>Полный перечень необходимых документов с пояснениями</p>
        <button className="documents__btn" onClick={() => handleDownload('памятка.pdf')}>Скачать</button>
        <button className="documents__btn" onClick={() => handlePreview('памятка.pdf')}>Предпросмотр</button>
        </div>
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