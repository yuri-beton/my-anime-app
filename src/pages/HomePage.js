import React, { useEffect, useState } from 'react';
import { fetchAnimeList } from '../services/animeApi';
import AnimeCard from '../components/AnimeCard';

function HomePage() {
  const [animeList, setAnimeList] = useState([]);

  useEffect(() => {
    fetchAnimeList().then(data => setAnimeList(data));
  }, []);

  return (
    <div className="home-page">
      <h2>Список аниме</h2>
      <div className="anime-grid"> {/* Заменяем на anime-grid */}
        {animeList.map(anime => (
          <AnimeCard key={anime.id} anime={anime} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
