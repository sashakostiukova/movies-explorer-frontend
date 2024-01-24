import React from 'react';
import { Route, Routes } from 'react-router-dom';

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

function App() {

  const [ isVerticalNavigationOpen, setIsVerticalNavigationOpen] = React.useState(false);

  function handleOpenNavigationSidebar() {
    setIsVerticalNavigationOpen(true)
  };

  function closeNavigationSidebar() {
    setIsVerticalNavigationOpen(false)
  }

  return (
    <AppContext.Provider value={{ closeNavigationSidebar }}>
      <div className="page">


        <Routes>
          <Route path="/" element={
            <>
            <VerticalNavigation isOpen={isVerticalNavigationOpen} />
            <Main onNavigationSidebar={handleOpenNavigationSidebar}/>
            </>
          } />

          <Route path="/movies" element={
            <>
            <VerticalNavigation isOpen={isVerticalNavigationOpen} />
            <Movies onNavigationSidebar={handleOpenNavigationSidebar}/>
            </>
          } />

          <Route path="/saved-movies" element={
            <>
            <VerticalNavigation isOpen={isVerticalNavigationOpen} />
            <SavedMovies onNavigationSidebar={handleOpenNavigationSidebar}/>
            </>
          } />

          <Route path="/profile" element={
            <>
            <VerticalNavigation isOpen={isVerticalNavigationOpen} />
            <Profile name={'Виталий'} email={"pochta@yandex.ru"} onNavigationSidebar={handleOpenNavigationSidebar}/>
            </>
          } />

          <Route path="/signin" element={<Login />} />

          <Route path="/signup" element={<Register />} />

          <Route path="*" element={<PageNotFound />}/>

        </Routes>

      </div>
    </AppContext.Provider>
  );
}

export default App;
