import { useState, useEffect } from "react";

const useSchemeColor = ({ animation }) => {
    const [isDark, setIsDark] = useState(
        new Date().getHours() >= 18 || new Date().getHours() <= 6
    );
    useEffect(() => {
        handleSchemeMode(isDark, animation);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDark]);

    const handleSchemeMode = (isDark, animation) => {
        if (isDark) {
            if (animation) {
                animation.setDirection(1);
                animation.play();
            }
            const properties = [
                {
                    name: "--background-color",
                    value: "#2c2c2c",
                },
                {
                    name: "--text-color",
                    value: "#FFF",
                },
                {
                    name: "--shadow-color",
                    value: "rgb(255 255 255 / 10%)",
                },
                {
                    name: "--button-shadow-color",
                    value: "rgba(255 255 255 / 40%)",
                },
            ];
            handleToggleSchemaColor(properties);
        } else {
            if (animation) {
                animation.setDirection(-1);
                animation.play();
            }
            const properties = [
                {
                    name: "--background-color",
                    value: "#FFF",
                },
                {
                    name: "--text-color",
                    value: "#212121",
                },
                {
                    name: "--shadow-color",
                    value: "rgba(0, 0, 0, 0.1)",
                },
                {
                    name: "--button-shadow-color",
                    value: "rgba(0, 0, 0, 0.4)",
                },
            ];
            handleToggleSchemaColor(properties);
        }
    };

    const handleToggleSchemaColor = (properties) => {
        properties.forEach((property) => {
            document.documentElement.style.setProperty(
                property.name,
                property.value
            );
        });
    };

    return {
        isDark,
        setIsDark,
        handleSchemeMode,
    };
};

export default useSchemeColor;
