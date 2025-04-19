import React from 'react';
import { useTranslation } from 'react-i18next';
import AnimeCard from './AnimeCard';

function AnimeGrid({ animeList, loading }) {
  const { t } = useTranslation();

  if (loading) {
    return <div className="anime-grid-message">{t('loading')}</div>;
  }

  if (!animeList.length) {
    return <div className="anime-grid-message">{t('noAnimeFound')}</div>;
  }

  return (
    <div className="anime-grid">
      {animeList.map(anime => (
        <AnimeCard key={anime.id} anime={anime} />
      ))}
    </div>
  );
}

export default AnimeGrid;