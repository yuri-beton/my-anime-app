export const getToken = () => localStorage.getItem("token"); // Получаем токен
export const setToken = (token) => localStorage.setItem("token", token); // Сохраняем токен
export const removeToken = () => localStorage.removeItem("token"); // Удаляем токен