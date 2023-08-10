import "./Org.css";
import Team from '../Team/Team'
import PropTypes from 'prop-types';
import { useSpring, useSpringRef, animated } from "@react-spring/web";

export default function OrgTitle({ showForm, setShowForm, teams }) {
    const api = useSpringRef();
    const springs = useSpring({
        ref: api,
        from: { y: 0 }
    });

    const handleClick = () => {
        api.start({
            to: {
                y: springs.y.get() === -845 ? 0 : -845,
            },
            onStart: () => {
                setShowForm(!showForm);
            },
        });
    };

    return (
        <animated.section
            className="section_teams init"
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
            { teams.map((team, index) => <Team key={index} dataTeams={team} />) }
        </animated.section>
    );
}

OrgTitle.propTypes = {
    showForm: PropTypes.bool.isRequired,
    setShowForm: PropTypes.func.isRequired,
    teams: PropTypes.array.isRequired,
};

OrgTitle.propTypes = {
    showForm: PropTypes.bool.isRequired,
    setShowForm: PropTypes.func.isRequired,
    teams: PropTypes.array.isRequired,
};
