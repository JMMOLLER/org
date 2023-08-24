import "./Modal.css";
import { useRef, useEffect } from "react";
import lottie from "lottie-web";
import liveAnimation from "../../assets/lottie/live-animation.json";
import PropTypes from "prop-types";

export function ModalLive({ isLive }){
    const animationElement = useRef(null);

    useEffect(() => {

        lottie.loadAnimation({
            container: animationElement.current,
            renderer: "svg",
            loop: true,
            autoplay: true,
            animationData: liveAnimation,
        });

        if (!isLive) lottie.destroy();

        return () => {
            lottie.destroy();
        };
    }, [isLive]);

    return (
        <div className="modal_container live" title="Escuchando al servidor por nuevos colaboradores">
            <div className={isLive ? "live_animation" : "live_animation error"} ref={animationElement}></div>
            <p className="text">{isLive ? "En Vivo" : "Desconectado"}</p>
        </div>
    );
}

export default function Modal({ setShowModal, message, title, customClickEvt, isDefault }) {

    if (isDefault) {
        message =
            "Parece que estás intentando enviar un formulario con datos vacíos, inténtalo otro día...";
        title = "⚠️ ¡Ups!";
    }

    const handleClick = () => {
        setShowModal(false);
        if (customClickEvt) {
            customClickEvt();
        }
    };

    return (
        <div className="modal_container">
            <div className="modal">
                <div className="title_modal">
                    <h3>{title}</h3>
                </div>
                <hr />
                <div className="content_modal">
                    <p className="message">
                        {message}
                    </p>
                    {isDefault && (
                        <img
                            src="https://media.tenor.com/KUUtQs-OOHAAAAAM/rana-que-salta-meme-meme-rana.gif"
                            style={{ width: "50px", height: "50px" }}
                            alt="mockup image"
                        />
                    )}
                </div>
                <hr />
                <div className="options_modal">
                    <button
                        type="button"
                        className="btn_modal"
                        onClick={handleClick}
                    >
                        Entiendo
                    </button>
                </div>
            </div>
        </div>
    );
}

Modal.propTypes = {
    setShowModal: PropTypes.func.isRequired,
    title: PropTypes.string,
    message: PropTypes.string,
    customClickEvt: PropTypes.func,
    isDefault: PropTypes.bool,
};

ModalLive.propTypes = {
    isLive: PropTypes.bool.isRequired,
}
