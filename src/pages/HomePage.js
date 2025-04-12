import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchAnimeList } from '../services/animeApi';
import AnimeCard from '../components/AnimeCard';
import axios from 'axios';
import '../assets/GenreFilter.css';
import '../assets/anime-grid.css';
import GenreFilter from '../components/GenreFilter';

const genreList = [
  'action', 'adventure', 'comedy', 'drama', 'fantasy', 'sliceOfLife',
  'horror', 'mystery', 'psychological', 'romance', 'sciFi',
  'supernatural', 'thriller', 'sports', 'mecha', 'isekai', 'historical'
];

function HomePage() {
  const { t } = useTranslation();
  const [animeList, setAnimeList] = useState([]);
  const [filteredAnime, setFilteredAnime] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [releaseYear, setReleaseYear] = useState({ from: '', to: '' });
  const [rating, setRating] = useState({ from: '', to: '' });

  useEffect(() => {
    fetchAnimeList().then(data => setAnimeList(data));
  }, []);

  useEffect(() => {
    if (selectedGenres.length === 0) {
      setFilteredAnime([]);
      return;
    }

    const fetchFilteredAnime = async () => {
      try {
        const genreParams = selectedGenres.map(g => `genres=${encodeURIComponent(g)}`).join("&");
        const response = await axios.get(`https://n8n.sagutor.ru/webhook/anime/filter?${genreParams}`);
        setFilteredAnime(response.data);
      } catch (error) {
        console.error(t('filterError'), error);
      }
    };

    fetchFilteredAnime();
  }, [selectedGenres, t]);

  return (
    <div className="home-container">
    <div className="home-page">
      <h2>{t('animeList')}</h2>
      <div className="anime-page-container">
        <GenreFilter 
          genreList={genreList}
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
          releaseYear={releaseYear}
          setReleaseYear={setReleaseYear}
          rating={rating}
          setRating={setRating}
        />
        <div className="anime-grid">
          {(filteredAnime.length > 0 ? filteredAnime : animeList).map(anime => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}

export default HomePage;