import React, { useState, useEffect } from 'react';
import { MY_URL } from "../../utils/constans"; // Подключаем URL вашего сервера
import './Documents.css'
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

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

  const bankruptcyConclusion = anketaData.bankruptcyConclusion;
  const docSyd = (Object.keys(bankruptcyConclusion).length > 0) &&
    (
    /*заключение с обязанностью*/
    <>
    <div>
    <li>
            Заявление гражданина о признании его банкротом через суд{" "}
            <button
              className="documents__btn"
              onClick={() => handleDownload("Заявление_гр_о_пр_банк_ч_суд.docx")}
            >
              Скачать
            </button>
            <button
              className="documents__btn"
              onClick={() => handlePreview("Заявление_гр_о_пр_банк_ч_суд.pdf")}
            >
              Предпросмотр
            </button>
          </li>
          <li>
            Опись имущества гражданина{" "}
            <button
              className="documents__btn"
              onClick={() => handleDownload("опись_имущ_граж.docx")}
            >
              Скачать
            </button>
            <button
              className="documents__btn"
              onClick={() => handlePreview("опись_имущ_граж.pdf")}
            >
              Предпросмотр
            </button>
          </li>
          <li>
            Список кредиторов и должников гражданина{" "}
            <button
              className="documents__btn"
              onClick={() => handleDownload("список_кредиторов.docx")}
            >
              Скачать
            </button>
            <button
              className="documents__btn"
              onClick={() => handlePreview("список_кредиторов.pdf")}
            >
              Предпросмотр
            </button>
          </li>
    </div>


      </>);

const docVne = (Object.keys(bankruptcyConclusion).length > 0) &&
    (((bankruptcyConclusion === 'Both'))&& (
    /*заключение с обязанностью*/
    <>
    <div>
    <li>
    Заявление гражданина о признании его банкротом во внесудебном порядке{" "}
            <button
              className="documents__btn"
              onClick={() => handleDownload("Заявление_гр_о_пр_банк_вне.docx")}
            >
              Скачать
            </button>
            <button
              className="documents__btn"
              onClick={() => handlePreview("Заявление_гр_о_пр_банк_вне.pdf")}
            >
              Предпросмотр
            </button>
          </li>

          <li>
            Список кредиторов и должников гражданина{" "}
            <button
              className="documents__btn"
              onClick={() => handleDownload("список_кредиторов_вне.docx")}
            >
              Скачать
            </button>
            <button
              className="documents__btn"
              onClick={() => handlePreview("список_кредиторов_вне.pdf")}
            >
              Предпросмотр
            </button>
          </li>
    </div>


      </>));

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
      <main className="main">
      {(doc === "both") && (
        <>
        <h2>Вам доступно два варианта банкротства. Необходимые документы:</h2>
        <div>
          <div>
            <h3>Документы для банкротства через суд</h3>
            {docSyd}
          </div>
          <div>
            <h3>Документы для банкротства во внесудебном порядке</h3>
            {docVne}
          </div>

        </div>
        </>
      )}
      {(doc !== "both") && (
        <>
        <h2>Вам доступно только банкротство через суд. Необходимые документы:</h2>
        <div>
          {docSyd}
        </div>
        </>
      )}
      
      </main>
      <Footer />
    </>
  )
}

export default Documents;
