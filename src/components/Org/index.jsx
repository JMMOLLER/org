import "./Org.css";
import Team from "../Team/Team";
import PropTypes from "prop-types";
import { useEffect } from "react";

export default function OrgTitle(props) {
    const {
        showForm,
        setShowForm,
        teams,
        helpers,
        nodeOrgRef,
        deleteHelper,
        changeTeamColor,
        t,
    } = props;

    useEffect(() => {
        const offsetTop = -document.querySelector(".section_teams").offsetTop;
        animateFormTransition(nodeOrgRef, showForm, offsetTop);
    }, [showForm, nodeOrgRef]);

    const handleClick = () => {
        setShowForm(!showForm);
    };

    const animateFormTransition = (nodeOrgRef, showForm, offsetTop) => {
        const isInit = nodeOrgRef.current.classList.contains("init");
    
        if (isInit) {
            return nodeOrgRef.current.classList.remove("init");
        }
    
        if (showForm && !isInit) {
            nodeOrgRef.current.style.transform = `translateY(${offsetTop}px)`;
    
            setTimeout(() => {
                nodeOrgRef.current.style.transition = "transform 1s";
                nodeOrgRef.current.style.transform = `translateY(0px)`;

                setTimeout(() => {
                    nodeOrgRef.current.style = {}
                }, 1000);
            }, 1);
        } else {
            nodeOrgRef.current.style.transition = "transform 1s";
            nodeOrgRef.current.style.transform = `translateY(${offsetTop}px)`;
    
            if (!isInit && window.innerWidth < 768) {
                window.scrollTo({
                    top: nodeOrgRef.current.getBoundingClientRect().top,
                    behavior: "smooth",
                });
            }
        }
    };

    return (
        <section className="section_teams init" ref={nodeOrgRef}>
            <div className="teams_header">
                <h3>{t('org_section.title')}</h3>
                <button
                    type="button"
                    aria-label="toggle form"
                    onClick={handleClick}
                    title={!showForm ? t('org_section.button.text_1') : t('org_section.button.text_2') }
                ></button>
            </div>
            {teams.map((team) => (
                <Team
                    key={team.id}
                    helpers={helpers.filter(
                        (helper) => helper.team.teamName === team.teamName
                    )}
                    dataTeam={team}
                    deleteHelper={deleteHelper}
                    changeTeamColor={changeTeamColor}
                    t={t}
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
    deleteHelper: PropTypes.func.isRequired,
    changeTeamColor: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
};
