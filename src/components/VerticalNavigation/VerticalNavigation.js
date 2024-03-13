import React from 'react';
import { AppContext } from '../../contexts/AppContext';
import { NavLink, Link } from 'react-router-dom';
import accountIcon from '../../images/account-icon.svg';
import './VerticalNavigation.css';

export default function VerticalNavigation({ isOpen, closeSidebar }) {

  const CurrentAppContext = React.useContext(AppContext);

  React.useEffect(() => {
    if (!isOpen) return;

    const handleOverlay = (event) => {
      if (event.target.classList.contains("vertical-navigation_opened")) {
        closeSidebar();
      }
    };

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        closeSidebar();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleOverlay);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleOverlay);
    };
  }, [isOpen, closeSidebar]);

  function onClick() {
    closeSidebar()
  }

  return (
    <div className={`vertical-navigation ${isOpen && 'vertical-navigation_opened'}`}>
   
      <button
        className="vertical-navigation__close-button button-transition"
        type="button"
        aria-label="Кнопка закрытия меню навигации"
        onClick={closeSidebar}
      />

      <ul className={`vertical-navigation__links-list ${isOpen && 'vertical-navigation__links-list_opened'}`}>

        <li className="vertical-navigation__list-item">
          <NavLink
            className={({isActive}) => `vertical-navigation__link link-transition ${isActive ? "vertical-navigation__link_active" : ""}`}
            to="/" onClick={onClick}>
            Главная
          </NavLink>
        </li>

        {CurrentAppContext.loggedIn ? 
          <>
          <li className="vertical-navigation__list-item">
            <NavLink
              className={({isActive}) => `vertical-navigation__link link-transition ${isActive ? "vertical-navigation__link_active" : ""}`}
              to="/movies" onClick={onClick}>
              Фильмы
            </NavLink>
          </li>

          <li className="vertical-navigation__list-item">
            <NavLink
              className={({isActive}) => `vertical-navigation__link link-transition ${isActive ? "vertical-navigation__link_active" : ""}`}
              to="/saved-movies" onClick={onClick}>
              Сохранённые фильмы
            </NavLink>
          </li>

          <li className="vertical-navigation__list-item vertical-navigation__account-list-item">
            <NavLink className="vertical-navigation__link vertical-navigation__account-link link-transition" to="/profile" onClick={onClick}>
              Аккаунт
              <div className="vertical-navigation__icon-background">
                <img className="vertical-navigation__icon vertical-navigation__icon_type_vertical-menu" alt="иконка в виде головы и плеч человечка" src={accountIcon} />
              </div>
            </NavLink>
          </li>
          </>
          :
          <>
          <li className="vertical-navigation__list-item">
            <Link
              className="vertical-navigation__link link-transition"
              to="/signup" onClick={onClick}>
              Регистрация
            </Link>
          </li>

          <li className="vertical-navigation__list-item">
            <Link
              className="vertical-navigation__link link-transition"
              to="/signin" onClick={onClick}>
              Войти
            </Link>
          </li>
          </>
        }

      </ul>
    </div>
  )
}
