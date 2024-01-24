import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useLocation } from 'react-router';
import './Navigation.css';
import accountIcon from '../../images/account-icon.svg';

export default function Navigation({onNavigationSidebar}) {

  const location = useLocation();

  return (
    <nav className="navigation">

      <ul className="navigation__links-list">

        <button 
          className="navigation__button button-transition"
          type="button"
          aria-label="Кнопка отркытия меню"
          onClick={onNavigationSidebar}
        />

        <div className="navigation__movies-links">
          <li className="navigation__list-item">
            <NavLink
              className={({isActive}) => `navigation__link link-transition ${isActive ? "navigation__link_active" : ""}`}
              to="/movies">
              Фильмы
            </NavLink>
          </li>

          <li className="navigation__list-item">
            <NavLink
              className={({isActive}) => `navigation__link link-transition ${isActive ? "navigation__link_active" : ""}`}
              to="/saved-movies">
              Сохранённые фильмы
            </NavLink>
          </li>
        </div>


        <div className="navigation__login-register-links block_none">
          <li className="navigation__list-item">
            <Link
              className="navigation__link link-transition"
              to="/signup">
              Регистрация
            </Link>
          </li>

          <li className="navigation__list-item">
            <Link
              className="navigation__link link-transition navigation__login-link"
              to="/signin">
              Войти
            </Link>
          </li>
        </div>


        <li className="navigation__list-item block_none">
          <NavLink className="navigation__link account__link link-transition" to="/profile">
            Аккаунт
            <div className="navigation__icon__background" style={location.pathname === '/' ? { background: '#000000' } : null}>
              <img 
                className="navigation__icon" alt="иконка в виде головы и плеч человечка" src={accountIcon} 
                style={location.pathname === '/' ? { filter: 'invert(97%) sepia(43%) saturate(7182%) hue-rotate(209deg) brightness(106%) contrast(94%)'} : null}
              />
            </div>
          </NavLink>
        </li>

      </ul>
    </nav>
  )
}