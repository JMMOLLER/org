import { useEffect, useRef, useState } from "react";
import preloaderAnimation from "../../assets/lottie/preloader-animation.json";
import lottie from "lottie-web";
import propTypes from "prop-types";
import "./preloader.css";

function Preloader({ errorHelpers, errorTeams, setShowPreloader, loadingHelpers, loadingTeams }){

    const preloaderRef = useRef(null);
    const [text, setText] = useState("Loading");


    useEffect(() => {
        if (loadingHelpers && loadingTeams) return;
        else {
            if (errorHelpers || errorTeams) return;
            setShowPreloader(false);
        }
    }, [errorHelpers, errorTeams, loadingHelpers, loadingTeams, setShowPreloader]);

    useEffect(() => {
        lottie.loadAnimation({
            container: preloaderRef.current,
            renderer: "svg",
            loop: true,
            autoplay: true,
            animationData: preloaderAnimation,
        });

        const id = setInterval(() => {
            setText((text) => {
                if(text.length === 10){
                    return "Loading";
                }else{
                    return text + ".";
                }
            });
        }, 400);
        
        return () => {
            lottie.destroy();
            clearInterval(id);
        }
    }, []);

    return(
        <>
            <div className="preloader" ref={preloaderRef}></div>
            <p className="text">{text}</p>
        </>
    )
}

Preloader.propTypes = {
    errorHelpers: propTypes.bool,
    errorTeams: propTypes.bool,
    setShowPreloader: propTypes.func.isRequired,
    loadingHelpers: propTypes.bool.isRequired,
    loadingTeams: propTypes.bool.isRequired,
};

export default Preloader;