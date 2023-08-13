import "./Footer.css";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container_socials">
                <a href="" target="_blank" title="go to github" className="socials github"></a>
                <a href="" target="_blank" title="go to linkdein" className="socials linkedin"></a>
                <a href="" target="_blank" title="go to portfolio web" className="socials webpage"></a>
            </div>
            <div className="container_logo">
                <img src="/icons/logo.svg" alt="logo" className="logo" />
            </div>
            <div className="container_comment">
                <p className="comment">
                    Desarrollado por Jorge Moreno | JMMOLLER
                </p>
            </div>
        </footer>
    );
}
