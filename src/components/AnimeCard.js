import React from 'react';
import { Link } from 'react-router-dom';

function AnimeCard({ anime }) {
  return (
    <div className="anime-card">
      <img src={anime.imageUrl} alt={anime.title} />
      <h3>{anime.title}</h3>
      <Link to={`/anime/${anime.id}`} className="details-link">Подробнее</Link> {/* Добавляем класс для ссылки */}
    </div>
  );
}

export default AnimeCard;
