

export const logout = () => {
    localStorage.removeItem('authToken'); // Удаляем токен
    window.location.reload(); // Перезагружаем страницу, чтобы обновить состояние
  };
  