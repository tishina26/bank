import React from "react";
import "./Usefull.css";
import Header from "../Header/Header";

function Usefull(props) {
  return (
    <div>
    <Header loggedIn={props.loggedIn} theme={"header_theme_dark"} />
    <section className="about-project">
      <div className="about-project__dev">
        <h2 className="about-project__header">Что такое банкротство?</h2>
            <div className="aboutme__container">
                <p className="usefull__text"><b>Банкротство</b> — это процедура, которая помогает законно освободиться от долгов, если нет возможности их выплачивать. Если должник имеет достаточный доход или имущество, но не хочет погашать взятые на себя обязательства, оснований для банкротства нет.</p>
                <p className=""><b>Причиной банкротства</b> может стать сложная жизненная ситуация: болезнь, увольнение, инвалидность, смерть близких. Иногда единственная возможность избавиться от непосильного долгового бремени и начать с чистого листа — оформить банкротство в рамках закона.</p>
                <p className=""><b>Как оформить банкротство?</b></p>
                <p className="usefull__text1">Есть два способа оформить банкротство:</p>
                <li className="usefull_li"><a className='usefull__link' href='#syd'>через суд;</a></li>
                <li className="usefull_li"><a className='usefull__link' href='#vne'>во внесудебном порядке.</a></li>

                <p className=""><b>Последствия банкротства:</b></p>
                <li className="usefull_li">В течение 3 лет нельзя занимать должности в органах управления юридического лица</li>
                <li className="usefull_li">В течение 5 лет нельзя брать кредиты и займы без указания на факт банкротства</li>
                <li className="usefull_li">В течение 5 лет нельзя повторно начать процедуру банкротства</li>
                <li className="usefull_li"> В течение 5 лет нельзя занимать должности в органах управления страховой организации, негосударственного пенсионного фонда, управляющей компании инвестиционного фонда, паевого инвестиционного фонда и негосударственного пенсионного фонда или микрофинансовой компании</li>
                <li className="usefull_li">В течение 10 лет нельзя занимать должности в органах управления кредитной организации</li>
                <p className=""><b>Для ИП:</b></p>
                <li className="usefull_li">Снятие ИП с гос. регистрации и аннулирование выданных лицензий</li>
                <li className="usefull_li">В течение 5 лет нельзя регистрироваться в качестве ИП</li>
                <li className="usefull_li">В течение 5 лет нельзя осуществлять предпринимательскую деятельность</li>

                <h2 className="about-project__header"><a name='syd' id='syd'></a>Судебный порядок признания гражданина банкротом</h2>
                <p className=""><b>Судебный порядок признания банкротом</b> - процедура избавления от долгов через суд.</p>
                <p className=""><b>Условия</b></p>
                <p className="usefull__text1">Судебное банкротство может быть как обязанностью, так и правом</p>

                <div className="usefull__table">
                  <div className="table_col1">
                    <p className="table__text"></p>
                    <p className="table__text">Сумма долга</p>
                    <p className="table__text">Условия</p>
                    <p className="table__text">Сроки подачи</p>
                    <p className="table__text">Средние сроки процедуры</p>
                    <p className="table__text">Стоимость</p>
                  </div>
                  <div className="table_col1">
                  <p className="table__text"><b>Обязанность</b></p>
                    <p className="table__text">более 500 тыс. руб.</p>
                    <p className="table__text">Лицо имеет размер задолженности более 500 тыс. руб. И удовлетворение требований одного (или нескольких) кредиторов сделает невозможным исполнение денежных обязательств в полном объеме перед другими кредиторами.</p>
                    <p className="table__text">Подача заявления в течение 30 дней</p>
                    <p className="table__text">от 6 до 12 месяцев</p>
                    <p className="table__text">Госпошлина: 300 р. Вознаграждение арбитражному управляющему: от 25 до 75 тыс. руб.
</p>
                  </div>
                  <div className="table_col1">
                  <p className="table__text"><b>Право</b></p>
                  <p className="table__text">нет минимума</p>
                    <p className="table__text">Лицо имеет  признаки <b className="text__termin" tooltip='Неплатежеспособность - прекращение исполнения должником части денежных обязательств или обязанностей по уплате обязательных платежей, вызванное недостаточностью денежных средств. При этом недостаточность денежных средств предполагается, если не доказано иное'>неплатежеспособности</b> и (или) недостаточности имущества, не в состоянии исполнять денежные обязательства в установленные сроки</p>
                    <p className="table__text">В любое время, но после просрочки от 3-х месяцев</p>
                    <p className="table__text">?</p>
                    <p className="table__text">?</p>
                  </div>
                </div>

                <p className=""><b>Необходимые документы:</b></p>
                <li className="usefull_li">Личные документы (паспорт, СНИЛС, ИНН)</li>
                <li className="usefull_li">Заявление о признании лица банкротом</li>
                <li className="usefull_li">Документы о семейном положении (например, свидетельство о браке)</li>
                <li className="usefull_li">Документация о финансовом положении заявителя (например, список кредиторов, опись имущества и т.д.)</li>
                <li className="usefull_li">Квитанция об оплате госпошлины</li>
                <li className="usefull_li">Документ о внесении на депозит необходимой суммы</li>

                <p className=""><b>Процедура:</b></p>
                <li className="usefull_li">Сбор необходимых документов</li>
                <li className="usefull_li">Оплата госпошлины и внесение депозита</li>
                <li className="usefull_li">Подача заявления в суд</li>
                <li className="usefull_li">Рассмотрение заявления в срок от 15 дней и до трех месяцев с даты его принятия</li>
                <li className="usefull_li">Вынесение судом определения о признании заявления обоснованным и введении реструктуризации долгов гражданина</li>

                <h2 className="about-project__header"><a name='vne' id='vne'></a>Внесудебное банкротство</h2>
                <p className=""><b>Внесудебное банкротство</b> - это процедура бесплатного банкротства для граждан, введенная в сентябре 2020 года</p>
                <p className=""><b>Условия:</b></p>
                <li className="usefull_li">Долг от 25 тыс. до 1 млн. рублей (без учета пеней и штрафов по налогам и сборам)</li>
                <li className="usefull_li">Одно из сл. обстоятельст</li>
                <li className="usefull_li">На день обращения исполнительное производство завершили из-за отсутствия имущества для взыскания. Иных действующих производств (по истребованию денег), которые возбудили после того, как взыскателю вернули исполнительный документ, тоже нет</li>
                <li className="usefull_li">Основной доход гражданина — пенсия (страховая, накопительная или пр.), а иного имущества для взыскания нет. Исполнительный документ имущественного характера, который выдали не позже чем за год до подачи заявления, предъявляли к исполнению, но последнее не завершено</li>
                <li className="usefull_li">Должник получает ежемесячное пособие в связи с рождением и воспитанием ребенка. Исполнительный документ, который выдали не позже чем за год до подачи заявления, предъявляли к исполнению, но последнее не завершено. Также на день обращения нет имущества для погашения долгов</li>
                <li className="usefull_li">Гражданин не выполнил требования исполнительного документа имущественного характера (или погасил их частично), который выдали не позже чем за 7 лет до даты подачи заявления</li>

                <p className=""><b>Стоимость:</b> бесплатно</p>
                <p className=""><b>Срок:</b> 6 месяцев</p>

                <p className=""><b>Необходимые документы:</b></p>
                <li className="usefull_li">Личные документы (паспорт, СНИЛС, ИНН)</li>
                <li className="usefull_li">Заявление о признании лица банкротом</li>
                <li className="usefull_li">Список кредиторов</li>
                <li className="usefull_li">Постановление об окончании исполнительного производства и исполнительный документ</li>

                <p className=""><b>Процедура:</b></p>
                <li className="usefull_li">Сбор необходимых документов</li>
                <li className="usefull_li">Подача заявления в МФЦ с приложением списка кредиторов</li>
                <li className="usefull_li">Проверка заявления в МФЦ всем требованиям в течение 6 месяцев</li>
                <li className="usefull_li">МФЦ включает в Единый федеральный реестр сведений о банкротстве информацию о завершении процедуры. С этого момента гражданин освобождается от обязательств перед кредиторами в размере суммы, указанной в заявлении</li>





            </div>

      </div>
    </section>
    </div>
  );
}

export default Usefull;