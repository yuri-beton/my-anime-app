import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/AdminPage.css"; // Подключаем стили
import { addAnime, updateAnime, deleteAnime, fetchAllAnime } from "../services/adminService";

function AdminPage() {
  const [animeData, setAnimeData] = useState({
    title: "",
    description: "",
    year: "",
    youtube_url: "",
    imageUrl: "",
    genres: "",
    id: ""
  });

  const [animeList, setAnimeList] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnimeData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const resetForm = () => {
    setAnimeData({
      title: "",
      description: "",
      year: "",
      youtube_url: "",
      imageUrl: "",
      genres: "",
      id: ""
    });
  };

  const loadAnimeList = async () => {
    try {
      const data = await fetchAllAnime();
      setAnimeList(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadAnimeList();
  }, []);


  const handleAdd = async () => {
    try {
      await addAnime(animeData);
      toast.success("Аниме успешно добавлено!");
      resetForm();
    } catch (error) {
      console.error(error);
      toast.error("Ошибка при добавлении аниме!");
    }
  };

  const handleUpdate = async () => {
    try {
      await updateAnime(animeData);
      toast.success("Аниме успешно обновлено!");
    } catch (error) {
      console.error(error);
      toast.error("Ошибка при обновлении аниме!");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Вы уверены, что хотите удалить это аниме?")) return;
    try {
      await deleteAnime(animeData.id);
      toast.success("Аниме успешно удалено!");
      setAnimeData(prev => ({ ...prev, id: "" }));
    } catch (error) {
      console.error(error);
      toast.error("Ошибка при удалении аниме!");
    }
  };


  const handleEdit = (anime) => {
    setAnimeData({
      title: anime.title,
      description: anime.description,
      year: anime.year,
      youtube_url: anime.youtube_url,
      imageUrl: anime.image_url,
      genres: Array.isArray(anime.genres) ? anime.genres.join(", ") : anime.genres,
      id: anime.id
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  const handleDeleteDirect = async (id) => {
    if (!window.confirm("Удалить это аниме?")) return;
    try {
      await deleteAnime(id);
      toast.success("Аниме удалено!");
      loadAnimeList(); // перезагрузить список
    } catch (error) {
      console.error(error);
      toast.error("Ошибка при удалении аниме!");
    }
  };


  return (
    <div className="admin-page">
      <h2 className="admin-title">Админ-панель управления аниме</h2>
      <div className="admin-form">
        <input type="text" name="title" value={animeData.title} onChange={handleChange} placeholder="Название" />
        <textarea name="description" value={animeData.description} onChange={handleChange} placeholder="Описание" />
        <input type="number" name="year" value={animeData.year} onChange={handleChange} placeholder="Год выхода" />
        <input type="text" name="youtube_url" value={animeData.youtube_url} onChange={handleChange} placeholder="YouTube URL" />
        <input type="text" name="imageUrl" value={animeData.imageUrl} onChange={handleChange} placeholder="Ссылка на постер" />
        <input type="text" name="genres" value={animeData.genres} onChange={handleChange} placeholder="Жанры через запятую" />
        <input type="text" name="id" value={animeData.id} onChange={handleChange} placeholder="ID для обновления/удаления" />

        <div className="admin-buttons">
          <button onClick={handleAdd} className="add-button"> Добавить</button>
          <button onClick={handleUpdate} className="update-button"> Обновить</button>
          <button onClick={handleDelete} className="delete-button"> Удалить</button>
        </div>
      </div>

      <div className="anime-list">
  <h3>Список аниме</h3>
  <div className="anime-cards">
    {animeList.map(anime => (
      <div key={anime.id} className="anime-card">
        <img src={anime.image_url} alt={anime.title} />
        <div className="anime-info">
          <h4>{anime.title}</h4>
          <p>{anime.year}</p>
          <button onClick={() => handleEdit(anime)}> Редактировать</button>
          <button onClick={() => handleDeleteDirect(anime.id)}> Удалить</button>
        </div>
      </div>
    ))}
  </div>
</div>

      {/* Контейнер для уведомлений */}
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>

    
  );

}

export default AdminPage;
