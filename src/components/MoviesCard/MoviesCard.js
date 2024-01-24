import React from 'react';
import './MoviesCard.css'

export default function MoviesCard({ src, title, duration}) {
  return (
    <li className="movies-card">
      <img className="movies-card__img" src={src} alt={title} />
      <div className="movies-card__caption-block">
        <h3 className="movies-card__title">{title}</h3>
        <p className="movies-card__duration">{duration}</p>
      </div>
      
      <button className="movies-card__button movies-card__save-button" type="button" aria-label="Кнопка сохранения фильма">
        <span className="movies-card__button-text ">Сохранить</span>
      </button>

      <button className="movies-card__button movies-card__delete-button block_none" type="button" aria-label="Кнопка удаления фильма" />
      <button className="movies-card__button movies-card__saved-button block_none" type="button" aria-label="Кнопка отменить сохранения фильма" />
    </li>
  )
}
