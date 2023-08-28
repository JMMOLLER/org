import "./Modal.css";
import { useRef, useEffect } from "react";
import lottie from "lottie-web";
import liveAnimation from "../../assets/lottie/live-animation.json";
import schemeColorAnimation from "../../assets/lottie/dark_light-animation.json";
import PropTypes from "prop-types";

export default function Modal({ setShowModal, payload, easterEgg }) {
    let { message, title, button, customClickEvt } = payload;

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
                    <p className="message">{message}</p>
                    {easterEgg && (
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
                        { button }
                    </button>
                </div>
            </div>
        </div>
    );
}

export function ModalSchemeColor({ t, isDark, setIsDark, handleSchemeMode, animation, setAnimation }) {
    const animationElement = useRef(null);
    
    useEffect(() => {
        if (animation) return;
        const anim = lottie.loadAnimation({
            container: animationElement.current,
            renderer: "svg",
            loop: false,
            autoplay: false,
            animationData: schemeColorAnimation,
            rendererSettings: {
                className: "lottie_scheme_color",
                viewBoxSize: "0 0 110 110",
            },
        });
        setAnimation(anim);
        handleSchemeMode(isDark, anim);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [animation]);
    
    const handleClick = () => setIsDark(!isDark);

    return (
        <button
            type="button"
            title={isDark ? t('modal.alt.text_4') : t('modal.alt.text_3')}
            className="change_schema_color"
            ref={animationElement}
            onClick={handleClick}
        ></button>
    );
}

export function ModalLive({ isLive, t }) {
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
        <div
            className="modal_container live"
            title={isLive ? t('modal.alt.text_1') : t('modal.alt.text_2')}
        >
            <div
                className={isLive ? "live_animation" : "live_animation error"}
                ref={animationElement}
            ></div>
            <p className="text">{isLive ? t('modal.alt.text_5') : t('modal.alt.text_6')}</p>
        </div>
    );
}

Modal.propTypes = {
    setShowModal: PropTypes.func.isRequired,
    payload: PropTypes.object.isRequired,
    easterEgg: PropTypes.bool,
};

ModalLive.propTypes = {
    isLive: PropTypes.bool.isRequired,
    t: PropTypes.func.isRequired,
};

ModalSchemeColor.propTypes = {
    t: PropTypes.func.isRequired,
    isDark: PropTypes.bool.isRequired,
    setIsDark: PropTypes.func.isRequired,
    handleSchemeMode: PropTypes.func.isRequired,
    setAnimation: PropTypes.func.isRequired,
    animation: PropTypes.object,
}
