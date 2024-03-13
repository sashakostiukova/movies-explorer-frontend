import React from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import Footer from '../Footer/Footer';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export default function SavedMovies({ 
  renderSavedMovies, 
  toHoursAndMinutes, 
  onNavigationSidebar, 
  onMovieClick, 
  handleSavedMoviesCheckboxChange, 
  onSearch,
  isNothingFoundSavedMovies,
  setSavedMoviesCheckboxUnchecked,
  clearIsNothingFoundSavedMovies }) {
  
  const UserContext = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setSavedMoviesCheckboxUnchecked();
    clearIsNothingFoundSavedMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
    <Header onNavigationSidebar={onNavigationSidebar}/>
    <SearchForm handleCheckboxChange={handleSavedMoviesCheckboxChange} onSearch={onSearch}/>
    <div className="movies-line" />

    {isNothingFoundSavedMovies && <span className="movies-message">Ничего не найдено</span>}

    <MoviesCardList>
      {UserContext.currentSavedMovies.map((item) => (
        <MoviesCard 
          key={item._id}
          movie={item}
          src={item.image}
          title={item.nameRU}
          duration={toHoursAndMinutes(item.duration)}
          onMovieClick={onMovieClick}
        />
      ))}
    </MoviesCardList>
    
    <Footer />
    </>
  )
}
