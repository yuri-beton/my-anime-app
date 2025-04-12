import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchAnimeList } from '../services/animeApi';
import AnimeCard from '../components/AnimeCard';
import axios from 'axios';
import '../assets/GenreFilter.css';
import '../assets/anime-grid.css';
import GenreFilter from '../components/GenreFilter';

const HomePage = () => {
  const { t } = useTranslation();
  const [animeList, setAnimeList] = useState([]);
  const [filteredAnime, setFilteredAnime] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  
  useEffect(() => {
    const loadAnimeList = async () => {
      try {
        const data = await fetchAnimeList();
        setAnimeList(data);
      } catch (error) {
        console.error("Ошибка при загрузке всех аниме:", error);
      }
    };
  
    loadAnimeList();
  }, []);
  
  // Потом фильтруем, если выбраны жанры
  useEffect(() => {
    const fetchFilteredAnime = async () => {
      if (selectedGenres.length === 0) {
        setFilteredAnime([]);
        return;
      }
  
      try {
        const mappedGenres = selectedGenres.map(g => {
          const mapping = {
            action: "Экшен",
            adventure: "Приключения",
            comedy: "Комедия",
            drama: "Драма",
            fantasy: "Фэнтези",
            sliceOfLife: "Повседневность",
            horror: "Ужасы",
            mystery: "Мистика",
            psychological: "Психологическое",
            romance: "Романтика",
            sciFi: "Научная фантастика",
            supernatural: "Сверхъестественное",
            thriller: "Триллер",
            sports: "Спорт",
            mecha: "Меха",
            isekai: "Исекай",
            historical: "Исторический"
          };
          return mapping[g] || g;
        });
  
        const genreParams = mappedGenres.map(g => `genres=${encodeURIComponent(g)}`).join("&");
  
        const response = await axios.get(`https://n8n.sagutor.ru/webhook/anime/filter?${genreParams}`);
  
        if (Array.isArray(response.data)) {
          setFilteredAnime(response.data);
        } else {
          console.warn("⚠️ Сервер вернул не массив:", response.data);
          setFilteredAnime([]);
        }
      } catch (error) {
        console.error(t('filterError'), error);
        setFilteredAnime([]);
      }
    };
  
    fetchFilteredAnime();
  }, [selectedGenres, t]);

  const currentAnimeList = selectedGenres.length > 0 ? filteredAnime : animeList;

  return (
    <div className="home-page">
      <h2>{t('animeList')}</h2>
      <div className="anime-page-container">
        <GenreFilter
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
        />
        <div className="anime-grid">
          {Array.isArray(currentAnimeList) && currentAnimeList.length > 0 ? (
            currentAnimeList.map((anime) => (
              <AnimeCard key={anime.id} anime={anime} />
            ))
          ) : (
            <div className="no-results">{t('noResults') || "Аниме по выбранным жанрам не найдено."}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
