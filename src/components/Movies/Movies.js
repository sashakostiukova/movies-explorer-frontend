import React from 'react';
import { useMediaQuery } from 'react-responsive'
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import MoviesCard from '../MoviesCard/MoviesCard';
import Footer from '../Footer/Footer';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export default function Movies({ 
  toHoursAndMinutes, 
  onNavigationSidebar, 
  handleCheckboxChange, 
  onSearch, 
  onMovieClick,
  isNothingFound }) {

  const UserContext = React.useContext(CurrentUserContext);

  const [ moviesToRender, setMoviesToRender ] = React.useState([]);
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' });
  const isTablet = useMediaQuery({ query: '(min-width: 481px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 480px)' });

  React.useEffect(() => {
    const handleResize = () => {
      setTimeout(setWindowWidth(window.innerWidth, 3000))
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  React.useEffect(() => {
    renderCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowWidth]);

  React.useEffect(() => {
    renderCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [UserContext.currentMovies]);


  function renderCards() {
    if (isMobile) {
      const cardsToRender = UserContext.currentMovies.slice(0, 5);
      setMoviesToRender(cardsToRender);
    } else
    if (isDesktop) {
      const cardsToRender = UserContext.currentMovies.slice(0, 12);
      setMoviesToRender(cardsToRender);
    } else
    if (isTablet) {
      const cardsToRender = UserContext.currentMovies.slice(0, 8);
      setMoviesToRender(cardsToRender);
    } 
  }

  function renderMoreCards() {
    if (isMobile || isTablet) {
      const x = moviesToRender.length + 2
      const cardsToRender = UserContext.currentMovies.slice(0, x);
      setMoviesToRender(cardsToRender);
    }
    if (isDesktop) {
      const x = moviesToRender.length + 3
      const cardsToRender = UserContext.currentMovies.slice(0, x);
      setMoviesToRender(cardsToRender);
    }
  }

  return (
    <>
    <Header onNavigationSidebar={onNavigationSidebar} />
    <SearchForm handleCheckboxChange={handleCheckboxChange} onSearch={onSearch} />
    <div className="movies-line" />

    {isNothingFound && <span className="movies-message">Ничего не найдено</span>}

    <MoviesCardList >
      {moviesToRender.map((item) => (
        <MoviesCard 
          key={item.id}
          movie={item}
          src={`https://api.nomoreparties.co/${item.image.url}`}
          title={item.nameRU}
          duration={toHoursAndMinutes(item.duration)}
          onMovieClick={onMovieClick}
        />
      ))}
    </MoviesCardList>

    {UserContext.currentMovies.length > moviesToRender.length && 
    <button type="button" className="movies-more-button button-transition" onClick={renderMoreCards}>Ещё</button>
    }

    <Footer />
    </>
  )
}
