import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchAnimeList } from '../services/animeApi';
import AnimeCard from '../components/AnimeCard';
import axios from 'axios';
import GenreFilter from '../components/GenreFilter';
import '../assets/anime-grid.css';
import '../assets/GenreFilter.css';

const HomePage = () => {
  const { t, i18n } = useTranslation();
  const [animeList, setAnimeList] = useState([]);
  const [filteredAnime, setFilteredAnime] = useState(null); // ❗ null = ещё не применён фильтр
  const [selectedGenres, setSelectedGenres] = useState([]);

  // Загрузка всех аниме при старте или смене языка
  useEffect(() => {
    const loadAnimeList = async () => {
      const data = await fetchAnimeList(i18n.language);
      setAnimeList(data);
    };
    loadAnimeList();
  }, [i18n.language]);

  // 🔘 Обработка кнопки "Применить фильтр"
  const handleApplyFilter = async () => {
    if (selectedGenres.length === 0) {
      setFilteredAnime(null); // ❗ Показываем весь список
      return;
    }

    const genreMapping = {
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

    const mappedGenres = selectedGenres.map(g => genreMapping[g] || g);

    try {
      const response = await axios.get(
        `https://n8n.sagutor.ru/webhook/anime/filter`,
        {
          params: { genres: mappedGenres }
        }
      );

      if (Array.isArray(response.data)) {
        setFilteredAnime(response.data);
      } else {
        console.warn("Сервер вернул не массив:", response.data);
        setFilteredAnime([]);
      }
    } catch (error) {
      console.error(t('filterError'), error);
      setFilteredAnime([]);
    }
  };

  const currentAnimeList = filteredAnime ?? animeList;

  return (
    <div className="home-page">
      <h2>{t('animeList')}</h2>
      <div className="anime-page-container">
        <GenreFilter
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
          onApplyFilter={handleApplyFilter}
        />
        <div className="anime-grid">
          {currentAnimeList.length > 0 ? (
            currentAnimeList.map((anime) => (
              <AnimeCard key={anime.id} anime={anime} />
            ))
          ) : (
            <div className="no-results">{t('noResults') || "Аниме не найдено"}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;