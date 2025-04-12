import axios from 'axios';

const API_URL = 'https://n8n.sagutor.ru/webhook/anime/all';


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
  const response = await fetch(`https://n8n.sagutor.ru/webhook/240c483f-edb8-4ea7-960f-2fc4a9cc9708/anime/${id}`);  // Замените на ваш реальный API
  const data = await response.json();
  return data;
};
