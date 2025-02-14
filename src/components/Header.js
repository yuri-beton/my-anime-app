import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/Header.css'; // Импортируем CSS для стилизации

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/" className="logo-link">My Anime</Link>
      </div>
      <nav className="nav">
        <ul>
          <li><Link to="/" className="nav-link">Главная</Link></li>
          <li><Link to="/about" className="nav-link">О нас</Link></li>
          <li><Link to="/contact" className="nav-link">Контакты</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
