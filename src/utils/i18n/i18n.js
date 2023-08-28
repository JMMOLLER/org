import i18 from "i18next";
import es from "./locales/es/translation.json";
import en from "./locales/en/translation.json";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const lngs = {
    en: { nativeName: "English" },
    es: { nativeName: "Español" },
};

const selectedLng = localStorage.getItem("i18nextLng") || "es";

i18.use(LanguageDetector).use(initReactI18next).init({
    resources: {
        en: { translation: en },
        es: { translation: es },
    },
    lng: selectedLng,
    fallbackLng: "eng",
    interpolation: {
        escapeValue: false,
    },
});

export { lngs };