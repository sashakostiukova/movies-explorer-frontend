import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useLocation } from 'react-router';
import './Navigation.css';
import accountIcon from '../../images/account-icon.svg';
import { AppContext } from '../../contexts/AppContext';

export default function Navigation({onNavigationSidebar}) {
  
  const CurrentAppContext = React.useContext(AppContext);

  const location = useLocation();

  return (
    <nav className="navigation">

      <ul className="navigation__links-list">

        {CurrentAppContext.loggedIn ?
          <>
          <li className="navigation__list-item navigation__movies-list-item">
            <NavLink
              className={({isActive}) => `navigation__link navigation__movies-link link-transition ${isActive ? "navigation__link_active" : ""}`}
              to="/movies">
              Фильмы
            </NavLink>
          </li>
        
          <li className="navigation__list-item navigation__saved-movies-list-item">
            <NavLink
              className={({isActive}) => `navigation__link navigation__saved-movies-link link-transition ${isActive ? "navigation__link_active" : ""}`}
              to="/saved-movies">
              Сохранённые фильмы
            </NavLink>
          </li>

          <li className="navigation__list-item navigation__account-list-item">
            <NavLink className="navigation__link navigation__account-link link-transition" to="/profile">
              Аккаунт
              <div className="navigation__icon-background" style={location.pathname === '/' ? { background: '#000000' } : null}>
                <img 
                  className="navigation__icon" alt="иконка в виде головы и плеч человечка" src={accountIcon} 
                  style={location.pathname === '/' ? { filter: 'invert(97%) sepia(43%) saturate(7182%) hue-rotate(209deg) brightness(106%) contrast(94%)'} : null}
                />
              </div>
            </NavLink>
          </li>
          </>
        : 
          <>
          <li className="navigation__list-item navigation__register-list-item">
            <Link
              className="navigation__link link-transition navigation__register-link"
              to="/signup">
              Регистрация
            </Link>
          </li>

          <li className="navigation__list-item navigation__login-list-item">
            <Link
              className="navigation__link link-transition navigation__login-link"
              to="/signin">
              Войти
            </Link>
          </li>
          </>
        }

      </ul>

      <button 
        className="navigation__button button-transition"
        type="button"
        aria-label="Кнопка отркытия меню"
        onClick={onNavigationSidebar}
      />

    </nav>
  )
}