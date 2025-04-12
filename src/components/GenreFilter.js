import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import "../assets/GenreFilter.css";

const GenreFilter = ({ selectedGenres, setSelectedGenres }) => {
  const { t } = useTranslation();
  const [genres, setGenres] = useState([]);

  // Локальный список жанров
  const localGenreList = [
    "action", "adventure", "comedy", "drama", "fantasy", "sliceOfLife",
    "horror", "mystery", "psychological", "romance", "sciFi",
    "supernatural", "thriller", "sports", "mecha", "isekai", "historical"
  ];

  useEffect(() => {
    axios
      .get("https://n8n.sagutor.ru/webhook/anime/filter")
      .then((response) => {
        console.log("FULL API RESPONSE:", response);
        const data = response.data;
        if (Array.isArray(data)) {
          // Преобразуем серверные жанры к ключам, если понадобится
          setGenres(data.map(genre => mapGenreToKey(genre)));
        } else {
          console.warn("API не вернул массив, используем локальный список.");
          setGenres(localGenreList);
        }
      })
      .catch((error) => {
        console.error(t('genresLoadError'), error);
        setGenres(localGenreList);
      });
  }, []);

  const mapGenreToKey = (genreName) => {
    // Функция для маппинга жанров если API присылает русские названия
    const mapping = {
      "Экшен": "action",
      "Приключения": "adventure",
      "Комедия": "comedy",
      "Драма": "drama",
      "Фэнтези": "fantasy",
      "Повседневность": "sliceOfLife",
      "Ужасы": "horror",
      "Мистика": "mystery",
      "Психологическое": "psychological",
      "Романтика": "romance",
      "Научная фантастика": "sciFi",
      "Сверхъестественное": "supernatural",
      "Триллер": "thriller",
      "Спорт": "sports",
      "Меха": "mecha",
      "Исекай": "isekai",
      "Исторический": "historical"
    };
    return mapping[genreName] || genreName;
  };

  const toggleGenre = (genre) => {
    setSelectedGenres((prevGenres) =>
      prevGenres.includes(genre)
        ? prevGenres.filter((g) => g !== genre)
        : [...prevGenres, genre]
    );
  };

  return (
    <div className="genre-filter">
      <h3>{t('genres')}</h3>
      <div className="genre-list">
        {genres.map((genre) => (
          <label key={genre} className="genre-item">
            <input
              type="checkbox"
              checked={selectedGenres.includes(genre)}
              onChange={() => toggleGenre(genre)}
            />
            {t(genre)}
          </label>
        ))}
      </div>
    </div>
  );
};

export default GenreFilter;