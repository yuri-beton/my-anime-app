import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { fetchAnimeById } from '../services/animeApi';
import "../assets/AnimeDetailPage.css";

function AnimeDetailPage() {
  const { id } = useParams();
  const { t, i18n } = useTranslation(); // добавляем i18n
  const [anime, setAnime] = useState(null);

  useEffect(() => {
    const loadAnime = async () => {
      try {
        const data = await fetchAnimeById(id, i18n.language); // передаём текущий язык
        console.log("Полученные данные аниме:", data);
        setAnime(data); // теперь сервер сразу отдаёт 1 аниме
      } catch (error) {
        console.error('Ошибка при загрузке аниме:', error);
      }
    };

    loadAnime();
  }, [id, i18n.language]); // следим за id и за сменой языка

  if (!anime) {
    return <div>{t('loading') || "Загрузка..."}</div>;
  }

  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    const regExp = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/.*v=([a-zA-Z0-9_-]+)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  const videoId = getYouTubeVideoId(anime.youtube_url);

  return (
    <div className="anime-detail-page">
      <h2 className="anime-title">{anime.title}</h2>
      <div className="anime-detail-content">
        <div className="anime-detail-image">
          <img src={anime.image_url} alt={anime.title} />
        </div>
        <div className="anime-detail-info">
          <p><strong>{t('description') || "Описание"}:</strong> {anime.description}</p>
          <p><strong>{t('year') || "Год выпуска"}:</strong> {anime.year}</p>
          <p><strong>{t('genres') || "Жанры"}:</strong> {Array.isArray(anime.genres) ? anime.genres.join(", ") : anime.genres || t('notSpecified') || "Не указаны"}</p>

          {anime.url && (
            <p>
              <a href={anime.url} target="_blank" rel="noopener noreferrer">
                {t('watchAnime') || "Смотреть аниме"}
              </a>
            </p>
          )}

          {videoId && (
            <div className="anime-video">
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AnimeDetailPage;
