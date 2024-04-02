import React, { useState, useRef } from 'react';
import "./Adress.css";
import Promo from "../Promo/Promo";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";



function Adress(props) {
  const dummyShips = [
    { id: 1, name: 'Аврора', website: 'http://www.example.com/аврора', phoneNumber: '+7 (123) 456-7890' },
    { id: 2, name: 'Буревестник', website: 'http://www.example.com/буревестник', phoneNumber: '+7 (123) 456-7891' },
    { id: 3, name: 'Владимир Мономах', website: 'http://www.example.com/владимир-мономах', phoneNumber: '+7 (123) 456-7892' },
    { id: 4, name: 'Громкий', website: 'http://www.example.com/громкий', phoneNumber: '+7 (123) 456-7893' },
    { id: 5, name: 'Дальнобойщик', website: 'http://www.example.com/дальнобойщик', phoneNumber: '+7 (123) 456-7894' },
    { id: 6, name: 'Есенин', website: 'http://www.example.com/есенин', phoneNumber: '+7 (123) 456-7895' },
    { id: 7, name: 'Жигули', website: 'http://www.example.com/жигули', phoneNumber: '+7 (123) 456-7896' },
    { id: 8, name: 'Заря', website: 'http://www.example.com/заря', phoneNumber: '+7 (123) 456-7897' }
  ];

  const [openShips, setOpenShips] = useState([]);

  const handleShipClick = (shipId) => {
    if (openShips.includes(shipId)) {
      setOpenShips(openShips.filter(id => id !== shipId));
    } else {
      setOpenShips([...openShips, shipId]);
    }
  };

  const handleAlphabetClick = (letter) => {
    // Фильтрация судов по начальной букве
    const filteredShips = dummyShips.filter((ship) =>
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
        {dummyShips.map((ship) => (
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
    </div>
    <Footer/>
    </>
  );
};

export default Adress;