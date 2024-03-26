import React from "react";
import "./Main.css";
import Promo from "../Promo/Promo";
import AboutProject from "../About/About";
import Techs from "../Tech/Tech";
import Usefull from "../AboutMe/Usefull"
import Header from "../Header/Header";
import Footer from "../Footer/Footer";


function Main(props) {
  return (
    <>
      <Header loggedIn={props.loggedIn} theme={"header_theme_light"}/>
      <main className="main">
        <Promo/>
        <AboutProject/>
        <Techs/>
        <Usefull/>
      </main>
      <Footer/>
    </>
  );
}

export default Main;