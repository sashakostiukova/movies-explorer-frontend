import React from 'react';
import './Register.css';
import { Link } from 'react-router-dom';

export default function Register() {
  return (
    <div className="registration-login">

      <Link className="registration-login__logo-link link-transition " to="/" />

      <h2 className="registration-login__title">Добро пожаловать!</h2>

      <form className="registration-login__form" name="register-form">

        <label className="registration-login__label" for="name-input">Имя</label>
        <input 
          id="name-input" name="name" className="registration-login__input" 
          type="text" required placeholder="Имя"
        />
        <span className="registration-login__error registration-login__error_visible"></span>

        <label className="registration-login__label" for="email-input">E-mail</label>
        <input 
          id="email-input" name="email" className="registration-login__input" 
          type="email" required placeholder="Почта"
        />
        <span className="registration-login__error registration-login__error_visible"></span>

        <label className="registration-login__label" for="password-input">Пароль</label>
        <input 
            id="password-input" name="password" className="registration-login__input registration-login__input_type_error" 
            type="password" required placeholder="Пароль"
        />
        <span className="registration-login__error registration-login__error_visible">Что-то пошло не так...</span>

        <div className="submit-error-wrapper ">
          <span className="submit-error block_none ">При регистрации пользователя произошла ошибка.</span>
          <button type="submit" className="button-transition registration-button">Зарегистрироваться</button>
        </div>
          <p className="registration-login__text">Уже зарегистрированы?
            <Link className="registration-login__link link-transition" to="/signin">
              Войти
            </Link>
          </p>

      </form>
    </div>
  )
}
