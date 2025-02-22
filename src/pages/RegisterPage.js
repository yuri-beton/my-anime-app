import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authApi";
import "../assets/Auth.css";

const RegisterPage = () => {
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
      setMessage("Регистрация успешна! Проверьте вашу почту для подтверждения.");
      setTimeout(() => navigate("/login"), 3000); // Перенаправление через 3 секунды
    } else if (data === "Email or username already in use") {
      setError("Email или имя пользователя уже заняты.");
    } else {
      setError("Ошибка регистрации");
    }
  };

  return (
    <div className="auth-container">
      <h2>Регистрация</h2>
      <form onSubmit={handleRegister} className="auth-form">
        <input type="text" placeholder="Логин" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Зарегистрироваться</button>
      </form>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default RegisterPage;
