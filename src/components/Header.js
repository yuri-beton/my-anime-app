import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { removeToken } from "../services/authService";
import "../assets/Header.css";
import SearchBar from "./SearchBar";
import LanguageSwitcher from './LanguageSwitcher';

function Header({ isAuthenticated, setIsAuthenticated }) {
  const { t } = useTranslation();
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
        <Link to="/" className="logo-link">{t('siteName')}</Link>
      </div>
      <SearchBar />
      <nav className="nav">
        <ul>
          <li><Link to="/" className="nav-link">{t('main')}</Link></li>
          <li><Link to="/about" className="nav-link">{t('about')}</Link></li>
          <li><Link to="/contact" className="nav-link">{t('contacts')}</Link></li>
          {!isAuthenticated ? (
            <>
              <li><Link to="/login" className="nav-link">{t('login')}</Link></li>
              <li><Link to="/register" className="nav-link">{t('register')}</Link></li>
            </>
          ) : (
            <li><Link to="/" className="nav-link" onClick={handleLogout}>{t('logout')}</Link></li>
          )}
        </ul>
      </nav>

      <LanguageSwitcher />

    </header>
  );
}

export default Header;