import "./Org.css";
import Team from "../Team/Team";
import PropTypes from "prop-types";
import { useEffect } from "react";

export default function OrgTitle(props) {
    const { showForm, setShowForm, teams, helpers, nodeOrgRef } = props;

    useEffect(() => {
        const offsetTop = -document.querySelector(".section_teams").offsetTop;
        const isInit = nodeOrgRef.current.classList.contains("init");
        if (isInit) nodeOrgRef.current.classList.remove("init");
        if (showForm && !isInit) {
            nodeOrgRef.current.style.transform = `translateY(${offsetTop}px)`;
            setTimeout(() => {
                nodeOrgRef.current.style.transition = "transform 1s";
                nodeOrgRef.current.style.transform = `translateY(0px)`;
            }, 1);
        } else {
            nodeOrgRef.current.style.transition = "transform 1s";
            nodeOrgRef.current.style.transform = `translateY(${offsetTop}px)`;
            if (!isInit && window.innerWidth < 768)
                window.scrollTo({
                    top: nodeOrgRef.current.getBoundingClientRect().top,
                    behavior: "smooth",
                });
        }
    }, [showForm, nodeOrgRef]);

    const handleClick = () => {
        setShowForm(!showForm);
    };

    return (
        <section className="section_teams init" ref={nodeOrgRef}>
            <div className="teams_header">
                <h3>Mi Organización</h3>
                <button
                    type="button"
                    aria-label="toggle form"
                    onClick={handleClick}
                ></button>
            </div>
            {teams.map((team) => (
                <Team
                    key={team.teamName}
                    helpers={helpers.filter(
                        (helper) => helper.team === team.teamName
                    )}
                    dataTeams={team}
                />
            ))}
        </section>
    );
}

OrgTitle.propTypes = {
    showForm: PropTypes.bool.isRequired,
    setShowForm: PropTypes.func.isRequired,
    teams: PropTypes.array.isRequired,
    helpers: PropTypes.array.isRequired,
    nodeOrgRef: PropTypes.shape({ current: PropTypes.any }),
};
