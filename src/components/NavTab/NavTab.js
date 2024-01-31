import React from 'react';
import './NavTab.css';

export default function NavTab() {
  return (
    <nav className="navtab">
      <ul className="navtab__links-list">
        <li className="navtab__list-item">
          <a className="navtab__link link-transition" href="#about-project">О проекте</a>
        </li>
        <li className="navtab__list-item">
          <a className="navtab__link link-transition" href="#techs">Технологии</a>
        </li>
        <li className="navtab__list-item">
          <a className="navtab__link link-transition" href="#about-me">Студент</a>
        </li>
      </ul>
    </nav>
  )
}
