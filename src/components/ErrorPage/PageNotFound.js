import React from 'react';
import './PageNotFound.css';
import { useNavigate} from 'react-router-dom';

export default function PageNotFound() {

  const navigate = useNavigate();

  function goBack() {
      navigate(-1);
  };

  return (
    <div className="page-not-found">
      <h2 className="page-not-found__title">404</h2>
      <p className="page-not-found__description">Страница не найдена</p>
      <button className="page-not-found__go-back-button link-transition" type="button" 
        aria-label="Кнопка вернуться назад"
        onClick={goBack}>Назад</button>
    </div>
  )
}
