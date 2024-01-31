import React from 'react';
import './Profile.css';
import Header from '../Header/Header';
import { useNavigate} from 'react-router-dom';

export default function Profile({name, email, onNavigationSidebar}) {

  const navigate = useNavigate();

  function logOut() {
    navigate('/');
  };

  return (
    <>
    <Header onNavigationSidebar={onNavigationSidebar}/>
    <section className="profile">
      <h2 className="profile__greeting">Привет, {name}!</h2>
      <form className="profile-form" name="edit-profile-form"
        // onSubmit={onSubmit}
        >
        <div className="profile-form__input-wrapper">

          <label className="profile-form__label" for="name-input">Имя</label>
          <input 
            id="name-input" name="name" className="form-input form-input_disabled" 
            type="text" placeholder={name} />
        </div>
          {/* <span className=""></span> */}

        <div className="profile__line"></div>

        <div className="profile-form__input-wrapper">
          <label className="profile-form__label" for="email-input">E-mail</label>
          <input 
            id="email-input" name="email" className="form-input form-input_disabled" 
            type="email" placeholder={email} />
        </div>
          {/* <span className=""></span> */}

        <button type="button" className="profile-form__edit-button link-transition"
          aria-label="Кнопка редактирования профиля">Редактировать</button>

        <div className="submit-error-wrapper">
          <span className="submit-error block-none ">При обновлении профиля произошла ошибка.</span>
          <button type="submit" className="block-none profile-form__save-changes-button button-transition"
            aria-label="Кнопка сохранения изменений профиля">
            Сохранить
          </button>
        </div>

      </form>

      <button type="button" className="profile__logout-button link-transition"
        aria-label="Кнопка выхода из аккаунта"
        onClick={logOut}>Выйти из аккаунта</button>
    </section>
    </>
  )
}
