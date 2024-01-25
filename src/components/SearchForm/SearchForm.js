import React from 'react';
import './SearchForm.css';
import loupeIcon from '../../images/loupe-icon.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

export default function SearchForm() {
  return (
    <form className="search-form">
    <div className="search-form__wrapper">
      <div className="search-form__input-block">
        <img className="search-form__loupe-icon" src={loupeIcon} alt="иконка лупы" />
        <input className="search-form__input" type="text" placeholder="Фильм" required />
        <button className="search-form__submit-button button-transition" type="submit">Найти</button>
      </div>

      <div className="search-form__line" />

      <div className="filter-checkbox-inside-input">
        <FilterCheckbox />
      </div>


    </div>

    <div className="filter-checkbox-outside-input">
        <FilterCheckbox />
    </div>
    
  </form>
  )
}
