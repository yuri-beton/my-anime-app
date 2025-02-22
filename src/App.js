import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AnimeDetailPage from './pages/AnimeDetailPage';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import './assets/App.css'; // Добавляем файл стилей для приложения

function App() {
  return (
    <Router>
      <div className="app-container"> {/* Контейнер для всей страницы */}
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/anime/:id" element={<AnimeDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} /> 
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
