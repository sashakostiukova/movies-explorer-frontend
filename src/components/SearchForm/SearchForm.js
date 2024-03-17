import React from 'react';
import { useLocation } from 'react-router';
import  MediaQuery  from 'react-responsive';
import './SearchForm.css';
import loupeIcon from '../../images/loupe-icon.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { AppContext } from '../../contexts/AppContext';

export default function SearchForm({ handleCheckboxChange, onSearch }) {
  const location = useLocation();

  const UserContext = React.useContext(CurrentUserContext);
  const CurrentAppContext = React.useContext(AppContext);

  const [ keyword, setKeyword ] = React.useState('');
  const [ isKeyword, setIsKeyword ] = React.useState(true);

  React.useEffect(() => {
    if(location.pathname === '/movies') {
      const keyword = localStorage.getItem('keyword');
      if(keyword) {
        setKeyword(keyword);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  React.useEffect(() => {
    if(location.pathname === '/saved-movies') {
      onSearch(keyword)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[UserContext.isSavedMoviesCheckboxChecked]);

  function handleChange(e) {
    setKeyword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if(keyword) {
      setIsKeyword(true);
      onSearch(keyword);
    } else {
      setIsKeyword(false);
    }
  }

  return (
    <form className="search-form"  onSubmit={handleSubmit}>
      <div className="search-form__wrapper">

        <div className="search-form__input-block">
          <img className="search-form__loupe-icon" src={loupeIcon} alt="иконка лупы" />
          <input className="search-form__input" name="keyword" type="text"
            placeholder='Фильм' value={keyword}
            onChange={handleChange}
          />
          <button 
            className={`search-form__submit-button button-transition ${CurrentAppContext.isLoading && `button_disabled`}`}
            type="submit"
            disabled={CurrentAppContext.isLoading}>Найти</button>
        </div>

        <div className="search-form__line" />

        <MediaQuery minWidth={681}>
          <div className="filter-checkbox-inside-input">
            <FilterCheckbox onChange={handleCheckboxChange} />
          </div>
        </MediaQuery>

      </div>

      {!isKeyword && <span className="search-form__error">Нужно ввести ключевое слово</span>}
      
      <MediaQuery maxWidth={680}>
        <div className="filter-checkbox-outside-input">
            <FilterCheckbox onChange={handleCheckboxChange}/>
        </div>
      </MediaQuery>

    </form>
  )
}