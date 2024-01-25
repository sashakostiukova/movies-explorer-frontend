import React from 'react';
import './Login.css';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div className="registration-login">

      <Link className="registration-login__logo-link link-transition " to="/" />

      <h2 className="registration-login__title">Рады видеть!</h2>

      <form className="registration-login__form" name="login-form">

        <label className="registration-login__label" for="email-input">E-mail</label>
        <input 
          id="email-input" name="email" className="registration-login__input" 
          type="email" required placeholder="Почта"
        />
        <span className="registration-login__error registration-login__error_visible"></span>

        <label className="registration-login__label" for="password-input">Пароль</label>
        <input 
            id="password-input" name="password" className="registration-login__input" 
            type="password" required placeholder="Пароль"
        />
        <span className="registration-login__error">Что-то пошло не так...</span>

        <div className="submit-error-wrapper ">
          <span className="submit-error block-none ">При авторизации произошла ошибка. Токен не передан или передан не в том формате.</span>
          <button type="submit" className="button-transition login-button">Войти</button>
        </div>
          <p className="registration-login__text">Ещё не зарегистрированы?
            <Link className="registration-login__link link-transition" to="/signup">
              Регистрация
            </Link>
          </p>

      </form>
    </div>
  )
}
