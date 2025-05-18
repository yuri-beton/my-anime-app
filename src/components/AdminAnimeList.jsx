
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminAnimeList() {
  const { t } = useTranslation();
  const [animeList, setAnimeList] = useState([]);

  useEffect(() => {
    fetchAnime();
  }, []);

  const fetchAnime = async () => {
    try {
      const response = await axios.get("https://n8n.sagutor.ru/webhook/anime/all");
      setAnimeList(response.data);
    } catch (error) {
      console.error("Ошибка при загрузке аниме:", error);
      toast.error(t("animeLoadError") || "Ошибка загрузки аниме");
    }
  };

  const deleteAnime = async (id) => {
    if (!window.confirm(t("confirmDelete") || "Вы уверены, что хотите удалить это аниме?")) return;
    try {
      await axios.post("https://n8n.sagutor.ru/webhook/admin/anime/video/delete", { id });
      toast.success(t("animeDeleted") || "Аниме удалено!");
      fetchAnime();
    } catch (error) {
      console.error("Ошибка при удалении аниме:", error);
      toast.error(t("animeDeleteError") || "Ошибка удаления");
    }
  };

  return (
    <div className="admin-page">
      <h2 className="admin-title">{t("adminPanel") || "Админ-панель аниме"}</h2>
      <Link to="/admin/add" className="add-button">
        {t("addAnime") || "➕ Добавить новое аниме"}
      </Link>
      <div className="anime-list">
        {animeList.map((anime) => (
          <div key={anime.id} className="anime-card">
            <img src={anime.image_url} alt={anime.title} className="anime-img" />
            <h3>{anime.title}</h3>
            <div className="card-buttons">
              <Link to={`/admin/edit/${anime.id}`} className="edit-button">
                {t("edit") || "✏️ Редактировать"}
              </Link>
              <button onClick={() => deleteAnime(anime.id)} className="delete-button">
                {t("delete") || "🗑 Удалить"}
              </button>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
}

export default AdminAnimeList;
