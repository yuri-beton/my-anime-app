import axios from 'axios';
import { getToken } from "./authService";


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
export const fetchUserData = async () => {
  const token = getToken();
  if (!token) return null;

  try {
    const response = await axios.get(`${API_URL}user`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении данных пользователя:', error);
    return null;
  }
};