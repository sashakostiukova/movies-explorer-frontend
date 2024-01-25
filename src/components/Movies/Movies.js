import React from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
// import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import Footer from '../Footer/Footer';

export default function Movies({onNavigationSidebar}) {
  return (
    <>
    <Header onNavigationSidebar={onNavigationSidebar} />
    <SearchForm />
    <div className="movies-line" />

    {/* <Preloader /> */}
    <MoviesCardList />
    
    <button className="movies-more-button button-transition">Ещё</button>

    <Footer />
    </>
  )
}
