import "./Hero.css"

export default function Hero() {
    return (
        <div className="hero">
            <div className="hero_content_left">
                <img src="/icons/logo.svg" alt="logo icon" />
                <div className="hero_text">
                    <h1>Personas y Equipos</h1>
                    <p>Organizados en un solo lugar.</p>
                </div>
            </div>
            <img className="hero_content_right" src="/images/people.svg" alt="image people" />
        </div>
    )
}