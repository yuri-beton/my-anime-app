import React from 'react';
import AnimeCard from './components/AnimeCard'; // Импортируйте компонент AnimeCard

function AnimeGrid({ animeList }) {
  return (
    <div className="anime-grid">
      {animeList.map(anime => (
        <AnimeCard key={anime.:id} anime={anime} />
      ))}
    </div>
  );
}

export default AnimeGrid;
