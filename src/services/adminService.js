import axios from "axios";

const API_BASE_URL = "https://n8n.sagutor.ru/webhook/admin/anime/video";

export const addAnime = (data) => axios.post(`${API_BASE_URL}/add`, data);

export const updateAnime = (data) => axios.post(`${API_BASE_URL}/update`, data);

export const deleteAnime = (id) => axios.post(`${API_BASE_URL}/delete`, { id });

export const fetchAllAnime = async () => {
    const response = await fetch('http://localhost:8080/api/anime'); // Или твой адрес
    const data = await response.json();
    return data;
  };