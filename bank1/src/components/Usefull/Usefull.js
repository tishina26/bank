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
                <li className="usefull_li">через суд;</li>
                <li className="usefull_li">во внесудебном порядке.</li>
                <div className="usefull__table">
                  <div className="table_col1">
                    <p className="table__text"><b>Условия</b></p>
                    <p className="table__text">Куда обращаться?</p>
                    <p className="table__text">Расходы должника</p>
                    <p className="table__text">Ограничение по сумме долгов</p>
                    <p className="table__text">Постановление об окончании исполнительного производства</p>
                    <p className="table__text">Длительность</p>
                  </div>
                  <div className="table_col1">
                  <p className="table__text"><b>ч/з суд</b></p>
                    <p className="table__text">Арбитражный суд</p>
                    <p className="table__text">300 р. - госпошлина, 25-75 тыс. - вознаграждение арбитражного управляющего, а также доп. расходы</p>
                    <p className="table__text">Нет</p>
                    <p className="table__text">Не требуется</p>
                    <p className="table__text">От нескольких месяцев до несокльикх лет</p>
                  </div>
                  <div className="table_col1">
                  <p className="table__text"><b>ч/з МФЦ</b></p>
                  <p className="table__text">МФЦ</p>
                    <p className="table__text">Бесплатно</p>
                    <p className="table__text">от 25 тыс до 1 млн рублей</p>
                    <p className="table__text">Требуется</p>
                    <p className="table__text">6 месяцев</p>
                  </div>
                </div>
                <h2 className="about-project__header">Судебный порядок признания гражданина банкротом</h2>

                <p className="usefull_t">Требования к потенциальному банкроту:</p>
                <li className="usefull_li">Сумма долга свыше 500 тыс. руб.</li>
                <li className="usefull_li">Его долги не были погашены в течение 3-х месяцев с той даты, когда он узнал, что эти долги имеются </li>


                <p className="">Когда физическое лицо (далее – ФЛ) ОБЯЗАНО признать себя банкротом:</p>
                <li className="usefull_li">Удовлетворение требований одного или нескольких кредиторов (то есть организаций/людей/компаний, которым должно ФЛ) приводит к невозможности исполнения им денежных обязательств (Например, если у ФЛ есть несколько кредитов или займов, и он решает погасить один из них полностью, то у него может не остаться достаточно средств на оплату других долгов)</li>
                <p>ИЛИ</p>
                <li className="usefull_li">Обязанности по уплате обязательных платежей (далее - обязательства) в полном объеме перед другими кредиторами и общий размер таких обязательств - не менее 500 тыс. Руб. (в общем, вы должны более 500к своим кредиторам, не важно, одному или всем вместе) </li>


                <p className="">Когда ФЛ ИМЕЕТ ПРАВО признать себя банкротом (не обязано, но может, если захочет):</p>
                <li className="usefull_li">В случае предвидения своего банкротства при наличии обстоятельств, очевидно свидетельствующих о том, что он не в состоянии исполнить обязательства в установленный срок;</li>
                <p>ИЛИ</p>
                <li className="usefull_li">ФЛ отвечает признакам неплатежеспособности или недостаточности имущества. </li>
                <p>(!) Размер неисполненных обязательств в этом случае значения не имеет </p>
            </div>

      </div>
    </section>
    </div>
  );
}

export default Usefull;