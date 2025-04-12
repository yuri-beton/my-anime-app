import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { registerUser } from "../services/authApi";
import "../assets/Auth.css";

const RegisterPage = () => {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const data = await registerUser(username, email, password);
    if (data === "Registration successful") {
      setMessage(t('registerSuccess'));
      setTimeout(() => navigate("/login"), 3000);
    } else if (data === "Email or username already in use") {
      setError(t('emailOrUsernameTaken'));
    } else {
      setError(t('registerError'));
    }
  };

  return (
    <div className="auth-container">
      <h2>{t('register')}</h2>
      <form onSubmit={handleRegister} className="auth-form">
        <input
          type="text"
          placeholder={t('usernamePlaceholder')}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder={t('emailPlaceholder')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder={t('passwordPlaceholder')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{t('registerButton')}</button>
      </form>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default RegisterPage;
