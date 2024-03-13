import React from 'react';
import './MoviesCard.css'
import { useLocation } from 'react-router';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export default function MoviesCard({ movie, src, title, duration, onMovieClick }) {

  const userContext = React.useContext(CurrentUserContext);
  const location = useLocation();

  const isLiked = userContext.savedMovies.some(i => i.movieId === movie.id)

  function handleMovieButtonClick() {
    onMovieClick(movie);
    movie.isLiked = !movie.isLiked
  };

  return (

    <li className="movies-card">
      <img className="movies-card__img" src={src} alt={title} />
      <div className="movies-card__caption-block">
        <h3 className="movies-card__title">{title}</h3>
        <p className="movies-card__duration">{duration}</p>
      </div>

      {location.pathname === '/movies' && !isLiked &&
        <button className="movies-card__button movies-card__save-button" type="button" aria-label="Кнопка сохранения фильма"
          onClick={handleMovieButtonClick}>
          <span className="movies-card__button-text ">Сохранить</span>
        </button>
      }

      {location.pathname === '/movies' && isLiked &&
        <button className="movies-card__button movies-card__saved-button" type="button" aria-label="Кнопка отменить сохранения фильма" 
          onClick={handleMovieButtonClick} />
      }

      {location.pathname === '/saved-movies' &&
        <button className="movies-card__button movies-card__delete-button" type="button" aria-label="Кнопка удаления фильма"
          onClick={handleMovieButtonClick} />
      }

    </li>
    
  )
}
