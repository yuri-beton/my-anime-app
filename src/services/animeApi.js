import axios from "axios";

// Русские ключи
const RU_LIST_URL = "https://n8n.sagutor.ru/webhook/anime/all";
const RU_BY_ID_URL = "https://n8n.sagutor.ru/webhook/240c483f-edb8-4ea7-960f-2fc4a9cc9708/anime";

// Английские ключи
const EN_LIST_URL = "https://n8n.sagutor.ru/webhook/anime/all/en";
const EN_BY_ID_URL = "https://n8n.sagutor.ru/webhook/1d17f354-c3b4-4f55-af33-e3b3fc237080/anime/en";

/**
 * Получение всех аниме с нужной локалью
 * @param {string} lang - "ru" или "en"
 */
export const fetchAnimeList = async (lang = "ru") => {
  try {
    const url = lang === "en" ? EN_LIST_URL : RU_LIST_URL;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении списка аниме:", error);
    return [];
  }
};

/**
 * Получение одного аниме по id с нужной локалью
 * @param {number|string} id - ID аниме
 * @param {string} lang - "ru" или "en"
 */
export const fetchAnimeById = async (id, lang = "ru") => {
  try {
    const url = lang === "en" ? `${EN_BY_ID_URL}/${id}` : `${RU_BY_ID_URL}/${id}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении аниме по id:", error);
    return null;
  }
};
