import "./Org.css";
import Team from '../Team/Team'
import PropTypes from 'prop-types';
import { useSpring, useSpringRef, animated } from "@react-spring/web";
import { useEffect } from "react";

export default function OrgTitle({ showForm, setShowForm, teams, helpers }) {
    const api = useSpringRef();

    useEffect(() => {
        window.addEventListener("resize", () => {
            handleClick();
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const springs = useSpring({
        ref: api,
        from: { y: 0 }
    });

    const handleClick = () => {
        const top = -document.querySelector(".section_teams").offsetTop;
        api.start({
            to: {
                y: springs.y.get() === top ? 0 : top,
            },
            onStart: () => {
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
        >
            <div className="teams_header">
                <h3>Mi Organización</h3>
                <button
                    type="button"
                    aria-label="toggle form"
                    onClick={handleClick}
                ></button>
            </div>
            { helpers.map((helper, index) => {
                const team = teams.find((team) => team.teamName === helper.team);
                return <Team key={index} helper={helper} dataTeams={team} />
            }) }
        </animated.section>
    );
}

OrgTitle.propTypes = {
    showForm: PropTypes.bool.isRequired,
    setShowForm: PropTypes.func.isRequired,
    teams: PropTypes.array.isRequired,
    helpers: PropTypes.array.isRequired,
};
