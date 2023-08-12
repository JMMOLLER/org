import "./Org.css";
import Team from '../Team/Team'
import PropTypes from 'prop-types';
import { useSpring, useSpringRef, animated } from "@react-spring/web";
import { useState, useEffect, useRef } from "react";

export default function OrgTitle({ showForm, setShowForm, teams, helpers }) {
    const [currentWindowWidth, setCurrentWindowWidth] = useState(window.innerWidth);
    const section = useRef(null);
    const api = useSpringRef();
    const springs = useSpring({
        ref: api,
        from: { y: 0 }
    });

    useEffect(() => {
        const handleResize = () => {
            const newWidth = window.innerWidth;
            setCurrentWindowWidth(newWidth);
            if (currentWindowWidth !== newWidth) {
                console.log("resize");
                setTimeout(() => {
                    if(showForm) return;
                    const offsetTop = -document.querySelector(".section_teams").offsetTop;
                    section.current.style.transform = `translateY(${offsetTop}px)`;
                }, 1);
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [currentWindowWidth, showForm]);

    useEffect(() => {
        if(!showForm) return;
        const current = document.querySelector(".section_teams").style.transform;
        if(current === "none") return;
        setShowForm(!showForm);
    }, [showForm, setShowForm]);

    const handleClick = () => {
        const offsetTop = -document.querySelector(".section_teams").offsetTop;
        api.start({
            to: {
                y: springs.y.get() === offsetTop ? 0 : offsetTop,
            },
            onResolve: () => {
                setShowForm(!showForm);
            },
            onStart: () => {
                if(!showForm) return;
                setShowForm(!showForm);
            },
        });
    };

    return (
        <animated.section
            className="section_teams"
            style={{
                ...springs,
            }}
            ref={section}
        >
            <div className="teams_header">
                <h3>Mi Organización</h3>
                <button
                    type="button"
                    aria-label="toggle form"
                    onClick={handleClick}
                ></button>
            </div>
            { teams.map((team) => <Team key={team.teamName} helpers={helpers.filter((helper) => helper.team === team.teamName)} dataTeams={team} />) }
        </animated.section>
    );
}

OrgTitle.propTypes = {
    showForm: PropTypes.bool.isRequired,
    setShowForm: PropTypes.func.isRequired,
    teams: PropTypes.array.isRequired,
    helpers: PropTypes.array.isRequired,
};
