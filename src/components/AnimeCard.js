import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function AnimeCard({ anime }) {
  const { t } = useTranslation();

  return (
    <div className="anime-card">
      <img src={anime.image_url} alt={anime.title} />
      <h3>{anime.title}</h3>
      <Link to={`/anime/${anime.id}`} className="details-link">
        {t('moreDetails')}
      </Link>
    </div>
  );
}

export default AnimeCard;