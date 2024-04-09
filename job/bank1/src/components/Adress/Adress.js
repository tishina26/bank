import React, { useState, useRef } from 'react';
import "./Adress.css";
import Promo from "../Promo/Promo";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const { search } = window.location;
const query = new URLSearchParams(search).get('s');


function Adress(props) {
  const dummyShips = [
    { id: 1, name: 'Алтайский край', website: 'https://altai-krai.arbitr.ru/', phoneNumber: '+7 (3852) 29-88-01', adress: '656015 г.Барнаул, пр. Ленина 76', fax: '-', email: 'a03.info@arbitr.ru'},
    { id: 2, name: 'Амурская область', website: 'https://amuras.arbitr.ru/', phoneNumber: '+7 (4162) 59-59-00', adress: '675023 Благовещенск, ул. Ленина, 163', fax: '+7 (4162) 51-83-48', email: 'info@amuras.arbitr.ru'},
    { id: 3, name: 'Архангельская область', website: 'https://arhangelsk.arbitr.ru/', phoneNumber: '+7 (8182) 42-09-80', adress: '163000 Архангельск, ул. Логинова, д.17', fax: '+7 (8182) 42-07-99', email: 'info@arhangelsk.arbitr.ru'},
    { id: 4, name: 'Астраханская область', website: 'https://astrahan.arbitr.ru/', phoneNumber: '+7 (8512) 48-44-12', adress: '414014 Астрахань, просп. Губернатора Анатолия ', fax: '+7 (8512) 48-23-23', email: 'astrahan.info@arbitr.ru'},
    { id: 5, name: 'Белгородская область', website: 'https://belgorod.arbitr.ru/', phoneNumber: '+7 (472-2) 35-60-16', adress: '308600 Белгород, Народный бульвар, 135', fax: '+7 (4722) 32-85-38', email: 'a08.info@arbitr.ru'},
    { id: 6, name: 'Брянская область', website: 'https://bryansk.arbitr.ru/', phoneNumber: '+7 (4832) 77-09-47', adress: '241050 Брянск, пер. Трудовой, 6', fax: '+7 (4832) 77-09-58', email: 'info@bryansk.arbitr.ru'},
    { id: 7, name: 'Владимирская область', website: 'https://vladimir.arbitr.ru/', phoneNumber: '+7 (4922) 47-23-65', adress: '600025 Владимир, Октябрьский просп., 14', fax: '+7 (4922) 42-32-13', email: 'vladimir.info@arbitr.ru'},
    { id: 8, name: 'Волгоградская область', website: 'https://volgograd.arbitr.ru/', phoneNumber: '+7 (8442) 23-00-78', adress: '400005 Волгоград, ул. 7-ой Гвардейской Дивизии, д. 2', fax: '+7 (8442) 24-04-60', email: 'info@volgograd.arbitr.ru'},
    { id: 9, name: 'Вологодская область', website: 'https://vologda.arbitr.ru/', phoneNumber: '+7 (8172) 57-08-88, 57-08-00', adress: '160000 Вологда ул. Герцена, 1а', fax: '+7 (8172) 72-04-19', email: 'info@vologda.arbitr.ru'},
    { id: 10, name: 'Воронежская область', website: 'https://voronej.arbitr.ru/', phoneNumber: '+7 (473) 252-53-44', adress: '394030 Воронеж, ул. Среднемосковская, 77', fax: '+7 (473) 252-47-09', email: 'info@voronej.arbitr.ru'},
    { id: 11, name: 'Еврейская автономная область', website: 'https://eao.arbitr.ru/', phoneNumber: '+7 (42622) 2-37-98', adress: '679016 Биробиджан, пер. Театральный, 10', fax: '+7 (42622) 2-37-98, (42622) 4-07-00', email: 'http://eao.arbitr.ru'},
    { id: 12, name: 'Забайкальский край', website: 'https://chita.arbitr.ru/', phoneNumber: '+7 (3022)-33-05-01, (3022) 33-07-33, (3022) 33-05-33 (Тел. доверия)', adress: '672000 Чита, ул. Выставочная, 6', fax: '+7 (3022) 33-06-33', email: 'http://arbitr.chita.ru'},
    { id: 13, name: 'Запорожская область', website: '-', phoneNumber: '-', adress: 'г. Приморск, ул. Соборная, д. 84', fax: '-', email: 'a86.info@arbitr.ru'},
    { id: 14, name: 'Ивановская область', website: 'https://ivanovo.arbitr.ru/', phoneNumber: '+7 (4932) 42-96-65 (канцелярия)', adress: '153022 Иваново, ул. Б. Хмельницкого, д. 59б', fax: '+7 (4932) 42-96-65 (канцелярия)', email: 'info@ivanovo.arbitr.ru'},
    { id: 15, name: 'Иркутская область', website: 'https://irkutsk.arbitr.ru/', phoneNumber: '+7 (3952) 25-41-09, 25-42-00', adress: '664025 Иркутск, бульвар Гагарина, 70', fax: '+7 (3952) 24-15-99', email: 'http://irkutsk.arbitr.ru'},
    { id: 16, name: 'Калининградская область', website: 'https://kaliningrad.arbitr.ru/', phoneNumber: '+7 (4012) 57-22-22', adress: '236016, г. Калининград, ул. Рокоссовского, дом 2-4', fax: '+7 (4012) 53-04-84', email: 'kaliningrad.info@arbitr.ru'},
    { id: 17, name: 'Калужская область', website: 'https://kaluga.arbitr.ru/', phoneNumber: '+7 (4842) 77-20-77', adress: '248000, г. Калуга, Ленина , д. 90', fax: '+7 (4842) 59-94-57', email: 'kaluga.info@arbitr.ru'},
    { id: 18, name: 'Камчатский край', website: 'https://kamchatka.arbitr.ru/', phoneNumber: '+7 (4152) 21-92-00', adress: '683009 Петропавловск-Камчатский, ул. Академика Курчатова, 2', fax: '+7 (4152) 21-92-19', email: 'info@kamchatka.arbitr.ru'},
    { id: 19, name: 'Кемеровская область', website: 'https://kemerovo.arbitr.ru/', phoneNumber: '+7 (384-2) 45-10-47, (384-2) 58-43-26, (384-2) 58-28-70', adress: '650000 Кемерово, ул. Красная, д.8', fax: '+7 (384-2)58-37-05', email: 'info@kemerovo.arbitr.ru'},
    { id: 20, name: 'Кировская область', website: 'https://kirov.arbitr.ru/', phoneNumber: '+7 (8332) 70-91-18, (8332) 70-92-11', adress: '610017 Киров, ул. К.Либкнехта, 102', fax: '-', email: 'info@kirov.arbitr.ru'},
    { id: 21, name: 'Костромская область', website: 'https://kostroma.arbitr.ru/', phoneNumber: '+7 (4942) 45-10-31, 31-37-79', adress: '156961 Кострома, ул. Долматова, 2', fax: '+7 (4942) 35-19-44', email: 'info@kostroma.arbitr.ru'},
    { id: 22, name: 'Краснодарский край', website: 'https://krasnodar.arbitr.ru/', phoneNumber: '+7 (861) 293-81-03, (861) 293-81-00, (861) 299-96-86 (тел. доверия)', adress: '350063 Краснодар, ул. Постовая, 32', fax: '+7 (861) 992-38-22', email: 'info@krasnodar.arbitr.ru'},
    { id: 23, name: 'Красноярский край', website: 'https://krasnoyarsk.arbitr.ru/', phoneNumber: '+7 (391) 226-59-30 (391) 226-59-00', adress: '660049 Красноярск, ул. Ленина, 1', fax: '+7 (391) 226-59-34', email: 'info@krasnoyarsk.arbitr.ru'},
    { id: 24, name: 'Курганская область', website: 'https://kurgan.arbitr.ru/', phoneNumber: '+7 (3522) 46-64-84, (3522) 46-38-87 (приемная председателя)', adress: '640021 Курган, ул. Климова, 62', fax: '+7 (3522) 46-38-07', email: 'info@kurgan.arbitr.ru'},
    { id: 25, name: 'Курская область', website: 'https://kursk.arbitr.ru/', phoneNumber: '+7 (4712) 53-69-36, (4712) 58-49-22 (тел. доверия)', adress: '305004 Курск, ул. К.Маркса, 25', fax: '+7 (4712) 58-04-32', email: 'info@kursk.arbitr.ru'},
    { id: 26, name: 'Липецкая область', website: 'https://lipetsk.arbitr.ru/', phoneNumber: '+7 (4742) 20-20-73, (4742) 51-96-55 (приемная председателя суда), (4742) 51-96-06 (канцелярии суда)', adress: '398019, Липецк, пл. Петра Великого д. 7', fax: '-', email: 'info@lipetsk.arbitr.ru'},
    { id: 27, name: 'Магаданская область', website: 'https://magadan.arbitr.ru/', phoneNumber: '+7 (4132) 65-03-80', adress: '685000 Магадан, просп. К.Маркса, 62', fax: '+7 (4132) 65-03-80', email: 'info@magadan.arbitr.ru'},
    { id: 28, name: 'Москва', website: 'https://msk.arbitr.ru/', phoneNumber: '+7 (495) 600-96-96, (495) 600-96-98 (тел. доверия)', adress: '115225 Москва, ул. Большая Тульская, д. 17', fax: '-', email: 'info@msk.arbitr.ru'},
    { id: 29, name: 'Московская область', website: 'https://asmo.arbitr.ru/', phoneNumber: '+7 (499) 975-29-46, 8 (499) 975-20-51 (справочная), (499) 975-20-90, (499) 975-20-93 (ознакомление с материалами дел)', adress: '107053 Москва, пр. Академика Сахарова 18', fax: '+7 (499) 975-13-83', email: 'info@asmo.arbitr.ru'},
    { id: 30, name: 'Мурманская область', website: 'https://murmansk.arbitr.ru/', phoneNumber: '+7 (8152) 45-36-18, (8152) 44-45-86 (тел. доверия)', adress: '183049 Мурманск, ул. Книповича, 20', fax: '+7 (8152) 44-26-51', email: 'murmansk.info@arbitr.ru'},
    { id: 31, name: 'Нижегородская область', website: 'https://nnov.arbitr.ru/', phoneNumber: '+7 (831) 439-10-40,  (831) 439-15-70', adress: '603082 Нижний Новгород, Кремль, корп. 9', fax: '+7 (831) 439-15-38', email: 'info@nnov.arbitr.ru'},
    { id: 32, name: 'Новгородская область', website: 'https://novgorod.arbitr.ru/', phoneNumber: '+7 (816-2) 94-51-35, (8162) 94-51-11 (тел. доверия)', adress: '173020 Великий Новгород, ул. Большая Московская, 73', fax: '+7 (816-2) 94-50-88', email: 'info@novgorod.arbitr.ru'},
    { id: 33, name: 'Новосибирская область', website: 'https://novosib.arbitr.ru/', phoneNumber: '+7 (383) 269-69-90, (383) 269-69-91', adress: '630102 Новосибирск, ул. Нижегородская, 6', fax: '+7 (383) 269-68-80', email: 'info@novosib.arbitr.ru'},
    { id: 34, name: 'Омская область', website: 'https://omsk.arbitr.ru/', phoneNumber: '+7 (3812) 31-56-51', adress: '644024 Омск ул. Учебная, 51', fax: '+7 (3812) 53-02-05', email: 'info@omsk.arbitr.ru'},
    { id: 35, name: 'Оренбургская область', website: 'https://orenburg.arbitr.ru/', phoneNumber: '+7 (3532)45-01-93, (3532) 45-30-33, (3532)45-22-64 (тел. доверия)', adress: '460000, г. Оренбург, ул. Краснознаменная, д.56', fax: '+7 (3532) 45-22-58, 45-25-33', email: 'info@orenburg.arbitr.ru, orenburg.info@arbitr.ru'},
    { id: 36, name: 'Орловская область', website: 'https://orel.arbitr.ru/', phoneNumber: '+7 (4862) 43-24-44', adress: '302000 Орел, ул. М.Горького, 42', fax: '+7 (4862) 43-24-66', email: 'info@orel.arbitr.ru'},
    { id: 37, name: 'Пензенская область', website: 'https://penza.arbitr.ru/', phoneNumber: '+7 (8412) 52-99-09', adress: '440000, Пенза, ул. Кирова, 35/39', fax: '+7 (8412) 56-11-93', email: 'penza.info@arbitr.ru'},
    { id: 38, name: 'Пермский край', website: 'https://perm.arbitr.ru/', phoneNumber: '+7 (342) 217-50-00 (справочная информация)', adress: '614068 г. Пермь ул. Екатерининская, 177', fax: '+7 (342) 236-80-02', email: 'info@perm.arbitr.ru'},
    { id: 39, name: 'Приморский край', website: 'https://primkray.arbitr.ru/', phoneNumber: '+7 (423) 221-53-76, (423) 221-54-05', adress: '690091, г. Владивосток, ул. Светланская, 54', fax: '+7 (423) 226-62-81', email: 'info@primkray.arbitr.ru'},
    { id: 40, name: 'Псковская область', website: 'https://pskov.arbitr.ru/', phoneNumber: '+7 (8112) 75-29-62', adress: '180000 г. Псков, ул. Свердлова 36', fax: '+7 (8112) 72-14-30', email: 'info@pskov.arbitr.ru'},
    { id: 41, name: 'Республика Адыгея', website: 'https://adyg.arbitr.ru/', phoneNumber: '+7 (8772) 52-63-34', adress: '385000 Майкоп, ул. Краснооктябрьская, 15', fax: '+7 (8772) 52-76-80', email: 'info@adyg.arbitr.ru'},
    { id: 42, name: 'Республика Алтай', website: 'https://altai.arbitr.ru/', phoneNumber: '+7 (38822) 4-77-03', adress: '649000 Республика Алтай, г.Горно-Алтайск ул. Ленкина,4', fax: '+7 (38822) 4-77-10', email: 'info@altai.arbitr.ru (предназначен для непроцессуальных документов)'},
    { id: 43, name: 'Республика Башкортостан', website: 'https://ufa.arbitr.ru/', phoneNumber: '+7 (347) 222-92-05', adress: '450057 Уфа, ул. Октябрьской Революции, 63а', fax: '+7 (347) 272-27-40', email: ' a07.info@arbitr.ru'},
    { id: 44, name: 'Республика Бурятия', website: 'https://buryatia.arbitr.ru/', phoneNumber: '+7 (3012) 28-65-02, +7 (3012) 28-65-28 (телефоны справочной службы)', adress: '670000 Улан-Удэ, ул. Коммунистическая 52', fax: '+7 (3012) 21-60-23 (канцелярия)', email: 'buryatia.info@arbitr.ru'},
    { id: 45, name: 'Республика Дагестан', website: 'https://mahachkala.arbitr.ru/', phoneNumber: '+7 (8722) 69-49-68', adress: '367009 г. Махачкала, ул. Керимова 7', fax: '+7 (8722) 69-49-67', email: 'asrd@yandex.ru, info@mahachkala.arbitr.ru'},
    { id: 46, name: 'Республика Донецкая Народная', website: '-', phoneNumber: '+7 (949) 294-52-05', adress: '83052, г. Донецк, ул. 50 Гвардейской дивизии 17', fax: '-', email: 'asdnr@supcourt-dpr.su'},
    { id: 47, name: 'Республика Ингушетия', website: 'https://ingushetia.arbitr.ru/', phoneNumber: '+7 (8732) 22-40-73, (8732)22-40-57, (8732)22-40-77, (8732)22-42-71, (8732)22-71-07', adress: '386101 Назрань, просп. им. Идриса Базоркина, 44', fax: '+7 (8732)22-40-80', email: 'ingushetia.info@arbitr.ru'},
    { id: 48, name: 'Республика Кабардино-Балкария', website: 'https://askb.arbitr.ru/', phoneNumber: '+7 (8662) 44-02-23, (8662) 77-31-96 (Приемная председателя)', adress: '360022, г. Нальчик, ул. Мечникова, 130а', fax: '+7 (8662) 44-02-23', email: 'mail@askb.arbitr.ru'},
    { id: 49, name: 'Республика Калмыкия', website: 'https://kalmyk.arbitr.ru/', phoneNumber: '+7 (84722) 4-17-17, 3-31-66, 4-17-28 (Тел. доверия)', adress: '358000, Элиста, ул. Сусеева,10', fax: '+7 (84722) 4-17-20', email: 'info@kalmyk.arbitr.ru'},
    { id: 50, name: 'Республика Карачаево-Черкесия', website: 'https://askchr.arbitr.ru/', phoneNumber: '+7 (8782) 26-36-39', adress: '369000 Черкесск, Ленина пр., д.9', fax: '+7 (8782) 26-36-39', email: 'info@askchr.arbitr.ru'},
    { id: 51, name: 'Республика Карелия', website: 'https://karelia.arbitr.ru/', phoneNumber: '+7 (8142) 79-05-90/91 (справочная служба); (8142) 79-05-09 (приемная)', adress: '185910 Петрозаводск, ул. Красноармейская, 24а', fax: '+7 (8142) 79-06-25', email: 'info@karelia.arbitr.ru'},
    { id: 52, name: 'Республика Коми', website: 'https://komi.arbitr.ru/', phoneNumber: '+7 (8212) 30-08-00, (8212) 30-08-65 (тел. доверия)', adress: '167983 Сыктывкар, ул. Орджоникидзе, д.49а', fax: '+7 (8212) 30-08-10', email: 'info@komi.arbitr.ru'},
    { id: 53, name: 'Республика Крым', website: 'https://crimea.arbitr.ru/', phoneNumber: '+7 (3652) 77-38-87, (3652) 55-01-01, (3652) 55-01-13', adress: '295000 Симферополь, ул. Александра Невского, д. 29/11', fax: '+7 (3652) 55-01-55', email: 'info@crimea.arbitr.ru'},
    { id: 54, name: 'Республика Луганская Народная', website: 'https://arbitrazhniy.sudlnr.ru', phoneNumber: '+38 (0642) 50-22-95 (секретариат), +38 (0642) 50-14-48 (приемная председателя)', adress: '91016, г. Луганск, Луганская Народная Республика, ул. Советская, 38', fax: '-', email: 'arbitrsudlnr@mail.ru'},
    { id: 55, name: 'Республика Марий Эл', website: 'https://mari-el.arbitr.ru/', phoneNumber: '+7 (8362) 69-33-42', adress: '424002 Йошкар-Ола, Ленинский просп., 40', fax: '+7 (8362) 69-33-00 (приемная); (8362) 69-33-64 (тел. доверия)', email: 'mari-el.info@arbitr.ru'},
    { id: 56, name: 'Республика Мордовия', website: 'https://asrm.arbitr.ru/', phoneNumber: '+7 (8342) 24-08-83', adress: '430030 Саранск, ул. Полежаева, 177', fax: '+7 (8342) 29-28-91', email: 'info@asrm.arbitr.ru'},
    { id: 57, name: 'Республика Саха (Якутия)', website: 'https://yakutsk.arbitr.ru/', phoneNumber: '+7 (4112) 34-05-80', adress: '677980 Якутск, ул. Курашова, 28', fax: '+7 (4112) 42-05-32', email: 'info@yakutsk.arbitr.ru'},
    { id: 58, name: 'Республика Северная Осетия - Алания', website: 'https://alania.arbitr.ru/', phoneNumber: '+7 (8672) 53-71-17, (8672) 53-04-24 (тел. доверия)', adress: '362040 Владикавказ, пл. Свободы, 5', fax: '+7 (8672) 53-95-38', email: 'info@alania.arbitr.ru'},
    { id: 59, name: 'Республика Татарстан', website: 'https://tatarstan.arbitr.ru/', phoneNumber: '+7 (843) 533-50-00 (Автосекретарь), (843) 533-50-51, 533-50-52 (Отдел делопроизводства)', adress: '420107 Казань, ул.Ново-Песочная, д.40', fax: '-', email: 'info@tatarstan.arbitr.ru'},
    { id: 60, name: 'Республика Тыва', website: 'https://tyva.arbitr.ru/', phoneNumber: '+7 (39422) 2-11-97, (39422) 2-31-72, 9-65-01 (приемная), (39422) 2-31-72, (39422) 9-65-02 (для справок)', adress: '667000 Кызыл, ул. Кочетова, 91', fax: '+7 (39422) 2-11-96', email: 'info@tyva.arbitr.ru'},
    { id: 61, name: 'Республика Хакасия', website: 'https://khakasia.arbitr.ru/', phoneNumber: '+7 (3902) 29-95-00, (3902) 29-95-02', adress: '655017 Абакан, ул. Крылова, 74', fax: '+7 (3902) 28-81-55', email: 'info@khakasia.arbitr.ru'},
    { id: 62, name: 'Ростовская область', website: 'https://rostov.arbitr.ru/', phoneNumber: '+7 (863) 282-84-44, (863) 282-84-50 (тел. доверия), (863) 282-84-48 (канцелярия), (863) 282-84-99 (приемная)', adress: '344002 Ростов-на-Дону, ул. Станиславского, 8а', fax: '-', email: 'info@rostov.arbitr.ru'},
    { id: 63, name: 'Рязанская область', website: 'https://ryazan.arbitr.ru/', phoneNumber: '+7 (4912) 20-95-00, (4912) 20-96-00 (тел. для справок по суд. делам), (4912) 20-95-15 (тел. доверия)', adress: '390000 Рязань, ул. Почтовая, 43/44', fax: '+7 (4912) 27-51-08', email: 'info@ryazan.arbitr.ru'},
    { id: 64, name: 'Самарская область', website: 'https://samara.arbitr.ru/', phoneNumber: '+7  (846) 226-56-17, (846) 207-55-15', adress: '443045 г. Самара, ул. Авроры, 148', fax: '+7 (846) 226-55-78', email: 'info@samara.arbitr.ru'},
    { id: 65, name: 'Санкт-Петербург и Ленинградская область', website: 'https://spb.arbitr.ru/', phoneNumber: '+7 (812) 643-48-18', adress: '191015, Санкт-Петербург, Суворовский проспект д.50-52', fax: '+7 (812) 643-48-18', email: 'a56.info@arbitr.ru'},
    { id: 66, name: 'Саратовская область', website: 'https://saratov.arbitr.ru/', phoneNumber: '+7 (8452) 98-39-39, (8452) 98-39-00', adress: '410002, г. Саратов, ул. Бабушкин Взвоз, д. 1', fax: '+7 (8452) 98-39-57', email: 'info@saratov.arbitr.ru'},
    { id: 67, name: 'Сахалинская область', website: 'https://sakhalin.arbitr.ru/', phoneNumber: '+7 (4242) 46-09-45(канцелярия), (4242) 46-09-67 (тел. доверия)', adress: '693000, г.Южно-Сахалинск, пр.Коммунистический, 28', fax: '+7 (4242) 46-09-52', email: 'info@sakhalin.arbitr.ru'},
    { id: 68, name: 'Севастополь', website: 'https://sevastopol.arbitr.ru/', phoneNumber: '+7 (8692) 54-34-91', adress: '299011 Севастополь, ул. Л. Павличенко, 5', fax: '+7 (8692) 54-34-91', email: 'info@sevastopol.arbitr.ru'},
    { id: 69, name: 'Свердловская область', website: 'https://ekaterinburg.arbitr.ru/', phoneNumber: '+7 (343) 298-00-07, (343) 376-10-76 (справочная), (343) 371-38-32 (тел. доверия)', adress: '620075 Екатеринбург, ул. Шарташская, 4', fax: '+7 (343) 371-40-50', email: 'info@ekaterinburg.arbitr.ru'},
    { id: 70, name: 'Смоленская область', website: 'https://smolensk.arbitr.ru/', phoneNumber: '+7 (4812) 24-47-71, (4812) 24-47-72', adress: '214001 г.Смоленск, улица Большая Советская, 30/11', fax: '+7 (4812) 61-04-16', email: 'info@smolensk.arbitr.ru'},
    { id: 71, name: 'Ставропольский край', website: 'https://stavropol.arbitr.ru/', phoneNumber: '+7 (8652) 20-54-22 (справочная), (8652) 71-39-06 (тел. доверия)', adress: '355000 Ставрополь, ул. Мира, 458б', fax: '+7 (8652) 71-40-60', email: 'info@stavropol.arbitr.ru'},
    { id: 72, name: 'Тамбовская область', website: 'https://tambov.arbitr.ru/', phoneNumber: '+7 (4752) 47-70-14 (приемная), (4752) 47-70-55 (канцелярия)', adress: '392020 Тамбов, ул. Пензенская, 67/12', fax: '+7 (4752) 47-70-10', email: 'tambov.info@arbitr.ru'},
    { id: 73, name: 'Тверская область', website: 'https://tver.arbitr.ru/', phoneNumber: '+7 (4822) 39-02-76 (справочная), (4822) 39-02-94 (канцелярия)', adress: '170100 Тверь, ул. Советская, 23', fax: '+7 (4822) 390-275', email: 'sud@arbitr.tver.ru'},
    { id: 74, name: 'Томская область', website: 'https://tomsk.arbitr.ru/', phoneNumber: '+7 (3822) 28-40-83 (справочная), (3822) 28-41-17 (тел. доверия), (382-2) 28-40-00 (приемная)', adress: '634050 Томск, пр. Кирова, 10', fax: '+7 (382-2) 28-40-77', email: 'info@tomsk.arbitr.ru'},
    { id: 75, name: 'Тульская область', website: 'https://tula.arbitr.ru/', phoneNumber: '+7 (4872) 25-08-00 (справочная), (4872) 25-03-57 (тел. доверия)', adress: '300041 Тула, Красноармейский проспект, д. 5', fax: '(4872) 25-08-00', email: 'a68.info@arbitr.ru'},
    { id: 76, name: 'Тюменская область', website: 'https://tumen.arbitr.ru/', phoneNumber: '+7 (3452) 25-81-13', adress: '625052 Тюмень, ул. Хохрякова, 77', fax: '+7 (3452) 45-02-07', email: 'info@tumen.arbitr.ru'},
    { id: 77, name: 'Удмуртская Республика', website: 'https://udmurtiya.arbitr.ru/', phoneNumber: '+7 (3412) 602-620 (приемная председателя), (3412) 602-643', adress: '426011 Ижевск, ул. Ломоносова, 5', fax: '+7 (3412) 602-628', email: 'info@udmurtiya.arbitr.ru'},
    { id: 78, name: 'Ульяновская область', website: 'https://ulyanovsk.arbitr.ru/', phoneNumber: '+7 (8422) 33-46-08, (8422) 33-46-09', adress: '432970, Ульяновск, ул. Железнодорожная, 14', fax: '+7 (8422) 32-54-54', email: 'info@ulyanovsk.arbitr.ru'},
    { id: 79, name: 'Хабаровский край', website: 'https://khabarovsk.arbitr.ru/', phoneNumber: '+7 (4212) 91-08-31, (4212) 91-08-27', adress: '680030 Хабаровск, ул. Ленина, 37', fax: '+7 (4212) 91-08-26', email: 'info@khabarovsk.arbitr.ru'},
    { id: 80, name: 'Ханты-Мансийский автономный округ', website: 'https://hmao.arbitr.ru/', phoneNumber: '+7 (3467) 95-88-71 (справочная служба), (3467) 95-88-04 (секретариат председателя суда)', adress: '628011 г. Ханты-Мансийск, ул. Мира, 27', fax: '-', email: 'hmao.info@arbitr.ru'},
    { id: 81, name: 'Херсонская область', website: '-', phoneNumber: '', adress: '275500, Херсонская Область, м.о. Генический, г. Геническ, ул. Братьев Коваленко, д. 66', fax: '-', email: 'a88.info@arbitr.ru'},
    { id: 82, name: 'Челябинская область', website: 'https://chel.arbitr.ru/', phoneNumber: '+7 (351) 225-03-19 (справочная), (351) 266-34-44 (тел. доверия)', adress: '454091 Челябинск, ул. Воровского, 2', fax: '+7 (351) 266-72-10', email: 'info@chel.arbitr.ru'},
    { id: 83, name: 'Чеченская Республика', website: 'https://chechnya.arbitr.ru/', phoneNumber: '+7 (8712) 22-26-32, (8712) 22-39-15 (тел. доверия)', adress: '364024 Грозный, ул. имени Шейха Али Митаева, д 22 Б', fax: '+7 (8712) 22-28-07', email: 'info@chechnya.arbitr.ru'},
    { id: 84, name: 'Чувашская Республика', website: 'https://chuvashia.arbitr.ru/', phoneNumber: '+7 (8352) 62-40-30 (приемная председателя), (8352) 24-01-98, (8352) 24-01-80, (8352) 24-01-61 (канцелярия)', adress: '428000 Чебоксары, просп. Ленина, 4', fax: '+7 (8352) 62-54-00', email: 'chuvashia.info@arbitr.ru'},
    { id: 85, name: 'Чукотский автономный округ', website: 'https://chukotka.arbitr.ru/', phoneNumber: '+7 (42722) 6-96-00', adress: '689000 Чукотский АО, Анадырь, ул. Ленина, 9а', fax: '+7 (42722) 2-29-69', email: 'info@chukotka.arbitr.ru'},
    { id: 86, name: 'Ямало-Ненецкий автономный округ', website: 'https://yamal.arbitr.ru/', phoneNumber: '+7 (34922) 5-31-77, (34922) 5-31-00 (тел. доверия)', adress: '629008, г. Салехард, ул. Республики, д. 102', fax: '+7 (34922) 5-31-53', email: 'info@yamal.arbitr.ru'},
    { id: 87, name: 'Ярославская область', website: 'https://yaroslavl.arbitr.ru/', phoneNumber: '+7 (4852) 28-11-82, (4852) 28-12-12 (справочная)', adress: '150999 Ярославль, просп. Ленина, 28', fax: '+7 (4852) 32-12-51', email: 'info@yaroslavl.arbitr.ru, dela@yaroslavl.arbitr.ru '},

  ];

  const [openShips, setOpenShips] = useState([]);
  const [searchQuery, setSearchQuery] = useState(query || '');
  const [isBackground1, setIsBackground1] = useState(true);
  const [buttonClasses, setButtonClasses] = useState({});



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

    // Обновляем класс фона только для выбранного судна
    setButtonClasses(prevClasses => ({
      ...prevClasses,
      [shipId]: !prevClasses[shipId] || prevClasses[shipId] === 'background1' ? 'background2' : 'background1'
    }));
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
    <main className="main">
    <div className="ship-list">
      <div className="ship-list__ships">
        {searchedShips.map((ship) => (
          <div key={ship.id} id={ship.id} className="ship-list__ship">
            <span>{ship.name}</span>

            {openShips.includes(ship.id) && (
              <div className="ship-list__details">
                <p><strong>Ссылка на сайт:</strong> <a href={ship.website}>{ship.website}</a></p>
                <p><strong>Номер телефона:</strong> {ship.phoneNumber}</p>
                <p><strong>Факс:</strong> {ship.fax}</p>
                <p><strong>Адрес:</strong> {ship.adress}</p>
                <p><strong>E-mail:</strong> {ship.email}</p>
                {/* Другие детали о суде */}
              </div>
            )}
            <button onClick={() => handleShipClick(ship.id)} className={buttonClasses[ship.id] || 'background1'}></button>
          </div>
        ))}
      </div>
      <div className="ship-list__alphabet">
  {['А', 'Б', 'В', 'Е', 'З', 'И', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Х', 'Я'].map((letter, index) => (
    <button key={index} onClick={() => handleAlphabetClick(letter)}>{letter}</button>
  ))}
</div>

      <form className='form'>
          <label htmlFor="header-search">
              <span className="visually-hidden">Поиск арбитражных судов  </span>
          </label>
          <input
              value={searchQuery}
              onInput={e => setSearchQuery(e.target.value)}
              type="text"
              id="header-search"
              placeholder="Введите название субъекта"
              name="s"
          />
      </form>
    </div>
    </main>
    <Footer/>
    </>
  );
};

export default Adress;