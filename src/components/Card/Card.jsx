import "./Card.css";
import lottie from "lottie-web";
import animationData from "../../assets/lottie/delete-animation.json";
import { useEffect, useRef } from "react";

import PropTypes from "prop-types";

export default function Card({ dataHelper, bgColor, deleteHelper }) {
    const iconRef = useRef(null);
    const lottieInstance = useRef(null);

    useEffect(() => {
        lottieInstance.current = lottie.loadAnimation({
            container: iconRef.current,
            renderer: "svg",
            loop: true,
            autoplay: false,
            animationData,
        });
        
        return () => {
            if(lottieInstance.current) {
                lottieInstance.current.destroy();
            }
        };
    }, []);

    const handleClick = (e) => {
        e.preventDefault();
        deleteHelper(dataHelper.id);
    };

    const handleMouseEnter = () => {
        lottieInstance.current.play();
    };

    const handleMouseLeave = () => {
        lottieInstance.current.stop();
    };

    return (
        <div className="Card">
            <button
                type="button"
                className="icon delete"
                onClick={handleClick}
                ref={iconRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                title="eliminar colaborador"
            ></button>
            <div className="header_card" style={{ backgroundColor: bgColor }}>
                <img src={dataHelper.photo} alt={"image profile"} />
            </div>
            <div className="content_card">
                <h3>{dataHelper.name}</h3>
                <p>{dataHelper.position}</p>
            </div>
        </div>
    );
}

Card.propTypes = {
    dataHelper: PropTypes.object.isRequired,
    bgColor: PropTypes.string.isRequired,
    deleteHelper: PropTypes.func.isRequired,
};
