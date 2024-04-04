import React, { useState, useRef } from 'react';
import "./Adress.css";
import Promo from "../Promo/Promo";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const { search } = window.location;
const query = new URLSearchParams(search).get('s');


function Adress(props) {
  const dummyShips = [
    { id: 1, name: 'Алтайский край', website: 'https://altai-krai.arbitr.ru/', phoneNumber: '+7 (3852) 29-88-01' },
    { id: 2, name: 'Амурская область', website: 'https://amuras.arbitr.ru/', phoneNumber: '+7 (4162) 59-59-00' },
    { id: 3, name: 'Архангельская область', website: 'https://arhangelsk.arbitr.ru/', phoneNumber: '+7 (8182) 42-09-80' },
    { id: 4, name: 'Астраханская область', website: 'https://astrahan.arbitr.ru/', phoneNumber: '+7 (8512) 48-44-12' },
    { id: 5, name: 'Белгородская область', website: 'https://belgorod.arbitr.ru/', phoneNumber: '+7 (472-2) 35-60-16' },
    { id: 6, name: 'Брянская область', website: 'https://bryansk.arbitr.ru/', phoneNumber: '+7 (4832) 77-09-47' },
    { id: 7, name: 'Владимирская область', website: 'https://vladimir.arbitr.ru/', phoneNumber: '+7 (4922) 47-23-65' },
    { id: 8, name: 'Волгоградская область', website: 'https://volgograd.arbitr.ru/', phoneNumber: '+7 (8442) 23-00-78' },
    { id: 9, name: 'Вологодская область', website: 'https://vologda.arbitr.ru/', phoneNumber: '+7 (8-8172) 57-08-00' },
    { id: 10, name: 'Воронежская область', website: 'https://voronej.arbitr.ru/', phoneNumber: '+7 (473) 252-53-44' },
    { id: 11, name: 'Еврейская автономная область', website: 'https://eao.arbitr.ru/', phoneNumber: '+7 (42622) 2-37-98' },
    { id: 12, name: 'Забайкальский край', website: 'https://chita.arbitr.ru/', phoneNumber: '+7 (3022)-33-05-01' },
    { id: 13, name: 'Ивановская область', website: 'https://ivanovo.arbitr.ru/', phoneNumber: '+7 (4932) 42-96-65' },
    { id: 14, name: 'Иркутская область', website: 'https://irkutsk.arbitr.ru/', phoneNumber: '+7 (3952) 254-109' },
    { id: 15, name: 'Калининградская область', website: 'https://kaliningrad.arbitr.ru/', phoneNumber: '+7 (4012) 57-22-22' },
    { id: 16, name: 'Калужская область', website: 'https://kaluga.arbitr.ru/', phoneNumber: '+7 (4842) 59-94-57' },
    { id: 17, name: 'Камчатский край', website: 'https://kamchatka.arbitr.ru/', phoneNumber: '+7 (4152) 219-200' },
    { id: 18, name: 'Кемеровская область', website: 'https://kemerovo.arbitr.ru/', phoneNumber: '+7 (384-2) 45-10-47' },
    { id: 19, name: 'Кировская область', website: 'https://kirov.arbitr.ru/', phoneNumber: '+7 (8332) 70-91-18' },
    { id: 20, name: 'Костромская область', website: 'https://kostroma.arbitr.ru/', phoneNumber: '+7 (4942) 45-10-31' },
    { id: 21, name: 'Краснодарский край', website: 'https://krasnodar.arbitr.ru/', phoneNumber: '+7 (861) 293-81-03' },
    { id: 22, name: 'Красноярский край', website: 'https://krasnoyarsk.arbitr.ru/', phoneNumber: '+7 (391) 226-59-00' },
    { id: 23, name: 'Курганская область', website: 'https://kurgan.arbitr.ru/', phoneNumber: '+7 (3522) 46-64-84' },
    { id: 24, name: 'Курская область', website: 'https://kursk.arbitr.ru/', phoneNumber: '+7 (4712) 53-69-36' },
    { id: 25, name: 'Липецкая область', website: 'https://lipetsk.arbitr.ru/', phoneNumber: '+7 (4742) 202-073' },
    { id: 26, name: 'Магаданская область', website: 'https://magadan.arbitr.ru/', phoneNumber: '+7 (4132) 65-03-80' },
    { id: 27, name: 'Москва', website: 'https://msk.arbitr.ru/', phoneNumber: '+7 (495) 600-96-96' },
    { id: 28, name: 'Московская область', website: 'https://asmo.arbitr.ru/', phoneNumber: '+7 (499) 975-29-46' },
    { id: 29, name: 'Мурманская область', website: 'https://murmansk.arbitr.ru/', phoneNumber: '+7 (8152) 45-36-18' },
    { id: 30, name: 'Нижегородская область', website: 'https://nnov.arbitr.ru/', phoneNumber: '+7 (831) 439-10-40' },
    { id: 31, name: 'Новгородская область', website: 'https://novgorod.arbitr.ru/', phoneNumber: '+7 (8162) 94-51-35' },
    { id: 32, name: 'Новосибирская область', website: 'https://novosib.arbitr.ru/', phoneNumber: '+7 (383) 269-69-90' },
    { id: 33, name: 'Омская область', website: 'https://omsk.arbitr.ru/', phoneNumber: '+7 (3812) 31-56-51' },
    { id: 34, name: 'Оренбургская область', website: 'https://orenburg.arbitr.ru/', phoneNumber: '+7 (3532)45-01-93' },
    { id: 35, name: 'Орловская область', website: 'https://orel.arbitr.ru/', phoneNumber: '+7 (4862) 43-24-44' },
    { id: 36, name: 'Пензенская область', website: 'https://penza.arbitr.ru/', phoneNumber: '+7 (8412) 52-99-09' },
    { id: 37, name: 'Пермский край', website: 'https://perm.arbitr.ru/', phoneNumber: '+7 (342) 217-50-00' },
    { id: 38, name: 'Приморский край', website: 'https://primkray.arbitr.ru/', phoneNumber: '+7 (423) 221-53-76' },
    { id: 39, name: 'Псковская область', website: 'https://pskov.arbitr.ru/', phoneNumber: '+7 (8112) 75-29-62' },
    { id: 40, name: 'Республика Адыгея', website: 'https://adyg.arbitr.ru/', phoneNumber: '+7 (8772) 52-63-34' },
    { id: 41, name: 'Республика Алтай', website: 'https://altai.arbitr.ru/', phoneNumber: '+7 (38822) 4-77-03' },
    { id: 42, name: 'Республика Башкортостан', website: 'https://ufa.arbitr.ru/', phoneNumber: '+7 (347) 222-92-05' },
    { id: 43, name: 'Республика Бурятия', website: 'https://buryatia.arbitr.ru/', phoneNumber: '+7 (3012) 28-65-02' },
    { id: 44, name: 'Республика Дагестан', website: 'https://mahachkala.arbitr.ru/', phoneNumber: '+7 (8722) 69-49-68' },
    { id: 45, name: 'Республика Ингушетия', website: 'https://ingushetia.arbitr.ru/', phoneNumber: '+7 (8732) 22-40-73' },
    { id: 46, name: 'Республика Кабардино-Балкария', website: 'https://askb.arbitr.ru/', phoneNumber: '+7 (8662) 44-02-23' },
    { id: 47, name: 'Республика Калмыкия', website: 'https://kalmyk.arbitr.ru/', phoneNumber: '+7 (847 22) 4-17-17' },
    { id: 48, name: 'Республика Карачаево-Черкесия', website: 'https://askchr.arbitr.ru/', phoneNumber: '+7 (8782) 26-36-39' },
    { id: 49, name: 'Республика Карелия', website: 'https://karelia.arbitr.ru/', phoneNumber: '+7 (8142) 790-590' },
    { id: 50, name: 'Республика Коми', website: 'https://komi.arbitr.ru/', phoneNumber: '+7 (8212) 30-08-10' },
    { id: 51, name: 'Республика Крым', website: 'https://crimea.arbitr.ru/', phoneNumber: '+7 (3652) 77-38-87' },
    { id: 52, name: 'Республика Марий Эл', website: 'https://mari-el.arbitr.ru/', phoneNumber: '+7 (8362) 69-33-42' },
    { id: 53, name: 'Республика Мордовия', website: 'https://asrm.arbitr.ru/', phoneNumber: '+7 (8342) 24-08-83' },
    { id: 54, name: 'Республика Саха (Якутия)', website: 'https://yakutsk.arbitr.ru/', phoneNumber: '+7 (4112) 34-05-80' },
    { id: 55, name: 'Республика Северная Осетия - Алания', website: 'https://alania.arbitr.ru/', phoneNumber: '+7 (8672) 53-04-24' },
    { id: 56, name: 'Республика Татарстан', website: 'https://tatarstan.arbitr.ru/', phoneNumber: '+7 (843) 533-50-00' },
    { id: 57, name: 'Республика Тыва', website: 'https://tyva.arbitr.ru/', phoneNumber: '+7 (39422) 2-11-97' },
    { id: 58, name: 'Республика Хакасия', website: 'https://khakasia.arbitr.ru/', phoneNumber: '+7 (3902) 29-95-00' },
    { id: 59, name: 'Ростовская область', website: 'https://rostov.arbitr.ru/', phoneNumber: '+7 (863) 282-84-44' },
    { id: 60, name: 'Рязанская область', website: 'https://ryazan.arbitr.ru/', phoneNumber: '+7 (4912) 20-95-00' },
    { id: 61, name: 'Самарская область', website: 'https://samara.arbitr.ru/', phoneNumber: '+7 (846) 207-55-15' },
    { id: 62, name: 'Санкт-Петербург и Ленинградская область', website: 'https://spb.arbitr.ru/', phoneNumber: '+7 (812) 643-48-18' },
    { id: 63, name: 'Саратовская область', website: 'https://saratov.arbitr.ru/', phoneNumber: '+7 (845-2) 98-39-39' },
    { id: 64, name: 'Сахалинская область', website: 'https://sakhalin.arbitr.ru/', phoneNumber: '+7 (4242) 46-09-45' },
    { id: 65, name: 'Севастополь', website: 'https://sevastopol.arbitr.ru/', phoneNumber: '+7 (8692) 54-34-91' },
    { id: 66, name: 'Свердловская область', website: 'https://ekaterinburg.arbitr.ru/', phoneNumber: '+7 (343) 298-00-07' },
    { id: 67, name: 'Смоленская область', website: 'https://smolensk.arbitr.ru/', phoneNumber: '+7 (4812) 244-771' },
    { id: 68, name: 'Ставропольский край', website: 'https://stavropol.arbitr.ru/', phoneNumber: '+7 (8652) 20-54-22' },
    { id: 69, name: 'Тамбовская область', website: 'https://tambov.arbitr.ru/', phoneNumber: '+7 (4752) 47-70-55' },
    { id: 70, name: 'Тверская область', website: 'https://tver.arbitr.ru/', phoneNumber: '+7 (4822) 390-294' },
    { id: 71, name: 'Томская область', website: 'https://tomsk.arbitr.ru/', phoneNumber: '+7 (382-2) 284-083' },
    { id: 72, name: 'Тульская область', website: 'https://tula.arbitr.ru/', phoneNumber: '+7 (4872) 250-800' },
    { id: 73, name: 'Тюменская область', website: 'https://tumen.arbitr.ru/', phoneNumber: '+7 (3452) 25-81-13' },
    { id: 74, name: 'Удмуртская Республика', website: 'https://udmurtiya.arbitr.ru/', phoneNumber: '+7 (3412) 602-643' },
    { id: 75, name: 'Ульяновская область', website: 'https://ulyanovsk.arbitr.ru/', phoneNumber: '+7 (8422) 33-46-08' },
    { id: 76, name: 'Хабаровский край', website: 'https://khabarovsk.arbitr.ru/', phoneNumber: '+7 (4212) 91-08-31' },
    { id: 77, name: 'Ханты-Мансийский автономный округ', website: 'https://hmao.arbitr.ru/', phoneNumber: '+7 (3467) 95-88-71' },
    { id: 78, name: 'Челябинская область', website: 'https://chel.arbitr.ru/', phoneNumber: '+7 (351) 225-03-19' },
    { id: 79, name: 'Чеченская Республика', website: 'https://chechnya.arbitr.ru/', phoneNumber: '+7 (871-2) 22-26-32' },
    { id: 80, name: 'Чувашская Республика', website: 'https://chuvashia.arbitr.ru/', phoneNumber: '+7 (8352) 24-01-98' },
    { id: 81, name: 'Чукотский автономный округ', website: 'https://chukotka.arbitr.ru/', phoneNumber: '+7 (42722) 6-96-00' },
    { id: 82, name: 'Ямало-Ненецкий автономный округ', website: 'https://yamal.arbitr.ru/', phoneNumber: '+7 (34922) 5-31-00' },
    { id: 83, name: 'Ярославская область', website: 'https://yaroslavl.arbitr.ru/', phoneNumber: '+7 (4852) 28-11-82' },

  ];

  const [openShips, setOpenShips] = useState([]);
  const [searchQuery, setSearchQuery] = useState(query || '');



  const filterPosts = (ships, query) => {
    if (!query) {
        return ships;
    }

    return ships.filter((ship) => {
        const postName = ship.name.toLowerCase();
        return postName.includes(query.toLowerCase());
    });
  };

  const searchedShips = filterPosts(dummyShips, searchQuery);

  const handleShipClick = (shipId) => {
    if (openShips.includes(shipId)) {
      setOpenShips(openShips.filter(id => id !== shipId));
    } else {
      setOpenShips([...openShips, shipId]);
    }
  };

  const handleAlphabetClick = (letter) => {
    // Фильтрация судов по начальной букве
    const filteredShips = searchedShips.filter((ship) =>
      ship.name.toUpperCase().startsWith(letter)
    );

    // Поиск первого элемента, начинающегося с выбранной буквы
    const firstMatchingShip = filteredShips[0];

    // Переход к нужной части списка
    if (firstMatchingShip) {
      const shipElement = document.getElementById(firstMatchingShip.id);
      if (shipElement) {
        shipElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
    <Header loggedIn={props.loggedIn} theme={"header_theme_dark"}/>
    <div className="ship-list">
      <div className="ship-list__ships">
        {searchedShips.map((ship) => (
          <div key={ship.id} id={ship.id} className="ship-list__ship">
            <span>{ship.name}</span>

            {openShips.includes(ship.id) && (
              <div className="ship-list__details">
                <p><strong>Ссылка на сайт:</strong> <a href={ship.website}>{ship.website}</a></p>
                <p><strong>Номер телефона:</strong> {ship.phoneNumber}</p>
                {/* Другие детали о судне */}
              </div>
            )}
            <button onClick={() => handleShipClick(ship.id)}>+</button>
          </div>
        ))}
      </div>
      <div className="ship-list__alphabet">
        {Array.from({ length: 32 }, (_, i) => String.fromCharCode(1040 + i)).map((letter, index) => (
          <button key={index} onClick={() => handleAlphabetClick(letter)}>{letter}</button>
        ))}
      </div>
      <form>
          <label htmlFor="header-search">
              <span className="visually-hidden">Поиск арбитражных судов  </span>
          </label>
          <input
              value={searchQuery}
              onInput={e => setSearchQuery(e.target.value)}
              type="text"
              id="header-search"
              placeholder="Введите название суда"
              name="s"
          />
      </form>
    </div>
    <Footer/>
    </>
  );
};

export default Adress;