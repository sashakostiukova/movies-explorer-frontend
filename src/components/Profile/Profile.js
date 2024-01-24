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
      <form className="profile__form" name="edit-profile-form"
        // onSubmit={onSubmit}
        >
        <div className="profile__form__input-wrapper">

          <label className="profile__form__label" for="name-input">Имя</label>
          <input 
            id="name-input" name="name" className="form-input form-input_disabled" 
            type="text" placeholder={name} />
        </div>
          {/* <span className=""></span> */}

        <div className="profile__line"></div>

        <div className="profile__form__input-wrapper">
          <label className="profile__form__label" for="email-input">E-mail</label>
          <input 
            id="email-input" name="email" className="form-input form-input_disabled" 
            type="email" placeholder={email} />
        </div>
          {/* <span className=""></span> */}

        <button type="button" className="profile__form__edit-button link-transition"
          aria-label="Кнопка редактирования профиля">Редактировать</button>

        <div className="submit-error-wrapper">
          <span className="submit-error block_none ">При обновлении профиля произошла ошибка.</span>
          <button type="submit" className="block_none profile__form__save-changes-button button-transition 
            button_disabled" aria-label="Кнопка сохранения изменений профиля">
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
