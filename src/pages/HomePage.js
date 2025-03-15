import React, { useEffect, useState } from 'react';
import { fetchAnimeList } from '../services/animeApi';
import AnimeCard from '../components/AnimeCard';
import axios from 'axios';
import '../assets/GenreFilter.css';
import GenreFilter from '../components/GenreFilter';


const genreList = [
  'Экшен', 'Приключения', 'Комедия', 'Драма', 'Фэнтези', 'Повседневность', 'Ужасы', 'Мистика', 'Психологическое', 
  'Романтика', 'Научная фантастика', 'Сверхъестественное', 'Триллер', 'Спорт', 'Меха', 'Исекай', 'Исторический', 
  'Военное', 'Музыка', 'Сёнен', 'Сёдзё', 'Сейнен', 'Дзёсэй', 'Гарем', 'Обратный гарем', 'Этти', 'Яой', 'Юри', 
  'Пародия', 'Суперспособности', 'Демоны', 'Вампиры', 'Магия', 'Боевые искусства', 'Школа', 'Игры', 'Полиция', 
  'Самураи', 'Космос', 'Постапокалипсис', 'Киберпанк', 'Стимпанк', 'Деменция'
];

function HomePage() {
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
        const response = await axios.get(`http://localhost:8080/api/anime/filter?${genreParams}`);
        setFilteredAnime(response.data);
      } catch (error) {
        console.error("Ошибка фильтрации:", error);
      }
    };
  
    fetchFilteredAnime();
  }, [selectedGenres]);

  return (
    <div className="home-page">
      <h2>Список аниме</h2>
      <div className="content-wrapper">
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
  );
}

export default HomePage;