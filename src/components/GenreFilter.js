import React, { useState, useEffect } from "react";
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
    // Здесь мы просто устанавливаем локальный список
    setGenres(localGenreList);
  }, []);

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