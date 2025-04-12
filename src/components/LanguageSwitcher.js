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
      <button
        onClick={() => changeLanguage('ru')}
        style={{
          ...buttonStyle,
          ...(currentLang === 'ru' ? activeButtonStyle : {})
        }}
      >
        🇷🇺
      </button>
      <button
        onClick={() => changeLanguage('en')}
        style={{
          ...buttonStyle,
          ...(currentLang === 'en' ? activeButtonStyle : {})
        }}
      >
        🇬🇧
      </button>
    </div>
  );
}

const buttonStyle = {
  background: "none",
  border: "2px solid transparent",
  cursor: "pointer",
  fontSize: "28px",
  color: "#fefae0",
  padding: "5px",
  transition: "all 0.3s ease", // Мягкая анимация при наведении
};

const activeButtonStyle = {
  borderColor: "white", // Подсветим выбранный язык рамочкой
  borderRadius: "8px",
};

export default LanguageSwitcher;