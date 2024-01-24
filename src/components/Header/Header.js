import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';

import './Header.css';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';

export default function Header({onNavigationSidebar}) {

  const location = useLocation();

  return (
    <header className="header" style={location.pathname === '/' ? { background: '#F3C1F8' } : null}>
      <Link to="/" className="header__link link-transition">
        <img className="header__logo" src={logo} alt="логотип сайта"/>
      </Link>

      <Navigation onNavigationSidebar={onNavigationSidebar} />
    </header>
  )
}

