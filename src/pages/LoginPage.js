import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/Auth.css";
import { loginUser } from "../services/authApi";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const data = await loginUser(username, password);
    if (data?.token) {
      localStorage.setItem("token", data.token);
      navigate("/");
    } else {
      setError("Ошибка входа. Проверьте данные.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Вход</h2>
      <form onSubmit={handleLogin} className="auth-form">
        <input type="text" placeholder="Логин" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Войти</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default LoginPage;