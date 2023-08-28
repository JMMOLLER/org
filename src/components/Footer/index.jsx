import "./Footer.css";
import pkg from "../../../package.json";
import propTypes from "prop-types";

export default function Footer({ t }) {
    
    return (
        <footer className="footer">
            <div className="container_socials">
                <a href="https://github.com/JMMOLLER" target="_blank" rel="noopener noreferrer" title={t('footer.link.alt_2')} className="socials github"></a>
                <a href="https://www.linkedin.com/in/jorge-luis-moreno-moller-71207218a/" target="_blank" rel="noopener noreferrer" title={t('footer.link.alt_1')} className="socials linkedin"></a>
                <a href="https://portafolio-jlmm.vercel.app" target="_blank" rel="noopener noreferrer" title={t('footer.link.alt_3')} className="socials webpage"></a>
            </div>
            <div className="container_logo">
                <img src="/icons/logo.svg" alt={t('hero.alt.logo')} className="logo" />
            </div>
            <div className="container_comment">
                <p className="comment">
                    {t("footer.comment")}
                </p>
            </div>
            <p className="text version">v{pkg.version}</p>
        </footer>
    );
}

Footer.propTypes = {
    t: propTypes.func.isRequired,
}
