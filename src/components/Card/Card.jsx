import "./Card.css";
import lottie from "lottie-web";
import deleteAnimation from "../../assets/lottie/delete-animation.json";
import likeAnimation from "../../assets/lottie/like-animation.json";
import { useEffect, useRef } from "react";

import PropTypes from "prop-types";

export default function Card({ dataHelper, bgColor, deleteHelper, isPreview }) {
    const deleteIconRef = useRef(null);
    const likeIconRef = useRef(null);
    const lottieInstanceDelete = useRef(null);
    const lottieInstanceLike = useRef(null);

    useEffect(() => {
        if(isPreview) return;

        lottieInstanceDelete.current = lottie.loadAnimation({
            container: deleteIconRef.current,
            renderer: "svg",
            loop: true,
            autoplay: false,
            animationData: deleteAnimation,
        });

        lottieInstanceLike.current = lottie.loadAnimation({
            container: likeIconRef.current,
            renderer: "svg",
            loop: false,
            autoplay: false,
            animationData: likeAnimation,
        });
        
        return () => {
            if(lottieInstanceDelete.current) {
                lottieInstanceDelete.current.destroy();
            }if(lottieInstanceLike.current) {
                lottieInstanceLike.current.destroy();
            }
        };
    }, []);

    const handleClick = (e) => {
        e.preventDefault();
        if(e.currentTarget.classList.contains("delete")) {
            handleClickDelete();
        }else if(e.currentTarget.classList.contains("like")) {
            handleClickLike();
        }
        e.stopPropagation();
    };

    const handleClickDelete = () => {
        deleteHelper(dataHelper.id);
    };

    const handleClickLike = () => {
        console.log("like");
        lottieInstanceLike.current.play();
    };

    const handleMouseEnter = () => {
        lottieInstanceDelete.current.play();
    };

    const handleMouseLeave = () => {
        lottieInstanceDelete.current.stop();
    };

    return (
        <div className="Card">
            {!isPreview && (
                <button
                    type="button"
                    className="icon delete"
                    onClick={handleClick}
                    ref={deleteIconRef}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    title="eliminar colaborador"
                ></button>
            )}
            <div className="header_card" style={{ backgroundColor: bgColor }}>
            {!isPreview && (<button
                    type="button"
                    className="icon like"
                    onClick={handleClick}
                    ref={likeIconRef}
                    title="Agregar a me gusta"
                ></button>
            )}
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
    isPreview: PropTypes.bool,
};
