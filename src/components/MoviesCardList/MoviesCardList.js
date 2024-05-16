import React from 'react';
import './MoviesCardList.css';
import Preloader from '../Preloader/Preloader';
import { AppContext } from '../../contexts/AppContext';


export default function MoviesCardList({ children }) {

  const currentAppContext = React.useContext(AppContext);

  return (
    <section className="movies-card-list">

      {currentAppContext.isLoading && <Preloader />}

      <ul className="movies-card-list__grid">
        {children}
      </ul>

    </section>
  )
}
