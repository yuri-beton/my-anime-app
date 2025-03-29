import React, { useEffect } from "react";

function GoogleTranslate() {
    useEffect(() => {
        const addScript = document.createElement("script");
        addScript.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        addScript.async = true;
        document.body.appendChild(addScript);

        window.googleTranslateElementInit = function () {
            new window.google.translate.TranslateElement({ pageLanguage: "ru" }, "google_translate_element");
        };
    }, []);

    const changeLanguage = (lang) => {
        let translate = document.querySelector(".goog-te-combo");
        if (translate) {
            translate.value = lang;
            translate.dispatchEvent(new Event("change"));
        }
    };

    return (
        <div className="google-translate-container">
            <div id="google_translate_element" style={{ display: "none" }}></div>
            <button onClick={() => changeLanguage("en")}>
  <span role="img" aria-label="English flag">🇬🇧</span> English
</button>
<button onClick={() => changeLanguage("ru")}>
  <span role="img" aria-label="Russian flag">🇷🇺</span> Русский
</button>
        </div>
    );
}

export default GoogleTranslate;
