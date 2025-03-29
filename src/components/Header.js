import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { removeToken } from "../services/authService"; // Удаляем useAuth
import "../assets/Header.css";
import "../assets/GoogleTranslate.css";
import SearchBar from "./SearchBar";
import GoogleTranslate from "./GoogleTranslate";

function Header({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    removeToken();
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/" className="logo-link">My Anime</Link>
      </div>
      <SearchBar />
      <nav className="nav">
        <ul>
          <li><Link to="/" className="nav-link">Главная</Link></li>
          <li><Link to="/about" className="nav-link">О нас</Link></li>
          <li><Link to="/contact" className="nav-link">Контакты</Link></li>
          
          {!isAuthenticated ? (
            <>
              <li><Link to="/login" className="nav-link">Вход</Link></li>
              <li><Link to="/register" className="nav-link">Регистрация</Link></li>
            </>
          ) : (
            <li><Link to="/" className="nav-link" onClick={handleLogout}>Выход</Link></li>
          )}
        </ul>
      </nav>

    {/* переводчиком */}
        <GoogleTranslate />

    </header>
  );
}

export default Header;