import React from 'react';
import './Portfolio.css';
import arrowIcon from '../../images/portfolio-arrow-icon.svg';

export default function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__header">Портфолио</h3>

      <nav className="portfolio__nav">
        <ul className="portfolio__links-list">

          <li className="portfolio__list-item">
            <a className="portfolio__link link-transition" target="_blank" rel="noopener noreferrer"
              href="https://github.com/sashakostiukova/how-to-learn">Статичный сайт
              <img className="portfolio__link-icon" alt="иконка стрелочки" src={arrowIcon} />
            </a>
            <div className="portfolio__nav-line" />
          </li>

          <li className="portfolio__list-item">
            <a className="portfolio__link link-transition" target="_blank" rel="noopener noreferrer"
              href="https://github.com/sashakostiukova/russian-travel">Адаптивный сайт
              <img className="portfolio__link-icon" alt="иконка стрелочки" src={arrowIcon} />
            </a>
            <div className="portfolio__nav-line" />
          </li>

          <li className="portfolio__list-item">
            <a className="portfolio__link link-transition" target="_blank" rel="noopener noreferrer"
              href="https://github.com/sashakostiukova/react-mesto-api-full-gha">Одностраничное приложение
              <img className="portfolio__link-icon" alt="иконка стрелочки" src={arrowIcon} />
            </a>
          </li>

        </ul>
      </nav>
    </section>
  )
}
