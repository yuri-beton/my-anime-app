import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import "../assets/SearchBar.css";

const SearchBar = () => {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const lastQueryRef = useRef(""); // для хранения последнего запроса

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (query.length > 2 && query !== lastQueryRef.current) {
        fetchAnime();
        lastQueryRef.current = query;
      } else {
        setResults([]);
        setNoResults(false);
      }
    }, 400); // задержка поиска

    return () => clearTimeout(delaySearch);
  }, [query]);

  const fetchAnime = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://n8n.sagutor.ru/webhook/anime/search?title=${encodeURIComponent(query)}`);
      setResults(response.data);
      setNoResults(response.data.length === 0);
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

      {!loading && noResults && (
        <div className="no-results">{t('noResults') || "Ничего не найдено"}</div>
      )}
      
      {!loading && results.length > 0 && (
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