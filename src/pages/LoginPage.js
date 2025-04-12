import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import "react-toastify/dist/ReactToastify.css";
import "../assets/Auth.css";
import { loginUser } from "../services/authApi";
import { setToken } from "../services/authService";

const LoginPage = () => {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const data = await loginUser(username, password);
    if (data?.token) {
      setToken(data.token);
      toast.success(t('loginSuccess'), { autoClose: 2000 });
      setTimeout(() => navigate("/"), 2000);
    } else {
      setError(t('loginError'));
      toast.error(t('loginErrorToast'));
    }
  };

  return (
    <div className="auth-container">
      <h2>{t('login')}</h2>
      <form onSubmit={handleLogin} className="auth-form">
        <input
          type="text"
          placeholder={t('usernamePlaceholder')}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder={t('passwordPlaceholder')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{t('loginButton')}</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default LoginPage;