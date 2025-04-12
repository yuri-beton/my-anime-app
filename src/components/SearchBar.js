import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import "../assets/SearchBar.css";

const SearchBar = () => {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (query.length > 2) {
        fetchAnime();
      } else {
        setResults([]);
      }
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [query]);

  const fetchAnime = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/api/anime/search?title=${query}`);
      setResults(response.data);
    } catch (error) {
      console.error(t('searchError'), error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-input"
        placeholder={t('searchPlaceholder')}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {loading && <div className="loading">{t('loading')}</div>}
      {results.length > 0 && (
        <ul className="search-results">
          {results.map((anime) => (
            <li key={anime.id}>
              <Link to={`/anime/${anime.id}`}>{anime.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;