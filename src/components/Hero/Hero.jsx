import "./Hero.css";
import { Link } from "react-router-dom";
import propTypes from "prop-types";

export default function Hero({ i18n, lngs, t }) {
  return (
    <header>
      <div className="hero">
        <div className="select_lang_container">
          <button type="button" className="btn_lang">
            <img src="./icons/translate.svg" alt={t('hero.alt.button')} />
          </button>
          <div className="select_lang">
            <ul className="lang_list_container">
              {generateListLangs(lngs, i18n)}
            </ul>
          </div>
        </div>
        <div className="hero_content_left">
          <img src="/icons/logo.svg" alt={t('hero.alt.logo')} />
          <div className="hero_text">
            <h1>{t("hero.title")}</h1>
            <p>{t("hero.subtitle")}</p>
          </div>
        </div>
        <img
          className="hero_content_right"
          src="/images/people.svg"
          alt={t('hero.alt.hero')}
        />
      </div>
    </header>
  );
}

const generateListLangs = (lngs, i18n) => {
  return Object.keys(lngs).reduce((current, lng, index) => {
    current.push(
      <li key={lng}>
        <Link
          style={{
            fontWeight:
              i18n.resolvedLanguage === lng ? "bold" : "normal",
          }}
          className="lang_option"
          to={lng}
        >
          {lngs[lng].nativeName}
        </Link>
      </li>
    );
    if (index < Object.keys(lngs).length - 1) {
     current.push(<hr key={`hr-${lng}`} />);
    }
    return current;
  }, []);
};

Hero.propTypes = {
    i18n: propTypes.object.isRequired,
    lngs: propTypes.object.isRequired,
    t: propTypes.func.isRequired,
};
