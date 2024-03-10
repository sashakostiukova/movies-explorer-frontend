import React from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../ErrorPage/PageNotFound';
import VerticalNavigation from '../VerticalNavigation/VerticalNavigation';
import { AppContext } from '../../contexts/AppContext';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import * as moviesAuth from '../../utils/moviesAuth'
import moviesApi from '../../utils/MoviesApi';
import * as mainApi from '../../utils/MainApi';

function App() {

  const [ isVerticalNavigationOpen, setIsVerticalNavigationOpen] = React.useState(false);

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [ currentUser, setCurrentUser ] = React.useState({});

  const [ allMovies, setAllMovies ] = React.useState([]);
  const [ currentMovies, setCurrentMovies ] = React.useState([]);
  const [ savedMovies, setSavedMovies ] = React.useState([]);
  const [ currentSavedMovies, setCurrentSavedMovies ] = React.useState([]);
  
  const [isCheckboxChecked, setIsCheckboxChecked] = React.useState(false);
  const [isSavedMoviesCheckboxChecked, setIsSavedMoviesCheckboxChecked] = React.useState(false);

  const [ isLoading, setIsLoading ] = React.useState(false);

  const [ isNothingFound, setIsNothingFound ] = React.useState(false);
  const [ isNothingFoundSavedMovies, setIsNothingFoundSavedMovies ] = React.useState(false);

  const navigate = useNavigate();

  function handleCheckboxChange() {
    setIsCheckboxChecked(!isCheckboxChecked);
  }

  React.useEffect(() => {
    const keyword = localStorage.getItem('keyword');
    if(keyword) {
      handleMoviesSearch(keyword)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCheckboxChecked]);

  function handleSavedMoviesCheckboxChange() {
    setIsSavedMoviesCheckboxChecked(!isSavedMoviesCheckboxChecked);
  }

  function setSavedMoviesCheckboxUnchecked() {
    setIsSavedMoviesCheckboxChecked(false);
  }

  function clearIsNothingFoundSavedMovies() {
    setIsNothingFoundSavedMovies(false);
  }

  function auth(jwt) {
    return moviesAuth.getContent(jwt)
      .then((res) => {
        if (res) {
          setCurrentUser(res);
          setLoggedIn(true);
        }
      })
      .catch(console.error); 
  };

  function renderCards() {
    const currentMovies = localStorage.getItem('currentMovies');
    const isCheckboxChecked = localStorage.getItem('isCheckboxChecked');

    if (currentMovies) {
      setCurrentMovies(JSON.parse(currentMovies));

      if(isCheckboxChecked==='true') {
        setIsCheckboxChecked(true);
      }
      if(isCheckboxChecked==='false') {
        setIsCheckboxChecked(false);
      }
    }
  }

  function renderSavedMovies() {
    const jwt = localStorage.getItem('jwt');
    mainApi.getSavedMovies(jwt)
    .then((movies) => {
      const reversedMovies = movies.reverse();
      setSavedMovies(reversedMovies);
      setCurrentSavedMovies(reversedMovies);
    })
    .catch(console.error); 
  }

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      auth(jwt);
    }
  }, []);

  React.useEffect(() => {
    renderCards();
  }, []);

  React.useEffect(() => {
    if (loggedIn) navigate('/movies');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  React.useEffect(() => {
    if (loggedIn) {
      const jwt = localStorage.getItem('jwt');
      moviesAuth.getContent(jwt)
      .then((data) => {
        setCurrentUser(data);

      })
      .catch(console.error);

      mainApi.getSavedMovies(jwt)
      .then((movies) => {
        const reversedMovies = movies.reverse();
        setSavedMovies(reversedMovies);
      })
      .catch(console.error); 

    }
  }, [loggedIn])

  function onLogin({ email, password }) {
    return moviesAuth.authorize(email, password).then((res) => {
      localStorage.setItem('jwt', res.token);
      setLoggedIn(true);
    });
  };

  function onRegister({ email, password, name }) {
    return moviesAuth.register(email, password, name)
      .then((res) => onLogin({ email, password }))
  };

  function onSignOut() {
    localStorage.clear();
    setLoggedIn(false);
    setCurrentUser([]);
    setCurrentMovies([]);
    setAllMovies([]);
    setIsCheckboxChecked(false);
    setIsSavedMoviesCheckboxChecked(false);

    navigate('/signin');
  };
  
  function handleOpenNavigationSidebar() {
    setIsVerticalNavigationOpen(true)
  };

  function closeNavigationSidebar() {
    setIsVerticalNavigationOpen(false)
  };

  function getAllMovies() {
    return moviesApi.getAllMovies()
      .then((data) => {
        setAllMovies(data);
        return data;
      })
  }

  function handledMoviesCheckboxFilter(data) {
    const resMovies = data.filter(function (movie) {
      return Number(movie.duration) < 40
    })
    return resMovies;
  }

  function handleMoviesKeywordFilter(data, keyword) {
    const resMovies = data.filter(function (movie) {
      return movie.nameRU.toLowerCase().includes(keyword.toLowerCase()) ||
      movie.nameEN.toLowerCase().includes(keyword.toLowerCase());
      })
    return resMovies;
  }

  function setCurrentMoviesData(data, keyword) {
    localStorage.setItem('currentMovies', JSON.stringify(data));
    localStorage.setItem('keyword', keyword);
    localStorage.setItem('isCheckboxChecked', isCheckboxChecked);
    setCurrentMovies(data);
  }

function handleMoviesSearch(keyword) {
  setIsNothingFound(false);
  if(allMovies.length === 0) {

    setIsLoading(true);
    getAllMovies()
      .then((res)=> {
        if(isCheckboxChecked) {
          const movies = handledMoviesCheckboxFilter(res);
          const resMovies = handleMoviesKeywordFilter(movies, keyword);
          return resMovies;
        } else {
          const resMovies = handleMoviesKeywordFilter(res, keyword)
          return resMovies;
        }
      })
      .then((res) => {
        setCurrentMoviesData(res, keyword)
        if(res.length === 0) {
          setIsNothingFound(true)
        }
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));

  } else {

    if(isCheckboxChecked) {
      const movies = handledMoviesCheckboxFilter(allMovies);
      const resMovies = handleMoviesKeywordFilter(movies, keyword);
      setCurrentMoviesData(resMovies, keyword)
      if(resMovies.length === 0) {
        setIsNothingFound(true)
      }
    } else {
      const resMovies = handleMoviesKeywordFilter(allMovies, keyword);
      setCurrentMoviesData(resMovies, keyword)
      if(resMovies.length === 0) {
        setIsNothingFound(true)
      }
    }
  }
}

function handleSavedMoviesCheckboxFilter() {
    const resMovies = savedMovies.filter(function (movie) {
      return Number(movie.duration) < 40
    })
    return resMovies;
}

function handleSavedMoviesKeywordFilter(data, keyword) {
  const resMovies = data.filter(function (movie) {
    return movie.nameRU.toLowerCase().includes(keyword.toLowerCase()) ||
    movie.nameEN.toLowerCase().includes(keyword.toLowerCase());
    })
  return resMovies;
}

function handleSavedMoviesSearch(keyword) {
  setIsNothingFoundSavedMovies(false);

  if(keyword === '' || undefined) {

    if(isSavedMoviesCheckboxChecked) {
      const resMovies = handleSavedMoviesCheckboxFilter(); 
      setCurrentSavedMovies(resMovies);
      if(resMovies.length === 0) {
        setIsNothingFoundSavedMovies(true);
      }

    } else {
      setCurrentSavedMovies(savedMovies);
      if(savedMovies.length === 0) {
        setIsNothingFoundSavedMovies(true);
      }
    }

  } else {

    if(isSavedMoviesCheckboxChecked) {
      const movies = handleSavedMoviesCheckboxFilter(); 
      const resMovies = handleSavedMoviesKeywordFilter(movies, keyword);
      setCurrentSavedMovies(resMovies);
      if(resMovies.length === 0) {
        setIsNothingFoundSavedMovies(true);
      }

    } else {
      const resMovies = handleSavedMoviesKeywordFilter(savedMovies, keyword);
      setCurrentSavedMovies(resMovies);
      if(resMovies.length === 0) {
        setIsNothingFoundSavedMovies(true);
      }
    }
  }

}

function handleMovieLike(movie) {
  const isLiked = movie.isLiked;
  const jwt = localStorage.getItem('jwt');
  if(!isLiked) {
    mainApi.createSavedMovie(movie, jwt)
      .then((newSavedMovie) => {
        setSavedMovies([newSavedMovie, ...savedMovies])
      })
      .catch(console.error)
  } else {

    const movieToDelete = savedMovies.filter(function (c) {
      return c.movieId === movie.id
    })

    mainApi.deleteSavedMovie(movieToDelete[0]._id, jwt)
      .then(() => setSavedMovies((state) => state.filter((c) => c.movieId !== movie.movieId && c)))
      .catch(console.error)
  }
}

function handleSavedMovieDelete(movie) {
  const jwt = localStorage.getItem('jwt');
  mainApi.deleteSavedMovie(movie._id, jwt)
    .then(() => {
      const movies = (state) => state.filter((c) => c.movieId !== movie.movieId && c);
      setSavedMovies(movies);
    })
    .catch(console.error)
}

function handleEditProfile(data) {
  const jwt = localStorage.getItem('jwt');
  return mainApi.editProfile(data, jwt)
    .then((newData)=> {
      setCurrentUser(newData);
    })
}

function toHoursAndMinutes(totalMinutes) {
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);
  return `${hours > 0 ? `${hours}ч` : ''}${minutes > 0 ? ` ${minutes}мин` : ''}`;
}

  return (
    <AppContext.Provider value={{ isLoading, closeNavigationSidebar, loggedIn }}>
      <CurrentUserContext.Provider value={{
        currentUser,
        currentMovies,
        isCheckboxChecked,
        savedMovies,
        currentSavedMovies,
        isSavedMoviesCheckboxChecked
        }}>

        <div className="page">

          <Routes>
            <Route path="/" element={
              <>
              <VerticalNavigation isOpen={isVerticalNavigationOpen} />
              <Main onNavigationSidebar={handleOpenNavigationSidebar}/>
              </>
            } />

            <Route path="/movies" element={ loggedIn ?
              <ProtectedRoute loggedIn={loggedIn}>
                <>
                <VerticalNavigation isOpen={isVerticalNavigationOpen} />
                <Movies 
                  toHoursAndMinutes={toHoursAndMinutes}
                  onNavigationSidebar={handleOpenNavigationSidebar}
                  handleCheckboxChange={handleCheckboxChange}
                  onSearch={handleMoviesSearch}
                  onMovieClick={handleMovieLike}
                  isNothingFound={isNothingFound}
                />
                </>
              </ProtectedRoute>
              :
              <Navigate to='/' replace />
            } />

            <Route path="/saved-movies" element={ loggedIn ?
              <ProtectedRoute loggedIn={loggedIn}>
                <>
                <VerticalNavigation isOpen={isVerticalNavigationOpen} />
                <SavedMovies 
                  renderSavedMovies={renderSavedMovies}
                  toHoursAndMinutes={toHoursAndMinutes}
                  onNavigationSidebar={handleOpenNavigationSidebar}
                  onMovieClick={handleSavedMovieDelete}
                  onSearch={handleSavedMoviesSearch}
                  handleSavedMoviesCheckboxChange={handleSavedMoviesCheckboxChange}
                  isNothingFoundSavedMovies={isNothingFoundSavedMovies}
                  setSavedMoviesCheckboxUnchecked={setSavedMoviesCheckboxUnchecked}
                  clearIsNothingFoundSavedMovies={clearIsNothingFoundSavedMovies}
                />
                </>
              </ProtectedRoute>
              :
              <Navigate to='/' replace />
            } />

            <Route path="/profile" onSignOut={onSignOut} element={
              <ProtectedRoute loggedIn={loggedIn}>
                <>
                <VerticalNavigation isOpen={isVerticalNavigationOpen} />
                <Profile onNavigationSidebar={handleOpenNavigationSidebar} onSignOut={onSignOut} onEditProfile={handleEditProfile}/>
                </>
              </ProtectedRoute>
            } />

            <Route path="/signin" element={<Login onLogin={onLogin}/>} />

            <Route path="/signup" element={<Register onRegister={onRegister}/>} />

            <Route path="*" element={<PageNotFound />}/>
          </Routes>

        </div>
      </CurrentUserContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
