import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import "../assets/SearchBar.css";

const SearchBar = () => {
  const { t, i18n } = useTranslation();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (query.trim().length >= 1) {
        fetchAnime(query.trim());
        setShowDropdown(true);
      } else {
        setResults([]);
        setShowDropdown(false);
      }
    }, 300);

    return () => clearTimeout(delaySearch);
  }, [query]);

  const fetchAnime = async (searchText) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://n8n.sagutor.ru/webhook/anime/search`, {
        params: {
          part: searchText,
          lang: i18n.language // <-- добавлен параметр языка
        }
      });
      const data = Array.isArray(response.data) ? response.data : response.data.data || [];
      setResults(data);
    } catch (error) {
      console.error(t('searchError'), error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const highlightMatch = (text) => {
    const index = text.toLowerCase().indexOf(query.toLowerCase());
    if (index === -1) return text;
    return (
      <>
        {text.slice(0, index)}
        <strong>{text.slice(index, index + query.length)}</strong>
        {text.slice(index + query.length)}
      </>
    );
  };

  return (
    <div className="search-bar" ref={searchRef}>
      <div className="search-input-wrapper">
        <span className="search-icon"></span>
        <input
          type="text"
          className="search-input"
          placeholder={t("searchPlaceholder")}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query && setShowDropdown(true)}
        />
      </div>

      {loading && <div className="loading">{t("loading")}</div>}

      {showDropdown && (
        <div className="search-dropdown">
          {results.length > 0 ? (
            <ul className="search-results">
              {results.map((anime) => (
                <li key={anime.id}>
                  <Link to={`/anime/${anime.id}`} onClick={() => setShowDropdown(false)}>
                    {highlightMatch(anime.title)}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="no-results">{t("noResults") || "Ничего не найдено"}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
