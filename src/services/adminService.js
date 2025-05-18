import axios from "axios";

const BASE_URL = "https://n8n.sagutor.ru/webhook"; // ← твоя база для всех запросов

// Получение всех аниме
export const fetchAllAnime = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/anime/all`);
    return response.data;
  } catch (error) {
    console.error("Ошибка при загрузке списка аниме:", error);
    throw error;
  }
};

// Добавление нового аниме
export const addAnime = async (animeData) => {
  try {
    const response = await axios.post(`${BASE_URL}/admin/anime/add`, animeData);
    return response.data;
  } catch (error) {
    console.error("Ошибка при добавлении аниме:", error);
    throw error;
  }
};

// Обновление существующего аниме
export const updateAnime = async (animeData) => {
  try {
    const response = await axios.put(`${BASE_URL}/admin/anime/update`, animeData);
    return response.data;
  } catch (error) {
    console.error("Ошибка при обновлении аниме:", error);
    throw error;
  }
};

// Удаление аниме по ID
export const deleteAnime = async (id) => {
  try {
    const response = await axios.delete(`https://n8n.sagutor.ru/webhook/admin/anime/delete?id=${id}`);
    return response.data;
  } catch (error) {
    console.error("Ошибка при удалении аниме:", error);
    throw error;
  }
};
