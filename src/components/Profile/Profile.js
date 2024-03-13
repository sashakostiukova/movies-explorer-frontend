import React from 'react';
import './Profile.css';
import Header from '../Header/Header';
import { useNavigate} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { AppContext } from '../../contexts/AppContext';
import { 
  DUPLACATE_ERROR_MESSAGE,
  SERVER_ERROR_MESSAGE,
  SOME_ERROR_MESSAGE 
} from '../../utils/errorMessages';

export default function Profile({
  onNavigationSidebar,
  onSignOut,
  onEditProfile,
  buttonText,
  successSubmitMessage
  }) {

  const UserContext = React.useContext(CurrentUserContext);
  const CurrentAppContext = React.useContext(AppContext);

  const [ isFormDisabled, setIsFormDisabled ] = React.useState(true);
  const [ message, setMessage ] = React.useState('');

  React.useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    setValue('name', UserContext.currentUser.name)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [UserContext.currentUser.name]);

  const navigate = useNavigate();

  function logOut() {
    onSignOut();
    navigate('/');
  };

  function editProfileFormOn() {
    setMessage('');
    setIsFormDisabled(false);
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
    setValue,
  } = useForm(
      { defaultValues: { name: UserContext.currentUser.name, email: UserContext.currentUser.email } },
      { mode: "onChange" },
      UserContext.currentUser,
    );

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

  function handleEditProfileSubmit(data) {
    onEditProfile(data)
    .then(() => {
      setIsFormDisabled(true);
    })
    .then(() => {
      setMessage(successSubmitMessage)
    })
    .catch((err) => {
      if(err === 'Ошибка: 409') {
        setMessage(DUPLACATE_ERROR_MESSAGE);
      } else if(err === 'Ошибка: 500') {
        setMessage(SERVER_ERROR_MESSAGE)
      } else {
        setMessage(err.message || SOME_ERROR_MESSAGE);
      }
    })
    .finally(()=> CurrentAppContext.stopLoading())
  }

  return (
    <>
    <Header onNavigationSidebar={onNavigationSidebar}/>
    <section className="profile">
      <h2 className="profile__greeting">Привет, {UserContext.currentUser.name}!</h2>
      <form className="profile-form" name="edit-profile-form" onSubmit={handleSubmit(handleEditProfileSubmit)}>
        <div className="profile-form__input-wrapper">
          <label className="profile-form__label" htmlFor="name-input">Имя</label>
          <input 
            id="name-input" name="name" 
            className={`profile-form__input ${isFormDisabled && `profile-form__input_disabled`} ${errors.name && `profile-form__input_type_error`}`}
            disabled={isFormDisabled ? true : false}
            type="text" placeholder={UserContext.currentUser.name} 
            {...nameRegister} />
        </div>
        <span className={`profile-form__error ${errors.name && `profile-form__error_visible`}`}>{errors.name && errors.name.message}</span>

        <div className="profile__line"></div>

        <div className="profile-form__input-wrapper">
          <label className="profile-form__label" htmlFor="email-input">E-mail</label>
          <input 
            id="email-input" name="email" 
            className={`profile-form__input ${isFormDisabled && `profile-form__input_disabled`} ${errors.email && `profile-form__input_type_error`}`}
            disabled={isFormDisabled ? true : false}
            placeholder={UserContext.currentUser.email} 
            {...emailRegister} />
        </div>
        <span className={`profile-form__error ${errors.email && `profile-form__error_visible`}`}>{errors.email && errors.email.message}</span>


        {isFormDisabled ?
          <>
          <span className="profile-form__submit-message profile-form__success-message">{message}</span>
          <button type="button" className="profile-form__edit-button link-transition"
            aria-label="Кнопка редактирования профиля" 
            onClick={editProfileFormOn}
            >Редактировать</button>
          <button type="button" className="profile__logout-button link-transition"
              aria-label="Кнопка выхода из аккаунта"
              onClick={logOut}>Выйти из аккаунта
          </button>
          </>
        :
        <div className="profile-form__submit-message-wrapper">
          <span className="profile-form__submit-message">{message}</span>
          <button type="submit" className={
            `profile-form__save-changes-button button-transition ${!isValid && `button_disabled`} ${!isDirty && `button_disabled`} 
            ${CurrentAppContext.isLoading && `button_disabled`}`}
            aria-label="Кнопка сохранения изменений профиля" disabled={!isValid || !isDirty || CurrentAppContext.isLoading}>
            {buttonText}
          </button>
        </div>
        }
        
      </form>
    </section>
    </>
  )
}
