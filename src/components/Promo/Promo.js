import React from 'react';
import './Promo.css';
import NavTab from '../NavTab/NavTab';

function Promo() {
  return (
    <section className="promo">
      <div className="promo__hero">
        <h1 className="promo__header">Учебный проект студента факультета <nobr>Веб-разработки</nobr>.</h1>
      </div>
      
      <NavTab />
    </section>
  );
}

export default Promo;