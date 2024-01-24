import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <h2 className="footer__header">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h2>

      <div className="footer__line"></div>

      <div className="footer__bottom-section">
        <p className="footer__copyright">© 2023</p>
        <nav className="footer__nav">
          <ul className="footer__links-list">
            <li className="footer__list-item">
              <a className="footer__link link-transition" target="_blank" rel="noopener noreferrer" href="https://practicum.yandex.ru/">Яндекс.Практикум</a>
            </li>
            <li className="footer__list-item">
              <a className="footer__link link-transition" target="_blank" rel="noopener noreferrer" href="https://github.com/">Github</a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer; 