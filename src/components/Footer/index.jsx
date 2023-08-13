import "./Footer.css";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container_socials">
                <a href="https://github.com/JMMOLLER" target="_blank" rel="noopener noreferrer" title="go to github" className="socials github"></a>
                <a href="https://www.linkedin.com/in/jorge-luis-moreno-moller-71207218a/" target="_blank" rel="noopener noreferrer" title="go to linkdein" className="socials linkedin"></a>
                <a href="https://portafolio-jlmm.vercel.app" target="_blank" rel="noopener noreferrer" title="go to portfolio web" className="socials webpage"></a>
            </div>
            <div className="container_logo">
                <img src="/icons/logo.svg" alt="logo" className="logo" />
            </div>
            <div className="container_comment">
                <p className="comment">
                    Desarrollado por Jorge Moreno
                </p>
            </div>
        </footer>
    );
}
