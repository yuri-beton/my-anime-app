import axios from 'axios';

const API_URL = 'http://localhost:8080/api/anime/all';


export const fetchAnimeList = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении списка аниме:', error);
    return [];
  }
};

export const fetchAnimeById = async (id) => {
  const response = await fetch(`http://localhost:8080/api/anime/${id}`);  // Замените на ваш реальный API
  const data = await response.json();
  return data;
};
