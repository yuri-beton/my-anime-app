import axios from 'axios';

const API_URL = 'http://localhost:8081/api/auth/';

// Регистрация пользователя
export const registerUser = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}register`, { username, email, password });
    return response.data;
  } catch (error) {
    console.error('Ошибка при регистрации:', error);
    return null;
  }
};

// Вход в систему
export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}login`, { username, password });
    return response.data;
  } catch (error) {
    console.error('Ошибка при входе:', error);
    return null;
  }
};

// Проверка статуса пользователя (активирован или нет)
export const checkAuthStatus = async (token) => {
  try {
    const response = await axios.get(`${API_URL}status`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Ошибка при проверке статуса:', error);
    return null;
  }
};

// Выход из системы (очистка токена)
export const logoutUser = async (token) => {
  try {
    await axios.post(`${API_URL}logout`, { token });
  } catch (error) {
    console.error('Ошибка при выходе:', error);
  }
};
