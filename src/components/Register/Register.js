import React, { useState } from 'react';
import './Register.css';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AppContext } from '../../contexts/AppContext';
import { 
  DUPLACATE_ERROR_MESSAGE,
  BAD_REQUEST_REGISTER_ERROR_MESSAGE,
  SERVER_ERROR_MESSAGE,
  SOME_ERROR_MESSAGE 
} from '../../utils/errorMessages';

export default function Register({ onRegister, buttonText }) {

  const navigate = useNavigate();
  const CurrentAppContext = React.useContext(AppContext);

  const [ registrationErrMessage, setRegistrationErrMessage] = useState('');

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

  const nameRegister = register('name', {
    required: {
      value: true,
      message: "Заполните поле",
    },
    minLength: {
      value: 2,
      message: "Минимальное количество символов: 2",
    },
    maxLength: {
      value: 30,
      message: "Максимальное количество символов: 30",
    },
    pattern: {
      value: /^[А-ЯA-Z\s-]+/mi,
      message: "Имя может состоять только из кириллицы, латиницы, пробела и дефиса"
    },
    validate: (value) => {
      if (!value.startsWith(' ')) {
        return true
      } else {
        return "Имя не должно начинаться с пробела"
      }
    }
  })

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

  function handleSubmitRegister({ email, password, name }) {
    onRegister({ email, password, name })
      .then(() => navigate('/movies'))
      .catch((err) => {
        if(err === 'Ошибка: 409') {
          setRegistrationErrMessage(DUPLACATE_ERROR_MESSAGE);
        } else if(err === 'Ошибка: 400') {
          setRegistrationErrMessage(BAD_REQUEST_REGISTER_ERROR_MESSAGE)
        } else if(err === 'Ошибка: 500') {
          setRegistrationErrMessage(SERVER_ERROR_MESSAGE)
        }
        else {
          setRegistrationErrMessage(err.message || SOME_ERROR_MESSAGE)
        }
      })
      .finally(()=> CurrentAppContext.stopLoading());
  }

  return (
    <div className="registration-login">

      <Link className="registration-login__logo-link link-transition " to="/" />

      <h2 className="registration-login__title">Добро пожаловать!</h2>

      <form className="registration-login__form" name="register-form" onSubmit={handleSubmit(handleSubmitRegister)}>

        <label className="registration-login__label" htmlFor="name-input">Имя</label>
        <input 
          id="name-input" name="name"
          className={`registration-login__input ${errors.name && `registration-login__input_type_error`}`}
          type="text" required placeholder="Имя" {...nameRegister}
        />
        <span className={`registration-login__error ${errors.name && 'registration-login__error_visible'}`}>
          {errors.name && errors.name.message}
        </span>

        <label className="registration-login__label" htmlFor="email-input">E-mail</label>
        <input 
          id="email-input" name="email"
          className={`registration-login__input ${errors.email && `registration-login__input_type_error`}`}
          type="email" required placeholder="Почта" {...emailRegister}
        />
        <span className={`registration-login__error ${errors.email && 'registration-login__error_visible'}`}>
          {errors.email && errors.email.message}
        </span>

        <label className="registration-login__label" htmlFor="password-input">Пароль</label>
        <input 
            id="password-input" name="password"
            className={`registration-login__input ${errors.password && `registration-login__input_type_error`}`}
            type="password" required placeholder="Пароль" {...passwordRegister}
        />
        <span className={`registration-login__error ${errors.password && 'registration-login__error_visible'}`}>
          {errors.password && errors.password.message}
        </span>

        <div className="submit-error-wrapper ">
          <span className="submit-error">{registrationErrMessage}</span>
          <button
            type="submit"
            className={`button-transition registration-button ${!isValid && `button_disabled`} ${CurrentAppContext.isLoading && `button_disabled`}`}
            disabled={!isValid || CurrentAppContext.isLoading}
            >{buttonText}</button>
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
