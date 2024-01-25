import React from 'react';
import './FilterCheckbox.css'

export default function FilterCheckbox() {
  return (
    <label for="short-movies" class="filter-checkbox">
      <input type="checkbox" name="short-movies-options" class="filter-checkbox__invisible-checkbox"
        id="short-movies" value="short-movies"/>
      <span class="filter-checkbox__visible-checkbox"></span>
      <span class="filter-checkbox__text">Короткометражки</span>
    </label>
  )
}
