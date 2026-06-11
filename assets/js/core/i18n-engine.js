
// assets/js/core/i18n-engine.js

/**
 * ========================================================
 * VORTEX i18n Engine
 * Handles text translation through data-i18n attributes.
 * ========================================================
 */

import { DEFAULT_LANGUAGE, STORAGE_LANGUAGE_KEY, i18n } from "../config/i18n.js";
import { qsa, getStoredValue, setStoredValue } from "./dom.js";

let currentLanguage = getStoredValue(STORAGE_LANGUAGE_KEY, DEFAULT_LANGUAGE);

const getDictionaryValue = (key, lang = currentLanguage) => {
    return i18n[lang]?.[key] ?? i18n[DEFAULT_LANGUAGE]?.[key] ?? null;
};

const translateTextNodes = () => {
    qsa("[data-i18n]").forEach((element) => {
        const key = element.getAttribute("data-i18n");
        const value = getDictionaryValue(key);

        if (value) {
            element.innerHTML = value;
        }
    });
};

const translateAttributes = () => {
    qsa("[data-i18n-attr]").forEach((element) => {
        const config = element.getAttribute("data-i18n-attr");

        if (!config) return;

        config.split(",").forEach((entry) => {
            const [attribute, key] = entry.split(":").map((item) => item.trim());
            const value = getDictionaryValue(key);

            if (attribute && value) {
                element.setAttribute(attribute, value);
            }
        });
    });
};

const updateLanguageButtons = () => {
    qsa("[data-action='toggle-lang']").forEach((button) => {
        button.textContent = currentLanguage === "es"
            ? i18n.es.lang_toggle
            : i18n.en.lang_toggle;
    });
};

export const renderLanguage = (language = currentLanguage) => {
    if (!i18n[language]) return;

    currentLanguage = language;

    translateTextNodes();
    translateAttributes();
    updateLanguageButtons();

    document.documentElement.lang = currentLanguage;
    setStoredValue(STORAGE_LANGUAGE_KEY, currentLanguage);

    window.dispatchEvent(new CustomEvent("languagechange", {
        detail: {
            language: currentLanguage
        }
    }));
};

export const toggleLanguage = () => {
    const nextLanguage = currentLanguage === "es" ? "en" : "es";
    renderLanguage(nextLanguage);
};

export const initI18n = () => {
    renderLanguage(currentLanguage);

    qsa("[data-action='toggle-lang']").forEach((button) => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            toggleLanguage();
        });
    });
};
