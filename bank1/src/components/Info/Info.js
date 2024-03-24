import React from "react";
import "./Info.css";
import InfoComponents from "../InfoComponents/InfoComponents";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Info(props) {
  return (
    <>
      <Header theme={"header_theme_light"}/>
      <main className="main">
        <InfoComponents/>
      </main>
      <Footer/>
    </>
  );
}

export default Info;