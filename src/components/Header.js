import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../components/LogoutButton'; // Импортируем функцию выхода
import '../assets/Header.css';

function Header() {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault(); // Предотвращаем мгновенный переход
    logout(); // Вызываем функцию выхода
    navigate('/'); // Перенаправляем на главную
  };

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
          <li><Link to="/login" className="nav-link">Вход</Link></li>
          <li><Link to="/register" className="nav-link">Регистрация</Link></li>
          <li><Link to="/" className="nav-link" onClick={handleLogout}>Выход</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;