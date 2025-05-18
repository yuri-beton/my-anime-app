import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { fetchAnimeById } from '../services/animeApi';
import "../assets/AnimeDetailPage.css";

function AnimeDetailPage() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const [anime, setAnime] = useState(null);
  const [selectedEpisode, setSelectedEpisode] = useState(1);
  const [videoUrl, setVideoUrl] = useState("");
  const [showTrailer, setShowTrailer] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const loadAnime = async () => {
      try {
        const data = await fetchAnimeById(id, i18n.language);
        if (Array.isArray(data) && data.length > 0) {
          setAnime(data[0]);
        } else {
          setAnime(data);
        }
      } catch (error) {
        console.error(t('animeLoadError') || 'Ошибка при загрузке аниме:', error);
      }
    };

    loadAnime();
  }, [id, i18n.language]);

  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    const regExp = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/.*v=([a-zA-Z0-9_-]+)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  const videoId = getYouTubeVideoId(anime?.youtube_url);

  const openSeasonModal = async () => {
    try {
      const response = await axios.get('https://n8n.sagutor.ru/webhook/anime/video', {
        params: { id, episode: selectedEpisode }
      });
      setVideoUrl(response.data?.Ссылка || "");
      setShowTrailer(false);
      setShowModal(true);
    } catch (error) {
      console.error(t('episodeLoadError') || "Ошибка при получении серии:", error);
    }
  };

  const handleEpisodeChangeInModal = async (e) => {
    const episodeNumber = Number(e.target.value);
    setSelectedEpisode(episodeNumber);
    try {
      const response = await axios.get('https://n8n.sagutor.ru/webhook/anime/video', {
        params: { id, episode: episodeNumber }
      });
      setVideoUrl(response.data?.Ссылка || "");
    } catch (error) {
      console.error(t('episodeLoadError') || "Ошибка при смене серии:", error);
    }
  };

  if (!anime) {
    return <div>{t('loading') || "Загрузка..."}</div>;
  }

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
          <p><strong>{t('genres') || "Жанры"}:</strong> {Array.isArray(anime.genres) ? anime.genres.join(", ") : anime.genres || (t('notSpecified') || "Не указаны")}</p>

          <div className="buttons">
            <button onClick={() => setShowTrailer(true)}>{t('trailer') || "Трейлер"}</button>
            <button onClick={openSeasonModal}>{t('seasons') || "Сезоны"}</button>
          </div>

          {showTrailer && videoId && (
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

      {/* МОДАЛКА */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{t('chooseEpisode') || "Выберите серию"}</h3>
            <select
              value={selectedEpisode}
              onChange={handleEpisodeChangeInModal}
              style={{ marginBottom: '15px', padding: '8px', width: '100%' }}
            >
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {t('episode') || 'Серия'} {i + 1}
                </option>
              ))}
            </select>

            {videoUrl && (
              <iframe
                width="100%"
                height="400"
                src={videoUrl}
                title="Episode Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}

            <button className="close-button" onClick={() => setShowModal(false)}>✕</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AnimeDetailPage;
