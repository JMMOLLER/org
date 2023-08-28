import { useEffect, useRef, useState } from "react";
import preloaderAnimation from "../../assets/lottie/preloader-animation.json";
import lottie from "lottie-web";
import propTypes from "prop-types";
import "./preloader.css";

function Preloader({
    errorHelpers,
    errorTeams,
    setShowPreloader,
    loadingHelpers,
    loadingTeams,
    t,
}) {
    const preloaderRef = useRef(null);
    const textRef = useRef(null);
    const [text, setText] = useState(t('loader.text_1'));

    useEffect(() => {
        if (loadingHelpers && loadingTeams) return;
        else {
            if (errorHelpers || errorTeams) return;
            setShowPreloader(false);
        }
    }, [
        errorHelpers,
        errorTeams,
        loadingHelpers,
        loadingTeams,
        setShowPreloader,
    ]);

    useEffect(() => {
        lottie.loadAnimation({
            container: preloaderRef.current,
            renderer: "svg",
            loop: true,
            autoplay: true,
            animationData: preloaderAnimation,
        });

        const intervalId_1 = setInterval(() => {
            setText((text) => {
                return text + ".";
            });
        }, 400);

        let count = 0, isFirstChange = true;

        const intervalId_2 = setInterval(() => {
            setText((text) => {
                const index = text.endsWith("...");
                if (index) {
                    count++;
                    if(count >= 7) {
                        if(isFirstChange) {
                            handleAnimationText();
                            isFirstChange = false;
                        }
                        if(count >= 15) {
                            count = -10;
                            handleAnimationText();
                            isFirstChange = true;
                        }
                        return t('loader.text_2');
                    }
                    return t('loader.text_1');
                }else {
                    return text;
                }
            });
        }, 2000);

        const handleAnimationText = () => {
            if(!textRef.current.classList.contains("blink_animation")){
                textRef.current.classList.add("blink_animation");
            }
        }

        return () => {
            lottie.destroy();
            clearInterval(intervalId_1);
            clearInterval(intervalId_2);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className="preloader" ref={preloaderRef}></div>
            <p className="text" onAnimationEnd={(e) => {textRef.current.classList.remove(e.animationName+"_animation")}} ref={textRef}>{text}</p>
        </>
    );
}

Preloader.propTypes = {
    errorHelpers: propTypes.object,
    errorTeams: propTypes.object,
    setShowPreloader: propTypes.func.isRequired,
    loadingHelpers: propTypes.bool.isRequired,
    loadingTeams: propTypes.bool.isRequired,
    t: propTypes.func.isRequired,
};

export default Preloader;
