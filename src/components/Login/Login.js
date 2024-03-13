import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AppContext } from '../../contexts/AppContext';
import { 
  UNAUTHORIZED_ERROR_MESSAGE,
  SERVER_ERROR_MESSAGE,
  SOME_ERROR_MESSAGE 
} from '../../utils/errorMessages';

export default function Login({ onLogin, buttonText } ) {

  const navigate = useNavigate();
  const CurrentAppContext = React.useContext(AppContext);

  const [errMessage, setErrMessage] = useState('');

  React.useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({ mode: "onChange" });

  const emailRegister = register('email', {
    required: {
      value: true,
      message: "Заполните поле",
    },
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
      message: "Введите email"
    }
  })

  const passwordRegister = register('password', {
    required: {
      value: true,
      message: "Заполните поле",
    },
    minLength: {
      value: 8,
      message: "Минимальное количество символов: 8",
    },
    maxLength: {
      value: 20,
      message: "Максимальное количество символов: 20",
    },
  })

  function handleSubmitLogin({ email, password }) {
    onLogin({ email, password })
      .then(() => navigate('/movies'))
      .catch((err) => {
        if(err === 'Ошибка: 401') {
          setErrMessage(UNAUTHORIZED_ERROR_MESSAGE);
        } else if(err === 'Ошибка: 500') {
          setErrMessage(SERVER_ERROR_MESSAGE)
        } else {
          setErrMessage(err.message || SOME_ERROR_MESSAGE);
        }
      })
      .finally(()=> CurrentAppContext.stopLoading());
  }

  return (
    <div className="registration-login">

      <Link className="registration-login__logo-link link-transition " to="/" />

      <h2 className="registration-login__title">Рады видеть!</h2>

      <form className="registration-login__form" name="login-form" onSubmit={handleSubmit(handleSubmitLogin)}>

        <label className="registration-login__label" htmlFor="email-input">E-mail</label>
        <input 
          id="email-input" name="email"
          className={`registration-login__input ${errors.email && `registration-login__input_type_error`}`}
          type="email" required placeholder="Почта"
          {...emailRegister}
        />
        <span className={`registration-login__error ${errors.email && 'registration-login__error_visible'}`}>
          {errors.email && errors.email.message}
        </span>

        <label className="registration-login__label" htmlFor="password-input">Пароль</label>
        <input 
            id="password-input" name="password"
            className={`registration-login__input ${errors.password && `registration-login__input_type_error`}`}
            type="password" required placeholder="Пароль"
            {...passwordRegister}
        />
        <span className={`registration-login__error ${errors.password && 'registration-login__error_visible'}`}>
          {errors.password && errors.password.message}
        </span>

        <div className="submit-error-wrapper ">
          <span className="submit-error">{errMessage}</span>

          <button
            type="submit"
            className={`button-transition registration-button ${!isValid && `button_disabled`} ${CurrentAppContext.isLoading && `button_disabled`}`}
            disabled={!isValid || CurrentAppContext.isLoading}
            >{buttonText}</button>
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
