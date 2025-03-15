import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/GenreFilter.css";

const GenreFilter = ({ selectedGenres, setSelectedGenres }) => {
    const [genres, setGenres] = useState([]);

    // Локальный список жанров (на случай ошибки API)
    const localGenreList = [
        "Экшен", "Приключения", "Комедия", "Драма", "Фэнтези", "Повседневность",
        "Ужасы", "Мистика", "Психологическое", "Романтика", "Научная фантастика",
        "Сверхъестественное", "Триллер", "Спорт", "Меха", "Исекай", "Исторический"
    ];

    useEffect(() => {
        axios
            .get("http://localhost:8080/api/anime/genres")
            .then((response) => setGenres(response.data))
            .catch((error) => {
                console.error("Ошибка загрузки жанров:", error);
                setGenres(localGenreList); // Используем локальный список
            });
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
            <h3>Жанры</h3>
            <div className="genre-list">
                {genres.map((genre) => (
                    <label key={genre} className="genre-item">
                        <input
                            type="checkbox"
                            checked={selectedGenres.includes(genre)}
                            onChange={() => toggleGenre(genre)}
                        />
                        {genre}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default GenreFilter;