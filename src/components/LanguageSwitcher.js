import React from "react";
import { useTranslation } from "react-i18next";

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const currentLang = i18n.language || 'ru'; // Безопасная проверка на язык

  return (
    <div style={{ display: "flex", gap: "10px", alignItems: "center", padding: "10px" }}>
      <LanguageButton 
        lang="ru" 
        currentLang={currentLang} 
        onClick={() => changeLanguage('ru')} 
        emoji="🇷🇺" 
      />
      <LanguageButton 
        lang="en" 
        currentLang={currentLang} 
        onClick={() => changeLanguage('en')} 
        emoji="🇬🇧" 
      />
    </div>
  );
}

function LanguageButton({ lang, currentLang, onClick, emoji }) {
  const isActive = lang === currentLang;

  return (
    <button
      onClick={onClick}
      style={{
        background: "none",
        borderWidth: "2px",
        borderStyle: "solid",
        borderColor: isActive ? "white" : "transparent",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "28px",
        color: "white",
        padding: "5px",
        transition: "all 0.3s ease",
      }}
    >
      {emoji}
    </button>
  );
}

export default LanguageSwitcher;
