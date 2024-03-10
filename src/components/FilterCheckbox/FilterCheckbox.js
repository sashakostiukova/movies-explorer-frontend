import React from 'react';
import { useLocation } from 'react-router';
import './FilterCheckbox.css'

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export default function FilterCheckbox({ onChange }) {

  const location = useLocation();
  const userContext = React.useContext(CurrentUserContext);

  return (
    <label htmlFor="short-movies" className="filter-checkbox">
      <input type="checkbox" name="short-movies-options" className="filter-checkbox__invisible-checkbox"
        onChange={onChange} id="short-movies" 
        checked={location.pathname === '/movies' ?
         userContext.isCheckboxChecked ? true : false
         : userContext.isSavedMoviesCheckboxChecked ? true : false
        }
        />
      {location.pathname === '/movies' && 
        <span className={`filter-checkbox__visible-checkbox ${userContext.isCheckboxChecked ? `filter-checkbox__cheked` : ``}`}></span>
      }
      {location.pathname === '/saved-movies' && 
        <span className={`filter-checkbox__visible-checkbox ${userContext.isSavedMoviesCheckboxChecked ? `filter-checkbox__cheked` : ``}`}></span>
      }
      <span className="filter-checkbox__text">Короткометражки</span>
    </label>
  )
}
