import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAnimeById } from '../services/animeApi';
import "../assets/AnimeDetailPage.css";


function AnimeDetailPage() {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);

  useEffect(() => {
    fetchAnimeById(id).then(data => {
      console.log("Полученные данные аниме:", data);
      if (Array.isArray(data) && data.length > 0) {
        setAnime(data[0]);
      }
    });
  }, [id]);

  if (!anime) {
    return <div>Загрузка...</div>;
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
          <p><strong>Описание:</strong> {anime.description}</p>
          <p><strong>Год выпуска:</strong> {anime.year}</p>
          <p><strong>Жанры:</strong> {Array.isArray(anime.genres) ? anime.genres.join(", ") : anime.genres || "Не указаны"}</p>

          {/* Убедись, что у тебя есть ссылка anime.url в данных */}
          {anime.url && (
            <p>
              <a href={anime.url} target="_blank" rel="noopener noreferrer">Смотреть аниме</a>
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