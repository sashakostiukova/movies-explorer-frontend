import React from 'react';
import Header from '../Header/Header';
import './Main.css';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Footer from '../Footer/Footer';

function Main({onNavigationSidebar}) {
  return (
  <>
  <Header onNavigationSidebar={onNavigationSidebar} />
  
  <main>
    <Promo />
    <AboutProject />
    <Techs />
    <AboutMe />
    <Portfolio />
  </main>
  
  <Footer />

  </>
  );
}

export default Main;