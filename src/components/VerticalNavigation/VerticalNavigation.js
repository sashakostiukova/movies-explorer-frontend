import React from 'react';
import { AppContext } from '../../contexts/AppContext';
import { NavLink } from 'react-router-dom';
import accountIcon from '../../images/account-icon.svg';
import './VerticalNavigation.css';

export default function VerticalNavigation({ isOpen }) {

  const CurrentAppContext = React.useContext(AppContext);

  return (
    <div className={`vertical-navigation ${isOpen && 'vertical-navigation_opened'}`}>
   
      <button
        className="vertical-navigation__close-button button-transition"
        type="button"
        aria-label="Кнопка закрытия меню навигации"
        onClick={CurrentAppContext.closeNavigationSidebar}
      />

      <ul className={`vertical-navigation__links-list ${isOpen && 'vertical-navigation__links-list_opened'}`}>

        <li className="vertical-navigation__list-item">
          <NavLink
            className={({isActive}) => `vertical-navigation__link link-transition ${isActive ? "vertical-navigation__link_active" : ""}`}
            to="/">
            Главная
          </NavLink>
        </li>

        <li className="vertical-navigation__list-item">
          <NavLink
            className={({isActive}) => `vertical-navigation__link link-transition ${isActive ? "vertical-navigation__link_active" : ""}`}
            to="/movies">
            Фильмы
          </NavLink>
        </li>

        <li className="vertical-navigation__list-item">
          <NavLink
            className={({isActive}) => `vertical-navigation__link link-transition ${isActive ? "vertical-navigation__link_active" : ""}`}
            to="/saved-movies">
            Сохранённые фильмы
          </NavLink>
        </li>

        <li className="vertical-navigation__list-item vertical-navigation__account-list-item">
          <NavLink className="vertical-navigation__link vertical-navigation__account-link link-transition" to="/profile">
            Аккаунт
            <div className="vertical-navigation__icon-background">
              <img className="vertical-navigation__icon vertical-navigation__icon_type_vertical-menu" alt="иконка в виде головы и плеч человечка" src={accountIcon} />
            </div>
          </NavLink>
        </li>

      </ul>
    </div>
  )
}
